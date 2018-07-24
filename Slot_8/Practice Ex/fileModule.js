const fs = require('fs');

const writeFileData = function(filePath, writeData){
    fs.writeFile(filePath, JSON.stringify(writeData), function(err){
        if(err) console.log(err)
        else console.log("Write successfull");
    });
}

const readFileData = function(filePath){
    fs.readFile(filePath, function(err, data){
        if(err) console.log(err)
        else console.log("Read successfull: "+ data);
    });
}


const returnReadData = function(filePath, onReadFileDone){
    fs.readFile(filePath, function(err, data){
        if(err) console.log(err)
        else onReadFileDone(data);
    });
}

module.exports = {
    readFileData,
    writeFileData,
    returnReadData
}