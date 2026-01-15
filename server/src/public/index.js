// Uptime counter
let seconds = 0;
const uptimeElement = document.getElementById("uptime");

function updateUptime() {
    seconds++;
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    uptimeElement.textContent = `Uptime: ${hrs}h ${mins}m ${secs}s`;
}

setInterval(updateUptime, 1000);

// Optional: Animate green light pulsing
const greenLight = document.querySelector(".green-light");
setInterval(() => {
    greenLight.style.transform = `scale(${1 + Math.sin(Date.now() / 200) * 0.1})`;
}, 50);
