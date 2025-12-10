const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const secret = process.env.JWT_SECRET || 'dev_secret_xi_rpl';
      const decoded = jwt.verify(token, secret);

      // Sementara hanya simpan id
      req.user = { id: decoded.id };
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token tidak valid.' });
    }
  }

  return res.status(401).json({ message: 'Tidak ada token, akses ditolak.' });
};

module.exports = {
  protect
};
