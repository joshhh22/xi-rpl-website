const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/xi_rpl';

const pool = new Pool({
  connectionString,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

module.exports = pool;
