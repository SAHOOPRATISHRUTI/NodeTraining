const jwt = require("jsonwebtoken");
const Responses = require("../helper/response");
const messages = require("../constants/constantMessage");
const employeeService = require("../Service/employeeService");

/* FUNC TO GENERATE NEW TOKEN FOR USER */
const generateUserToken = async (data) => {
    try {
        const token = jwt.sign(data, process.env.JWT_USER_SECRET, {
            expiresIn: "365d" // 365 days
        });
        return `Bearer ${token}`;
    } catch (error) {
        // Handle the error appropriately
        throw new Error("Error generating token");
    }
};

/* FUNC TO VERIFY A TOKEN FOR USER */
const verifyUserToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token && token.startsWith("Bearer ")) {
            token = token.substring(7); // Remove 'Bearer ' from token
        } else {
            return Responses.failResponse(req, res, null, messages.noTokenProvided, 401);
        }

        const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
        const email = decoded.email;
        const isActiveUser = await employeeService.verifyEmployee(email);

        if (isActiveUser) {
            req.email = email;
            req.userData = isActiveUser;
            next();
        } else {
            return Responses.failResponse(
                req,
                res,
                { isInValidUser: true },
                messages.invalidUser,
                401 // Unauthorized
            );
        }
    } catch (error) {
        console.error("Token verification error:", error);
        return Responses.failResponse(req, res, null, messages.invalidToken, 401);
    }
};

module.exports = {
    generateUserToken,
    verifyUserToken
};
