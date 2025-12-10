const notFound = (req, res, next) => {
    const error = new Error(`Route tidak ditemukan - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  
    res.status(statusCode).json({
      message: err.message || 'Terjadi kesalahan pada server.',
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
  };
  
  module.exports = {
    notFound,
    errorHandler
  };
  