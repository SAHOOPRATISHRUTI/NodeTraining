const Joi = require("joi");
const Responses = require("../helper/response");
var regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;


// SEND OTP VALIDATOR
const sendOtpValidator = async (req, res, next) => {
    try {
        console.log(req.body);
        const schema = Joi.object({
            //  email: Joi.string().email().required(),
            email: Joi.string()
                .email({ tlds: { allow: false } })
                .required(),
            
        });

        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        console.log(error);
        // errorLog(error);
        return Responses.errorResponse(req, res, error, 200);
    }
};

// SEND VERIFY OTP VALIDATOR
const verifyOtpValidator = async (req, res, next) => {
    try {
      console.log(req.body);
      const schema = Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.string()
          .trim()
          .length(6)
          .pattern(/^[0-9]+$/)
          .messages({ "string.pattern.base": `OTP must have 6 digits.` })
          .required()
          .strict(),
      });
  
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      console.log(error);
    //   errorLog(error);
      return Responses.errorResponse(req, res, error, 200);
    }
  };

  // SET SIGN IN BY PASWORD VALIDATOR
const signInByPasswordValidator = async (req, res, next) => {
    try {
      console.log(req.body);
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string()
          .pattern(regularExpression)
          .messages({
            "string.pattern.base": `Password min 8 letter, with at least a symbol, upper and lower case letters and a number!`,
          })
          .min(8)
          .max(15)
          .required(),
      });
  
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      console.log(error);
    //   errorLog(error);
      return Responses.errorResponse(req, res, error, 200);
    }
  };
  
module.exports = {
    sendOtpValidator,
    verifyOtpValidator,
    signInByPasswordValidator
}