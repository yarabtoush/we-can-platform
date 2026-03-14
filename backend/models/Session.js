const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parent',
    required: true
  },
  specialist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialist',
    required: true
  },
  date: {
    type: Date,
    required: [true, 'تاريخ الجلسة مطلوب']
  },
  duration: {
    type: Number, // in minutes
    default: 60
  },
  notes: {
    type: String,
    maxlength: 1000
  },
  progress: {
    type: String,
    enum: ['ممتاز', 'جيد', 'متوسط', 'ضعيف', 'لم يحضر']
  },
  goals: [String],
  nextSessionPlan: String,
  attachments: [{
    url: String,
    filename: String,
    type: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Session', sessionSchema);