const express = require("express");
const router = express.Router();
const employeeController = require('../controller/employeeController'); 
const validator = require('../validator/employeeValidator.js'); 
const authMiddleware = require('../middlewares/authMiddleware.js')
// Check that the controller functions are correctly defined
router.post("/createEmployee", 
    validator.createEmployeeValidator,
    employeeController.createEmployee);

router.get("/employees/:id",
    authMiddleware.verifyUserToken,
     employeeController.getEmployees);


module.exports = router;
