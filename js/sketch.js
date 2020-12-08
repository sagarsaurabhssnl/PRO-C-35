//Create variables here
var dogImg, dogimg, dogHappyImg, dog;
var dogImgNum = 0;
var database;
var reffoodtime, refmoney;
var money = 50;
var foodtime = "loading...", money = "loading...", food = "loading...", foodtimetext = "loading...";
var date = new Date();
var sec = date.getSeconds();
var timer = 100;
var eventlistener = sec;
var keypress = 0;

function preload() {
  dogimg = loadImage("images/dog.png");
  dogHappyImg = loadImage("images/happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800, 600);
  dogImg = dogimg;
  dog = createSprite(400, 300);
  dog.scale = 0.5;

  reffood = new Feed();
  reffoodtime = new Foodtime();
  refmoney = new Money();
  reffood.config();
  reffoodtime.config();
  refmoney.config();
  reffoodtime.change(1);
}

function draw() {
  background("cyan");
  date = new Date();
  sec = date.getSeconds();
  if (eventlistener !== sec) {
    timer = timer - 1
  }
  eventlistener = sec
  console.log(sec);
  dog.addImage(dogImg);
  drawSprites();
  push();
  stroke(5);
  textSize(20);
  text("Press UP arrow to feed the dog", 250, 20);
  if (money === 0) {
    text("You have no money to buy, Wait for pocket money!", 200, 570);
  } else {
    text("Press DOWN arrow to buy some food", 250, 590);
  }
  text("Food left: " + food, 320, 50);
  text("Money left: " + money, 620, 50);
  text("Food time: " + foodtimetext, 50, 300);
  text("Pockey Money Time: " + timer, 50, 270);
  pop();
  text("Press R to reload the page", 20, 570);
  text("Press C to get the code", 20, 590);
  dogImgnum();
  foodTime();
  resetTimer();
}

function keyPressed() {
  if (keyCode === 38 && foodtime === 1 && food > 0) {
    if (keypress === 0) {
      keypress = 1;
      upKey(-1);
    }
  }
  if (keyCode === 40 && money > 0) {
    downKey(1);
  }
  if (keyCode === 67) {
    codelink();
  }
  if (keyCode === 82) {
    reload();
  }
}

function dogImgnum() {
  if (dogImgNum === 0) {
    dogImg = dogimg;
  } else if (dogImgNum === 1) {
    dogImg = dogHappyImg;
  }
}

function foodTime() {
  reffoodtime.config();
  if (foodtime === 1) {
    foodtimetext = "yes";
  } else if (foodtime === 0) {
    foodtimetext = "no";
  }
}

function upKey(l) {
  if (l !== 1) {
    dogImgNum = 1;
    food = food + l;
    reffood.change(food);
    reffoodtime.change(0);
    setInterval(function () {
      dogImgNum = 0;
      reffoodtime.change(1);
      console.log("timer");
      keypress = 0;
    }, 10000);
    console.log("timer1");
  }
}

function downKey(l) {
  if (l === 1) {
    food = food + l;
    money = money - 1;
    reffood.change(food);
    refmoney.change(money);
  }
}

function codelink() {
  window.location.href = "https://github.com/sagarsaurabhssnl/PRO-C-35";
}

function reload() {
  window.location.reload(false);
}

function resetTimer() {
  if (timer <= 0) {
    timer = 100;
    money = money + 5;
    refmoney.change(money);
  }
}
