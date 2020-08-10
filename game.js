
var max_num=0;
var row_num=0;
var col_num=0;

var started = false;
var game_level = 1;

var checking=false;
var expecting_num=1;

$(document).keypress(function() {
  if (!started) {
    $("#game_level-title").text("Level " + game_level);
    level_selector()
    started = true;
  }
});



// function checkAnswer(currentLevel) {

//     if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
//       if (userClickedPattern.length === gamePattern.length){
//         setTimeout(function () {
//           nextSequence();
//         }, 1000);
//       }
//     } else {
//       playSound("wrong");
      // $("body").addClass("game-over");
      // $("#game_level-title").text("Game Over, Press Any Key to Restart");

      // setTimeout(function () {
      //   $("body").removeClass("game-over");
      // }, 200);

      // startOver();
//     }
// }






function level_selector(){
  checking=false;
  if (game_level<=4)
  {
    max_num=4;
    row_num=2;
    col_num=2;
  }
  else if (game_level<=6)
  {
    max_num=6;
    row_num=2;
    col_num=3;
  }
  else if (game_level<=9)
  {
    max_num=9;
    row_num=3;
    col_num=3;
  }
  else
  {
    max_num=16
    row_num=4;
    col_num=4;
  }

  $(".container").empty()
  var num = [];

  while (num.length < max_num) {
      var random_number = Math.floor(Math.random()*max_num+1);
      if (num.indexOf(random_number) == -1) {
          num.push(random_number);
      }
  }
  var string_to_append="";
  for (i = 0; i < row_num; i++) {
    string_to_append+='<div class="row">';
    for (j=0;j<col_num;j++)
    {
      string_to_append+='<div type="button" class="btn"><div class="text-tile" >'
      string_to_append+=num[i*col_num+j]
      string_to_append+='</div></div>'
    }
    string_to_append+='</div>'
  }
  $(".container").append(string_to_append);
  $("svg circle").addClass("run-animation");
  setTimeout(function () {
    $(".text-tile").css("display","none");
    $("svg circle").removeClass("run-animation");
    checking=true;
    expecting_num=1;
  }, 5000);
  $(".btn").click(function() {
    if (checking==true)
    {
      $(this).children(".text-tile").css("display","initial");
      var this_num = $(this).children(".text-tile").text();
      if (this_num==expecting_num)
      {
        expecting_num+=1;
        if (expecting_num>max_num)
      {
        game_level++;
        setTimeout(function () {
          $("#game_level-title").text("Leveling up");
          setTimeout(function () {
            $("#game_level-title").text("Leveling up.");
            setTimeout(function () {
              $("#game_level-title").text("Leveling up..");
              setTimeout(function () {
                $("#game_level-title").text("Level " + game_level);
                level_selector();
              }, 400);
            }, 400);
          }, 400);
        }, 400);
      }
      }
      else
      {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#game_level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        startOver();
      }
    }
  });
}

// function nextSequence() {
//   userClickedPattern = [];
//   game_level++;
//   $("#game_level-title").text("Level " + game_level);
//   var randomNumber = Math.floor(Math.random() * 4);
//   var randomChosenColour = buttonColours[randomNumber];
//   gamePattern.push(randomChosenColour);

//   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
//   playSound(randomChosenColour);
// }

// function animatePress(currentColor) {
//   $("#" + currentColor).addClass("pressed");
//   setTimeout(function () {
//     $("#" + currentColor).removeClass("pressed");
//   }, 100);
// }

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  max_num=0;
  row_num=0;
  col_num=0;

  started = false;
  game_level = 1;

  checking=false;
  expecting_num=1;
  started = false;
}
