const Employee = require('../model/employeeModel'); // model path
const { ObjectId } = require('mongoose').Types;



//FUNCTION TO CREATE EMPLOYEE
const createEmployee = async(data)=>{
  console.log("DATA:",data);

//TO CHECK EMAIL IS DUPLICATE OR NOT 
  const [emailDetails]= await checkDuplicates(
    data.email,
    data.empId
  );

  console.log("emaildetails",emailDetails);
  if(emailDetails){
    return {
      isDuplicateEmail:true,
    };
  }
    //IF EMAIL IS NOT DUPLICATE PROCEED TO CREATE NE EMPLOYEE
  if(!emailDetails){
    const inputData={
      name:data.name,
      email:data.email,
      password:data.password,
      
    };
    const empData = new Employee(inputData); //CREATE A NEW INSTANCE EMPLOYEE
    const result= await empData.save(); //SAVE THE NEW EMPLOYEE DOC. TO DB
    return result;
  }

  return result;

}

//FUN TO VERIFY DUPLICATE EMPLOYEE
const checkDuplicates = async (email) =>{
  console.log('email',email);
  return await Promise.all([checkDuplicateEmail(email)])
}
///FUN TO VERIFY DUPLICATE EMPLOYEE EMAIL
const checkDuplicateEmail = async (email,organizationId)=>{
  console.log('email',email); 
  return await Employee.findOne(
    {email,isActive:true},
    {_id:1,email:1,name:1,isActive:1}
  )
}
/**FUNC- TO VERIFY DUPLICATE USER */
const checkDuplicateUserEntry = async (data) => {
  console.log("email--", data.email);
  return await checkDuplicateEmail(data.email);
};


// FUNCTION TO DELETE EMPLOYEE 
const deleteEmployee = async (id) => {
  console.log('Deleting Employee ID:', id);

  // Check if id is a valid ObjectId
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
    // console.log("Invalid id");
  }

  // Find and delete the employee
  const result = await Employee.findByIdAndDelete(id); // Use findByIdAndDelete for  delete

  console.log('Deletion Result:', result); // Log the result for debugging
  return result; // Return the deleted document or null if not found
};

// Function to get a specific employee by ID
const getEmployeeById = async (id) => {
  console.log('Fetching employee by ID:', id);
  return await Employee.findById(id);
};

// Function to get all employees
const getAllEmployees = async () => {
  console.log('Fetching all employees');
  return await Employee.find({ isActive: true }); // You might filter by active status or other criteria
};


// Function to update an employee's details using PUT
const updateEmployee = async (id, data) => {
  console.log('Updating employee ID:', id, 'with data:', data);
  return await Employee.findByIdAndUpdate(id, data, { new: true });
};

// Function to partially update an employee's details using PATCH
const patchEmployee = async (id, data) => {
  console.log('Patching employee ID:', id, 'with data:', data);
  return await Employee.findByIdAndUpdate(id, { $set: data }, { new: true });
};








module.exports = {
    createEmployee,
    checkDuplicateUserEntry,
    deleteEmployee,
    getEmployeeById,
    getAllEmployees,
    updateEmployee,
    patchEmployee,
};
