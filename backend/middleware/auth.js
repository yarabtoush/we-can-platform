const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from Supabase
      const { data: user, error } = await supabase
        .from('users')
        .select('id, phone_number, role, is_verified, is_approved')
        .eq('id', decoded.id)
        .single();

      if (error || !user) {
        return res.status(401).json({
          success: false,
          message: 'المستخدم غير موجود'
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Auth Error:', error);
      res.status(401).json({
        success: false,
        message: 'غير مصرح لك بالوصول'
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: 'غير مصرح لك بالوصول، لا يوجد رمز مميز'
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'غير مصرح لك بالوصول'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بالوصول لهذه العملية'
      });
    }

    next();
  };
};

module.exports = { protect, authorize };
        message: 'ليس لديك صلاحية للوصول إلى هذا المورد'
      });
    }

    next();
  };
};

const requireApproval = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'غير مصرح لك بالوصول'
    });
  }

  if (!req.user.isApproved) {
    return res.status(403).json({
      success: false,
      message: 'حسابك قيد المراجعة، يرجى الانتظار حتى يتم الموافقة'
    });
  }

  next();
};

module.exports = { protect, authorize, requireApproval };