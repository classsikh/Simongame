var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0 ;
var started = "false";

if( started == "false"){
    started =  "true";
    $(document).keypress(nextSequence);
}

$("#red, #yellow, #green, #blue").click(function(){
    
    var userChosenColour;
        if (this.id == "red") {
            userChosenColour = "red";
        }
        else if (this.id == "yellow") {
            userChosenColour = "yellow";
        }
        else if (this.id == "green") {
            userChosenColour = "green";
         }
         else if (this.id == "blue") {
            userChosenColour = "blue";
         }
         else {
            alert("error detected");
         }
      userClickedPattern.push(userChosenColour);
      
      playSound(userChosenColour);   
      animatePress(userChosenColour);
      checkAnswer(userClickedPattern.length-1);
     });


function nextSequence(){
    userClickedPattern = [];
   $("#level-title").text("level " + level ) ;
   var randomNumber = Math.floor(Math.random() * 4);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);
   $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour); 
   level++;

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
    }

function checkAnswer(currentLevel)
{
   
     
         if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
         {
            if(userClickedPattern.length === gamePattern.length)
            {
                setTimeout(function() {
                    nextSequence()
                }, 1000);
            }
         }

        
        else
        {
            var overSound = new Audio("sounds/wrong.mp3");
            overSound.play();
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
             }, 200);
             $("#level-title").text("Game Over, Press Any Key to Restart" ) ;  
             startOver();
        }
    }
function startOver()
{  level = 0;
    gamePattern = [];
    started = "false";

}