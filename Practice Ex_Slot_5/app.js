const express = require("express");
const hbs = require("express-handlebars");
const fileModule = require("./fileModule");

let app = express();

app.engine("handlebars", hbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.static(__dirname));

const question = function(arr){
    let index = Math.floor(Math.random()*arr.length)
    var obj = arr[index];
    return obj.ques;
}

var arr;
fileModule.returnReadData("./listQues.json", function(fileData){
    arr = JSON.parse(fileData);
    app.get('/', function(req, res){
        res.render("answer",{
            string: question(arr)
        });
    });
});



app.get('/ask', function(req, res){
    res.render("ask");
});

app.listen(5297, function(err){
    if(err) console.log(err)
    else console.log("Server is listening at port: 5297");
});