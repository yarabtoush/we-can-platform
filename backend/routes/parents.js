const express = require('express');
const {
  registerParent,
  getParentProfile,
  updateParentProfile,
  getParents,
  updateParentStatus,
} = require('../controllers/parentController');

const { protect, authorize, requireApproval } = require('../middleware/auth');
const {
  uploadMedicalReports,
  uploadChildPhotos,
} = require('../middleware/upload');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Parent registration and profile management
router.post('/register',
  uploadMedicalReports.array('medicalReports', 5),
  uploadChildPhotos.array('childPhotos', 3),
  registerParent
);

router.get('/profile', requireApproval, getParentProfile);
router.put('/profile',
  requireApproval,
  uploadMedicalReports.array('medicalReports', 5),
  uploadChildPhotos.array('childPhotos', 3),
  updateParentProfile
);

// Admin routes
router.get('/', authorize('admin'), getParents);
router.put('/:id/status', authorize('admin'), updateParentStatus);

module.exports = router;