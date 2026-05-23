import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'College Platform API is running!' });
});

// Get all colleges
app.get('/colleges', async (req, res) => {
  try {
    const { search, location, minFees, maxFees, page = 1 } = req.query;
    const limit = 12;
    const offset = (Number(page) - 1) * limit;
    let query = `SELECT * FROM colleges WHERE 1=1`;
    const params: any[] = [];

    if (search) {
      params.push(`%${search}%`);
      query += ` AND name ILIKE $${params.length}`;
    }
    if (location) {
      params.push(`%${location}%`);
      query += ` AND location ILIKE $${params.length}`;
    }
    if (minFees) {
      params.push(minFees);
      query += ` AND fees >= $${params.length}`;
    }
    if (maxFees) {
      params.push(maxFees);
      query += ` AND fees <= $${params.length}`;
    }

    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*)');
    const countResult = await pool.query(countQuery, params);

    params.push(limit, offset);
    query += ` ORDER BY rating DESC LIMIT $${params.length - 1} OFFSET $${params.length}`;

    const result = await pool.query(query, params);
    res.json({ colleges: result.rows, total: countResult.rows[0].count });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get single college
app.get('/colleges/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM colleges WHERE id=$1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Compare colleges
app.get('/compare', async (req, res) => {
  try {
    const ids = (req.query.ids as string).split(',');
    if (ids.length < 2 || ids.length > 3)
      return res.status(400).json({ error: 'Select 2-3 colleges' });
    const result = await pool.query('SELECT * FROM colleges WHERE id = ANY($1::int[])', [ids]);
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Predictor
app.get('/predict', async (req, res) => {
  try {
    const { exam, rank } = req.query;
    const result = await pool.query(
      `SELECT * FROM colleges WHERE exam_accepted ILIKE $1 AND cutoff_rank >= $2 ORDER BY cutoff_rank ASC LIMIT 10`,
      [`%${exam}%`, rank]
    );
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 5000, () => console.log('Server running on port 5000!'));