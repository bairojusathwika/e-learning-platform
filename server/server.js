const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
require("dotenv").config();

const router = require("./routes/auth-router");

const app = express();

// Database connection setup
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,  // Make sure your .env file has this variable
    ssl: {
        rejectUnauthorized: false  // Required for NeonDB SSL connections
    }
});

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/auth", router);

// Courses Filter by Category
app.get('/courses/filter', async (req, res) => {
    try {
        const { course_category } = req.query;
        const result = await pool.query(
            'SELECT course_id, course_name, course_category FROM course WHERE course_category = $1',
            [course_category]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Courses Filter by Difficulty
app.get('/courses/difficulty', async (req, res) => {
    try {
        const { course_difficulty } = req.query;
        const result = await pool.query(
            'SELECT course_id, course_name, course_category FROM course WHERE course_difficulty = $1',
            [course_difficulty]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Courses Filter by Instructor
app.get('/courses/instructor', async (req, res) => {
    try {
        const { course_instructor } = req.query;
        const result = await pool.query(
            'SELECT course_id, course_name, course_category FROM course WHERE course_instructor = $1',
            [course_instructor]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

module.exports = pool;
