
var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

// Start the game
var level = 0;

$(document).keydown(function(){
 if(gamePattern == 0) {
    $("#level-title").text("Level " + level);
    nextSequence();
 }
});

// Detecting what the botton User has clicked
$(".btn").click(function(){
 // Add in the array of userClickedPattern
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
 // Sound of selected button by user
    playSound(userChosenColour);
    animatePress(userChosenColour);
       
 //    nextSequence();
 validationTrue(userClickedPattern.length-1);
    // checkAnswer(userClickedPattern.length-1);
       
});

// Game Pattern
function nextSequence(){
 // Changing text on h1 tag
 level ++;
 $("h1").text("Level " + level);

 // Selecting random button from buttonColors
 var randomNumber = Math.floor(Math.random() * 4);
 var randomChosenColor = buttonColors [randomNumber];

 // Save the button seceted by random in the array gamePattern
 gamePattern.push(randomChosenColor);
    
 // Animation of selected button by random 
 $("#" + randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);
   
 playSound(randomChosenColor);
}

// Sound of selected button by random
function playSound(name){
 var randomAudio = new Audio ("sounds/" + name + ".mp3");
 randomAudio.play();
}

// Animation of button that would be clicked
function animatePress(currentColour){
 $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function validationTrue (currentLevel){
if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if (gamePattern.length === userClickedPattern.length){
        userClickedPattern = [];
        setTimeout(function(){
            nextSequence();
        }, 1000);
    }
   } else {
    $("body").addClass("game-over");
     new Audio("sounds/wrong.mp3").play();
     $("h1").text("Game Over, Press Any Key to Restart");
      setTimeout (function(){
      $("body").removeClass("game-over")
      }, 350);
     restart();
   }
}

// function checkAnswer(currentLevel){ 
//     if (gamePattern[currentLevel] === userClickedPattern [currentLevel]){
//         console.log("succses");
//         if (gamePattern.length === userClickedPattern.length){
            
//             setTimeout(function(){
//             nextSequence();
//            }, 1000);
//         }
        
//     } else {
//         console.log("wrong");
//     }
// }
 
function restart (wrong){
    level = 0;
    userClickedPattern = [];
    gamePattern =[];
}