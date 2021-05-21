const getAddresses = async () => {
    await fetch('https://mystore9.herokuapp.com/orders/user-addresses/', {
            method: "GET",
            credentials: "same-origin",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.token}`
            }
        })
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
            console.log(response);
            if(response[0]) {
                console.log('array')
                const noAddresses = document.getElementsByClassName('no-addresses')[0];
                noAddresses.style.display = 'none';
                const addressesElements = document.createElement('div');
                addressesElements.className = 'addresses-elements';
                const address = document.createElement('span');
                address.className = 'address';
            } else {
                console.log('no')
            }
        })
}

export default getAddresses;