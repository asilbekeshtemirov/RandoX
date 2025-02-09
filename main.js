document.addEventListener("DOMContentLoaded", () => {
  let secretNumber = Math.floor(Math.random() * 100) + 1;
  let attempts = 7;
  const message = document.querySelector(".box__note--text");
  const numberDisplay = document.querySelector(".box--items-number");
  const guessInput = document.getElementById("user-guess");
  const guessButton = document.getElementById("guess-btn");
  const retryButton = document.querySelector(".box__actions--retry--button");
  const attemptsDisplay = document.querySelector(".box__limit--text");

  const winSound = new Audio("sound/win.mp3");
  const loseSound = new Audio("sound/lose.mp3");
  const clickSound = new Audio("sound/zvuk3.mp3");
  const hintSound = new Audio("sound/hint.mp3");

  const updateMessage = (text, color = "") => {
      message.textContent = text;
      if (color) document.body.style.backgroundColor = color;
  };

  const resetGame = () => {
      secretNumber = Math.floor(Math.random() * 100) + 1;
      attempts = 7;
      updateMessage("Start guessing...");
      numberDisplay.textContent = "?";
      guessInput.value = "";
      guessButton.disabled = false;
      attemptsDisplay.textContent = "Number of guesses: 7";
      document.body.style.backgroundColor = "#222";
  };

  guessButton.addEventListener("click", (event) => {
      event.preventDefault();
      clickSound.play(); 

      const userGuess = Number(guessInput.value);
      if (!userGuess || userGuess < 1 || userGuess > 100) {
          return updateMessage("Please enter a valid number between 1 and 100!");
      }

      attempts--;
      attemptsDisplay.textContent = `Number of guesses: ${attempts}`;

      if (userGuess === secretNumber) {
          updateMessage("🎉 Congratulations! You guessed it right!", "#60b347");
          numberDisplay.textContent = secretNumber;
          guessButton.disabled = true;
          winSound.play();
      } else if (attempts === 0) {
          updateMessage(`💥 Game Over! The correct number was ${secretNumber}`, "#FF0000");
          numberDisplay.textContent = secretNumber;
          guessButton.disabled = true;
          loseSound.play();
      } else {
          updateMessage(userGuess > secretNumber ? "📉 Too high! Try again." : "📈 Too low! Try again.");
      }
  });

  retryButton.addEventListener("click", () => {
      clickSound.play();
      resetGame();
  });
});
