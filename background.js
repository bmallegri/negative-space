const today = new Date().toDateString();
const savedDate = localStorage.getItem("sessionDate");

if (savedDate !== today) {
    localStorage.setItem("sessionDate", today);
    localStorage.setItem("sessionComplete", "false");
}

const sessionComplete = localStorage.getItem("sessionComplete") === "true";

if (sessionComplete) {
    document.body.style.backgroundColor = "rgb(45, 70, 85)";
} else {
    document.body.style.backgroundColor = "#1f2024";
}