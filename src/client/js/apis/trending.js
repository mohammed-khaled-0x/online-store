const productsContainer = document.getElementById('products_container');

const trending = 'https://mystore9.herokuapp.com/products/trending/1/en';

const getTrending = async () => {

    await fetch(trending)
    .then(response => {
        if(response.statusText !== 'ok' || response.status !== 404) {
            const convertResponse = response.json();
            return convertResponse;
        } else {
            console.log('there is an error while fetching');
            const convertResponse = response.json();
            return convertResponse;
        }
    }).then( response => {
        console.log(response);
    })

};

getTrending();