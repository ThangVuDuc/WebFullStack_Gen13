const express = require('express');
const imageRouter = express.Router;
const ImageModel = require("../models/imageModel");

imageRouter.get("/", function (req, res) {
    ImageMode.find({}, function (err, images) {
        if (err) res.status(500).send({ success: 0, err })
        else res.send({ success: 1, images })
    });
});

imageRouter.post("/", function (req, res) {
    const { user, view, like, comments, imageUrl, description, owner } = req.body;
    ImageModel.create({ user, view, like, comments, imageUrl, description, owner }, function (err, ImageCreated) {
        if (err) res.status(500).send({ success: 0, err })
        else res.status(201).send({ success: 1, ImageCreated });
    });
})

imageRouter.put("/:imageID", function (req, res) {
    ImageModel.findById({ _id: req.params.imageID }, function (err, imageFound) {
        if (err) console.log(err)
        else if (!imageFound) console.log("Not found!")
        else {
            if (req.body.user) imageFound.user = req.body.user;
            if (req.body.view) imageFound.user = req.body.view;
            if (req.body.like) imageFound.user = req.body.like;
            if (req.body.comments) imageFound.user = req.body.comments;
            if (req.body.imageUrl) imageFound.user = req.body.imageUrl;
            if (req.body.description) imageFound.user = req.body.description;
            if (req.body.owner) imageFound.user = req.body.owner;
            imageFound.save(function (err) {
                if (err) res.status(500).send({ success: 0, err })
                else res.send({ success: 1, imageID: imageFound._id });
            });
        }
    });
});

imageRouter.delete("/:imageID", function (req, res) {
    ImageModel.findOneAndRemove({ _id: req.params.imageID }, function (err) {
        if (err) res.status(500).send({ success: 0, err })
        else res.send({ success: 1 });
    });
})

imageRouter.get("/:imageID", function (req, res) {
    ImageModel.findById({ _id: req.params.imageID }, function (err, imageFound) {
        if (err) res.status(500).send({ success: 0, err })
        else res.send({ success: 1, imageFound });
    });
});

module.exports = imageRouter;