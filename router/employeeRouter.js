const express = require("express");
const router = express.Router();
const employeeController = require('../controller/employeeController');

// Define the route for creating an employee
router.post("/createEmployee", employeeController.createEmployee);
router.delete("/deleteEmployee/:id",employeeController.deleteEmployee)
module.exports = router;
