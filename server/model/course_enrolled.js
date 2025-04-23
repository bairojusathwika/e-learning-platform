const pool = require('../app');

// Enroll a user in a course
const enrollUser = async (userId, courseId) => {
    const result = await pool.query(
        `INSERT INTO enrolled (user_id, course_id) 
         VALUES ($1, $2) RETURNING *`,
        [userId, courseId]
    );
    return result.rows[0];
};

// Get enrolled courses for a user
const getEnrolledCourses = async (userId) => {
    const result = await pool.query(
        `SELECT course_id FROM enrolled WHERE user_id = $1`,
        [userId]
    );
    return result.rows;
};

module.exports = { enrollUser, getEnrolledCourses };
