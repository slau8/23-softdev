// svg setup
var pic = document.getElementById("vimage");
var height = pic.getAttribute("height");
var width = pic.getAttribute("width");

// buttons
var bounce = document.getElementById("bounce");
var grow = document.getElementById("grow");
var stop = document.getElementById("stop");

var isRunning = false;

// bounce animation
var posX = width / 2;
var posY = height / 2;
var incX = 5;
var incY = 5;
var dvdHeight = 50;
var dvdWidth = 100;

var logo = new Image();
logo.src = "dvd.png";

// grow animation
var radius = 1;
var increment = 1;
var id;

var clear = function(){
  while(pic.firstChild){
	   pic.removeChild(pic.firstChild);
  }
};

var bounceCallBack = function(){
  console.log("lets bounce");
  if (!isRunning){
    bounceDot();
    isRunning = !isRunning
  }
};

var growCallBack = function(){
  if (!isRunning){
    growDot();
    isRunning = !isRunning;
  }
};

var stopCallBack = function(){
  window.cancelAnimationFrame(id);
  clear();
  radius = 1;
  isRunning = false;
};

// Bounce DVD
var bounceDot = function(){
  clear();
  //console.log(posX);
  if (posX <= dvdWidth / 2){ // bouncing off left wall
    incX = 1 * Math.floor(Math.random() * 5 + 2);
  }
  if (posY <= dvdHeight / 2){ // top wall
    incY = 1 * Math.floor(Math.random() * 5 + 2);
  }
  if (posX >= width - (dvdWidth / 2)){ // right wall
    incX = -1 * Math.floor(Math.random() * 5 + 2);
  }
  if (posY >= height - (dvdHeight / 2)){ // bottom wall
    incY = -1 * Math.floor(Math.random() * 5 + 2);
  }
  posX += incX;
  posY += incY;
  var img = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "image"
  );
  img.setAttribute("href" ,"dvd.png");
  img.setAttribute("width", dvdWidth);
  img.setAttribute("height", dvdHeight);
  img.setAttribute("x", posX);
  img.setAttribute("y", posY);
  pic.appendChild(img);
  id = window.requestAnimationFrame(bounceDot);
  //console.log(id);
};

// Grow (or shrink) centered dot
var growDot = function(){
  clear();
  if (radius == 0 || radius == 150)
    increment *= -1;
  radius += increment;
  var c = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  )
  c.setAttribute("cx", width / 2);
  c.setAttribute("cy", height / 2);
  c.setAttribute("fill", "red");
  c.setAttribute("r", radius);
  pic.appendChild(c);
  id = window.requestAnimationFrame(growDot);
  console.log(id);
};

bounce.addEventListener("click", bounceCallBack);
grow.addEventListener("click", growCallBack);
stop.addEventListener("click", stopCallBack);
