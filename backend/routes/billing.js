import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// invoices
router.get('/invoices', async (req, res) => {
  const result = await pool.query('SELECT * FROM invoices');
  res.json(result.rows);
});

// settlements
router.get('/settlements', async (req, res) => {
  const result = await pool.query(`
    SELECT
      'INV-' || id AS invoice_number,
      amount,
      status,
      issued_date
    FROM invoices
    WHERE status = 'PAID'
  `);
  res.json(result.rows);
});

// ledger
router.get('/ledger', async (req, res) => {
  const result = await pool.query(`
    SELECT
      c.name AS customer,
      'INV-' || i.id AS invoice_number,
      i.amount,
      i.status,
      i.issued_date
    FROM invoices i
    JOIN customers c ON c.id = i.customer_id
  `);
  res.json(result.rows);
});

export default router;  
