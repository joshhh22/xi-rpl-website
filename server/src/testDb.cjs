const pool = require('./db.cjs');

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Koneksi DB berhasil:', res.rows[0]);
  } catch (err) {
    console.error('Koneksi DB gagal:', err.message);
  } finally {
    pool.end();
  }
})();
