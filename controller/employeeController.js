const employeeService=require('../Service/employeeService')
const Response = require('../helper/response')
const message = require('../constants/constantMessage')
const { ObjectId } = require('mongoose').Types;

//Function to createaEmployee
const createEmployee= async(req,res)=>{
  try{
    const result=await employeeService.createEmployee(
      req.body,
    );
    console.log("result:",result);
    if(result?.isDuplicateEmail){
      return Response.failResponse(
        req,
        res,
        null,
        message.duplicateEmail,
        200
    )
    }

    return Response.succesResponse(
      req,
      res,
      null,
      message.createdSuccess,
      201
      
    )
    
  }
  catch (error) {
    console.log(error);
  
    return Response.errorResponse(req, res, error);
  }
}

const deleteEmployee = async (req, res) => {
  try {
    // Log request parameters to confirm the correct ID is passed
    console.log('Request Params:', req.params);

    // Call the service function to handle deletion
    const result = await employeeService.deleteEmployee(req.params.id);

    // Check if the employee was found and deleted
    if (!result) {
      console.log('Employee not found.'); // Debugging log
      return Response.failResponse(
        req,
        res,
        null,
        message.deleteFailedRecordNotFound,
        404 // Use 404 for not found
      );
    }

    // Respond with success if the operation was successful
    console.log('Employee deleted:', result); // Debugging log
    return Response.succesResponse(
      req,
      res,
      result, // Return the deleted employee document for confirmation
      message.deleteSuccess,
      200
    );
  } catch (error) {
    console.log('Error occurred:', error.message); // Improved error logging
    // errorLog(error); // Ensure errorLog is defined or replace with console.error

    // Respond with error details
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

// Function to update an employee's details using PUT
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Validate the provided ID
    if (!ObjectId.isValid(id)) {
      return Response.failResponse(
        req,
        res,
        null,
        message.invalidId,
        400 // Bad request for invalid ID
      );
    }

    // Find and update the employee
    const result = await employeeService.updateEmployee(id, {
      name,
      email,
      password,
    });

    if (!result) {
      return Response.failResponse(
        req,
        res,
        null,
        message.updateFailedRecordNotFound,
        404 // Not found
      );
    }

    return Response.succesResponse(
      req,
      res,
      result,
      message.updateSuccess,
      200
    );
  } catch (error) {
    console.log('Error occurred:', error.message);
    return Response.errorResponse(req, res, error);
  }
};

// Function to partially update an employee's details using PATCH
const patchEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate the provided ID
    if (!ObjectId.isValid(id)) {
      return Response.failResponse(
        req,
        res,
        null,
        message.invalidId,
        400 // Bad request for invalid ID
      );
    }

    // Find and partially update the employee
    const result = await employeeService.patchEmployee(id, updateData);

    if (!result) {
      return Response.failResponse(
        req,
        res,
        null,
        message.updateFailedRecordNotFound,
        404 // Not found
      );
    }

    return Response.succesResponse(
      req,
      res,
      result,
      message.updateSuccess,
      200
    );
  } catch (error) {
    console.log('Error occurred:', error.message);
    return Response.errorResponse(req, res, error);
  }
};





module.exports={
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
  patchEmployee
}