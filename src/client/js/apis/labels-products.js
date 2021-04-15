import viewProduct from './view-product';
const labels = ['trending', 'best-selling', 'new-arrival'];

const labelsProducts = async () => {
    for(let label of labels) {
        await fetch(`https://mystore9.herokuapp.com/products/${label}/1/en`)
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
            const mainBody = document.getElementById('body');
            const productsSection = document.createElement('section');
            productsSection.classList.add('products-section', 'ltr-header', 'main-width');

            const productsContainer = document.createElement('div');
            productsContainer.id = label.split('-').join('_');
            productsContainer.classList.add('products-container', 'container-shadow');

            const sectionTitle = document.createElement('h2');
            sectionTitle.innerText = label.split('-').join(' ');
            sectionTitle.classList.add('section-title');

            const leftArrowBackground = document.createElement('div');
            leftArrowBackground.className = 'arrow-background';
            const rightArrowBackground = document.createElement('div');
            rightArrowBackground.className = 'arrow-background';





            const leftArrowContainer = document.createElement('div');
            leftArrowContainer.classList.add('arrow', 'left-product-click');
            leftArrowContainer.innerHTML = `
            <div class="arrow-background"></div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="transform: rotate(180deg);">
                <path d="M0 0h24v24H0V0z" fill="none"></path>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"></path>
            </svg>`

            const rightArrowContainer = document.createElement('div');
            rightArrowContainer.classList.add('arrow', 'right-product-click');
            rightArrowContainer.innerHTML = `
            <div class="arrow-background"></div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0V0z" fill="none"></path>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"></path>
            </svg>`

            productsContainer.append(sectionTitle);
            productsContainer.append(leftArrowContainer);
            productsContainer.append(rightArrowContainer);
            productsSection.append(productsContainer);
            mainBody.append(productsSection);

            return response;
        })
        .then(response => {
            const labelContainer = document.getElementById(`${label.split('-').join('_')}`);

            const productsContainer = document.createElement('div');
            productsContainer.className = 'products';

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

                const productCurrentPrice = document.createElement('span');
                productCurrentPrice.classList.add('price', 'product-current-price');
                productCurrentPrice.innerHTML = product.price1;

                const productNewPrice = document.createElement('span');
                productNewPrice.classList.add('price', 'product-new-price');

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

                productPrice.append(productCurrentPrice);
                productPrice.append(productNewPrice);
                productPrice.append(discount);

                const productNameShadow = document.createElement('div');
                productNameShadow.className = 'product-name-shadow';

                productContainer.onclick = () => {
                    viewProduct(product.id);
                }

                productContainer.append(productImage);
                productContainer.append(productNameShadow);
                productContainer.append(productPrice);
                productContainer.append(productName);
                productsContainer.append(productContainer)
            }
            labelContainer.append(productsContainer);
        })
        .then(response => {
            const leftProductsSlidersArrow = document.getElementsByClassName('left-product-click');
            const rightProductsSlidersArrow = document.getElementsByClassName('right-product-click');
            const productWidth = document.getElementsByClassName('product')[0];

            for(let leftArrow of leftProductsSlidersArrow) {
                leftArrow.onclick = () => {
                    leftArrow.parentElement.lastElementChild.scrollBy(-productWidth.offsetWidth * 2, 0)
                }
            }

            for(let rightArrow of rightProductsSlidersArrow) {
                rightArrow.onclick = () => {
                    rightArrow.parentElement.lastElementChild.scrollBy(productWidth.offsetWidth * 2, 0)
                }
            }
        })
    }
}

labelsProducts();