let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);


    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);

}

    $("body").keydown(function () {
        if (!started) {
            nextSequence();
            started = true;    
        }

        
        
    })



function playSound(name){
    var sound1 = new Audio("./sounds/" + name + ".mp3")
    sound1.play();  
}


function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout( () => {$("#" + currentColour).removeClass("pressed")}, 100)
}


$(".btn").click(
function handleClick (event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour)
    $("#" + userChosenColour).fadeOut(100).fadeIn(100)
    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        console.log("wrong");
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
      }
  
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}