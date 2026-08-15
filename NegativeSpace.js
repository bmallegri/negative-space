const player = document.getElementById('brownNoisePlayer');
const startMessage = document.getElementById('startMessage');
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
const display = document.getElementById('countdown');
function updateTimer() {
    if (timeLeft <= 0) {
        display.textContent = "Redirecting...";
        clearInterval(timerInterval);
        window.location.href = "Lesson.html";
        return;
    }
     const minutes = Math.floor(timeLeft / 60);
     const seconds = timeLeft % 60;
     display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
     timeLeft--;
}
updateTimer(); 
const timerInterval = setInterval(updateTimer, 1000);
