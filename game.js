var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$(document).on("keypress",function()
{     if(!started)
  {
    $("h1").text("Level " + level);
    setTimeout(function(){
    nextSequence();  
    },1000);


    started = true;
  }

});


function nextSequence()
{ userClickedPattern=[];
  ++level;
  $("h1").text("level "+level);
  var randomNumber=Math.floor(4*Math.random());
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("."+randomChosenColor).fadeOut(100).fadeIn(100);
   var audio=new Audio("sounds/" + randomChosenColor + ".mp3");
   audio.play();
}



$(".btn").click(function()
{
  var userChosenColor=this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

function playSound(name)
{
  var audio=new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor)
{
  document.querySelector("#"+currentColor).classList.add("pressed");
  setTimeout(function(){
    document.querySelector("#"+currentColor).classList.remove("pressed");
  },100);
}


function checkAnswer(currentLevel)
{
  if( userClickedPattern[currentLevel] == gamePattern[currentLevel] )
  {
    console.log("success");
    if(userClickedPattern.length==gamePattern.length)
    {
      setTimeout(function()
      {
        nextSequence();
      },1000);
    }
  }
  else
  {
    console.log("wrong");
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    document.querySelector("body").classList.add("game-over");
    setTimeout(function()
    {
      document.querySelector("body").classList.remove("game-over");
    },100);
    $("h1").text("Game over, press any key to restart");
    startover();
  }

}


function startover()
{
  level=0;
  started=false;
  gamePattern=[];
}
