const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
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
    required: [true, 'تاريخ الحجز مطلوب']
  },
  time: {
    type: String,
    required: [true, 'وقت الحجز مطلوب'],
    enum: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  confirmedAt: Date,
  completedAt: Date
}, {
  timestamps: true
});

// Compound index to prevent double booking
bookingSchema.index({ specialist: 1, date: 1, time: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);