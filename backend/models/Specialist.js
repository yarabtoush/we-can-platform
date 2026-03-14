const mongoose = require('mongoose');

const specialistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'الاسم مطلوب'],
    trim: true
  },
  specialization: {
    type: String,
    required: [true, 'التخصص مطلوب'],
    enum: ['تخاطب', 'علاج نفسي', 'تأهيل جسدي', 'تعليم خاص', 'علاج سلوكي', 'علاج وظيفي', 'علاج سمعي']
  },
  certifications: [{
    title: String,
    issuer: String,
    year: Number,
    document: {
      url: String,
      filename: String
    }
  }],
  bio: {
    type: String,
    maxlength: 500
  },
  cv: {
    url: String,
    filename: String,
    uploadedAt: Date
  },
  location: {
    city: {
      type: String,
      required: [true, 'المدينة مطلوبة'],
      enum: ['عمان', 'إربد', 'الزرقاء', 'المفرق', 'جرش', 'عجلون', 'مادبا', 'الكرك', 'الطفيلة', 'معان', 'العقبة']
    },
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  phoneNumber: {
    type: String,
    required: [true, 'رقم الهاتف مطلوب']
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
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
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for location queries
specialistSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('Specialist', specialistSchema);