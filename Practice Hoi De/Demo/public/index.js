
$(document).ready(function () {
    var socket = io("http://localhost:4000");
    $("#otherQs").click(function () {
        socket.emit("Client-click-other-qs")
        socket.on("server-send-qs", function (data) {
            do {
                var text = data[Math.floor(Math.random() * data.length)].content
                var texthtml = $("#qsBlock").text()
                console.log(texthtml + " " + text);
                console.log("")
                if (texthtml != text) {
                    console.log("khac")
                    $("#qsBlock").html(text)
                    console.log($("#qsBlock").text())
                }
            }
            while (texthtml == text)

        })
        // socket.on("server-send-qs2",function(data){
        //     var text=$("#qsBlock").text();
        //     var index=data.indexOf(text);
        //     document.getElementById("votebtn").href = "http://localhost:4000/question"+index;
        // })
    })

    // socket.on("server-send-qs2",function(data){
    //     var text=$("#qsBlock").text();
    //     var index=data.indexOf(text);
    //     document.getElementById("votebtn").href = "http://localhost:4000/question"+index;
    // })


    });

   
    var setTotalNumberOfWordCounter = "200";
    /*=============  This is a count of total number to be displayed ==================*/
       
    /*This function first get the value of textarea. And read length of that textarea
    charactor. then compare the value of set value.*/
       
    function displayWordCounter(){
    var getTextValue = document.frm.dd_fc_comment.value;  // Get input textarea value
    var getTextLength = getTextValue.length;   // Get length of input textarea value
    if(getTextLength > setTotalNumberOfWordCounter){     //compare this length with total count
            getTextValue = getTextValue.substring(0,setTotalNumberOfWordCounter);
            document.frm.dd_fc_comment.value =getTextValue;
            return false;
    }
    document.frm.totalWordLimit.value = (setTotalNumberOfWordCounter-getTextLength);
       
    }