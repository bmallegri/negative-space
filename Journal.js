const selector = document.getElementById('after-select')
const display = document.getElementById('journal-after')
const lessonInput = document.getElementById('lessonInput')
const saveReflectionButton = document.getElementById('saveReflectionButton')
const reflectionDisplay = document.getElementById('reflectionDisplay')
const lessons = JSON.parse(localStorage.getItem('lessons')) || [];

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
    });
}
window.onload = function(){
    for (let i = 0; i < lessons.length; i++) {
        if (display) {
            display.src = lessons[i].image;
        }
        if (lessonInput) {
            lessonInput.value = lessons[i].reflection;
        }
        if (reflectionDisplay) {
            reflectionDisplay.textContent = lessons[i].reflection;
        }
    }
}
const dropdownButtons = document.querySelectorAll('.dropdown-btn');
        dropdownButtons.forEach(button => {
            button.addEventListener('click', () => {
                const content = button.closest('.picture-frame').querySelector('.reflectionContent');
                content.classList.toggle('show');
                if(content.classList.contains('show')){
                    button.textContent = "^";
                }else {
                    button.textContent = "⌄";
                }
            });
        });