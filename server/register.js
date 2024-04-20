const express = require('express');
const neon = require('neon');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // For generating verification tokens
const pool = require('app.js'); // Assuming app.js is in the same directory

const app = express();
const port = process.env.PORT || 5432; // Use environment variable for port

// Neon database connection configuration
const neonConfig = {
  connectionString: 'postgresql://usercourse_owner:npmjDWAZ7C3E@ep-damp-paper-a1k744p4.ap-southeast-1.aws.neon.tech/usercourse?sslmode=require'
};

// Connect to Neon database
const db = neon.connect(neonConfig);

// Registration route handler
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Password validation (add your desired rules)
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}


  // Check for existing user with the same email
  try {
    const existingUser = await db.query.select('*').from('users').where('email', '=', email).single();
    if (existingUser) {
      return res.status(409).json({ message: 'Email address already in use' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }

  // Generate a unique email verification token
  const token = crypto.randomBytes(16).toString('hex');

  // Hash the password securely
  const passwordHash = await hashPassword(password);

  try {
    // Insert user into the database
    await db.query.insert({ name, email, password_hash, email_verification_token: token }).into('users');

    // Send confirmation email with the token
    const emailContent = `
      Hi <span class="math-inline">\{name\},
    Thank you for registering on our application\!
    To activate your account, please click on the following link\:
    \[YOUR\_APPLICATION\_URL\]/verify?token\=</span>{token}

      This link will expire in 24 hours. If you didn't create an account, please ignore this email.

      Sincerely,

      The change Team
    `;

    await transporter.sendMail({
      from: '"change" <your-email@example.com>', // Replace with your sender email
      to: email,
      subject: 'Confirm Your Registration on change',
      text: emailContent
    });

    res.status(201).json({ message: 'Registration successful! Please check your email to verify your account.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error during registration' });
  }
});

// Email verification route handler
app.get('/verify', async (req, res) => {
  const { token } = req.query;

  try {
    // Find user by verification token
    const user = await db.query.select('*').from('users').where('email_verification_token', '=', token).single();
    if (!user) {
      return res.status(400).json({ message: 'Invalid verification token' });
    }

    // Update user as verified, remove token
    await db.query.update({ email_verification_token: null }).from('users').where('id', '=', user.id);

    res.status(200).json({ message: 'Email verification successful!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error during verification' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

