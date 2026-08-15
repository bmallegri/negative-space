const player = document.getElementById('brownNoisePlayer');
const startMessage = document.getElementById('startMessage');
const darkColor = [31, 32, 36];
const calmColor = [45, 70, 85];
const today = new Date().toDateString();
const savedDate = localStorage.getItem("sessionDate");

if (savedDate !== today) {
    localStorage.setItem("sessionDate", today);
    localStorage.setItem("sessionComplete", "false")
}
player.volume = 0.4;
function startAudioOnFirstInteraction() {
    player.play()
        .then(() => {
            startMessage.style.display = 'none';
            document.removeEventListener('click', startAudioOnFirstInteraction);
        })
}
document.addEventListener('click', startAudioOnFirstInteraction);
const urlParams = new URLSearchParams(window.location.search);
let timeLeft = parseInt(urlParams.get('timer'));
if (isNaN(timeLeft)) {
    timeLeft = 10; 
}
const totalTime = timeLeft;
const display = document.getElementById('countdown');
function updateTimer() {
    if (timeLeft <= 0) {
        display.textContent = "Redirecting...";
        clearInterval(timerInterval);
        localStorage.setItem("sessionComplete", "true");
        localStorage.setItem("sessionDate", today);
        document.body.style.backgroundColor = "rgb(45, 70, 85)"
        window.location.href = "Lesson.html";
        return;
    }
     const minutes = Math.floor(timeLeft / 60);
     const seconds = timeLeft % 60;
     display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
     timeLeft--;
     updateBackground(timeLeft, totalTime);
}
updateTimer(); 
const timerInterval = setInterval(updateTimer, 1000);
function updateBackground(timeLeft, totalTime) {
    const progress = 1 - (timeLeft / totalTime);
    const r = Math.round(
        darkColor[0] + (calmColor[0] - darkColor[0]) * progress
    );
    const g = Math.round(
        darkColor[1] + (calmColor[1] - darkColor[1]) * progress
    );
    const b = Math.round(
        darkColor[2] + (calmColor[2] - darkColor[2]) * progress
    );
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}
