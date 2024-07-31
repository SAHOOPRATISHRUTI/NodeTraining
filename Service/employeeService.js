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

const verifyEmployee = async (email) => {
  console.log("empId-----------", email);
  return await Employee.findOne(
    { email, isActive: true },
    {
      _id: 1,
      email: 1,
      name: 1,
      isActive: 1,
    }
  );
};



module.exports = {
  createEmployee,
  checkDuplicateUserEntry: checkDuplicates,
  getEmployeeById,
  getAllEmployees,
  verifyEmployee
}
