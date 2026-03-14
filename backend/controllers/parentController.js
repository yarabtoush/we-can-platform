const supabase = require('../config/supabase');
const { sendWelcomeEmail, sendApprovalNotification, sendRejectionNotification } = require('../utils/notifications');

// @desc    Register parent
// @route   POST /api/parents/register
// @access  Private
const registerParent = async (req, res) => {
  try {
    const {
      fullName,
      nationalId,
      childName,
      childNationalId,
      disabilityType,
      password
    } = req.body;

    // Check if parent already exists
    const { data: existingParent, error: checkError } = await supabase
      .from('parents')
      .select('id')
      .or(`national_id.eq.${nationalId},child_national_id.eq.${childNationalId}`)
      .single();

    if (existingParent) {
      return res.status(400).json({
        success: false,
        message: 'الوالد أو الطفل مسجل مسبقاً'
      });
    }

    // Update user password and role
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);

    const { error: updateError } = await supabase
      .from('users')
      .update({
        password_hash: hashedPassword,
        role: 'parent'
      })
      .eq('id', req.user.id);

    if (updateError) throw updateError;

    // Prepare file data
    const medicalReports = req.files?.medicalReports?.map(file => ({
      url: file.path,
      filename: file.originalname,
      uploadedAt: new Date().toISOString()
    })) || [];

    const childPhotos = req.files?.childPhotos?.map(file => ({
      url: file.path,
      filename: file.originalname,
      uploadedAt: new Date().toISOString()
    })) || [];

    const documents = req.files?.documents?.map(file => ({
      url: file.path,
      filename: file.originalname,
      uploadedAt: new Date().toISOString()
    })) || [];

    const signature = req.files?.signature ? req.files.signature[0].path : null;

    // Create parent profile
    const { data: parent, error: createError } = await supabase
      .from('parents')
      .insert({
        user_id: req.user.id,
        full_name: fullName,
        national_id: nationalId,
        child_name: childName,
        child_national_id: childNationalId,
        disability_type: disabilityType,
        medical_reports: medicalReports,
        child_photos: childPhotos,
        documents: documents,
        signature: signature
      })
      .select()
      .single();

    if (createError) throw createError;

    res.status(201).json({
      success: true,
      message: 'تم تسجيل الوالد بنجاح، في انتظار الموافقة',
      data: parent
    });
  } catch (error) {
    console.error('Register Parent Error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

// @desc    Get parent profile
// @route   GET /api/parents/profile
// @access  Private
const getParentProfile = async (req, res) => {
  try {
    const { data: parent, error } = await supabase
      .from('parents')
      .select('*')
      .eq('user_id', req.user.id)
      .single();

    if (error || !parent) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على ملف الوالد'
      });
    }

    res.status(200).json({
      success: true,
      data: parent
    });
  } catch (error) {
    console.error('Get Parent Profile Error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

// @desc    Update parent profile
// @route   PUT /api/parents/profile
// @access  Private
const updateParentProfile = async (req, res) => {
  try {
    const { data: parent, error: findError } = await supabase
      .from('parents')
      .select('*')
      .eq('user_id', req.user.id)
      .single();

    if (findError || !parent) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على ملف الوالد'
      });
    }

    const updates = {};

    // Handle basic field updates
    const allowedFields = ['full_name', 'child_name', 'disability_type'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Handle file uploads
    if (req.files?.medicalReports) {
      const newReports = req.files.medicalReports.map(file => ({
        url: file.path,
        filename: file.originalname,
        uploadedAt: new Date().toISOString()
      }));
      updates.medical_reports = [...(parent.medical_reports || []), ...newReports];
    }

    if (req.files?.childPhotos) {
      const newPhotos = req.files.childPhotos.map(file => ({
        url: file.path,
        filename: file.originalname,
        uploadedAt: new Date().toISOString()
      }));
      updates.child_photos = [...(parent.child_photos || []), ...newPhotos];
    }

    if (req.files?.documents) {
      const newDocs = req.files.documents.map(file => ({
        url: file.path,
        filename: file.originalname,
        uploadedAt: new Date().toISOString()
      }));
      updates.documents = [...(parent.documents || []), ...newDocs];
    }

    updates.updated_at = new Date().toISOString();

    const { data: updatedParent, error: updateError } = await supabase
      .from('parents')
      .update(updates)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (updateError) throw updateError;

    res.status(200).json({
      success: true,
      message: 'تم تحديث الملف بنجاح',
      data: updatedParent
    });
  } catch (error) {
    console.error('Update Parent Profile Error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

// @desc    Get all parents (Admin only)
// @route   GET /api/parents
// @access  Private/Admin
const getAllParents = async (req, res) => {
  try {
    const { data: parents, error } = await supabase
      .from('parents')
      .select(`
        *,
        users!inner(phone_number)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: parents
    });
  } catch (error) {
    console.error('Get All Parents Error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

// @desc    Update parent status (Admin only)
// @route   PUT /api/parents/:id
// @access  Private/Admin
const updateParentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'حالة غير صحيحة'
      });
    }

    const { data: updatedParent, error } = await supabase
      .from('parents')
      .update({
        status: status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Send notification email if needed
    // await sendApprovalNotification(updatedParent.email, status);

    res.status(200).json({
      success: true,
      message: 'تم تحديث حالة الوالد بنجاح',
      data: updatedParent
    });
  } catch (error) {
    console.error('Update Parent Status Error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

module.exports = {
  registerParent,
  getParentProfile,
  updateParentProfile,
  getAllParents,
  updateParentStatus
};

// @desc    Get parent profile
// @route   GET /api/parents/profile
// @access  Private
const getParentProfile = async (req, res) => {
  try {
    const parent = await Parent.findOne({ user: req.user.id });

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على ملف الوالد'
      });
    }

    res.status(200).json({
      success: true,
      data: parent
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

// @desc    Update parent profile
// @route   PUT /api/parents/profile
// @access  Private
const updateParentProfile = async (req, res) => {
  try {
    const parent = await Parent.findOne({ user: req.user.id });

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على ملف الوالد'
      });
    }

    const allowedFields = [
      'fullName', 'childName', 'disabilityType'
    ];

    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Handle file uploads
    if (req.files?.medicalReports) {
      updates.medicalReports = [
        ...parent.medicalReports,
        ...req.files.medicalReports.map(file => ({
          url: file.path,
          filename: file.originalname
        }))
      ];
    }

    if (req.files?.childPhotos) {
      updates.childPhotos = [
        ...parent.childPhotos,
        ...req.files.childPhotos.map(file => ({
          url: file.path,
          filename: file.originalname
        }))
      ];
    }

    const updatedParent = await Parent.findByIdAndUpdate(
      parent._id,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'تم تحديث الملف بنجاح',
      data: updatedParent
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

// @desc    Get all parents (Admin only)
// @route   GET /api/parents
// @access  Private/Admin
const getParents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;

    const query = status ? { status } : {};

    const parents = await Parent.find(query)
      .populate('user', 'phoneNumber isApproved')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Parent.countDocuments(query);

    res.status(200).json({
      success: true,
      data: parents,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
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

// @desc    Approve/Reject parent registration
// @route   PUT /api/parents/:id/status
// @access  Private/Admin
const updateParentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'الحالة غير صحيحة'
      });
    }

    const parent = await Parent.findById(req.params.id);

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'الوالد غير موجود'
      });
    }

    parent.status = status;
    parent.approvedAt = new Date();
    parent.approvedBy = req.user.id;

    if (status === 'approved') {
      await User.findByIdAndUpdate(parent.user, { isApproved: true });
      // Send approval notification
      // await sendApprovalNotification(parent.email, parent.fullName);
    } else if (status === 'rejected') {
      // Send rejection notification
      // await sendRejectionNotification(parent.email, parent.fullName);
    }

    await parent.save();

    res.status(200).json({
      success: true,
      message: `تم ${status === 'approved' ? 'الموافقة' : 'رفض'} طلب التسجيل`,
      data: parent
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
  registerParent,
  getParentProfile,
  updateParentProfile,
  getParents,
  updateParentStatus,
};