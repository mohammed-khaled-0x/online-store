const getCategory = async (categoryId) => {
    await fetch(`https://mystore9.herokuapp.com/products/categories/${categoryId}/1/en `)
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
        window.location.href = '#search_result_label';

        return response;
    })
    .then(response => {
        console.log(response)
        const responseContainer = document.getElementById(`search_result_label`);

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
                const viewProductContainer = document.getElementById('view_product_container');
                viewProductContainer.style.display = 'flex';
                setTimeout( () => {
                    viewProductContainer.style.opacity = '1';
                }, 5)
            }

            productContainer.append(productImage);
            productContainer.append(productNameShadow);
            productContainer.append(productPrice);
            productContainer.append(productName);
            productsContainer.append(productContainer)
        }
        responseContainer.append(productsContainer);
    })
}

export default getCategory;