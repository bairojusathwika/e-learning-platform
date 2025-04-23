require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
//const pool = require('./db');
const pool = new Pool({
  connectionString: 'postgresql://usercourse_owner:npmjDWAZ7C3E@ep-damp-paper-a1k744p4-pooler.ap-southeast-1.aws.neon.tech/usercourse?sslmode=require',
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

module.exports = pool;
