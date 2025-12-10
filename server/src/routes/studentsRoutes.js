const express = require('express');
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentsController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public
router.get('/', getStudents);
router.get('/:id', getStudentById);

// Admin (protected)
router.post('/', protect, createStudent);
router.put('/:id', protect, updateStudent);
router.delete('/:id', protect, deleteStudent);

module.exports = router;
