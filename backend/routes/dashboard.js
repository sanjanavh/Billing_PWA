import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COALESCE(SUM(amount), 0) AS total_revenue,
        SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) AS pending_invoices,
        (SELECT COUNT(*) FROM customers) AS total_customers,
        COUNT(*) AS total_invoices
      FROM invoices
    `);

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Dashboard query failed' });
  }
});

export default router;   
