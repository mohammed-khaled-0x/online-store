const searchBox = document.getElementById('search_box');

searchBox.onkeyup = async () => {
    const searchBoxValue = document.getElementById('search_box').value;
    if(searchBoxValue.length > 3) {
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
            console.log(response)
        });
    }
};