System Connections (Frontend, Backend & Database)

📁 Project Structure
billing_pwa/
├── frontend/   → Angular admin dashboard (UI layer)
├── backend/    → Node.js + Express REST API
└── database/   → PostgreSQL database schema


--Frontend → Backend Connection

The frontend is built using Angular and handles only the user interface.

It communicates with the backend through HTTP REST API calls.

API calls are made via Angular services to endpoints such as:

/api/dashboard

/api/customers

/api/billing/invoices

/api/billing/settlements

/api/billing/ledger



--Backend → Database Connection

The backend is built using Node.js and Express.

It connects to PostgreSQL using a pg connection pool.

Database configuration is centralized in:

backend/db.js

Database credentials are securely loaded using environment variables from a .env file.

All database operations are performed through SQL queries inside route files.


--Database Schema Location

The database schema is stored in the database folder.

Schema file:

database/schema.sql

This file defines all tables and relationships used by the backend.

The actual database is not committed to GitHub; only the schema is version-controlled.

To create and initialize the database:

create db billing_pwa
psql -U postgres -d billing_pwa -f database/schema.sql
