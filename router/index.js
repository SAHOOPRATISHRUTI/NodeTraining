
const express = require("express");
const employeeRouter = require("./employeeRouter");
const authRouter =require("./authRouter")
const mainRouter = express.Router();

mainRouter.use("/auth", employeeRouter);
mainRouter.use("/employee", authRouter);
module.exports = mainRouter;  // Ensure mainRouter is exported correctly
