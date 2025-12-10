const express = require('express');
const {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement
} = require('../controllers/achievementsController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public
router.get('/', getAchievements);
router.get('/:id', getAchievementById);

// Admin (protected)
router.post('/', protect, createAchievement);
router.put('/:id', protect, updateAchievement);
router.delete('/:id', protect, deleteAchievement);

module.exports = router;
