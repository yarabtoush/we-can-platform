const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'عنوان الورشة مطلوب'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'وصف الورشة مطلوب'],
    maxlength: 1000
  },
  date: {
    type: Date,
    required: [true, 'تاريخ الورشة مطلوب']
  },
  startTime: {
    type: String,
    required: [true, 'وقت البداية مطلوب']
  },
  endTime: {
    type: String,
    required: [true, 'وقت النهاية مطلوب']
  },
  location: {
    type: {
      type: String,
      enum: ['physical', 'online'],
      required: true
    },
    address: String,
    onlineLink: String,
    city: String
  },
  capacity: {
    type: Number,
    default: 50
  },
  registeredCount: {
    type: Number,
    default: 0
  },
  registrations: [{
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Parent'
    },
    registeredAt: {
      type: Date,
      default: Date.now
    }
  }],
  instructor: {
    name: String,
    bio: String,
    specialization: String
  },
  image: {
    url: String,
    filename: String
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Workshop', workshopSchema);