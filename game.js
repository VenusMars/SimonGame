
var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

// Add keypress Listener
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Click Event Listener
$(".btn").click(function(){

    if (level === 0) return;

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);  

    animatePress(userChosenColour);  
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});


// check answer
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){      
      if (userClickedPattern.length === gamePattern.length){
        var checkInput = compare(userClickedPattern,gamePattern);
        if (checkInput){
          setTimeout(nextSequence(),1500);
        }else {
          wrongBuzz();
        }
      }
    }
    else{
      wrongBuzz();
      return;
    }
}


// Compare both arrays are equal
function compare(ar1, ar2) {
  if(ar1.length != ar2.length)
      return false;
   
  for(var i = 0; i < ar1.length; i++) {
      if (ar1[i] != ar2[i])
          return false;
  }
  return true;
}


// Random color generator sequence function
function nextSequence(){

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  $("#" + randomChosenColour).fadeTo('fast',0).fadeTo('fast',1);
  //$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

// Play sound
function playSound(colorName){
  var getSound="sounds/" + colorName + ".mp3";
  var soundFile = new Audio(getSound);
  soundFile.play();
}

// Animate the button
function animatePress(activeColor){
  $("#" + activeColor).addClass("pressed");
  setTimeout(function() {
    $("#" + activeColor).removeClass("pressed");
  }, 100);
  
}

// Play wrong buzz
function wrongBuzz(){
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {$("body").removeClass("game-over");}, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();

}

// if user gets wrong. Reset all the variables
function startOver(){
  gamePattern = [];
  level = 0;
  started = false;
}





