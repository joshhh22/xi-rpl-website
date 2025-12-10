const pool = require('../db.cjs');

// Helper untuk build query filter
const buildAchievementsFilterQuery = (query) => {
  const { search, category, level, year } = query;
  const conditions = [];
  const values = [];
  let idx = 1;

  if (search) {
    conditions.push(
      `(LOWER(title) LIKE LOWER($${idx}) OR LOWER(student_name) LIKE LOWER($${idx}))`
    );
    values.push(`%${search}%`);
    idx += 1;
  }

  if (category) {
    conditions.push(`category = $${idx}`);
    values.push(category);
    idx += 1;
  }

  if (level) {
    conditions.push(`level = $${idx}`);
    values.push(level);
    idx += 1;
  }

  if (year) {
    conditions.push(`year = $${idx}`);
    values.push(Number(year));
    idx += 1;
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const sql = `
    SELECT
      id,
      title,
      student_name AS "studentName",
      category,
      level,
      year,
      description,
      photo_url AS photo,
      created_at AS "createdAt"
    FROM achievements
    ${whereClause}
    ORDER BY year DESC, id DESC
  `;

  return { sql, values };
};

// GET /api/achievements
const getAchievements = async (req, res, next) => {
  try {
    const { sql, values } = buildAchievementsFilterQuery(req.query);
    const result = await pool.query(sql, values);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// GET /api/achievements/:id
const getAchievementById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
      SELECT
        id,
        title,
        student_name AS "studentName",
        category,
        level,
        year,
        description,
        photo_url AS photo,
        created_at AS "createdAt"
      FROM achievements
      WHERE id = $1
      `,
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: 'Prestasi tidak ditemukan' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// POST /api/achievements  (protected)
const createAchievement = async (req, res, next) => {
  try {
    const { title, studentName, category, level, year, description, photo } = req.body;

    if (!title || !studentName) {
      return res.status(400).json({
        message: 'Judul dan nama siswa wajib diisi.'
      });
    }

    const result = await pool.query(
      `
      INSERT INTO achievements
        (title, student_name, category, level, year, description, photo_url)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7)
      RETURNING
        id,
        title,
        student_name AS "studentName",
        category,
        level,
        year,
        description,
        photo_url AS photo,
        created_at AS "createdAt"
      `,
      [
        title,
        studentName,
        category || null,
        level || null,
        year ? Number(year) : null,
        description || null,
        photo || null
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// PUT /api/achievements/:id  (protected)
const updateAchievement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, studentName, category, level, year, description, photo } = req.body;

    const existing = await pool.query(
      'SELECT id FROM achievements WHERE id=$1',
      [id]
    );
    if (!existing.rows.length) {
      return res.status(404).json({ message: 'Prestasi tidak ditemukan' });
    }

    const result = await pool.query(
      `
      UPDATE achievements
      SET
        title = COALESCE($1, title),
        student_name = COALESCE($2, student_name),
        category = COALESCE($3, category),
        level = COALESCE($4, level),
        year = COALESCE($5, year),
        description = COALESCE($6, description),
        photo_url = COALESCE($7, photo_url)
      WHERE id=$8
      RETURNING
        id,
        title,
        student_name AS "studentName",
        category,
        level,
        year,
        description,
        photo_url AS photo,
        created_at AS "createdAt"
      `,
      [
        title || null,
        studentName || null,
        category || null,
        level || null,
        year ? Number(year) : null,
        description || null,
        photo || null,
        id
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/achievements/:id  (protected)
const deleteAchievement = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await pool.query(
      'SELECT id FROM achievements WHERE id=$1',
      [id]
    );
    if (!existing.rows.length) {
      return res.status(404).json({ message: 'Prestasi tidak ditemukan' });
    }

    await pool.query('DELETE FROM achievements WHERE id=$1', [id]);

    res.json({ message: 'Prestasi berhasil dihapus' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement
};
