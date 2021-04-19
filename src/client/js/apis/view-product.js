const viewProduct = async (productId) => {
    await fetch(`https://mystore9.herokuapp.com/products/${productId}/1/en/`)
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
        const viewProductContainer = document.getElementById('view_product_container');
        const viewProductContent = document.getElementById('view_product_content');

        const productTitle = document.createElement('div');
        productTitle.className = 'product-title';

        const closeViewProduct = document.createElement('span');
        closeViewProduct.className = 'close-view-product';
        closeViewProduct.innerText = '+';

        const productName = document.createElement('h2');
        productName.className = 'product-Name';
        productName.innerHTML = `${response['brand_name']} ${response['product_name']}`

        const productStock = document.createElement('span');
        productStock.className = 'product-stock';

        if(response.balance > 5) {
            productStock.innerText = 'in Stock';
            productStock.style.color = 'rgb(0, 204, 0)';
        } else if (response.balance > 0) {
            productStock.innerText = 'about to finish';
            productStock.style.color = 'rgb(255, 204, 0)';
        } else {
            productStock.innerText = 'out of Stock';
            productStock.style.color = 'rgb(204, 0, 0)';
        }

        productTitle.append(closeViewProduct);
        productTitle.append(productName);
        productTitle.append(productStock);
        viewProductContent.append(productTitle);

        const productMainImage = document.createElement('div');
        productMainImage.className = 'product-main-image';

        const productAlbum = document.createElement('div');
        productAlbum.className = 'product-album';

        let imageIndex = 0;

        for(let key of Object.keys(response)) {
            if(key.includes('image')) {
                if(response[key]) {
                    imageIndex++;
                    const productImage = document.createElement('img');
                    productImage.className = 'product-image';
                    productImage.src = `https://res.cloudinary.com/doit/${response[key]}`;
                    productImage.id = `product_${key}`;
                    productImage.dataset.productImageId = `product_${key}`;

                    const productAlbumImage = document.createElement('img');
                    productAlbumImage.className = 'product-album-image';
                    productAlbumImage.src = `https://res.cloudinary.com/doit/${response[key]}`;
                    productAlbumImage.dataset.productImageId = `product_${key}`;

                    productAlbum.append(productAlbumImage);
                    productMainImage.append(productImage);
                    productMainImage.append(productAlbum);
                }
            }
        }
        
        viewProductContent.append(productMainImage);

        const fullProductContent = document.createElement('div');
        fullProductContent.id = 'full_product_content';

        const productDescriptionContainer = document.createElement('div');
        productDescriptionContainer.className = 'product-description-container content-containers';

        const productDescriptionTitle = document.createElement('h3');
        productDescriptionTitle.className = 'product-description-title';
        productDescriptionTitle.innerText = 'Description';

        const productDescription = document.createElement('p');
        if(response['product_description']) {
            productDescription.innerText = response['product_description'];
        } else {
            productDescription.innerText = 'Unfortunately, there is no description for this product!';
        }

        productDescriptionContainer.append(productDescriptionTitle);
        productDescriptionContainer.append(productDescription);
        fullProductContent.append(productDescriptionContainer);

        const productQuantityContainer = document.createElement('div');
        productQuantityContainer.className = 'product-quantity-container content-containers';

        const productQuantityInputs = document.createElement('div');
        productQuantityInputs.className = 'product-quantity-inputs';
        
        const productQuantityTitle = document.createElement('h3');
        productQuantityTitle.className = 'product-quantity-title';
        productQuantityTitle.innerText = 'Quantitiy';

        const productQuantityAdd = document.createElement('input');
        productQuantityAdd.type = 'button';
        productQuantityAdd.id = 'product_quantity_add';
        productQuantityAdd.className = 'product-quantity-add-btn product-quantity-btn';
        productQuantityAdd.value = '+';
        
        

        const productQuantitySub = document.createElement('input');
        productQuantitySub.type = 'button';
        productQuantitySub.id = 'product_quantity_sub';
        productQuantitySub.className = 'product-quantity-sub-btn product-quantity-btn';
        productQuantitySub.value = '-';

        const productQuantityInput = document.createElement('input');
        productQuantityInput.value = 1;
        productQuantityInput.id = 'product_quantity_input';
        productQuantityInput.type = 'number';
        productQuantityInput.min = 0;
        productQuantityInput.max = response.balance;

        const productTotalPriceContainer = document.createElement('div');
        productTotalPriceContainer.className = 'product-total-price-container content-containers';

        const productTotalPriceTitle = document.createElement('h3');
        productTotalPriceTitle.className = 'product-total-price-title';
        productTotalPriceTitle.innerText = 'Total Price';

        const productTotalPrice = document.createElement('span');
        productTotalPrice.className = 'product-total-price';
        productTotalPrice.innerText = response['price1'];


        productQuantityInput.onkeydown = () => {
            if(productQuantityInput.value > response.balance) {
                productQuantityInput.value = response.balance;
            }
            productTotalPrice.innerText = productQuantityInput.value * response['price1'];
        }
        productQuantityInput.onkeypress = () => {
            if(productQuantityInput.value > response.balance) {
                productQuantityInput.value = response.balance;
            }
            productTotalPrice.innerText = productQuantityInput.value * response['price1'];
        }
        productQuantityInput.onkeyup = () => {
            if(productQuantityInput.value > response.balance) {
                productQuantityInput.value = response.balance;
            }
            productTotalPrice.innerText = productQuantityInput.value * response['price1'];
        }
        productQuantityAdd.onclick = () => {
            if(productQuantityInput.value < response.balance) {
                productQuantityInput.value++;
                productQuantitySub.classList.remove('disable');
                productTotalPrice.innerText = productQuantityInput.value * response['price1'];
            } else if(productQuantityInput.value == response.balance) {
                productQuantityAdd.classList.add('disable');
                productTotalPrice.innerText = productQuantityInput.value * response['price1'];
            }
        }
        productQuantitySub.onclick = () => {
            if(productQuantityInput.value > 0) {
                if(productQuantityInput.value <= response.balance) {
                    productQuantityInput.value--;
                    productQuantityAdd.classList.remove('disable');
                    productTotalPrice.innerText = productQuantityInput.value * response['price1'];
                }
            } else if(productQuantityInput.value == 0) {
                productQuantitySub.classList.add('disable');
                productTotalPrice.innerText = productQuantityInput.value * response['price1'];
            }
        }

        productQuantityInputs.append(productQuantityAdd);
        productQuantityInputs.append(productQuantityInput);
        productQuantityInputs.append(productQuantitySub);

        productQuantityContainer.append(productQuantityTitle);
        productQuantityContainer.append(productQuantityInputs);
        fullProductContent.append(productQuantityContainer);

        productTotalPriceContainer.append(productTotalPriceTitle);
        productTotalPriceContainer.append(productTotalPrice);
        fullProductContent.append(productTotalPriceContainer);

        viewProductContent.append(fullProductContent);

        const viewProductBackground = document.getElementById('view_product_background');
        viewProductBackground.onclick = () => {
            viewProductContainer.style.opacity = 0;
            setTimeout( () => {
                viewProductContainer.style.display = 'none';
                viewProductContent.innerHTML = '';
            }, 700)
        }

        closeViewProduct.onclick = () => {
            closeViewProduct.style.animationName = 'close-button-spin';
            viewProductContainer.style.opacity = 0;
            setTimeout(() => {
                viewProductContainer.style.display = 'none';
                closeViewProduct.style.animationName = '';
                viewProductContent.innerHTML = '';
            }, 700);
        };
    })
    .then(response => {
        const productImages = document.getElementsByClassName('product-image');
        const album = document.getElementsByClassName('product-album')[0];
        const albumImages = document.getElementsByClassName('product-album-image');
        albumImages[0].classList.add('active');

        let totalSize = 0;
        for(let albumImage of albumImages){
            totalSize += albumImage.offsetWidth;

            albumImage.onclick = () => {
                for(let activeAlbumImage of albumImages) {
                    activeAlbumImage.classList.remove('active');
                }

                albumImage.classList.add('active');

                for(let productImage of productImages) {
                    if(albumImage.dataset.productImageId === productImage.dataset.productImageId) {
                        location.href = `#${productImage.id}`;
                    }
                }
            }
        }
        
        if(album.offsetWidth >= totalSize) {
            album.style.justifyContent = 'center';
        } else {
            album.style.justifyContent = 'flex-start';
        }


    })
}

export default viewProduct;