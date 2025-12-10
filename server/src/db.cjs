const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const connectionString =
  process.env.DATABASE_URL ||
  'postgres://postgres:password@localhost:5432/xi_rpl';

const pool = new Pool({
  connectionString,
  ssl: connectionString.includes('neon.tech')
    ? { rejectUnauthorized: false }
    : false
});

module.exports = pool;
