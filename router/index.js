
const express = require("express");
const employeeRouter = require("./employeeRouter");

const mainRouter = express.Router();

mainRouter.use("/employee", employeeRouter);

module.exports = mainRouter;  // Ensure mainRouter is exported correctly
