const pool = require('../db.cjs');

// GET /api/students
const getStudents = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, name, gender, photo_url AS photo, quote FROM students ORDER BY id'
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// GET /api/students/:id
const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT id, name, gender, photo_url AS photo, quote FROM students WHERE id=$1',
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: 'Siswa tidak ditemukan' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// POST /api/students  (protected)
const createStudent = async (req, res, next) => {
  try {
    const { name, gender, photo, quote } = req.body;

    if (!name || !gender) {
      return res
        .status(400)
        .json({ message: 'Nama dan gender wajib diisi.' });
    }

    const result = await pool.query(
      `INSERT INTO students (name, gender, photo_url, quote)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, gender, photo_url AS photo, quote`,
      [name, gender, photo || null, quote || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// PUT /api/students/:id  (protected)
const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, gender, photo, quote } = req.body;

    const existing = await pool.query(
      'SELECT id FROM students WHERE id=$1',
      [id]
    );

    if (!existing.rows.length) {
      return res.status(404).json({ message: 'Siswa tidak ditemukan' });
    }

    const result = await pool.query(
      `UPDATE students
       SET
         name = COALESCE($1, name),
         gender = COALESCE($2, gender),
         photo_url = COALESCE($3, photo_url),
         quote = COALESCE($4, quote)
       WHERE id=$5
       RETURNING id, name, gender, photo_url AS photo, quote`,
      [name || null, gender || null, photo || null, quote || null, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/students/:id  (protected)
const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await pool.query(
      'SELECT id FROM students WHERE id=$1',
      [id]
    );

    if (!existing.rows.length) {
      return res.status(404).json({ message: 'Siswa tidak ditemukan' });
    }

    await pool.query('DELETE FROM students WHERE id=$1', [id]);

    res.json({ message: 'Siswa berhasil dihapus' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
