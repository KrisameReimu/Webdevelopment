// resetPassword.js

import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail service
  auth: {
    user: 'eie4432chenchengpproject@gmail.com', // server email address
    pass: 'EIE4432POLYUCHENCHEN' // server email password
  }
});

// POST /reset-password
router.post('/reset-password', async (req, res) => {
  const { email } = req.body;

  // Check if email is empty
  if (email === '') {
    return res.status(400).send({ success: false, message: 'Email address cannot be empty' });
  }

  // Assume we have a user with the email address
  const resetLink = `http://yourwebsite.com/reset-password-form?token=some-unique-token`;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Reset Password',
    html: `<p>Click the link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.send({ success: true, message: 'Reset password email sent. Please check your inbox.' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: 'Reset password email failed to send. Please try again later.' });
  }
});

export default router;
