const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: [true, 'الاسم الكامل مطلوب'],
    trim: true
  },
  nationalId: {
    type: String,
    required: [true, 'رقم الهوية مطلوب'],
    unique: true,
    match: [/^\d{10}$/, 'رقم الهوية يجب أن يكون 10 أرقام']
  },
  childName: {
    type: String,
    required: [true, 'اسم الطفل مطلوب'],
    trim: true
  },
  childNationalId: {
    type: String,
    required: [true, 'رقم هوية الطفل مطلوب'],
    match: [/^\d{10}$/, 'رقم هوية الطفل يجب أن يكون 10 أرقام']
  },
  disabilityType: {
    type: String,
    required: [true, 'نوع الإعاقة مطلوب'],
    enum: ['ذهنية', 'جسدية', 'سمعية', 'بصرية', 'تخاطب', 'سلوكية', 'متعددة']
  },
  medicalReports: [{
    url: String,
    filename: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  childPhotos: [{
    url: String,
    filename: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  electronicSignature: {
    url: String,
    signedAt: Date
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  approvedAt: Date,
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Parent', parentSchema);