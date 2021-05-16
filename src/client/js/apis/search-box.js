import pixelsToEm from '../assistants functions/unit conversion/pixels-to-em';
import viewportToPixels from '../assistants functions/unit conversion/vw-or-vh-to-pixels';
import viewProduct from './view-product';
//let searchHistory = []

var typingTimer;                //timer identifier
var doneTypingInterval = 500;  //time in ms

// Search Box
const searchBox = document.getElementById('search_box');
const searchLens = document.getElementById('search_lens');

// Search will work while typing and fetch data
searchBox.onkeyup =  async (e, currencyId=1) => {
    clearTimeout(typingTimer);
    if(e.keyCode === 13) {
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
        const resultContainer = document.getElementsByClassName('result-container')[0];
        const resultOfSearch = document.getElementById('result_of_search');
        const searchResultContainer = document.getElementById('search_result_container');
        resultOfSearch.style.opacity = 0;
        resultContainer.style.opacity = 0;
        resultContainer.style.top = '-2em';
        searchResultContainer.style.minHeight = 0;
        resultContainer.style.height = 0;

        setTimeout( () => {
            searchBox.style.borderBottomLeftRadius = '1em';
            searchBox.style.borderBottomRightRadius = '1em';
        }, 500 );

        setTimeout( () => {
            searchResultContainer.style.display = 'none';
            resultContainer.style.display = 'none';
            resultOfSearch.style.display = 'none';
            if(resultOfSearch.hasChildNodes()) {
                resultOfSearch.innerHTML = '';
            }
        }, 800 );
        // Placeholder of search result container
        const searchResultPlaceholder = document.getElementById('search_result_placeholder');
        searchResultPlaceholder.innerText = 'If you want to search for anything, look here, everything you want is waiting for you now, then what are you waiting for?'
        setTimeout( () => {
            searchResultPlaceholder.style.display = 'inline';
        },1)
        setTimeout( () => {
            searchResultPlaceholder.style.opacity = 1;
        }, 2)
    } else {
        //const searchBoxValue = document.getElementById('search_box').value;
        typingTimer = setTimeout( () => {
    
            if(searchBox.value.length > 3) {
                searchLens.style.opacity = 1;
                // Placeholder of search result container
                const searchResultPlaceholder = document.getElementById('search_result_placeholder');
                //searchResultPlaceholder.innerText = 'please wait...';
                // Result of search
                const resultOfSearch = document.getElementById('result_of_search');
                resultOfSearch.style.opacity = 0;
                    
                setTimeout( () => {
                    resultOfSearch.style.display = 'none';
                    //searchResultPlaceholder.style.display = 'inline';
                }, 1)
                
                setTimeout( () => {
                    //searchResultPlaceholder.style.opacity = 1;
                }, 1100)
        
                setTimeout( async () => {
                    // Search Box
                    const searchBox = document.getElementById('search_box');
                    // Search result container
                    const searchResultContainer = document.getElementById('search_result_container');
            
                    await fetch(`https://mystore9.herokuapp.com/products/auto-suggestion/${searchBox.value}/`)
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
                        
                        if(response.message) {
                            searchResultPlaceholder.innerText = response.message;
                            setTimeout( () => {
                                searchResultPlaceholder.style.display = 'inline';
                            }, 1)
                            setTimeout( () => {
                                searchResultPlaceholder.style.opacity = 1;
                            }, 2)
                            return console.log('error in search');
                        } else {
                            // Result of search
                            const resultOfSearch = document.getElementById('result_of_search');
    
                            // Check if there any result
                            if(resultOfSearch.hasChildNodes()) {
                                //searchResult.removeChild(document.querySelector('#result_of_search'))
                                resultOfSearch.innerHTML = '';
                            }
                
                            for(let i of response) {
                                const itemOfSearch = document.createElement('li');
                                const itemBackground = document.createElement('div');
                                const item = document.createElement('span');
                
                                itemBackground.className = 'result-item-background';
                                
                                item.innerHTML = i;
                                itemOfSearch.appendChild(item);
                                itemOfSearch.appendChild(itemBackground);
                                resultOfSearch.appendChild(itemOfSearch);
                            }
                
                            searchResultPlaceholder.style.opacity = 0;
                            
                            setTimeout( () => {
                                // Result of search
                                const resultOfSearch = document.getElementById('result_of_search');
                                resultOfSearch.style.display = 'flex';
                                searchResultPlaceholder.style.display = 'none';
                                if(resultOfSearch.offsetHeight > searchResultContainer.offsetHeight) {
                                    searchResultContainer.style.minHeight = `${pixelsToEm(resultOfSearch.offsetHeight)}em`;
                                }
                            }, 1)
                            
                            setTimeout( () => {
                                resultOfSearch.style.opacity = 1;
                            }, 2)
            
                            /*setTimeout( () => {
                                if(searchHistory.length === 0) {
                                    searchHistory.push(searchBoxValue);
                                    localStorage['search-history'] = JSON.stringify(searchHistory);
                                    console.log('new to add')
                                    return 'new to add';
                                } else {
                                    let newSearch = false;
                                    for(let i of searchHistory) {
                                        if( i === searchBoxValue) {
                                            const index = searchHistory.indexOf(i);
                                            if(index > -1) {
                                                searchHistory.splice(index, 1);
                                            }
                                            searchHistory.push(i)
                                            localStorage['search-history'] = JSON.stringify(searchHistory);
                                            console.log('old');
                                            newSearch = false;
                                            break;
                                        } else {
                                            newSearch = true;
                                        }
                                    }
                                    /*for(let i of searchHistory) {
                                        for(let j of searchHistory) {
                                            if(i.includes(j)) {
                                                const index = searchHistory.indexOf(i);
                                                if(index > -1) {
                                                    searchHistory.splice(index, 1);
                                                }
                                            }
                                        }
                                        localStorage['search-history'] = JSON.stringify(searchResult);
                                    }*/
                                    /*if(newSearch) {
                                        searchHistory.push(searchBoxValue);
                                        localStorage['search-history'] = JSON.stringify(searchHistory);
                                        console.log('this is new of list')
                                        return 'this is new of list';
                                    }
                                }
                            }, 2000)*/
                        }
            
                        /*const resultOfSearch = document.getElementById('result_of_search');
                        if(resultOfSearch.offsetHeight > searchResultContainer.offsetHeight) {
                            searchResultContainer.style.height = `${pixelsToEm(resultOfSearch.offsetHeight)}em`;
                        }*/
            
            
                    });
                }, 1);
        
            } else if(searchBox.value.length === 0) {
                searchLens.style.opacity = 0.4;
                // Placeholder of search result container
                const searchResultPlaceholder = document.getElementById('search_result_placeholder');
                // Result of search
                const resultOfSearch = document.getElementById('result_of_search');
                resultOfSearch.style.opacity = 0;
                setTimeout( () => {
                    resultOfSearch.style.display = 'none';
                }, 1)
        
                searchResultPlaceholder.innerText = 'If you want to search for anything, look here, everything you want is waiting for you now, then what are you waiting for?'
                setTimeout( () => {
                    const searchResultContainer = document.getElementById('search_result_container');
                    searchResultContainer.style.minHeight = '10em';
                    searchResultPlaceholder.style.display = 'inline';
                },1)
                setTimeout( () => {
                    searchResultPlaceholder.style.opacity = 1;
                }, 2)
            }
    
        }, doneTypingInterval )
    }

   
};

// On keydown, clear the countdown 
searchBox.onkeydown = (e) => {
    // Result of search
    if(e.keyCode !== 13) {
        if(searchBox.value > 0) {
            const searchResultPlaceholder = document.getElementById('search_result_placeholder');
            searchResultPlaceholder.innerText = 'please wait...';
            const resultOfSearch = document.getElementById('result_of_search');
            resultOfSearch.style.opacity = 0;
            const searchResultContainer = document.getElementById('search_result_container');
            searchResultContainer.style.minHeight = '10em';
            setTimeout( () => {
                resultOfSearch.style.display = 'none';
                searchResultPlaceholder.style.display = 'inline';
            }, 1)
            
            setTimeout( () => {
                searchResultPlaceholder.style.opacity = 1;
            }, 2)
    
        }
        
        // Placeholder of search result container
        clearTimeout(typingTimer);
    }
}

searchBox.onclick = () => {
    if(searchBox.value.length > 3) {

        // Placeholder of search result container
        const searchResultPlaceholder = document.getElementById('search_result_placeholder');
        searchResultPlaceholder.innerText = 'please wait...';
        // Result of search
        const resultOfSearch = document.getElementById('result_of_search');
        resultOfSearch.style.opacity = 0;
            
        setTimeout( () => {
            resultOfSearch.style.display = 'none';
            searchResultPlaceholder.style.display = 'inline';
        }, 1)
        
        setTimeout( () => {
            searchResultPlaceholder.style.opacity = 1;
        }, 2)

        setTimeout( async () => {
            // Search Box
            const searchBox = document.getElementById('search_box');
            // Search result container
            const searchResultContainer = document.getElementById('search_result_container');
    
            await fetch(`https://mystore9.herokuapp.com/products/auto-suggestion/${searchBox.value}/`)
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
                
                if(response.message) {
                    searchResultPlaceholder.innerText = response.message;
                    return console.log('error in search');
                } else {
                    // Result of search
                    const resultOfSearch = document.getElementById('result_of_search');

                    // Check if there any result
                    if(resultOfSearch.hasChildNodes()) {
                        //searchResult.removeChild(document.querySelector('#result_of_search'))
                        resultOfSearch.innerHTML = '';
                    }
        
                    for(let i of response) {
                        const itemOfSearch = document.createElement('li');
                        const itemBackground = document.createElement('div');
                        const item = document.createElement('span');
        
                        itemBackground.className = 'result-item-background';
                        
                        item.innerHTML = i;
                        itemOfSearch.appendChild(item);
                        itemOfSearch.appendChild(itemBackground);
                        resultOfSearch.appendChild(itemOfSearch);
                    }
        
                    searchResultPlaceholder.style.opacity = 0;
                    
                    setTimeout( () => {
                        // Result of search
                        const resultOfSearch = document.getElementById('result_of_search');
                        resultOfSearch.style.display = 'flex';
                        searchResultPlaceholder.style.display = 'none';
                        if(resultOfSearch.offsetHeight > searchResultContainer.offsetHeight) {
                            searchResultContainer.style.minHeight = `${pixelsToEm(resultOfSearch.offsetHeight)}em`;
                        }
                    }, 1)
                    
                    setTimeout( () => {
                        resultOfSearch.style.opacity = 1;
                    }, 2)
    
                    /*setTimeout( () => {
                        if(searchHistory.length === 0) {
                            searchHistory.push(searchBoxValue);
                            localStorage['search-history'] = JSON.stringify(searchHistory);
                            console.log('new to add')
                            return 'new to add';
                        } else {
                            let newSearch = false;
                            for(let i of searchHistory) {
                                if( i === searchBoxValue) {
                                    const index = searchHistory.indexOf(i);
                                    if(index > -1) {
                                        searchHistory.splice(index, 1);
                                    }
                                    searchHistory.push(i)
                                    localStorage['search-history'] = JSON.stringify(searchHistory);
                                    console.log('old');
                                    newSearch = false;
                                    break;
                                } else {
                                    newSearch = true;
                                }
                            }
                            /*for(let i of searchHistory) {
                                for(let j of searchHistory) {
                                    if(i.includes(j)) {
                                        const index = searchHistory.indexOf(i);
                                        if(index > -1) {
                                            searchHistory.splice(index, 1);
                                        }
                                    }
                                }
                                localStorage['search-history'] = JSON.stringify(searchResult);
                            }*/
                            /*if(newSearch) {
                                searchHistory.push(searchBoxValue);
                                localStorage['search-history'] = JSON.stringify(searchHistory);
                                console.log('this is new of list')
                                return 'this is new of list';
                            }
                        }
                    }, 2000)*/
                }
    
                /*const resultOfSearch = document.getElementById('result_of_search');
                if(resultOfSearch.offsetHeight > searchResultContainer.offsetHeight) {
                    searchResultContainer.style.height = `${pixelsToEm(resultOfSearch.offsetHeight)}em`;
                }*/
    
    
            });
        }, 500);

    } else if(searchBox.value.length === 0) {
        // Placeholder of search result container
        const searchResultPlaceholder = document.getElementById('search_result_placeholder');
        // Result of search
        const resultOfSearch = document.getElementById('result_of_search');
        resultOfSearch.style.opacity = 0;
        setTimeout( () => {
            resultOfSearch.style.display = 'none';
        }, 1)

        searchResultPlaceholder.innerText = 'If you want to search for anything, look here, everything you want is waiting for you now, then what are you waiting for?'
        setTimeout( () => {
            const searchResultContainer = document.getElementById('search_result_container');
            searchResultContainer.style.minHeight = '10em';
            searchResultPlaceholder.style.display = 'inline';
        },1)
        setTimeout( () => {
            searchResultPlaceholder.style.opacity = 1;
        }, 2)
    }
}

