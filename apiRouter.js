const express = require("express");
const apiRouter = express.Router();
const userRouter = require('./userRouter');

apiRouter.use("/", function (req, res, next) {
    console.log("Api Router");
    next();
});

apiRouter.get('/', function (req, res) {
    res.send("Api working");
});

apiRouter.use("/users", userRouter);

module.exports = apiRouter;