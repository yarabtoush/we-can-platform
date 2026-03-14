const supabase = require('../config/supabase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const twilio = require('twilio');

// Initialize Twilio
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @desc    Send OTP
// @route   POST /api/auth/send-otp
// @access  Public
const sendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'رقم الهاتف مطلوب'
      });
    }

    // Check if user exists
    const { data: existingUser, error: findError } = await supabase
      .from('users')
      .select('id, phone_number')
      .eq('phone_number', phoneNumber)
      .single();

    let userId;

    if (!existingUser) {
      // Generate temporary password
      const tempPassword = Math.random().toString(36);
      const hashedPassword = await bcrypt.hash(tempPassword, 10);

      // Create new user
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          phone_number: phoneNumber,
          password_hash: hashedPassword,
          role: 'parent'
        })
        .select('id')
        .single();

      if (createError) throw createError;
      userId = newUser.id;
    } else {
      userId = existingUser.id;
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update user with OTP
    const { error: updateError } = await supabase
      .from('users')
      .update({
        otp_code: otp,
        otp_expires_at: expiresAt.toISOString()
      })
      .eq('id', userId);

    if (updateError) throw updateError;

    // Send OTP via Twilio (in production)
    if (process.env.NODE_ENV === 'production') {
      await client.messages.create({
        body: `رمز التحقق الخاص بك هو: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber.startsWith('+') ? phoneNumber : `+962${phoneNumber.slice(1)}`
      });
    }

    res.status(200).json({
      success: true,
      message: 'تم إرسال رمز التحقق',
      data: {
        otp: process.env.NODE_ENV === 'development' ? otp : undefined // Show OTP in development
      }
    });
  } catch (error) {
    console.error('Send OTP Error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

// @desc    Verify OTP and login
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
  try {
    const { phoneNumber, otp, password } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({
        success: false,
        message: 'رقم الهاتف ورمز التحقق مطلوبان'
      });
    }

    // Get user with OTP
    const { data: user, error: findError } = await supabase
      .from('users')
      .select('id, phone_number, password_hash, otp_code, otp_expires_at, is_verified')
      .eq('phone_number', phoneNumber)
      .single();

    if (findError || !user) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }

    // Check OTP
    if (user.otp_code !== otp || new Date(user.otp_expires_at) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'رمز التحقق غير صحيح أو منتهي الصلاحية'
      });
    }

    // If password provided, update it (for registration)
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const { error: updateError } = await supabase
        .from('users')
        .update({
          password_hash: hashedPassword,
          is_verified: true,
          otp_code: null,
          otp_expires_at: null
        })
        .eq('id', user.id);

      if (updateError) throw updateError;
    } else {
      // Clear OTP for login
      const { error: clearError } = await supabase
        .from('users')
        .update({
          otp_code: null,
          otp_expires_at: null
        })
        .eq('id', user.id);

      if (clearError) throw clearError;
    }

    // Generate token
    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      message: password ? 'تم التسجيل بنجاح' : 'تم تسجيل الدخول بنجاح',
      data: {
        token,
        user: {
          id: user.id,
          phoneNumber: user.phone_number,
          isVerified: user.is_verified
        }
      }
    });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

// @desc    Login with password
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({
        success: false,
        message: 'رقم الهاتف وكلمة المرور مطلوبان'
      });
    }

    // Get user
    const { data: user, error: findError } = await supabase
      .from('users')
      .select('id, phone_number, password_hash, is_verified, role')
      .eq('phone_number', phoneNumber)
      .single();

    if (findError || !user) {
      return res.status(401).json({
        success: false,
        message: 'بيانات الدخول غير صحيحة'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'بيانات الدخول غير صحيحة'
      });
    }

    // Generate token
    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      data: {
        token,
        user: {
          id: user.id,
          phoneNumber: user.phone_number,
          role: user.role,
          isVerified: user.is_verified
        }
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

module.exports = {
  sendOTP,
  verifyOTP,
  login
};

// @desc    Verify OTP and login
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
  try {
    const { phoneNumber, otp, password } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({
        success: false,
        message: 'رقم الهاتف ورمز التحقق مطلوبان'
      });
    }

    const user = await User.findOne({ phoneNumber }).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }

    // Check OTP
    if (user.otp.code !== otp || user.otp.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'رمز التحقق غير صحيح أو منتهي الصلاحية'
      });
    }

    // If password provided, set it (for registration)
    if (password) {
      user.password = password;
    }

    // Clear OTP and mark as verified
    user.otp = undefined;
    user.isVerified = true;
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'تم التحقق بنجاح',
      data: {
        token,
        user: {
          id: user._id,
          phoneNumber: user.phoneNumber,
          role: user.role,
          isApproved: user.isApproved
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

// @desc    Login with password
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({
        success: false,
        message: 'رقم الهاتف وكلمة المرور مطلوبان'
      });
    }

    const user = await User.findOne({ phoneNumber }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'بيانات الدخول غير صحيحة'
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: 'يرجى التحقق من رقم الهاتف أولاً'
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      data: {
        token,
        user: {
          id: user._id,
          phoneNumber: user.phoneNumber,
          role: user.role,
          isApproved: user.isApproved
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          phoneNumber: user.phoneNumber,
          role: user.role,
          isApproved: user.isApproved,
          isVerified: user.isVerified
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

module.exports = {
  sendOTP,
  verifyOTP,
  login,
  getMe,
};