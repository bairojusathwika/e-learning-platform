const pool = require('../db');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const home = async (req, res) => {
    res.status(200).json({ message: "Welcome to the E-Learning Platform API" });
};

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters." });
    }

    try {
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            return res.status(409).json({ message: "Email already registered." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const token = crypto.randomBytes(16).toString('hex');

        await pool.query(
            'INSERT INTO users (name, email, password_hash, email_verification_token) VALUES ($1, $2, $3, $4)',
            [name, email, hashedPassword, token]
        );

        const emailContent = `
            Hello ${name},

            Thank you for registering! Verify your account by clicking this link:
            ${process.env.APP_URL}/verify?token=${token}

            This link expires in 24 hours.
        `;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify your email",
            text: emailContent
        });

        res.status(201).json({ message: "Registration successful, check your email to verify." });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Internal server error." });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userResult.rows[0];

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        if (user.email_verification_token) {
            return res.status(403).json({ message: "Please verify your email first." });
        }

        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const profile = async (req, res) => {
    try {
        const { userId } = req.body;
        const userResult = await pool.query('SELECT id, name, email, profile_picture_url FROM users WHERE id = $1', [userId]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(userResult.rows[0]);
    } catch (error) {
        console.error("Profile error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const course = async (req, res) => {
    try {
        const coursesResult = await pool.query(`
            SELECT c.*, u.name as instructor_name 
            FROM courses c 
            JOIN users u ON c.instructor_id = u.id
        `);
        res.status(200).json(coursesResult.rows);
    } catch (error) {
        console.error("Course error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const enrolled = async (req, res) => {
    try {
        const { userId } = req.body;
        const enrolledResult = await pool.query(`
            SELECT c.*, u.name as instructor_name 
            FROM courses c 
            JOIN enrollments e ON c.id = e.course_id 
            JOIN users u ON c.instructor_id = u.id
            WHERE e.user_id = $1
        `, [userId]);
        res.status(200).json(enrolledResult.rows);
    } catch (error) {
        console.error("Enrolled courses error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { home, register, login, profile, course, enrolled };