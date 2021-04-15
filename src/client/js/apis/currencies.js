const currencies = async () => {
    await fetch(`https://mystore9.herokuapp.com/currencies/exchange/`)
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

        const supBar = document.getElementsByClassName('sup-bar')[0];

        const currenciesContainer = document.createElement('div');
        currenciesContainer.id = 'currencies';

        for(let currency of response) {
            const currencyName = document.createElement('span');
            if(currency.code === 'USD') {
                currencyName.classList.add('active', 'currency');
            } else {
                currencyName.className = 'currency';
            }
            currencyName.innerText = currency.code;
            currencyName.title = currency.currency;
            currencyName.dataset.id = currency.id;
            currencyName.dataset.currency = currency.currency;
            currencyName.dataset.code = currency.code;
            currenciesContainer.append(currencyName);
        }
        supBar.append(currenciesContainer);
        return response;
    })
    .then(response => {
        const currency = document.querySelectorAll('.currency');
        for(let item of currency) {
            item.style.height = `calc(100% - ${response.length})`;
            item.onclick = () => {
                for(let curr of currency) {
                    curr.classList.remove('active');
                }
                item.classList.add('active');
                localStorage.setItem('curreny', item.dataset.code);
            }
        }
    })
}

currencies();