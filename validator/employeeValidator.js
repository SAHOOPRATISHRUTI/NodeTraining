const Joi = require("joi");
const Response = require('../helper/response');

const regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const createEmployeeValidator = async (req, res, next) => {
  try {
    const bodySchema = Joi.object({
      name: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(regularExpression)
        .messages({
          "string.pattern.base": `Password min 8 letter, with at least a symbol, upper and lower case letters and a number!`,
        })
        .min(8)
        .max(15)
        .required(),
      role: Joi.string().valid('USER', 'ADMIN').required() // Validate role
    });

    await bodySchema.validateAsync(req.body);

    next();
  } catch (error) {
    console.log(error);
    return Response.errorResponse(req, res, error, 400); // Return bad request status code
  }
};

module.exports = {
  createEmployeeValidator,
};
