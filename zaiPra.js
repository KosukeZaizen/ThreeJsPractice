/*
zai.js
create 2019/01/21
Kosuke Zaizen
*/


var curPage = "00";
const objs = [];


wCenter = window.innerWidth/2;
hCenter = window.innerHeight/2;

window.onload = function initial(){
  changePage();
}


function setPage(num){
  curPage = num;
}


function changePage(){
  arrAllPages = document.querySelectorAll(".pageDiv");

  for (i = 0; i < arrAllPages.length; i++){
    objPage = arrAllPages[i];

    if(objPage.id == "page" + curPage){
      show(objPage);
    } else {
      hide(objPage);
    }
  }
}


function gebId(id){
  return document.getElementById(id);
}


function gebClass(strClass){
  return document.getElementsByClassName(strClass);
}


function hide(obj){
  obj.style.display="none";
}


function show(obj){
  obj.style.display="block";
}


function addObj(obj){
  obj.xAccel = 0;
  obj.yAccel = 0;
  obj.xSpeed = 0;
  obj.ySpeed = 0;

  obj.doEachTime = function(){}

  obj.addForce = function(xForce, yForce){
    this.xAccel = xForce / this.weight;
    this.yAccel = yForce / this.weight;
  }

  obj.calcSpeed = function(){
    this.xSpeed = this.xSpeed + this.xAccel * intTimeStep;
    this.ySpeed = this.ySpeed + this.yAccel * intTimeStep;
  }

  obj.calcPos = function(){
    this.style.left = parseInt(this.style.left) + Math.floor(this.xSpeed * intTimeStep) + "px";
    this.style.top = parseInt(this.style.top) + Math.floor(this.ySpeed * intTimeStep) + "px";
  }

  objs.push(obj);
}


function createChar(char, strClass, x, y, weight){

  var span = document.createElement('span');

  span.innerHTML = char;
  span.className = strClass;
  span.style.position = "fixed";
  span.style.top = y + "px";
  span.style.left = x + "px";

  gebId("page" + curPage).appendChild(span);

  span.weight = weight;
  addObj(span);
}


function createImg(strSrc, strClass, x, y, weight){

  var img = document.createElement('img');

  img.src = strSrc;
  img.className = strClass;
  img.style.position = "fixed";
  img.style.top = y + "px";
  img.style.left = x + "px";

  gebId("page" + curPage).appendChild(img);

  img.weight = weight;
  addObj(img);
}


function makeMethodForEachTime(strClass, func){

  for (i = 0; i < objs.length; i++){
    obj = objs[i];
    if(obj.className == strClass){
      obj.doEachTime = func;
    }
  }
}


function nextTime(){
  for (i = 0; i < objs.length; i++){
    objs[i].doEachTime();
    objs[i].calcSpeed();
    objs[i].calcPos();
  }
}
