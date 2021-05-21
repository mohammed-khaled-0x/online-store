import pixelsToEm from './assistants functions/unit conversion/pixels-to-em';

// Search Box
const searchBox = document.getElementById('search_box');
// Search result container
const searchResultContainer = document.getElementById('search_result_container');
// Result Container
const resultContainer = document.getElementsByClassName('result-container')[0];


window.onclick = (e) => {
    // Open search result container of search box
    // Check if client click on search box to open drop list.
    // Make sure that the drop list still open while click on it.
    let checkSearchBox, checkDropList;
    if(e.path) {
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
    } else if(e.target.id === 'search_box' || e.target.id === 'search_result_placeholder' || e.target.className === 'result-container') {
        checkSearchBox = true;
        console.log('checkwd')
    }
    console.log(e)

    if(checkSearchBox) {
        searchBox.style.borderBottomLeftRadius = 0;
        searchBox.style.borderBottomRightRadius = 0;
        searchResultContainer.style.display = 'flex';
        resultContainer.style.display = 'flex';

        setTimeout( () => {
            searchResultContainer.style.minHeight = '10em';
            resultContainer.style.height = '10em';
            resultContainer.style.opacity = 1;
            resultContainer.style.top = 0;
        }, 500 );
    } else if(checkDropList){

    } else {
        // Result of search
        const resultOfSearch = document.getElementById('result_of_search');
        resultOfSearch.style.opacity = 0;
        resultContainer.style.opacity = 0;
        resultContainer.style.top = '-2em';
        searchResultContainer.style.minHeight = 0;
        resultContainer.style.height = 0;

        setTimeout( () => {
            searchBox.style.borderBottomLeftRadius = '1em';
            searchBox.style.borderBottomRightRadius = '1em';
        }, 500 );

        setTimeout( () => {
            searchResultContainer.style.display = 'none';
            resultContainer.style.display = 'none';
            resultOfSearch.style.display = 'none';
            if(resultOfSearch.hasChildNodes()) {
                resultOfSearch.innerHTML = '';
            }
        }, 800 );
        // Placeholder of search result container
        const searchResultPlaceholder = document.getElementById('search_result_placeholder');
        searchResultPlaceholder.innerText = 'If you want to search for anything, look here, everything you want is waiting for you now, then what are you waiting for?'
        setTimeout( () => {
            searchResultPlaceholder.style.display = 'inline';
        },1000)
        setTimeout( () => {
            searchResultPlaceholder.style.opacity = 1;
        }, 1050)
    }
};

/*
// Search Container
const mainSearchContainer = document.getElementsByClassName('search')[0];
mainSearchContainer.onmouseenter = () => {
    // Result of search
    const resultOfSearch = document.getElementById('result_of_search');
    if(resultOfSearch.offsetHeight > searchResultContainer.offsetHeight) {
        searchResultContainer.style.height = `${pixelsToEm(resultOfSearch.offsetHeight)}em`;
        console.log(searchResultContainer.style.height)
    }
}
mainSearchContainer.onmouseover = () => {
    // Result of search
    const resultOfSearch = document.getElementById('result_of_search');
    if(resultOfSearch.offsetHeight > searchResultContainer.offsetHeight) {
        searchResultContainer.style.height = `${pixelsToEm(resultOfSearch.offsetHeight)}em`;
    }
}*/