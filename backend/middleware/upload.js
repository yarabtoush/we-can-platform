const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for different file types
const createStorage = (folder) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folder,
      allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
      transformation: folder === 'images' ? [{ width: 1000, height: 1000, crop: 'limit' }] : [],
    },
  });
};

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
  const extname = allowedTypes.test(file.originalname.toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('نوع الملف غير مدعوم'));
  }
};

// Upload middlewares
const uploadMedicalReports = multer({
  storage: createStorage('medical-reports'),
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

const uploadChildPhotos = multer({
  storage: createStorage('child-photos'),
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const uploadCertificates = multer({
  storage: createStorage('certificates'),
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

const uploadCV = multer({
  storage: createStorage('cv'),
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const uploadWorkshopImages = multer({
  storage: createStorage('workshop-images'),
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const uploadNewsImages = multer({
  storage: createStorage('news-images'),
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const uploadProductFiles = multer({
  storage: createStorage('products'),
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

const uploadSessionAttachments = multer({
  storage: createStorage('session-attachments'),
  fileFilter: fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

const uploadComplaintAttachments = multer({
  storage: createStorage('complaints'),
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

module.exports = {
  uploadMedicalReports,
  uploadChildPhotos,
  uploadCertificates,
  uploadCV,
  uploadWorkshopImages,
  uploadNewsImages,
  uploadProductFiles,
  uploadSessionAttachments,
  uploadComplaintAttachments,
};