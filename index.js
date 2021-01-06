// alert("Working");
var buttonColours = ["red", "blue","green","yellow"];
var started = false;
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var clickCount = -1;
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function nextSequence(){
    var ran =  Math.floor(Math.random()*4);
    var randomChosenColor = buttonColours[ran];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("h1").text("level "+level);
}
function animatePress(currentColor){
    var colorElement = $("#"+currentColor);
    colorElement.addClass("pressed");
    setTimeout(function(){colorElement.removeClass("pressed")}, 100);
}
function handler(event){
    var userChoosenColor = event.target.id;
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    if(started === true){
        clickCount++;
        userClickedPattern.push(userChoosenColor);
        var result = checkAnswer(clickCount);
        if(result === false){
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){$("body").removeClass("game-over")}, 200);
            startOver();
            return;
        }
        if(clickCount === level-1){
            userClickedPattern = [];
            nextSequence();
            clickCount = -1;
        }
    }
}
function checkAnswer(index){
    if(userClickedPattern[index] === gamePattern[index]){
        return true;
    }
    else{
        return false;
    }
}
function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    level = 0;
    clickCount = -1;
    $("h1").text("Press A key to start");
}
$(".btn").click(handler);
$(document).keydown(function(event){
    if(started === false){
        if(event.which === 65){
            nextSequence();
            started = true;
        }
    }
});
