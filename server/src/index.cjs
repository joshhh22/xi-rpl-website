const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ROUTES
const studentsRoutes = require('./routes/studentsRoutes');
const structureRoutes = require('./routes/structureRoutes');
const achievementsRoutes = require('./routes/achievementsRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const authRoutes = require('./routes/authRoutes');

// HEALTH CHECK ROOT
app.get('/', (req, res) => {
  res.json({ message: 'XI RPL API online' });
});

// API PREFIX
app.use('/api/students', studentsRoutes);
app.use('/api/structure', structureRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/auth', authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: `Route tidak ditemukan - ${req.path}`,
    stack: '🥞'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`XI RPL API berjalan di port ${PORT}`);
});
