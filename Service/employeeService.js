const Employee = require('../model/employeeModel'); // model path
const { ObjectId } = require('mongoose').Types;
const commonHelper = require('../helper/commonHelper'); // Import commonHelper

// FUNCTION TO CREATE EMPLOYEE
const createEmployee = async (data) => {
  console.log("DATA:", data);

  // TO CHECK EMAIL IS DUPLICATE OR NOT
  const [emailDetails] = await checkDuplicates(data.email);

  console.log("emailDetails:", emailDetails);

  if (emailDetails) {
    return {
      isDuplicateEmail: true,
    };
  }

  // IF EMAIL IS NOT DUPLICATE PROCEED TO CREATE NEW EMPLOYEE
  if (!emailDetails) {
    try {
      // Hash the password using commonHelper
      const hashedPassword = await commonHelper.generateHashPassword(data.password);

      const inputData = {
        name: data.name,
        email: data.email,
        password: hashedPassword, // Store the hashed password
      };

      const empData = new Employee(inputData); // CREATE A NEW INSTANCE OF EMPLOYEE
      const result = await empData.save(); // SAVE THE NEW EMPLOYEE DOC. TO DB

      return result;
    } catch (error) {
      console.error("Error creating employee:", error);
      throw error;
    }
  }

  return null;
};

// FUN TO VERIFY DUPLICATE EMPLOYEE
const checkDuplicates = async (email) => {
  console.log('email', email);
  return await Promise.all([checkDuplicateEmail(email)]);
}

// FUN TO VERIFY DUPLICATE EMPLOYEE EMAIL
const checkDuplicateEmail = async (email) => {
  console.log('email', email);
  return await Employee.findOne(
    { email, isActive: true },
    { _id: 1, email: 1, name: 1, isActive: 1 }
  );
}

// FUNCTION TO DELETE EMPLOYEE
const deleteEmployee = async (id) => {
  console.log('Deleting Employee ID:', id);

  // Check if id is a valid ObjectId
  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
  }

  // Find and delete the employee
  const result = await Employee.findByIdAndDelete(id);

  console.log('Deletion Result:', result);
  return result;
};

// Function to get a specific employee by ID
const getEmployeeById = async (id) => {
  console.log('Fetching employee by ID:', id);
  return await Employee.findById(id);
};

// Function to get all employees
const getAllEmployees = async () => {
  console.log('Fetching all employees');
  return await Employee.find({ isActive: true });
}

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
  checkDuplicateUserEntry: checkDuplicates,
  deleteEmployee,
  getEmployeeById,
  getAllEmployees,
  updateEmployee,
  patchEmployee,
};
