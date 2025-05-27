require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const helmet = require('helmet');

// Database configuration
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }  // Required for Neon
});

const router = require('./routes/auth-router');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', router);

// Generic course filter function
const filterCourses = async (filterType, filterValue) => {
    const validFilters = {
        category: 'course_category',
        difficulty: 'course_difficulty',
        instructor: 'course_instructor'
    };

    if (!validFilters[filterType]) {
        throw new Error('Invalid filter type');
    }

    const columnName = filterType === 'category' ? 'course_category' :
        filterType === 'difficulty' ? 'course_difficulty' :
            'course_instructor';

    const query = `
        SELECT id, title, course_name, description, ${columnName}, price 
        FROM courses 
        WHERE ${columnName} = $1
    `;

    return pool.query(query, [filterValue]);
};

// Courses Filter endpoints
app.get('/api/courses/:filterType', async (req, res, next) => {
    try {
        const { filterType } = req.params;
        const filterValue = req.query[filterType];

        if (!filterValue) {
            return res.status(400).json({
                error: `Missing required query parameter: ${filterType}`
            });
        }

        const result = await filterCourses(filterType, filterValue);
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { pool, app };
