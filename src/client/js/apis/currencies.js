import labelsProducts from './labels-products';

const currencies = async (currencyCode='USD') => {
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
            currencyName.className = 'currency';
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
                localStorage.setItem('currency', item.dataset.code);
                localStorage.setItem('currencyId', item.dataset.id);

                const allLabels = document.querySelectorAll('.products-section');
                for(let label of allLabels) {
                    label.parentNode.removeChild(label);
                }

                labelsProducts(item.dataset.id);

            }
        }

        const defaultCurrencyCode = document.querySelector(`[data-code="${currencyCode}"]`);
        defaultCurrencyCode.classList.add('active');
        localStorage.setItem('currencyId', defaultCurrencyCode.dataset.id);
        localStorage.setItem('currency', defaultCurrencyCode.dataset.code);
    })
}

export default currencies;