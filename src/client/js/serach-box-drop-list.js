const searchBox = document.getElementById('search_box');
const searchResultContainer = document.getElementById('search_result_container');
const resultHistory = document.getElementsByClassName('result-container')[0];

//get current target
window.onclick = (e) => {
    clearTimeout();
    let checkSearchBox, checkDropList;
    for(let i of e.path) {
        if(i.id === 'search_box') {
            checkSearchBox = true;
            break;
        } else if(i.id === 'search_result_container') {
            checkDropList = true;
            break;
        } else {
            checkSearchBox = false;
            checkDropList = false;
        }
    };

    if(checkSearchBox || checkDropList) {
        searchBox.style.borderBottomLeftRadius = 0;
        searchBox.style.borderBottomRightRadius = 0;
        searchResultContainer.style.display = 'flex';
        setTimeout( () => {
            searchResultContainer.style.height = '10em';
        }, 750 );
    } else {
        searchResultContainer.style.height = 0;
        setTimeout( () => {
            searchBox.style.borderBottomLeftRadius = '1em';
            searchBox.style.borderBottomRightRadius = '1em';
            searchResultContainer.style.display = 'none';
        }, 755 );
    }
    clearTimeout();
};