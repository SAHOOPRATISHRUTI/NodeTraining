const mongoose = require('mongoose');
const validator = require('validator');

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            index: true
        },
        email: {
            type: String,
            validate: {
                validator: validator.isEmail,
                message: "{VALUE} is not a Valid Email"
            },
            default: null,
            required: true,
            index: true,
            unique: true,
        },
        password: {
            type: String,
            default: null,
        },
        isActive: {
            type: Boolean,
            required: true,
            index: true,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Employee = mongoose.model('Employee', employeeSchema); // Ensure this is using mongoose.model

module.exports = Employee;
