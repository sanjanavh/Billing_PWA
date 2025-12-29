import express from 'express';
import cors from 'cors';

import dashboardRoutes from './routes/dashboard.js';
import customersRoutes from './routes/customers.js';
import billingRoutes from './routes/billing.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/dashboard', dashboardRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/billing', billingRoutes);

app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});
