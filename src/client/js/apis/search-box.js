import pixelsToEm from '../assistants functions/unit conversion/pixels-to-em';
import viewportToPixels from '../assistants functions/unit conversion/vw-or-vh-to-pixels';

//let searchHistory = []

var typingTimer;                //timer identifier
var doneTypingInterval = 500;  //time in ms

// Search Box
const searchBox = document.getElementById('search_box');
// Search will work while typing and fetch data
searchBox.onkeyup =  () => {
    clearTimeout(typingTimer);

    //const searchBoxValue = document.getElementById('search_box').value;
    typingTimer = setTimeout( () => {

        if(searchBox.value.length > 3) {

            // Placeholder of search result container
            const searchResultPlaceholder = document.getElementById('search_result_placeholder');
            searchResultPlaceholder.innerText = 'please wait...';
            // Result of search
            const resultOfSearch = document.getElementById('result_of_search');
            resultOfSearch.style.opacity = 0;
                
            setTimeout( () => {
                resultOfSearch.style.display = 'none';
                searchResultPlaceholder.style.display = 'inline';
            }, 1000)
            
            setTimeout( () => {
                searchResultPlaceholder.style.opacity = 1;
            }, 1100)
    
            setTimeout( async () => {
                // Search Box
                const searchBox = document.getElementById('search_box');
                // Search result container
                const searchResultContainer = document.getElementById('search_result_container');
        
                await fetch(`https://mystore9.herokuapp.com/products/auto-suggestion/${searchBox.value}/`)
                .then(response => {
                    if(response.statusText !== 'ok' || response.status !== 404) {
                        const convertResponse = response.json();
                        return convertResponse;
                    } else {
                        console.log('there is an error while fetching');
                        const convertResponse = response.json();
                        return convertResponse;
                    }
                })
                .then(response => {
                    
                    if(response.message) {
                        searchResultPlaceholder.innerText = response.message;
                        return console.log('error in search');
                    } else {
                        // Result of search
                        const resultOfSearch = document.getElementById('result_of_search');

                        // Check if there any result
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
                        
                        setTimeout( () => {
                            // Result of search
                            const resultOfSearch = document.getElementById('result_of_search');
                            resultOfSearch.style.display = 'flex';
                            searchResultPlaceholder.style.display = 'none';
                            if(resultOfSearch.offsetHeight > searchResultContainer.offsetHeight) {
                                searchResultContainer.style.minHeight = `${pixelsToEm(resultOfSearch.offsetHeight)}em`;
                                console.log(searchResultContainer.style.height)
                            }
                        }, 1000)
                        
                        setTimeout( () => {
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
        
                    /*const resultOfSearch = document.getElementById('result_of_search');
                    if(resultOfSearch.offsetHeight > searchResultContainer.offsetHeight) {
                        searchResultContainer.style.height = `${pixelsToEm(resultOfSearch.offsetHeight)}em`;
                    }*/
        
        
                });
            }, 500);
    
        } else if(searchBox.value.length === 0) {
            // Placeholder of search result container
            const searchResultPlaceholder = document.getElementById('search_result_placeholder');
            // Result of search
            const resultOfSearch = document.getElementById('result_of_search');
            resultOfSearch.style.opacity = 0;
            setTimeout( () => {
                resultOfSearch.style.display = 'none';
            }, 1000)
    
            searchResultPlaceholder.innerText = 'If you want to search for anything, look here, everything you want is waiting for you now, then what are you waiting for?'
            setTimeout( () => {
                const searchResultContainer = document.getElementById('search_result_container');
                searchResultContainer.style.minHeight = '10em';
                searchResultPlaceholder.style.display = 'inline';
            },1000)
            setTimeout( () => {
                searchResultPlaceholder.style.opacity = 1;
            }, 1050)
        }

    }, doneTypingInterval )
   
};

// On keydown, clear the countdown 
searchBox.onkeydown = () => {
    // Result of search
    if(searchBox.value > 0) {
        const searchResultPlaceholder = document.getElementById('search_result_placeholder');
        searchResultPlaceholder.innerText = 'please wait...';
        const resultOfSearch = document.getElementById('result_of_search');
        resultOfSearch.style.opacity = 0;
        const searchResultContainer = document.getElementById('search_result_container');
        searchResultContainer.style.minHeight = '10em';
        setTimeout( () => {
            resultOfSearch.style.display = 'none';
            searchResultPlaceholder.style.display = 'inline';
        }, 1000)
        
        setTimeout( () => {
            searchResultPlaceholder.style.opacity = 1;
        }, 1100)

    }
    
    // Placeholder of search result container
    clearTimeout(typingTimer);
}

searchBox.onclick = () => {
    if(searchBox.value.length > 3) {

        // Placeholder of search result container
        const searchResultPlaceholder = document.getElementById('search_result_placeholder');
        searchResultPlaceholder.innerText = 'please wait...';
        // Result of search
        const resultOfSearch = document.getElementById('result_of_search');
        resultOfSearch.style.opacity = 0;
            
        setTimeout( () => {
            resultOfSearch.style.display = 'none';
            searchResultPlaceholder.style.display = 'inline';
        }, 1000)
        
        setTimeout( () => {
            searchResultPlaceholder.style.opacity = 1;
        }, 1100)

        setTimeout( async () => {
            // Search Box
            const searchBox = document.getElementById('search_box');
            // Search result container
            const searchResultContainer = document.getElementById('search_result_container');
    
            await fetch(`https://mystore9.herokuapp.com/products/auto-suggestion/${searchBox.value}/`)
            .then(response => {
                if(response.statusText !== 'ok' || response.status !== 404) {
                    const convertResponse = response.json();
                    return convertResponse;
                } else {
                    console.log('there is an error while fetching');
                    const convertResponse = response.json();
                    return convertResponse;
                }
            })
            .then(response => {
                
                if(response.message) {
                    searchResultPlaceholder.innerText = response.message;
                    return console.log('error in search');
                } else {
                    // Result of search
                    const resultOfSearch = document.getElementById('result_of_search');

                    // Check if there any result
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
                    
                    setTimeout( () => {
                        // Result of search
                        const resultOfSearch = document.getElementById('result_of_search');
                        resultOfSearch.style.display = 'flex';
                        searchResultPlaceholder.style.display = 'none';
                        if(resultOfSearch.offsetHeight > searchResultContainer.offsetHeight) {
                            searchResultContainer.style.minHeight = `${pixelsToEm(resultOfSearch.offsetHeight)}em`;
                            console.log(searchResultContainer.style.height)
                        }
                    }, 1000)
                    
                    setTimeout( () => {
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
    
                /*const resultOfSearch = document.getElementById('result_of_search');
                if(resultOfSearch.offsetHeight > searchResultContainer.offsetHeight) {
                    searchResultContainer.style.height = `${pixelsToEm(resultOfSearch.offsetHeight)}em`;
                }*/
    
    
            });
        }, 500);

    } else if(searchBox.value.length === 0) {
        // Placeholder of search result container
        const searchResultPlaceholder = document.getElementById('search_result_placeholder');
        // Result of search
        const resultOfSearch = document.getElementById('result_of_search');
        resultOfSearch.style.opacity = 0;
        setTimeout( () => {
            resultOfSearch.style.display = 'none';
        }, 1000)

        searchResultPlaceholder.innerText = 'If you want to search for anything, look here, everything you want is waiting for you now, then what are you waiting for?'
        setTimeout( () => {
            const searchResultContainer = document.getElementById('search_result_container');
            searchResultContainer.style.minHeight = '10em';
            searchResultPlaceholder.style.display = 'inline';
        },1000)
        setTimeout( () => {
            searchResultPlaceholder.style.opacity = 1;
        }, 1050)
    }
}

