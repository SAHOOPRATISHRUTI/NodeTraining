const bcrypt = require('bcrypt');
const Employee = require('../model/employeeModel');
const OTP = require('../model/otpModel'); // Assuming you have an OTP model
const crypto = require('crypto');
const { sendEmail } = require('../emailSetup/mailsetUp');

// Function to log in an employee using password
const loginWithPassword = async (email, password) => {
  try {
    const employee = await Employee.findOne({ email, isActive: true });

    if (!employee) {
      return { success: false, message: 'Email or password is incorrect' };
    }

    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) {
      return { success: false, message: 'Email or password is incorrect' };
    }

    return { success: true, message: 'Login successful', employee };
  } catch (error) {
    throw error;
  }
};

// Function to generate and store OTP
const generateOTP = async (email) => {
  // Check if the employee exists
  const employee = await Employee.findOne({ email, isActive: true });

  if (!employee) {
    return { success: false, message: 'Email not found in employee records' };
  }

  const currentTime = Date.now();

  // Remove expired OTPs
  await OTP.deleteMany({ email, expiresAt: { $lt: currentTime } });

  // Check how many OTPs have been sent recently
  const recentOTPs = await OTP.find({ 
    email,
    expiresAt: { $gte: currentTime } // Only consider non-expired OTPs
  });

  if (recentOTPs.length >= 3) {
    return { success: false, message: 'OTP request limit reached. Please try again later.' };
  }

  const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
  const expiresAt = currentTime + 5 * 60 * 1000; // OTP expires in 5 minutes

  // Save OTP to the database
  const otpEntry = new OTP({
    email,
    otp,
    expiresAt,
  });

  await otpEntry.save();

  // Send OTP to email
  const emailSubject = 'Your OTP for Demo App';
  const mailData = `<b>Your OTP is:</b> ${otp}`;

  try {
    const emailSent = await sendEmail(email, emailSubject, mailData);
    if (emailSent.accepted && emailSent.accepted.length > 0) {
      return { success: true, message: 'OTP sent successfully' };
    } else {
      return { success: false, message: 'Failed to send OTP' };
    }
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return { success: false, message: 'Error sending OTP email' };
  }
};


// Function to verify OTP
const verifyOTP = async (email, otp) => {
  // Find the OTP entry for the given email and OTP
  const otpEntry = await OTP.findOne({ email, otp });

  if (!otpEntry) {
    return { success: false, message: 'Invalid OTP' };
  }

  // Check if OTP has expired
  if (new Date() > otpEntry.expiresAt) {
    return { success: false, message: 'OTP has expired' };
  }

  return { success: true, message: 'OTP verified successfully' };
};




module.exports = {
  loginWithPassword,
  generateOTP,
  verifyOTP
};
