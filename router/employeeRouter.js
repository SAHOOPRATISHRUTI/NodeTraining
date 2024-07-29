const express = require("express");
const router = express.Router();
const employeeController = require('../controller/employeeController'); // Ensure correct path
const authController=require('../controller/authController')
// Check that the controller functions are correctly defined
router.post("/createEmployee", employeeController.createEmployee);
router.get("/employees/:id?", employeeController.getEmployees);
router.post('/login-password', authController.loginWithPassword); // Ensure this is correctly defined



// Route to request OTP
router.post('/request-otp', authController.requestOTP);

// Route to handle login with OTP
router.post('/login-otp', authController.loginWithOTP);

module.exports = router;
