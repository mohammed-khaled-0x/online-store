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

        viewProductContainer.style.display = 'flex';
        setTimeout( () => {
            viewProductContainer.style.opacity = '1';
        }, 5)

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

        const productAlbum = document.createElement('div');
        productAlbum.className = 'product-album';

        for(let key of Object.keys(response)) {
            if(key.includes('image')) {
                if(response[key]) {
                    const productImage = document.createElement('img');
                    productImage.src = `https://res.cloudinary.com/doit/${response[key]}`;
                    productAlbum.append(productImage);
                }
            }
        }

        viewProductContent.append(productAlbum);

        const viewProductBackground = document.getElementById('view_product_background');
        viewProductBackground.onclick = () => {
            console.log('test')
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
}

export default viewProduct;