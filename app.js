const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: 5432,
    ssl: {
        rejectUnauthorized: false // Adjust based on NeonTech's SSL configuration
    }
});

// Export the pool object for use in other files
module.exports = pool;
