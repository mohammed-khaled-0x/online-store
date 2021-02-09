document.onclick = (e) => {
    const searchBox = document.getElementById('search_box')
    const searchResultContainer = document.getElementById('search_result_container');
    const resultHistory = document.getElementsByClassName('result-container')[0];

    if(e.target.id === 'search_box') {
        searchBox.style.borderBottomLeftRadius = 'unset'
        searchBox.style.borderBottomRightRadius = 'unset'
        setTimeout( () => {
            searchResultContainer.style.display = 'flex';
            resultHistory.style.display = 'flex';
        }, 1 )
        setTimeout( () => {searchResultContainer.style.height = '10em';}, 500 );
        setTimeout( () => {
            resultHistory.style.opacity = 1;
            resultHistory.style.top = '0';
        }, 1000);
    } else if(searchResultContainer.style.display !== '') {
        console.log(e)
        for(let i of e.path) {
            console.log(i.id)
            if(i.id !== 'search_result_container') {
                resultHistory.style.opacity = 0;
                resultHistory.style.top = '-2em';
                setTimeout( () => {
                    searchResultContainer.style.display = 'none';
                    resultHistory.style.display = 'none';
                }, 2000 );
                setTimeout( () => {
                    searchResultContainer.style.height = '0';
                    searchBox.style.borderBottomLeftRadius = '1em'
                    searchBox.style.borderBottomRightRadius = '1em'
                }, 500 );
            }
        }
        if(e.target.id !== 'search_result_container') {
        }
    }
}

