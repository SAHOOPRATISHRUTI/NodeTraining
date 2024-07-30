const express = require("express");
const router = express.Router();
const employeeController = require('../controller/employeeController'); 
const validator = require('../validator/employeeValidator.js'); 

// Check that the controller functions are correctly defined
router.post("/createEmployee", 
    validator.createEmployeeValidator,
    employeeController.createEmployee);

router.get("/employees/:id?",
     employeeController.getEmployees);


module.exports = router;
