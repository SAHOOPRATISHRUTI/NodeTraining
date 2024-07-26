const employeeService=require('../Service/employeeService')
const Response = require('../helper/response')
const message = require('../constants/constantMessage')


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


module.exports={
  createEmployee,
  deleteEmployee,
}