//Establish variables.
let score = 0;
let colorOrder = [];
let correct = new Audio("./assets/initial.mp3");
let finalCorrect = new Audio("./assets/final.mp3")
let gameOver = new Audio("./assets/gameover.mp3");
let simonSays;
let currentIndex = 0;

// Get the height and width of the screen
const screenHeight = window.innerHeight;
const screenWidth = window.innerWidth;

// Define the limits for button movement
const maxX = screenWidth/5 // Adjust this value based on the button size
const maxY = screenHeight/5 // Adjust this value based on the button size

// Animate buttons in a random path
function animateRandomPath(buttons) {
  const duration = 2; // Duration of animation in seconds

  buttons.each(function () {
    // Generate random coordinates within the limits
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Use GSAP for smooth animation
    gsap.to($(this), {
      x: randomX,
      y: randomY,
      duration: duration,
      ease: "power2.out", // Choose an easing function for smooth motion
      onComplete: function () {
      },
    });
  });
}

//Random Number Generation Function to decide what "Simon Says".
function randomNum() {
  simonSays = Math.floor(Math.random() * 4);
  //Callback to function to animate the selected value.
  colorOrder.push(simonSays);
  animateButton(simonSays);
}

//Animate which button matches the value of simonSays.
function animateButton(simonSays) {
//function to animate a button and call the callback when done 
  function animateSingleButton(buttonName, callback) {
    $(".button[name='" + buttonName + "']")
      .delay(1000)
      .animate({ scale: 1.1 })
      .animate({ scale: 1.0 }, callback);
  }

  //Iterate through previosuly selected values
  function animatePreviousValues(index) {
    if (index < colorOrder.length - 1) {
      animateSingleButton(colorOrder[index], function () {
        animatePreviousValues(index + 1);
      })
    } else {
      //Animation for current value
      animateSingleButton(simonSays, function () {
        //Animation for the current value is done
      });
    }
  }
  //Start the animation sequence
  animatePreviousValues(0)
}

//Function to add one to the score.
function reScore() {
  score++;
  $("h2").text("Score: " + score);
}

//Function to remove elements


//Need to add event listener to start button. The callback function will start the game.
$(".start-button").on("click", initializeGame);

//Function to initialize game.
function initializeGame() {
  $(".title, .start-button").animate({ opacity: 0 }); //Hide start screen buttons
  $("h2") // Display score counter
    .delay(750)
    .animate({ opacity: 1 })
    .text("Score: " + score);
  //Callback to the random number generator to start selected values.
  randomNum();
  //Need to add event listeners to all Simon Says buttons.
$(".button").on("click", checkClick);
}



//Check to see if the button clicked is correct or not.
//Check to see if the button clicked is correct or not.
function checkClick() {
  if ($(this).attr("name") == colorOrder[currentIndex]) {
    // Increase currentIndex to check the next value in colorOrder
    currentIndex++;
    correct.play();

    // If the user has clicked all the correct buttons in the sequence
    if (currentIndex === colorOrder.length) {
      // Reset currentIndex and continue the game
      // Play positive noise
      finalCorrect.play();
      animateRandomPath($(".button "));
      reScore();
      currentIndex = 0;
      randomNum();
    }
  } else {
    // Play negative noise
    gameOver.play();
    $(".button").off("click", checkClick);
    $(".button").animate({ opacity: 0 })
    setTimeout(function () {
      $(".game-over").fadeIn().css("display", "block");
    },1000)
    clearInterval(animateButton);
    return 
    // Handle game over logic here
  }
}


// function checkClick() {
//   // If the click is correct:
//   if ($(this).attr("name") == simonSays) {
//     //Play positive noise
//     alert("good");
//     //Add selected value to array to log for next turn.
//     colorOrder.push(simonSays);
//     //FOR FIRST TIME: start button translation
//     //Add one to the score
//     reScore();
//     //Continue the game
//     randomNum();

//     // If the click is incorrect
//     } else {
//       //play negative noise
//       alert("bad");
//       //fadeIn message "Game Over"
//       //fadeIn message: "Your score was" + score
//     }
//   }