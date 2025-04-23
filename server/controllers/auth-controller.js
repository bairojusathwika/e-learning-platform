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


const profile = async (req,res) =>{
    try {
        console.log(req.body)
        res.status(200).json({message: req.body})
    } catch (error) {
        console.log(error);
    }
}

const course = async(req,res) =>{
    try {
        console.log(req.body)
        res.status(200).json({message: req.body});
    } catch (error) {
        console.log(error);
    }
}

const enrolled = (req,res) =>{
    try {
        console.log(req.body)
        res.status(200).json({message: req.body})
    } catch (error) {
        console.log(error);
    }
}


module.exports = {home,register,login,profile,course,enrolled};