import pixelsToEm from '../assistants functions/unit conversion/pixels-to-em';
import viewportToPixels from '../assistants functions/unit conversion/vw-or-vh-to-pixels';

let searchHistory = []

const searchBox = document.getElementById('search_box');

searchBox.onkeyup = async () => {
    const searchBoxValue = document.getElementById('search_box').value;
    const searchResultPlaceholder = document.getElementById('search_result_placeholder');
    searchResultPlaceholder.innerText = 'please wait...';

    if(searchBoxValue.length > 3) {

        const searchBox = document.getElementById('search_box');
        const searchResultContainer = document.getElementById('search_result_container');
        const resultContainer = document.getElementsByClassName('result-container')[0];
        searchBox.style.borderBottomLeftRadius = 0;
        searchBox.style.borderBottomRightRadius = 0;
        searchResultContainer.style.display = 'flex';

        setTimeout( () => {
            //searchResultContainer.style.height = '10em';
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

        await fetch(`https://mystore9.herokuapp.com/products/auto-suggestion/${searchBoxValue}/`)
        .then(response => {
            if(response.statusText !== 'ok' || response.status !== 404) {
                const convertResponse = response.json();
                console.log(convertResponse)
                return convertResponse;
            } else {
                console.log('there is an error while fetching');
                const convertResponse = response.json();
                console.log(convertResponse)
                return convertResponse;
            }
        })
        .then(response => {
            
            if(response.message) {
                console.log(response.message)
                searchResultPlaceholder.innerText = response.message;
                return 'error in search';
            } else {           
                const resultOfSearch = document.getElementById('result_of_search');
                console.log(response)
                //check if there any result
    
                if(resultOfSearch.hasChildNodes()) {
                    //searchResult.removeChild(document.querySelector('#result_of_search'))
                    resultOfSearch.innerHTML = '';
                }
    
                for(let i of response) {
                    const itemOfSearch = document.createElement('li');
                    const itemBackground = document.createElement('div');
                    const item = document.createElement('span');
    
                    itemBackground.className = 'result-item-background';
                    
                    item.innerHTML = i;
                    itemOfSearch.appendChild(item);
                    itemOfSearch.appendChild(itemBackground);
                    resultOfSearch.appendChild(itemOfSearch);
                }
    
                searchResultPlaceholder.style.opacity = 0;
                const searchResult = document.getElementById('search_result');
    
                setTimeout( () => {
                    resultOfSearch.style.display = 'flex';
                }, 1000)
                
                setTimeout( () => {
                    searchResultPlaceholder.style.display = 'none';
                    resultOfSearch.style.opacity = 1;
                }, 1100)

                /*setTimeout( () => {
                    if(searchHistory.length === 0) {
                        searchHistory.push(searchBoxValue);
                        localStorage['search-history'] = JSON.stringify(searchHistory);
                        console.log('new to add')
                        return 'new to add';
                    } else {
                        let newSearch = false;
                        for(let i of searchHistory) {
                            if( i === searchBoxValue) {
                                const index = searchHistory.indexOf(i);
                                if(index > -1) {
                                    searchHistory.splice(index, 1);
                                }
                                searchHistory.push(i)
                                localStorage['search-history'] = JSON.stringify(searchHistory);
                                console.log('old');
                                newSearch = false;
                                break;
                            } else {
                                newSearch = true;
                            }
                        }
                        /*for(let i of searchHistory) {
                            for(let j of searchHistory) {
                                if(i.includes(j)) {
                                    const index = searchHistory.indexOf(i);
                                    if(index > -1) {
                                        searchHistory.splice(index, 1);
                                    }
                                }
                            }
                            localStorage['search-history'] = JSON.stringify(searchResult);
                        }*/
                        /*if(newSearch) {
                            searchHistory.push(searchBoxValue);
                            localStorage['search-history'] = JSON.stringify(searchHistory);
                            console.log('this is new of list')
                            return 'this is new of list';
                        }
                    }
                }, 2000)*/
            }

            const resultOfSearch = document.getElementById('result_of_search');
            if(resultOfSearch.offsetHeight > searchResultContainer.offsetHeight) {
                searchResultContainer.style.height = `${pixelsToEm(resultOfSearch.offsetHeight)}em`;
            }


        });

    } else if(searchBoxValue.length === 0) {
        const resultOfSearch = document.getElementById('result_of_search');
        resultOfSearch.style.opacity = 0;
        setTimeout( () => {
            resultOfSearch.style.display = 'none';
        }, 1000)

        searchResultPlaceholder.innerText = 'If you want to search for anything, look here, everything you want is waiting for you now, then what are you waiting for?'
        setTimeout( () => {
            searchResultPlaceholder.style.display = 'inline';
        },1000)
        setTimeout( () => {
            searchResultPlaceholder.style.opacity = 1;
        }, 1050)
    }
};