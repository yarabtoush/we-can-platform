const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'نوع الشكوى مطلوب'],
    enum: ['شكوى', 'اقتراح', 'استفسار', 'ملاحظة']
  },
  subject: {
    type: String,
    required: [true, 'موضوع الشكوى مطلوب'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'رسالة الشكوى مطلوبة'],
    maxlength: 1000
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userType: {
    type: String,
    enum: ['parent', 'specialist'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_review', 'resolved', 'closed'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  response: {
    message: String,
    respondedAt: Date,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  attachments: [{
    url: String,
    filename: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Complaint', complaintSchema);