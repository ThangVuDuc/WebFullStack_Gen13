'use strict'

function generate(testLengthArray){
  var array = [];
  for (var i = 0; i < testLengthArray.length; i++) {
    var check = testLengthArray[i];
    var input = [];
    for (var j = 0; j < check; j++) {
      input.push(Math.floor((Math.random()*20000)-10000));
    }
    var target;
    if (i === 1) {
      target = 10000000;
    } else if (i === 2) {
      target = input[0];
    } else if (i === 3) {
      target = input[input.length - 1];
    } else {
      target = Math.floor((Math.random()*20000)-10000);
    }
     
    var out = search(input, target);
    var object = { "input": input, "target": target, "output": out};
    array.push(object);
  }
  return array;
}

function search(input, target) {
  for (var i = 0; i < input.length; i++) {
    if (input[i] === target) {
      return i;
    }
  }
  return -1;
}

module.exports = generate