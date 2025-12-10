const express = require('express');
const {
  getStructure,
  getStructureById,
  createStructureItem,
  updateStructureItem,
  deleteStructureItem
} = require('../controllers/structureController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public
router.get('/', getStructure);
router.get('/:id', getStructureById);

// Admin (protected)
router.post('/', protect, createStructureItem);
router.put('/:id', protect, updateStructureItem);
router.delete('/:id', protect, deleteStructureItem);

module.exports = router;
