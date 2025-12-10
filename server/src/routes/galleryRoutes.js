const express = require('express');
const {
  getGallery,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public
router.get('/', getGallery);
router.get('/:id', getGalleryItem);

// Admin (protected)
router.post('/', protect, createGalleryItem);
router.put('/:id', protect, updateGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);

module.exports = router;
