const viewProduct = async (productId) => {
    await fetch(`https://mystore9.herokuapp.com/products/${productId}/1/en/`)
        .then(response => {
            if (response.statusText !== 'ok' || response.status !== 404) {
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
            viewProductContent.dataset.productId = productId;

            const productName = document.getElementById('product_name');
            productName.innerHTML = `${response['brand_name']} ${response['product_name']}`

            const productStock = document.getElementById('product_stock');
            if (response.balance > 5) {
                productStock.innerText = 'in Stock';
                productStock.style.color = 'rgb(0, 204, 0)';
            } else if (response.balance > 0) {
                productStock.innerText = 'about to finish';
                productStock.style.color = 'rgb(255, 204, 0)';
            } else {
                productStock.innerText = 'out of Stock';
                productStock.style.color = 'rgb(204, 0, 0)';
            }

            const productMainImage = document.getElementById('product_main_image');

            const productBigAlbum = document.createElement('div');
            productBigAlbum.className = 'product-big-album';

            const productMiniAlbum = document.createElement('div');
            productMiniAlbum.className = 'product-mini-album';

            let imageIndex = 0;

            for (let key of Object.keys(response)) {
                if (key.includes('image')) {
                    if (response[key]) {
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

                        productBigAlbum.append(productImage);
                        productMiniAlbum.append(productAlbumImage);
                    }
                }
            }
            productMainImage.append(productBigAlbum);
            productMainImage.append(productMiniAlbum);

            const productDescription = document.getElementById('product_description_content');
            if (response['product_description']) {
                productDescription.innerText = response['product_description'];
            } else {
                productDescription.innerText = 'Unfortunately, there is no description for this product!';
            }

            const productQuantityInput = document.getElementById('product_quantity_input');
            productQuantityInput.max = response.balance;
            const productQuantityAdd = document.getElementById('product_quantity_add');
            const productQuantitySub = document.getElementById('product_quantity_sub');

            const productOriginalPrice = document.getElementById('product_original_price');
            productOriginalPrice.innerText = response['price1'];

            const productDiscount = document.getElementById('product_discount');
            const productAfterDiscount = document.getElementById('product_after_discount');
            const productTotalPrice = document.getElementById('product_total_price');

            if (response.price2) {
                productDiscount.innerText = (((100 / 100) - (response.price2 / response.price1)) * 100).toFixed() + '%';
                productAfterDiscount.innerText = response['price2'];
                productTotalPrice.innerText = response['price2'];
            } else {
                productDiscount.innerText = '-'
                productAfterDiscount.innerText = '-';
                productTotalPrice.innerText = response['price1'];
            }

            productQuantityInput.onkeydown = () => {
                if (productQuantityInput.value > response.balance) {
                    productQuantityInput.value = response.balance;
                }
                productTotalPrice.innerText = productQuantityInput.value * response['price1'];
            }
            productQuantityInput.onkeypress = () => {
                if (productQuantityInput.value > response.balance) {
                    productQuantityInput.value = response.balance;
                }
                productTotalPrice.innerText = productQuantityInput.value * response['price1'];
            }
            productQuantityInput.onkeyup = () => {
                if (productQuantityInput.value > response.balance) {
                    productQuantityInput.value = response.balance;
                }
                productTotalPrice.innerText = productQuantityInput.value * response['price1'];
            }

            productQuantityAdd.onclick = () => {
                if (productQuantityInput.value < response.balance) {
                    productQuantityInput.value++;
                    productQuantitySub.classList.remove('disable');
                    if (response.price2) {
                        productTotalPrice.innerText = productQuantityInput.value * response['price2'];
                    } else {
                        productTotalPrice.innerText = productQuantityInput.value * response['price1'];
                    }
                } else if (productQuantityInput.value == response.balance) {
                    productQuantityAdd.classList.add('disable');
                    if (response.price2) {
                        productTotalPrice.innerText = productQuantityInput.value * response['price2'];
                    } else {
                        productTotalPrice.innerText = productQuantityInput.value * response['price1'];
                    }
                }
            }
            productQuantitySub.onclick = () => {
                if (productQuantityInput.value > 1) {
                    if (productQuantityInput.value <= response.balance) {
                        productQuantityInput.value--;
                        productQuantityAdd.classList.remove('disable');
                        if (response.price2) {
                            productTotalPrice.innerText = productQuantityInput.value * response['price2'];
                        } else {
                            productTotalPrice.innerText = productQuantityInput.value * response['price1'];
                        }
                    }
                } else if (productQuantityInput.value == 1) {
                    productQuantitySub.classList.add('disable');
                    if (response.price2) {
                        productTotalPrice.innerText = productQuantityInput.value * response['price2'];
                    } else {
                        productTotalPrice.innerText = productQuantityInput.value * response['price1'];
                    }
                }
            }

            if(response.keywords) {
                const keywordsContainer = document.getElementsByClassName('product-keywords-container')[0];
                const keywordsList = document.createElement('ul');
                keywordsList.className = 'keywords';
                for(let key of response.keywords.split(' ')) {
                    const keyword = document.createElement('li');
                    keyword.innerText = key;
                    keywordsList.append(keyword);
                }
                keywordsContainer.append(keywordsList);
            }

            if(response['rating_average']) {
                const averageStars = Number(response['rating_average'][0])

                for(let stars = 0; stars < averageStars; stars++) {
                    const star = document.getElementsByClassName(`total-rating-stars`)[stars]
                    star.style.fill = '#ffcc00';
                }
    
                const ratingAverage = document.getElementById('rating_average_data');
                ratingAverage.innerText = response['rating_average'];
                const ratinAverageVotes = document.getElementById('rating_average_votes');
                ratinAverageVotes.innerText = response['number_of_reviews'];

                
                fetch(`https://mystore9.herokuapp.com/products/reviews/${productId}/`)
                    .then(response => {
                        if (response.statusText !== 'ok' || response.status !== 404) {
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
                        const commentsContainer = document.getElementsByClassName('product-comments-container')[0];
                        console.log(commentsContainer);
                        const comments = document.createElement('div');
                        comments.className = 'product-comments';
                        comments.id = 'product_comments';

                        for(let comment of response.results) {
                            const commentContainer = document.createElement('div');
                            commentContainer.className = 'comment';

                            const commentTitle = document.createElement('div');
                            commentTitle.className = 'commentTitle';

                            const commentName = document.createElement('span');
                            commentName.className = 'comment-name';
                            commentName.innerText = `${comment['created_by']['first_name']} ${comment['created_by']['last_name']}:`;

                            const commentStarsContainer = document.createElement('div');
                            commentStarsContainer.className = 'comment-stars-container';

                            const commentRating = comment.rating;

                            for(let stars = 0; stars < commentRating; stars++) {
                                commentStarsContainer.innerHTML += `
                                <svg class="total-rating-stars" id="product_user_rating_average_star1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                                    <polygon stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="  259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08   29.274,197.007 188.165,173.919 "/>
                                </svg>
                                `
                            }

                            const commentCreatedAt = document.createElement('span');
                            commentCreatedAt.className = 'comment-created-at';
                            commentCreatedAt.innerText = `(${comment['created_at']})`;

                            const commentDataContainer = document.createElement('div');
                            commentDataContainer.className = 'comment-data-container';
                            
                            const commentData = document.createElement('p');
                            commentData.className = 'comment-data';
                            commentData.innerText = comment.comment;

                            commentDataContainer.append(commentData);
                            
                            commentTitle.append(commentName, commentStarsContainer, commentCreatedAt);
                            commentContainer.append(commentTitle);
                            commentContainer.append(commentDataContainer);
                            comments.append(commentContainer);
                        }

                        commentsContainer.append(comments);

                        console.log(comments);
                    })
                
            }
            

            const viewProductBackground = document.getElementById('view_product_background');
            viewProductBackground.onclick = () => {
                viewProductContainer.style.opacity = 0;
                setTimeout(() => {
                    viewProductContainer.style.display = 'none';
                    viewProductContent.innerHTML = `
                    <div class="product-title">
                        <span id="close_view_product">+</span>
                        <h2 id="product_name"></h2>
                        <span id="product_stock"></span>
                    </div>
                    <div id="product_main_image">
                    </div>
                    `;
                }, 700)
            }

            const closeViewProduct = document.getElementById('close_view_product');
            closeViewProduct.onclick = () => {
                closeViewProduct.style.animationName = 'close-button-spin';
                viewProductContainer.style.opacity = 0;
                setTimeout(() => {
                    viewProductContainer.style.display = 'none';
                    closeViewProduct.style.animationName = '';
                    viewProductContent.innerHTML = `
                    <div class="product-title">
                        <span id="close_view_product">+</span>
                        <h2 id="product_name"></h2>
                        <span id="product_stock"></span>
                    </div>
                    <div id="product_main_image">
                    </div>
                    `;
                }, 700);
            };
        })
        .then(response => {
            const productImages = document.getElementsByClassName('product-image');
            const album = document.getElementsByClassName('product-mini-album')[0];
            const albumImages = document.getElementsByClassName('product-album-image');
            albumImages[0].classList.add('active');

            let totalSize = 0;
            for (let albumImage of albumImages) {
                totalSize += albumImage.offsetWidth;

                albumImage.onclick = () => {
                    for (let activeAlbumImage of albumImages) {
                        activeAlbumImage.classList.remove('active');
                    }

                    albumImage.classList.add('active');

                    for (let productImage of productImages) {
                        if (albumImage.dataset.productImageId === productImage.dataset.productImageId) {
                            location.href = `#${productImage.id}`;
                        }
                    }
                }
            }

            if (album.offsetWidth >= totalSize) {
                album.style.justifyContent = 'center';
            } else {
                album.style.justifyContent = 'flex-start';
            }

            const productCommentsInputs = document.getElementsByClassName('product-comments-inputs')[0]
            productCommentsInputs.addEventListener('sticky-change', () => {
                productCommentsInputs.style.boxShadow = '0 5px 15px #eee';
            })
        })
}

export default viewProduct;