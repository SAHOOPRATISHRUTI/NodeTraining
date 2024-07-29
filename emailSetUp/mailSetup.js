const nodemailer = require('nodemailer');

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com', 
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: 'pratishrutisahoo7@gmail.com',
    pass: 'qtocksdefwbqyvup',
  },
});

// Function to create mail options
const mailOptions = (email, subject, html) => ({
  from: 'pratishrutisahoo7@gmail.com',
  to: email, 
  subject: subject || 'Register Success', 
  html: html || '<b>Welcome to Demo App !!! :</b>', 
});

// Send email function
const sendEmail = async (email, emailSubject, mailData) => {
  const mailOptionsInfo = {
    from: mailOptions.from,
    to: email,
    subject: emailSubject,
    html: mailData,
  };
  console.log(mailOptionsInfo);
  const isSuccess = await transporter.sendMail(mailOptionsInfo);
  console.log("isSuccess-------------", isSuccess);
  return isSuccess;
};

// Exporting the sendEmail function and mailOptions
module.exports = {
  sendEmail,
  mailOptions,
};
