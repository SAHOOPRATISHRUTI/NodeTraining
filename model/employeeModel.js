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
                message: "{VALUE} is not a valid email"
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
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER"
        }
    },
    {
        timestamps: true,
    }
);

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
