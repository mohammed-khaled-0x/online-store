const getShipping = async (currencyId=1) => {
    await fetch(`https://mystore9.herokuapp.com/orders/shipping/${currencyId}/ar`)
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
        const shippingCities = document.getElementById('shipping_cities');

        for(let address of response) {
            const cityName = document.createElement('option');
            cityName.value = address.id;
            cityName.innerText = address['city_name'];

            shippingCities.append(cityName);
        }
    })
}

export default getShipping;