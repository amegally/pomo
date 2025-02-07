let timeLeft;
let workTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let isWorkTime = true;
let timerId = null;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');

const playMinutesDisplay = document.getElementById('play-minutes');
const playSecondsDisplay = document.getElementById('play-seconds');
const playStartButton = document.getElementById('play-start');
const playPauseButton = document.getElementById('play-pause');
const playResetButton = document.getElementById('play-reset');
const playModeButton = document.getElementById('play-mode');
const workModeButton = document.getElementById('work-mode');
const flipContainer = document.querySelector('.flip-container');

let playTimeLeft;
let playTimerId = null;
const playTime = 5 * 60; // 5 minutes in seconds

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? workTime : breakTime;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    updateDisplay();
}

function startTimer() {
    if (timerId === null) {
        if (timeLeft === undefined) {
            timeLeft = workTime;
        }
        
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                switchMode();
                startTimer();
            }
        }, 1000);
        
        startButton.disabled = true;
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    startButton.disabled = false;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = workTime;
    modeText.textContent = 'Work Time';
    updateDisplay();
    startButton.disabled = false;
}

function updatePlayDisplay() {
    const minutes = Math.floor(playTimeLeft / 60);
    const seconds = playTimeLeft % 60;
    
    playMinutesDisplay.textContent = minutes.toString().padStart(2, '0');
    playSecondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startPlayTimer() {
    if (playTimerId === null) {
        if (playTimeLeft === undefined) {
            playTimeLeft = playTime;
        }
        
        playTimerId = setInterval(() => {
            playTimeLeft--;
            updatePlayDisplay();
            
            if (playTimeLeft === 0) {
                clearInterval(playTimerId);
                playTimerId = null;
                alert("Play time is over!");
                resetPlayTimer();
            }
        }, 1000);
        
        playStartButton.disabled = true;
    }
}

function pausePlayTimer() {
    clearInterval(playTimerId);
    playTimerId = null;
    playStartButton.disabled = false;
}

function resetPlayTimer() {
    clearInterval(playTimerId);
    playTimerId = null;
    playTimeLeft = playTime;
    updatePlayDisplay();
    playStartButton.disabled = false;
}

// Flip functionality
playModeButton.addEventListener('click', () => {
    flipContainer.classList.add('flipped');
    pauseTimer();
    resetPlayTimer();
});

workModeButton.addEventListener('click', () => {
    flipContainer.classList.remove('flipped');
    pausePlayTimer();
    resetTimer();
});

// Add work mode event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Play mode event listeners (already existing)
playStartButton.addEventListener('click', startPlayTimer);
playPauseButton.addEventListener('click', pausePlayTimer);
playResetButton.addEventListener('click', resetPlayTimer);

// Initialize both displays
resetTimer();
resetPlayTimer(); 