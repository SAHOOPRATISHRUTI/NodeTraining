// authRouter.js
const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const validator = require("../validator/authValidator");

router.post('/login-password', 
    validator.signInByPasswordValidator,
    authController.loginWithPassword); 


router.post('/request-otp', 
    validator.sendOtpValidator, 
    authController.requestOTP);


router.post('/login-otp', 
    validator.verifyOtpValidator,
    authController.loginWithOTP);

module.exports = router; 