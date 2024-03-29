const buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

let level = 0;
let started = false;

$(document).keypress(function () {
    if (!started) {
        $('#level-title').html(level);
        nextSequence();
        started = true;
    }
});

$('.btn').click(function () {
    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').html(level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');

    setTimeout(function () {
        $('#' + currentColour).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();

            }, 1000);
        }
    } else {
        playSound('wrong');
        $('body').addClass('game-over');
        $('#level-title').html('Game Over, Press Any Key to Restart');

        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}