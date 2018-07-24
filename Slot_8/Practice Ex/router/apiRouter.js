const express = require('express');
const router = express.Router();
const QuestionModel = require("../models/questionModel")

router.use(function (req, res, next) {
    console.log("Api Router");
    next();
})

router.post('/addquestion', function (req, res) {
    let newQuestion = ({
        content: req.body.questionContent
    })
    QuestionModel.create(newQuestion, function (err, questionCreated) {
        if (err) res.status(500).send({ success: 0, errMsg: err })
        else res.status(201).send({ success: 1, questionID: questionCreated._id }); 
    });
});

router.get('/refresh', function (req, res) {
    QuestionModel.countDocuments({}, function (err, questionListLength) {
        let randomIndex = Math.floor(Math.random() * questionListLength);
        QuestionModel.findOne({}).skip(randomIndex).exec(function (err, questionRandom) {
            if (err) res.status(500).send({ sucess: 0, errMsg: err })
            else {
                res.status(201).send({ success: 1, ques: questionRandom });
            }
        });
    });
});


module.exports = router;
