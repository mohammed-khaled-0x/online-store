const english = document.getElementById('english');
const arabic = document.getElementById('arabic');
const header = document.getElementById('header');

english.onclick = () => {
    arabic.removeAttribute('class', 'title');
    english.className = 'selected-language';
    english.title = 'Selected Language';
    //header.classList.replace('rtl-header', 'ltr-header');
}

arabic.onclick = () => {
    english.removeAttribute('class', 'title');
    arabic.className = 'selected-language';
    arabic.title = 'Selected Language';
    //header.classList.replace('ltr-header', 'rtl-header');
}