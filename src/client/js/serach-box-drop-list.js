import pixelsToEm from './assistants functions/unit conversion/pixels-to-em';

const searchBox = document.getElementById('search_box');
const searchResultContainer = document.getElementById('search_result_container');
const resultContainer = document.getElementsByClassName('result-container')[0];

window.onclick = (e) => {

    //check if client click on search box to open drop list.
    //make sure that the drop list still open while click on it.
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
            resultContainer.style.display = 'flex';
            const resultOfSearch = document.getElementById('result_of_search');
            if(resultOfSearch.offsetHeight > searchResultContainer.offsetHeight) {
                searchResultContainer.style.height = `${pixelsToEm(resultOfSearch.offsetHeight)}em`;
            }
        }, 500 );

        setTimeout( () => {
            //searchResultContainer.style.height = 'auto';
        }, 1500)

        setTimeout( () => {
            resultContainer.style.opacity = 1;
            resultContainer.style.top = 0;
        }, 1250)


    } else {
        resultContainer.style.opacity = 0;
        resultContainer.style.top = '-2em';
        setTimeout( () => {
            searchResultContainer.style.height = 0;
            //searchResultContainer.style.height = 0;
        }, 500)

        setTimeout( () => {
            searchBox.style.borderBottomLeftRadius = '1em';
            searchBox.style.borderBottomRightRadius = '1em';
        }, 1200 );

        setTimeout( () => {
            searchResultContainer.style.display = 'none';
            resultContainer.style.display = 'none';
        }, 1500 );
    }
};

const mainSearchContainer = document.getElementsByClassName('search')[0];
mainSearchContainer.onmouseenter = () => {
    const resultOfSearch = document.getElementById('result_of_search');
    if(resultOfSearch.offsetHeight > searchResultContainer.offsetHeight) {
        searchResultContainer.style.height = `${pixelsToEm(resultOfSearch.offsetHeight)}em`;
    }
}
mainSearchContainer.onmouseover = () => {
    const resultOfSearch = document.getElementById('result_of_search');
    if(resultOfSearch.offsetHeight > searchResultContainer.offsetHeight) {
        searchResultContainer.style.height = `${pixelsToEm(resultOfSearch.offsetHeight)}em`;
    }
}