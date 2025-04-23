const pool = require('../app');

// Create a new course
const createCourse = async (course) => {
    const { name, category, difficulty, price, instructor, popularity } = course;
    const result = await pool.query(
        `INSERT INTO course (course_name, course_category, course_difficulty, 
         course_price, course_instructor, course_popularity) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [name, category, difficulty, price, instructor, popularity]
    );
    return result.rows[0];
};

// Fetch courses by category
const getCoursesByCategory = async (category) => {
    const result = await pool.query(
        'SELECT * FROM course WHERE course_category = $1',
        [category]
    );
    return result.rows;
};

module.exports = { createCourse, getCoursesByCategory };
