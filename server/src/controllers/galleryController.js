const pool = require('../db.cjs');

// GET /api/gallery
const getGallery = async (req, res, next) => {
  try {
    const { category } = req.query;

    const baseSql = `
      SELECT
        id,
        url,
        category,
        caption,
        taken_at AS "takenAt"
      FROM gallery
    `;

    let sql = baseSql;
    const values = [];

    if (category) {
      sql += ' WHERE category = $1';
      values.push(category);
    }

    sql += ' ORDER BY id DESC';

    const result = await pool.query(sql, values);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// GET /api/gallery/:id
const getGalleryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
      SELECT
        id,
        url,
        category,
        caption,
        taken_at AS "takenAt"
      FROM gallery
      WHERE id = $1
      `,
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: 'Foto tidak ditemukan' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// POST /api/gallery  (protected)
const createGalleryItem = async (req, res, next) => {
  try {
    const { url, category, caption, takenAt } = req.body;

    if (!url || !category) {
      return res
        .status(400)
        .json({ message: 'URL dan kategori wajib diisi.' });
    }

    const result = await pool.query(
      `
      INSERT INTO gallery (url, category, caption, taken_at)
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        url,
        category,
        caption,
        taken_at AS "takenAt"
      `,
      [url, category, caption || null, takenAt || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// PUT /api/gallery/:id  (protected)
const updateGalleryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { url, category, caption, takenAt } = req.body;

    const existing = await pool.query(
      'SELECT id FROM gallery WHERE id=$1',
      [id]
    );
    if (!existing.rows.length) {
      return res.status(404).json({ message: 'Foto tidak ditemukan' });
    }

    const result = await pool.query(
      `
      UPDATE gallery
      SET
        url = COALESCE($1, url),
        category = COALESCE($2, category),
        caption = COALESCE($3, caption),
        taken_at = COALESCE($4, taken_at)
      WHERE id=$5
      RETURNING
        id,
        url,
        category,
        caption,
        taken_at AS "takenAt"
      `,
      [url || null, category || null, caption || null, takenAt || null, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/gallery/:id  (protected)
const deleteGalleryItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await pool.query(
      'SELECT id FROM gallery WHERE id=$1',
      [id]
    );
    if (!existing.rows.length) {
      return res.status(404).json({ message: 'Foto tidak ditemukan' });
    }

    await pool.query('DELETE FROM gallery WHERE id=$1', [id]);

    res.json({ message: 'Foto berhasil dihapus' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getGallery,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
};
