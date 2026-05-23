import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.query('SELECT NOW()')
  .then(r => { console.log('Connected!', r.rows); process.exit(); })
  .catch(e => { console.log('Error:', e.message); process.exit(); });