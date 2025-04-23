const axios = require('axios'); // Replace with your chosen library

// Replace with your Resend API key
const apiKey = 're_9gviKzdj_AEYTSP9U4EsdxZYwZ5CHMV3D';

const emailData = {
  from: 'your_sender_email@example.com', // Replace with your sender email
  to: 'recipient@example.com',
  subject: 'Your Email Subject',
  html: 'Your email content in HTML format (optional)',
  text: 'Your email content in plain text format (optional)'
};

const headers = {
  Authorization: `Bearer ${apiKey}` // Set the Authorization header with your API key
};

axios.post('https://api.resend.com/v1/messages', emailData, { headers })
  .then(response => {
    console.log('Email sent successfully:', response.data);
  })
  .catch(error => {
    console.error('Error sending email:', error.response.data);
  });
