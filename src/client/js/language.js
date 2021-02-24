// Arabic language conatiner
const arabic = document.getElementById('arabic');
// English language conatiner
const english = document.getElementById('english');
// Header
const header = document.getElementById('header');

// When click on arabic language conatiner the style will change
arabic.onclick = () => {
    english.removeAttribute('class', 'title');
    arabic.className = 'selected-language';
    arabic.title = 'Selected Language';
    //header.classList.replace('ltr-header', 'rtl-header');
}

// When click on english language conatiner the style will change
english.onclick = () => {
    arabic.removeAttribute('class', 'title');
    english.className = 'selected-language';
    english.title = 'Selected Language';
    //header.classList.replace('rtl-header', 'ltr-header');
}