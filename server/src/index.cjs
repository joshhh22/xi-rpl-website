// server/src/index.cjs - CommonJS

const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Routes
const studentsRoutes = require('./routes/studentsRoutes');
const structureRoutes = require('./routes/structureRoutes');
const achievementsRoutes = require('./routes/achievementsRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Error middleware
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

// Middleware dasar
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Static untuk file upload
// __dirname di CJS sudah tersedia
const uploadsDir = path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsDir));





// dst...


// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'XI RPL API berjalan.',
    uptime: process.uptime()
  });
});

// Routes API
app.use('/api/students', studentsRoutes);
app.use('/api/structure', structureRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`XI RPL API berjalan di port ${PORT}`);
});



