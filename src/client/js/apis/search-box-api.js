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
            searchResultContainer.style.height = '10em';
            resultContainer.style.display = 'flex';
        }, 500 );

        setTimeout( () => {
            resultContainer.style.opacity = 1;
            resultContainer.style.top = 0;
        }, 1250)

        await fetch(`https://mystore9.herokuapp.com/products/auto-suggestion/${searchBoxValue}/`)
        .then(response => {
            if(response.statusText !== 'ok' || response.status !== 404) {
                return response.json();
            } else {
                console.log('there is an error while fetching');
                return false;
            }
        })
        .then(response => {

            //check if there any result
            const resultOfSearch = document.getElementById('result_of_search');

            if(resultOfSearch.hasChildNodes()) {
                //searchResult.removeChild(document.querySelector('#result_of_search'))
                resultOfSearch.innerHTML = '';
            }

            for(let i of response) {
                let itemOfSearch = document.createElement('li');
                itemOfSearch.innerHTML = i;
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