const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'عنوان المنتج مطلوب'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'وصف المنتج مطلوب']
  },
  price: {
    type: Number,
    required: [true, 'سعر المنتج مطلوب'],
    min: 0
  },
  category: {
    type: String,
    required: [true, 'فئة المنتج مطلوبة'],
    enum: ['خطط تعليمية', 'خرائط سلوكية', 'أوراق عمل', 'كتب إلكترونية', 'أدوات تقييم']
  },
  file: {
    url: String,
    filename: String,
    size: Number,
    type: String
  },
  image: {
    url: String,
    filename: String
  },
  preview: {
    url: String,
    filename: String
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  downloads: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);