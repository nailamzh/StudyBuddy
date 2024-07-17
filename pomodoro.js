const sessionTimeInput = document.getElementById("session-time");
const breakTimeInput = document.getElementById("break-time");
const startButton = document.getElementById("start-btn");
const pauseButton = document.getElementById("pause-btn");
const resetButton = document.getElementById("reset-btn");
const timeDisplay = document.getElementById("time-display");

let sessionDuration = parseInt(sessionTimeInput.value) * 60;
let breakDuration = parseInt(breakTimeInput.value) * 60;
let timerInterval;
let isSessionActive = true;
let isTimerRunning = false;

function updateTimerDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  timeDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function startTimer() {
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = false;
  isTimerRunning = true;

  timerInterval = setInterval(() => {
    if (isSessionActive) {
      sessionDuration--;
      updateTimerDisplay(sessionDuration);
      updateProgressBar(sessionDuration, parseInt(sessionTimeInput.value) * 60);

      if (sessionDuration === 0) {
        clearInterval(timerInterval);
        isSessionActive = false;
        sessionDuration = parseInt(sessionTimeInput.value) * 60;
        updateTimerDisplay(breakDuration);
        updateProgressBar(breakDuration, parseInt(breakTimeInput.value) * 60);
        startTimer();
      }
    } else {
      breakDuration--;
      updateTimerDisplay(breakDuration);
      updateProgressBar(breakDuration, parseInt(breakTimeInput.value) * 60);

      if (breakDuration === 0) {
        clearInterval(timerInterval);
        isSessionActive = true;
        breakDuration = parseInt(breakTimeInput.value) * 60;
        updateTimerDisplay(sessionDuration);
        updateProgressBar(sessionDuration, parseInt(sessionTimeInput.value) * 60);
        startTimer();
      }
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function resumeTimer() {
  isTimerRunning = true;
  pauseButton.disabled = false;
  startTimer();
}

function resetTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
  sessionDuration = parseInt(sessionTimeInput.value) * 60;
  breakDuration = parseInt(breakTimeInput.value) * 60;
  updateTimerDisplay(sessionDuration);
  updateProgressBar(sessionDuration, parseInt(sessionTimeInput.value) * 60);
}

function updateProgressBar(currentTime, totalTime) {
  const progressBar = document.getElementById("progress-bar");
  const percentage = ((totalTime - currentTime) / totalTime) * 100;
  progressBar.style.width = `${percentage}%`;
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", () => {
  if (isTimerRunning) {
    pauseTimer();
  } else {
    resumeTimer();
  }
});
resetButton.addEventListener("click", resetTimer);
updateTimerDisplay(sessionDuration);
