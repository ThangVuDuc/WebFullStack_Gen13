var express=require("express")
var app=express();
var hbs=require('express-handlebars')
var fs = require('fs')
var bodyParser = require('body-parser')
var server=require("http").createServer(app)
server.listen(4000)
var io=require("socket.io").listen(server);
const questionList=require('./question.json')//lay file json

app.use(express.static("public"))


app.engine("handlebars",hbs({defaultLayout:"main"}))
app.set('view engine',"handlebars");
app.use(bodyParser.urlencoded({extended: false}))


app.get('/qs',function(req,res){
    res.render('qs')
})
app.get(["/","/ans"],function(req,res){
    let rand=Math.floor(Math.random()*questionList.length)
    let question =questionList[rand];
    res.render('ans',{
        qs:questionList[rand],
        question
    })
})
app.get("/question/:questionId",function(req,res){

    let question =questionList[req.params.questionId];
    res.render("vote",{
        question,
        totalVote:question.yes+question.no
    })
})

app.post("/question/add", (req, res) =>{
    let newQuestion = {content: req.body.questionContent, yes: 0, no: 0, id:questionList.length};
    questionList.push(newQuestion);
    fs.writeFileSync('./question.json', JSON.stringify(questionList));
    res.redirect('/question/'+newQuestion.id);
})

app.get("/answer/:questionId/:vote", (req, res) =>{
    questionList[req.params.questionId][req.params.vote] += 1;
    fs.writeFileSync('./question.json', JSON.stringify(questionList));
    res.redirect("/question/"+req.params.questionId);
})
// for(let i=0;i<questionList.length;i++){
//     app.get('/question'+i,function(req,res){
//         res.render('vote',{
//             qs:questionList[i]
//         })
//     })
// }



io.on("connection",function(socket){
    socket.on("Client-click-other-qs",function(){
        socket.emit("server-send-qs",questionList);
    })

    // socket.emit("server-send-qs2",arrQs);


})