var colors = ["green", "red", "yellow", "blue"];
var givenSequence = [];
var userSequence = [];
var levelCounter = 0;
var started = false;

$(document).keydown(function () {
  if (!started) {
    $("h1").text("Level " + levelCounter);
    nextLevel();
    started = true;
  }
});

$(".btn").click(function (event) {
    var userClicked = event.currentTarget.id;
    buttonAnimation(userClicked);
    buttonSound(userClicked);
    userSequence.push(userClicked);
    checkAnswer(userSequence.length - 1);
});

function checkAnswer(index) {
  console.log(index, userSequence[index], givenSequence[index],userSequence,givenSequence);
  if (userSequence[index] === givenSequence[index]) {
    if (userSequence.length === givenSequence.length) {
      setTimeout(function () {
        nextLevel();
      }, 1000);
    }
  } else {
    buttonSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game-Over, Press any key to restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextLevel() {
  userSequence = [];
  levelCounter++;
  $("h1").text("Level " + levelCounter);
  var chosenColor = colors[Math.floor(Math.random() * 4)];
  givenSequence.push(chosenColor);
  $("#" + chosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  buttonSound(chosenColor);
}


function startOver() {
  // window.location.reload();
  givenSequence = [];
  userSequence = [];
  levelCounter = 0;
  started = false;
}

function buttonSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function buttonAnimation(clickedKey) {
  $("#" + clickedKey).addClass("pressed");
  setTimeout(function () {
    $("#" + clickedKey).removeClass("pressed");
  }, 100);
}

