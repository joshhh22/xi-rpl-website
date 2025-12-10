const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// User admin sementara hard-coded
const adminUser = {
  id: 1,
  name: 'Admin XI RPL',
  email: 'admin@xirpl.com',
  passwordHash: bcrypt.hashSync('admin123', 10) // password: admin123
};

// POST /api/auth/login
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Email dan password harus diisi.' });
  }

  if (email !== adminUser.email) {
    return res.status(401).json({ message: 'Email atau password salah.' });
  }

  const isMatch = bcrypt.compareSync(password, adminUser.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Email atau password salah.' });
  }

  const token = generateToken(adminUser.id);

  return res.json({
    token,
    user: {
      id: adminUser.id,
      name: adminUser.name,
      email: adminUser.email
    }
  });
};

// GET /api/auth/me
const getProfile = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Tidak terautentikasi.' });
  }

  return res.json({
    id: adminUser.id,
    name: adminUser.name,
    email: adminUser.email
  });
};

module.exports = {
  login,
  getProfile
};
