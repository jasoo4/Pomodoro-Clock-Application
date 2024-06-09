const timer = {
    pomodoro: 25 * 60, // 25 minutes in seconds
    shortBreak: 5 * 60, // 5 minutes in seconds
    longBreak: 15 * 60, // 15 minutes in seconds
    mode: "pomodoro",
    remainingTime: 25 * 60 // Initial timer duration (25 minutes)
};

const modeButtons = document.getElementById('js-mode-buttons');
modeButtons.addEventListener('click', handleMode);

function handleMode(event) {
    const mode = event.target.dataset.mode;
    if (mode) {
        timer.mode = mode;
        timer.remainingTime = timer[mode];
        updateDisplay();
        playButtonClickSound(); // Play button sound when mode button is clicked
    }
}

const startButton = document.getElementById('js-btn');
startButton.addEventListener('click', startTimer);

let intervalID;

function startTimer() {
    if (!intervalID) {
        intervalID = setInterval(updateTimer, 1000);
        startButton.textContent = 'Pause';
    } else {
        clearInterval(intervalID);
        intervalID = null;
        startButton.textContent = 'Start';
    }
    playButtonClickSound(); // Play button sound when start button is clicked
}

function updateTimer() {
    timer.remainingTime--;
    if (timer.remainingTime <= 0) {
        clearInterval(intervalID);
        intervalID = null;
        startButton.textContent = 'Start';
        switchMode();
    }
    updateDisplay();
}

function switchMode() {
    if (timer.mode === 'pomodoro') {
        timer.mode = 'shortBreak';
        timer.remainingTime = timer.shortBreak;
        playBackToWorkSound(); // Play back to work sound
    } else if (timer.mode === 'shortBreak') {
        timer.mode = 'pomodoro';
        timer.remainingTime = timer.pomodoro;
        playBreakSound(); // Play break sound
    }
}

function updateDisplay() {
    const minutes = Math.floor(timer.remainingTime / 60);
    const seconds = timer.remainingTime % 60;
    const clockDisplay = document.getElementById('js-clock');
    clockDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const modeDisplay = document.getElementById('js-mode');
    modeDisplay.textContent = timer.mode.charAt(0).toUpperCase() + timer.mode.slice(1);
}

function playButtonClickSound() {
    const buttonClickAudio = new Audio('button-sound.mp3');
    buttonClickAudio.play();
}

// Function to play the back to work sound (short or long break timer)
function playBackToWorkSound() {
    const backToWorkAudio = new Audio('backtowork.mp3');
    backToWorkAudio.play();
}

// Function to play the break sound (pomodoro timer)
function playBreakSound() {
    const breakAudio = new Audio('break.mp3');
    breakAudio.play();
}

updateDisplay(); // Initial display update
