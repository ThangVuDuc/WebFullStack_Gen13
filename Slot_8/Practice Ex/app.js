const express = require("express");
const hbs = require("express-handlebars");
const fs = require('fs');

const bodyParser = require('body-parser');
const questionRouter = require('./router/questionRouter');
const QuestionModel = require('./models/questionModel');
const apiRouter = require('./router/apiRouter');
const mongoose = require('mongoose');

let app = express();

app.engine("handlebars", hbs({ defaultLayout: "header" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));    

app.use(express.static("public"));

app.use("/question", questionRouter);
app.use("/api", apiRouter);

app.get('/', function (req, res) {
    QuestionModel.countDocuments({}, function (err, questionListLength) {
        let randomIndex = Math.floor(Math.random() * questionListLength);
        QuestionModel.findOne({}).skip(randomIndex).exec(function (err, questionRandom) {
            if (err) console.log(err)
            else {
                res.render("DapGon", {
                    ques: questionRandom
                })
            }
        });
    });
});

app.get('/ask', function (req, res) {
    res.render("HoiNhanh");
});

app.get("/answer/:questionID/:vote", function (req, res) {
    QuestionModel.findById({ _id: req.params.questionID }, function (err, questionFound) {
        if (err) console.log(err)
        else if (!questionFound) console.log("Not found")
        else {
            questionFound[req.params.vote] += 1;
            questionFound.save(function (err) {
                if (err) console.log(err)
                else res.redirect("/question/" + req.params.questionID);
            });
        }
    });
});

mongoose.connect("mongodb://localhost:27017/quyetde", { useNewUrlParser: true }, function (err) {
    if (err) console.log(err)
    else console.log("DB connect success!");
});

app.listen(4000, function (err) {
    if (err) console.error(err)
    else console.log("Server is listening at port 4000");
});
