const express = require('express');
const userRouter = express.Router();
const UserModel = require('../models/userModel');

userRouter.get("/", function (req, res) {
    UserModel.find({}, function (err, users) {
        if (err) res.status(500).send({ success: 0, err })
        else res.send({ success: 1, users })
    })
});

userRouter.post("/", function (req, res) {
    const { username, email, password, avataUrl, name } = req.body;
    UserModel.create({ username, email, password, avataUrl, name }, function (err, userCreated) {
        if (err) res.status(500).send({ success: 0, err })
        else res.status(201).send({ success: 1, userID: userCreated });
    })
});

userRouter.delete("/:userID", function (req, res) {
    UserModel.findOneAndRemove({ _id: req.params.userID }, function (err) {
        if (err) res.status(500).send({ success: 0, err })
        else res.send({ success: 1 });
    });
});

userRouter.get("/:userID", function (req, res) {
    UserModel.findById({ _id: req.params.userID }, function (err, userFound) {
        if (err) res.status(500).send({ success: 0, err })
        else res.send({ success: 1, userFound });
    });
});

userRouter.put("/:userID", function (req, res) {
    UserModel.findById({ _id: req.params.userID }, function (err, userFound) {
        if (err) console.log(err)
        else if (!userFound) console.log("Not found!");
        else {
            if (req.body.username) userFound.username = req.body.username;
            if (req.body.email) userFound.email = req.body.email;
            if (req.body.password) userFound.password = req.body.password;
            if (req.body.avataUrl) userFound.avataUrl = req.body.avataUrl;
            if (req.body.name) userFound.name = req.body.name;
            userFound.save(function (err) {
                if (err) res.status(500).send({ success: 0, err })
                else res.send({ success: 1, userID: userFound._id });
            });
        }
    });
});

module.exports = userRouter;