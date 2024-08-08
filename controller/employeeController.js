const employeeService=require('../Service/employeeService')
const Response = require('../helper/response')
const message = require('../constants/constantMessage')
const { ObjectId } = require('mongoose').Types;


// Function to create an employee
const createEmployee = async (req, res) => {
  try {
    const { role: userRole } = req.body;

    // Check if the user role is 'ADMIN' or other permitted roles
    // Adjust this condition based on your requirements
    if (!['USER', 'ADMIN'].includes(userRole)) {
      return Response.failResponse(
        req,
        res,
        null,
        "Invalid role value",
        400 // Bad request
      );
    }

    // Pass data to service for creation
    const result = await employeeService.createEmployee(req.body);

    if (result.isDuplicateEmail) {
      return Response.failResponse(
        req,
        res,
        null,
        message.duplicateEmail,
        200
      );
    }

    return Response.succesResponse(
      req,
      res,
      result,
      message.createdSuccess,
      201
    );
  } catch (error) {
    console.error('Error creating employee:', error.message);
    return Response.errorResponse(req, res, error);
  }
};



// Function to get all employees or a specific employee by ID
const getEmployees = async (req, res) => {
  try {
    const { id } = req.params;

    let result;
    if (id) {
      // Check if the provided ID is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        return Response.failResponse(
          req,
          res,
          null,
          message.invalidId,
          400 // Bad request for invalid ID
        );
      }
      // Fetch the employee by ID
      result = await employeeService.getEmployeeById(id);

      if (!result) {
        // If no employee is found, return a not found response
        return Response.failResponse(
          req,
          res,
          null,
          message.employeeNotFound,
          404
        );
      }
    } else {
      // Fetch all employees if no specific ID is provided
      result = await employeeService.getAllEmployees();
    }

    // Return the successful response with fetched data
    return Response.succesResponse(req, res, result, message.fetchSuccess, 200);
  } catch (error) {
    console.log('Error occurred:', error.message);
    // Return an error response if an exception is caught
    return Response.errorResponse(req, res, error);
  }
};


  const listEmployee = async (req, res) => {
    try {
      const result = await employeeService.listEmployee(req.body, req.query);
      if (result.totalCount === 0) {
        return Response.failResponse(
          req,
          res,
          null,
          message.recordsNotFound,
          200
        );
      }
  
      return Response.succesResponse(
        req,
        res,
        result,
        message.recordsFound,
        200
      );
    } catch (error) {
      console.error("Error in listEmployee controller:", error);
      return Response.errorResponse(req, res, error);
    }
  };

  




module.exports={
  createEmployee,
 
  getEmployees,
  listEmployee,
  
}