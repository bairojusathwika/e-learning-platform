require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function seedDatabase() {
    try {
        // Clean up existing data (in correct order due to foreign key constraints)
        console.log('Cleaning up existing data...');
        await pool.query('DELETE FROM enrollments');
        await pool.query('DELETE FROM courses');
        await pool.query('DELETE FROM users');

        console.log('Inserting new data...');
        // Insert sample users
        const hashedPassword = await bcrypt.hash('password123', 10);
        const usersResult = await pool.query(`
            INSERT INTO users (name, email, password_hash) VALUES
            ('John Doe', 'john@example.com', $1),
            ('Jane Smith', 'jane@example.com', $1),
            ('Bob Wilson', 'bob@example.com', $1)
            RETURNING id;
        `, [hashedPassword]);

        const userIds = usersResult.rows.map(row => row.id);

        // Insert sample courses
        const coursesResult = await pool.query(`
            INSERT INTO courses (
                title, 
                course_name, 
                description, 
                course_category, 
                course_difficulty, 
                course_instructor, 
                instructor_id, 
                price
            ) VALUES
            (
                'Web Development Fundamentals',
                'Web Dev 101',
                'Learn the basics of web development including HTML, CSS, and JavaScript',
                'Programming',
                'Beginner',
                'John Doe',
                $1,
                99.99
            ),
            (
                'Advanced Python Programming',
                'Python Advanced',
                'Master Python with advanced concepts and real-world applications',
                'Programming',
                'Advanced',
                'Jane Smith',
                $2,
                149.99
            ),
            (
                'Digital Marketing Essentials',
                'Digital Marketing',
                'Comprehensive guide to modern digital marketing strategies',
                'Marketing',
                'Intermediate',
                'Bob Wilson',
                $3,
                129.99
            )
            RETURNING id;
        `, [userIds[0], userIds[1], userIds[2]]);

        const courseIds = coursesResult.rows.map(row => row.id);

        // Insert sample enrollments (one query per enrollment for clarity)
        await pool.query(`
            INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2)  -- John enrolled in Jane's Python course
        `, [userIds[0], courseIds[1]]);

        await pool.query(`
            INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2)  -- Jane enrolled in Bob's Marketing course
        `, [userIds[1], courseIds[2]]);

        await pool.query(`
            INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2)  -- Bob enrolled in John's Web Dev course
        `, [userIds[2], courseIds[0]]);

        console.log('Sample data inserted successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await pool.end();
    }
}

seedDatabase(); 