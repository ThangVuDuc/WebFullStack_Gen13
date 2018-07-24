const express = require("express");
const router = express.Router();
const QuestionModel = require("../models/questionModel");

router.get('/:questionID', function (req, res) {                    
    QuestionModel.find({ _id: req.params.questionID }, function (err, result) {
        if (err) console.log(err)
        else if (!result) console.log("Not found")
        else res.render('result', {
            ques: result[0],                   
            totalVote: result[0].yes + result[0].no
        });
    });
});

module.exports = router;