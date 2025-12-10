const pool = require('../db.cjs');

// GET /api/structure
const getStructure = async (req, res, next) => {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        position,
        name,
        photo_url AS photo,
        motto,
        order_no AS "orderNo"
      FROM class_structure
      ORDER BY order_no NULLS LAST, id
      `
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// GET /api/structure/:id
const getStructureById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
      SELECT
        id,
        position,
        name,
        photo_url AS photo,
        motto,
        order_no AS "orderNo"
      FROM class_structure
      WHERE id = $1
      `,
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: 'Pengurus tidak ditemukan' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// POST /api/structure  (protected)
const createStructureItem = async (req, res, next) => {
  try {
    const { position, name, photo, motto, orderNo } = req.body;

    if (!position || !name) {
      return res.status(400).json({
        message: 'Posisi dan nama wajib diisi.'
      });
    }

    const result = await pool.query(
      `
      INSERT INTO class_structure (position, name, photo_url, motto, order_no)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        position,
        name,
        photo_url AS photo,
        motto,
        order_no AS "orderNo"
      `,
      [
        position,
        name,
        photo || null,
        motto || null,
        orderNo ? Number(orderNo) : null
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// PUT /api/structure/:id  (protected)
const updateStructureItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { position, name, photo, motto, orderNo } = req.body;

    const existing = await pool.query(
      'SELECT id FROM class_structure WHERE id=$1',
      [id]
    );
    if (!existing.rows.length) {
      return res.status(404).json({ message: 'Pengurus tidak ditemukan' });
    }

    const result = await pool.query(
      `
      UPDATE class_structure
      SET
        position = COALESCE($1, position),
        name = COALESCE($2, name),
        photo_url = COALESCE($3, photo_url),
        motto = COALESCE($4, motto),
        order_no = COALESCE($5, order_no)
      WHERE id = $6
      RETURNING
        id,
        position,
        name,
        photo_url AS photo,
        motto,
        order_no AS "orderNo"
      `,
      [
        position || null,
        name || null,
        photo || null,
        motto || null,
        orderNo ? Number(orderNo) : null,
        id
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/structure/:id  (protected)
const deleteStructureItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await pool.query(
      'SELECT id FROM class_structure WHERE id=$1',
      [id]
    );
    if (!existing.rows.length) {
      return res.status(404).json({ message: 'Pengurus tidak ditemukan' });
    }

    await pool.query('DELETE FROM class_structure WHERE id=$1', [id]);

    res.json({ message: 'Pengurus berhasil dihapus' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getStructure,
  getStructureById,
  createStructureItem,
  updateStructureItem,
  deleteStructureItem
};
