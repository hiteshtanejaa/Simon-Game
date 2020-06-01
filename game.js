//testing
//alert("game");

//choosing the colour from the array buttonColors
var buttonColors = [ "red", "blue", "green", "yellow" ]; //buttonColors

//storing the pattern of the game in gamePattern array
var gamePattern = [];

//storing the pattern of the user in userClickedPattern array
var userClickedPattern = [];

//level
var level = 0;

//boolean started
var started = false;
//if any button clicked press and play sound
$(".btn").on("click" , function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

//selecting the button using randomcolour variable

//automatic play the sound and button
function nextsequence()
{
  userClickedPattern = [];
  level++;
  started = false;
  $("#level-title").text("Level " + level);
  var randomVariable = Math.floor(Math.random()*3)+1; //generates a random number 1-4
  var chosenColor = buttonColors[randomVariable];
  gamePattern.push(chosenColor);

  $("#"+chosenColor).fadeOut(20).fadeIn(20);
  playSound(chosenColor);

}

//play sounds
function playSound(name){
  var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play();
}

//animation to button
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
    }, 100);
  }

//start the game
$(document).keypress(function(){
  $("#level-title").text("Level " + level);
  if (!started){
    nextsequence();
    started == true;
  }
});

function checkAnswer(currentLevel){

  var log = false;
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
      console.log("success");

      if(userClickedPattern.length==gamePattern.length)
      {

        setTimeout(function(){
          nextsequence();
        },1000);

      }

    }
    else{
       console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
        $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press any Key to Restart");
        startover();
      }
    }

function startover(){

  gamePattern = [];
  started = false;
  level=0;
}
