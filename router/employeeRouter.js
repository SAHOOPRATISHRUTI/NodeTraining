const express = require("express");
const router = express.Router();
const employeeController = require('../controller/employeeController');


router.post("/createEmployee", employeeController.createEmployee);
router.delete("/deleteEmployee/:id",employeeController.deleteEmployee);
router.get("/employees/:id?",employeeController.getEmployees);
router.put("/employees/:id",employeeController.updateEmployee)
router.patch('/employees/:id', employeeController.patchEmployee);
module.exports = router;
