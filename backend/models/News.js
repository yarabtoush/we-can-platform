const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'عنوان الخبر مطلوب'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'محتوى الخبر مطلوب']
  },
  excerpt: {
    type: String,
    maxlength: 200
  },
  image: {
    url: String,
    filename: String
  },
  category: {
    type: String,
    enum: ['عام', 'تعليم', 'صحة', 'قانوني', 'تقنية'],
    default: 'عام'
  },
  tags: [String],
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: Date,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('News', newsSchema);