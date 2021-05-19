import notifications from './../assistants functions/notifications';

const addAddress = document.getElementById('add_address');
const addressBox = document.getElementById('address_box');

const addAddressApi = async (addressBox, shippingCities) => {
    await fetch('https://mystore9.herokuapp.com/orders/user-addresses/', {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.token}`
        },
        body: JSON.stringify({
            "address": `${addressBox.value}`,
            "city": `${shippingCities.value}`,
        })
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
    .then( response => {
        console.log(response);
    })
}

addAddress.onclick = async () => {
    const shippingCities = document.getElementById('shipping_cities');
    const addressBoxValue = document.getElementById('address_box').value;

    if(addressBox.value !== '') {
        addAddressApi(addressBox, shippingCities);
        notifications('A new address has been added to this account successfully', 'ok');
        addressBox.value = '';

        const noAddresses = document.getElementsByClassName('no-addresses')[0];
        noAddresses.style.display = 'none';

        const addressesElements = document.createElement('div');
        addressesElements.className = 'addresses-elements';

        const address = document.createElement('span');
        address.className = 'address';
        address.innerHTML = `${shippingCities.options[shippingCities.selectedIndex].text}, ${addressBoxValue}`;

        addressesElements.append(address);

        const addressesContainer = document.getElementsByClassName('addresses-container')[0];
        addressesContainer.append(addressesElements);
        addressesElements.style.display = 'flex';
        addressesContainer.style.justifyContent = 'flex-start';
        addressBox.focus();
    } else {
        notifications('The address box should not be empty', 'warn');
    }
}

addressBox.onkeyup = (e) => {
    if(e.keyCode === 13) {
        const shippingCities = document.getElementById('shipping_cities');
        const addressBoxValue = document.getElementById('address_box').value;
        if(addressBox.value !== '') {
            addAddressApi(addressBox, shippingCities);
            notifications('A new address has been added to this account successfully', 'ok');
            addressBox.value = '';

            const noAddresses = document.getElementsByClassName('no-addresses')[0];
            noAddresses.style.display = 'none';

            const addressesElements = document.createElement('div');
            addressesElements.className = 'addresses-elements';

            const address = document.createElement('span');
            address.className = 'address';
            address.innerHTML = `${shippingCities.options[shippingCities.selectedIndex].text}, ${addressBoxValue}`;

            addressesElements.append(address);

            const addressesContainer = document.getElementsByClassName('addresses-container')[0];
            addressesContainer.append(addressesElements);
            addressesElements.style.display = 'flex';
            addressesContainer.style.justifyContent = 'flex-start';
            addressBox.focus();
        } else {
            notifications('The address box should not be empty', 'warn');
        }
    }
}