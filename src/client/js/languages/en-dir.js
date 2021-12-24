const englishDirection = () => {
    const header = document.getElementById('header');
    header.classList.replace('rtl-header', 'ltr-header');
    const searchBox = document.getElementById('search_box');
    searchBox.placeholder = 'What are you waiting for? Search now ...';
    searchBox.title = 'All you need is here, just search';
    const searchResultPlaceholder = document.querySelector('#search_result_placeholder');
    searchResultPlaceholder.innerText = 'If you want to search for anything, look here, everything you want is waiting for you now, then what are you waiting for?'
    const helloSpan = document.querySelector('.hello');
    helloSpan.innerText = 'Hello';
    const logName = document.getElementById('log_name');
    if(logName.dataset.login === 'false') {
        logName.innerText = 'Do you have an account?';
    }
}

export default englishDirection;