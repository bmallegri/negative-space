const selector = document.getElementById('after-select')
const display = document.getElementById('journal-after')
const lessonInput = document.getElementById('lessonInput')
const saveReflectionButton = document.getElementById('saveReflectionButton')
const lessons = JSON.parse(localStorage.getItem('lessons')) || [];
const resetButton = document.getElementById('resetButton');
const journalEntry = document.getElementById('journalEntry');
const journalPage = document.getElementById('journalPage');
let currentPage = 0;
const entriesPerPage = 2;
const previousPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');

const mentalHealthLessons = [
    "It's okay to have days where you don't accomplish much. Rest is part of taking care of yourself.",
    "You don't have to solve everything at once. Focus on one small thing you can do today.",
    "Taking a break doesn't mean you've failed. Sometimes stepping away helps you come back with more energy.",
    "Your feelings are worth paying attention to, even when you can't explain exactly why you feel them.",
    "Progress doesn't always look obvious. Small steps still count.",
    "You don't have to compare your progress to anyone else's. Everyone moves at their own pace.",
    "Doing something you enjoy, even for a short time, can be a meaningful way to take care of yourself."
];
const sessionNumber = lessons.length + 1;

const lessonNumberDisplay = document.getElementById('Lesson-number');
const lessonContentDisplay = document.getElementById('lesson-content');

if (lessonNumberDisplay && lessonContentDisplay) {
    lessonNumberDisplay.textContent = `Lesson ${sessionNumber}`;
    
    lessonContentDisplay.textContent =
        mentalHealthLessons[sessionNumber - 1] || 
        "Remember to take care of yourself and give yourself room to rest.";
}
if(previousPage && nextPage){
    previousPage.addEventListener('click', function(){
        if (currentPage > 0) {
            currentPage-=2;
            displayPages();
        }
    });
    nextPage.addEventListener('click', function(){
        const totalPages = Math.ceil(lessons.length / entriesPerPage);
        if ((currentPage + 2) < totalPages) {
            currentPage+=2;
            displayPages();
        }
    });
}

function updateControls(){
    const totalPages = Math.ceil(lessons.length / entriesPerPage);
    previousPage.disabled = currentPage === 0;
    nextPage.disabled = currentPage + 2 >= totalPages;
}
function createJournalPage(pageIndex){
    const page = document.createElement('div');
    page.classList.add('journal-page');
    const startIndex = pageIndex * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    for (let i = startIndex; i < endIndex && i < lessons.length; i++) {
        const entry = createJournalEntry(lessons[i]);
        page.appendChild(entry);
    }
    return page;
}
if (resetButton){
    resetButton.addEventListener('click', function(){
        localStorage.removeItem('lessons');
        lessons.length = 0;
        localStorage.setItem("sessionComplete", "false");
        document.body.style.backgroundColor = "#1f2024";
    });
}
if (selector && display){
    selector.addEventListener('change', function(){
        display.src = this.value;
    });
}
if (saveReflectionButton){
    saveReflectionButton.addEventListener('click', function(){
        const lesson = {
            lessonNumber: document.getElementById('Lesson-number').textContent,
            lesson: document.getElementById('lesson-content').textContent,
            image: display.src,
            reflection: lessonInput.value
        };
        lessons.push(lesson);
        localStorage.setItem('lessons', JSON.stringify(lessons));
        window.location.href = "Journal.html";
    });
}
function displayPages(){
    journalPage.innerHTML = '';
    const firstPage = createJournalPage(currentPage);
    journalPage.appendChild(firstPage);
    const secondPage = createJournalPage(currentPage + 1);
    journalPage.appendChild(secondPage);
    updateControls();
}
window.onload = function(){
    if (!journalPage){
        return;
    }
    displayPages();
}
function createJournalEntry(lesson){
    const entry = document.createElement('div');
    entry.classList.add('journal-entry');
    const beforeFrame = document.createElement('div');
    beforeFrame.classList.add('picture-frame');
    const lessonInfo = document.createElement('div');
    lessonInfo.classList.add('lesson-info');
    const lessonNumber = document.createElement('p');
    lessonNumber.textContent = lesson.lessonNumber;
    const lessonText = document.createElement('p');
    lessonText.textContent = lesson.lesson;
    lessonInfo.appendChild(lessonNumber);
    lessonInfo.appendChild(lessonText);
    beforeFrame.appendChild(lessonInfo);
    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    arrow.classList.add('drawn-arrow');
    arrow.setAttribute('viewBox', '0 0 100 50');
    arrow.innerHTML = `
    <path d="M5 25 C25 5, 60 45, 90 25"
    fill="none"
    stroke="black"
    stroke-width="4"/>
    <path d="M75 20 L90 25 L76 40"
    fill="none"
    stroke="black"
    stroke-width="4"/>`;
    const afterFrame = document.createElement('div');
    afterFrame.classList.add('picture-frame');
    const afterImage = document.createElement('img');
    afterImage.classList.add('journal-after');
    afterImage.src = lesson.image;
    afterFrame.appendChild(afterImage);
    const reflectionContent = document.createElement('div');
    reflectionContent.classList.add('reflectionContent');
    const reflection = document.createElement('p');
    reflection.textContent = lesson.reflection;
    reflectionContent.appendChild(reflection);
    const dropdownButton = document.createElement('button');
    dropdownButton.classList.add('dropdown-btn');
    dropdownButton.textContent = "⌄";
    dropdownButton.addEventListener('click', () => {
        reflectionContent.classList.toggle('show');
        if(reflectionContent.classList.contains('show')){
            dropdownButton.textContent = "^";
        }else {
            dropdownButton.textContent = "⌄";
        }
    });
    afterFrame.appendChild(dropdownButton);
    afterFrame.appendChild(reflectionContent);
    entry.appendChild(beforeFrame);
    entry.appendChild(arrow);
    entry.appendChild(afterFrame);
    return entry;
}