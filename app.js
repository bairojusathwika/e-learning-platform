require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// Database configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }  // Required for Neon
});

const router = require('./auth-router');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/auth', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export both pool and app for use in other files
module.exports = { pool, app };
