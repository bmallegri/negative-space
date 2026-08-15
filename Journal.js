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
    const beforeImage = document.createElement('img');
    beforeImage.classList.add('journal-before');
    beforeImage.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_-5_hs7Zz92p2EbWxByF0Kcc2QfY8hRliRwt0pA5ohA&s=10";
    beforeFrame.appendChild(beforeImage);
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