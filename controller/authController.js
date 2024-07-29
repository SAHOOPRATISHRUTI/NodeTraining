const authService = require('../Service/authService');
const Response = require('../helper/response');
const message = require('../constants/constantMessage');
const Employee = require('../model/employeeModel');



// Function to handle login with password
const loginWithPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginWithPassword(email, password);

    if (result.success) {
      return Response.succesResponse(
        req,
        res,
        { employee: result.employee },
        message.loginSuccess,
        200
      );
    } else {
      return Response.failResponse(
        req,
        res,
        null,
        result.message,
        401 // Unauthorized status for incorrect credentials
      );
    }
  } catch (error) {
    console.error('Error during login:', error);
    return Response.errorResponse(req, res, error);
  }
};

// Route to request OTP
const requestOTP = async (req, res) => {
  const { email } = req.body;
  
  try {
    const result = await authService.generateOTP(email);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'OTP has been sent to your email',
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    console.error('Error requesting OTP:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while requesting OTP',
    });
  }
};

// Route to handle login with OTP
const loginWithOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const result = await authService.verifyOTP(email, otp);

    if (result.success) {
      const employee = await Employee.findOne({ email, isActive: true });

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        employee,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during OTP verification',
    });
  }
};


module.exports = {
  loginWithPassword,
  requestOTP,
  loginWithOTP
};
