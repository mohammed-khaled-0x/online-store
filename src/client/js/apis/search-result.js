import notifications from './../assistants functions/notifications';
import viewProduct from './view-product';

const searchBox = document.getElementById('search_box');
const searchLens = document.getElementById('search_lens');

const circleOne = document.getElementsByClassName('lens-circle')[0];
const circleTwo = document.getElementsByClassName('lens-circle')[1];
const circleThree = document.getElementsByClassName('lens-circle')[2];
const circleFour = document.getElementsByClassName('lens-circle')[3];
const circleFive = document.getElementsByClassName('lens-circle')[4];

searchLens.onmousedown = () => {
    if(searchBox.value !== '') {
        circleOne.setAttribute('r', '208');
        circleTwo.setAttribute('r', '176');
        circleThree.setAttribute('r', '144');
        circleFour.setAttribute('r', '112');
        circleFive.setAttribute('r', '80');
        searchLens.style.opacity = 1;
    }
}

searchLens.onmouseenter = () => {
    if(searchBox.value !== '') {
        circleOne.setAttribute('r', '156');
        circleTwo.setAttribute('r', '132');
        circleThree.setAttribute('r', '108');
        circleFour.setAttribute('r', '84');
        circleFive.setAttribute('r', '60');
        searchLens.style.opacity = 1;
    }
}

searchLens.onmouseleave = () => {
    if(searchBox === '') {
        circleOne.setAttribute('r', '104');
        circleTwo.setAttribute('r', '88');
        circleThree.setAttribute('r', '72');
        circleFour.setAttribute('r', '56');
        circleFive.setAttribute('r', '40');
        searchLens.style.opacity = 0.4;
    }
}

searchLens.onclick = async (currencyId=1) => {
    const checkSearchResultLabel = document.getElementById('search_result_label');
    if(checkSearchResultLabel) {
        checkSearchResultLabel.parentNode.removeChild(checkSearchResultLabel);
    }
    if(searchBox.value !== '') {
        if(localStorage.currencyId) {
            currencyId = localStorage.currencyId;
        }
        await fetch(`https://mystore9.herokuapp.com/products/search/${currencyId}/en/?search=${searchBox.value}`)
        .then(response => {
            if(response.statusText === 'OK') {
                const convertResponse = response.json();
                return convertResponse;
            } else {
                console.log('there is an error while fetching');
                const convertResponse = response.json();
                return convertResponse;
            }
        })
        .then( response => {
            const mainBody = document.getElementById('body');
            const productsSection = document.createElement('section');
            productsSection.classList.add('products-section', 'ltr-header', 'main-width');

            const productsContainer = document.createElement('div');
            productsContainer.id = 'search_result_label';
            productsContainer.classList.add('products-container', 'container-shadow');

            const sectionTitle = document.createElement('h2');
            sectionTitle.innerText = 'Search Result';
            sectionTitle.classList.add('section-title');

            productsContainer.append(sectionTitle);
            productsSection.append(productsContainer);

            const productsSectionElements = document.querySelectorAll('.products-section');
            mainBody.insertBefore(productsSection, productsSectionElements[0]);

            return response;
        })
        .then(response => {
            const responseContainer = document.getElementById(`search_result_label`);

            const productsContainer = document.createElement('div');
            productsContainer.className = 'products';

            if(response.count === 0) {
                console.log(response.results)
                const noResultContainer = document.createElement('div');
                noResultContainer.className = 'no-result-container';
                const noResult = document.createElement('span');
                noResult.className = 'no-result';
                noResult.innerHTML = `There is no product that has this name '${searchBox.value}'`
                noResultContainer.append(noResult);
                productsContainer.append(noResultContainer);
            } else {
                for(let product of response.results) {
                    const productContainer = document.createElement('div');
                    productContainer.className = 'product';
    
                    const productName = document.createElement('h3');
                    productName.className = 'product-name';
                    productName.innerText = `${product['brand_name']} ${product['product_name']}`;
    
                    const productImage = document.createElement('img');
                    productImage.className = 'product-image';
                    productImage.src = `https://res.cloudinary.com/doit/${product.image1}`;
                    productImage.alt = `${product['brand_name']} ${product['product_name']}`;
                    if(product.balance > 5) {
                        productContainer.title = `${product['brand_name']} ${product['product_name']} (in Stock)`;
                    } else if (product.balance > 0) {
                        productContainer.title = `${product['brand_name']} ${product['product_name']} (about to finish)`;
                    } else {
                        productContainer.title = `${product['brand_name']} ${product['product_name']} (out of Stock)`;
                    }
    
                    const productPrice = document.createElement('div');
                    productPrice.className = 'product-price';
    
                    const totalPrice = document.createElement('span');
                    totalPrice.className = 'total-price';
    
                    const productCurrentPrice = document.createElement('span');
                    productCurrentPrice.classList.add('price', 'product-current-price');
                    productCurrentPrice.innerHTML = product.price1;
    
                    
                    const productNewPrice = document.createElement('span');
                    productNewPrice.classList.add('price', 'product-new-price');
    
                    const productCurrentCode = document.createElement('span');
                    productCurrentCode.classList.add('price', 'product-currency-code');
    
                    if(localStorage.currency) {
                        productCurrentCode.innerText = localStorage.currency;
                    } else {
                        productCurrentCode.innerText = 'USD';
                    }
    
                    const discount = document.createElement('span');
                    discount.classList.add('price', 'discount');
                    
                    if(product.price2) {
                        discount.innerHTML = (((100 / 100) - (product.price2 / product.price1)) * 100).toFixed() + '%';
                        productCurrentPrice.innerHTML = product.price1;
                        productCurrentPrice.classList.add('product-old-price')
                        productNewPrice.innerHTML = product.price2;
                    } else {
                        productCurrentPrice.innerHTML = product.price1;
                        productNewPrice.innerHTML = '';
                        productNewPrice.style.display = 'none';
                        discount.innerHTML = '';
                        discount.style.display = 'none';
                    }
    
                    totalPrice.append(productCurrentPrice);
                    totalPrice.append(productNewPrice);
                    totalPrice.append(productCurrentCode);
                    totalPrice.append(discount);
                    productPrice.append(totalPrice);
    
                    const productNameShadow = document.createElement('div');
                    productNameShadow.className = 'product-name-shadow';
    
                    productContainer.onclick = () => {
                        if(localStorage.currencyId) {
                            viewProduct(product.id, localStorage.currencyId, localStorage.currency);
                        } else {
                            viewProduct(product.id);
                        }
                        const viewProductContainer = document.getElementById('view_product_container');
                        viewProductContainer.style.display = 'flex';
                        setTimeout( () => {
                            viewProductContainer.style.opacity = '1';
                        }, 5)
                    }
    
                    const productUserRatingContainer = document.createElement('div');
                    productUserRatingContainer.className = 'product-user-rating-container';
    
                    productUserRatingContainer.innerHTML = `
                    <svg class="total-rating-stars-view-${product.id}-search" data-id="product_user_rating_average_star1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                        <polygon stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="  259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08   29.274,197.007 188.165,173.919 "/>
                    </svg>
                    <svg class="total-rating-stars-view-${product.id}-search" data-id="product_user_rating_average_star2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                        <polygon stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="  259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08   29.274,197.007 188.165,173.919 "/>
                    </svg>
                    <svg class="total-rating-stars-view-${product.id}-search" data-id="product_user_rating_average_star3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                        <polygon stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="  259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08   29.274,197.007 188.165,173.919 "/>
                    </svg>
                    <svg class="total-rating-stars-view-${product.id}-search" data-id="product_user_rating_average_star4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                        <polygon stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="  259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08   29.274,197.007 188.165,173.919 "/>
                    </svg>
                    <svg class="total-rating-stars-view-${product.id}-search" data-id="product_user_rating_average_star5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                        <polygon stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="  259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08   29.274,197.007 188.165,173.919 "/>
                    </svg>
                    `;
    
                    
                    productContainer.append(productImage);
                    productContainer.append(productNameShadow);
                    productContainer.append(productUserRatingContainer);
                    productContainer.append(productPrice);
                    productContainer.append(productName);
                    productsContainer.append(productContainer)
                    
                }
            }

            responseContainer.append(productsContainer);
            setTimeout( () => {
                window.location.href = '#search_result_label';
                setTimeout( () => {
                    window.scrollBy(0, -100)
                }, 400 );
            }, 100 );

            return response;
        })
        .then(response => {
            for(let product of response.results) {
                if(product['rating_average']) {
                    const averageStars = Number(product['rating_average'][0]);
                    for(let stars = 0; stars < averageStars; stars++) {
                        const star = document.getElementsByClassName(`total-rating-stars-view-${product.id}-search`)[stars];
                        star.style.fill = '#fff';
                    }
                }
            }
        })
    } else {
        notifications('The search cannot be completed and the search box is empty', 'error');
    }
}