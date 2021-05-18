import createComment from './create-comment';
import deleteComment from './delete-comment';
import editComment from './edit-comment';

const viewProduct = async (productId, currencyId=1, currency="USD") => {
    await fetch(`https://mystore9.herokuapp.com/products/${productId}/${currencyId}/en/`)
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
            productOriginalPrice.innerText = `${response['price1']} ${currency}`;

            const productDiscount = document.getElementById('product_discount');
            const productAfterDiscount = document.getElementById('product_after_discount');
            const productTotalPrice = document.getElementById('product_total_price');

            if (response.price2) {
                productDiscount.innerText = (((100 / 100) - (response.price2 / response.price1)) * 100).toFixed() + '%';
                productAfterDiscount.innerText = `${response['price2']} ${currency}`;
                productTotalPrice.innerText = `${response['price2']} ${currency}`;
            } else {
                productDiscount.innerText = '-'
                productAfterDiscount.innerText = '-';
                productTotalPrice.innerText = `${response['price1']} ${currency}`;
            }

            productQuantityInput.onkeydown = () => {
                if (productQuantityInput.value > response.balance) {
                    productQuantityInput.value = response.balance;
                }
                productTotalPrice.innerText = productQuantityInput.value * response['price1'] + ' ' + currency;
            }
            productQuantityInput.onkeypress = () => {
                if (productQuantityInput.value > response.balance) {
                    productQuantityInput.value = response.balance;
                }
                productTotalPrice.innerText = productQuantityInput.value * response['price1'] + ' ' + currency;
            }
            productQuantityInput.onkeyup = () => {
                if (productQuantityInput.value > response.balance) {
                    productQuantityInput.value = response.balance;
                }
                productTotalPrice.innerText = productQuantityInput.value * response['price1'] + ' ' + currency;
            }

            productQuantityAdd.onclick = () => {
                if (productQuantityInput.value < response.balance) {
                    productQuantityInput.value++;
                    productQuantitySub.classList.remove('disable');
                    if (response.price2) {
                        productTotalPrice.innerText = productQuantityInput.value * response['price2'] + ' ' + currency;
                    } else {
                        productTotalPrice.innerText = productQuantityInput.value * response['price1'] + ' ' + currency;
                    }
                } else if (productQuantityInput.value == response.balance) {
                    productQuantityAdd.classList.add('disable');
                    if (response.price2) {
                        productTotalPrice.innerText = productQuantityInput.value * response['price2'] + ' ' + currency;
                    } else {
                        productTotalPrice.innerText = productQuantityInput.value * response['price1'] + ' ' + currency;
                    }
                }
            }
            productQuantitySub.onclick = () => {
                if (productQuantityInput.value > 1) {
                    if (productQuantityInput.value <= response.balance) {
                        productQuantityInput.value--;
                        productQuantityAdd.classList.remove('disable');
                        if (response.price2) {
                            productTotalPrice.innerText = productQuantityInput.value * response['price2'] + ' ' + currency;
                        } else {
                            productTotalPrice.innerText = productQuantityInput.value * response['price1'] + ' ' + currency;
                        }
                    }
                } else if (productQuantityInput.value == 1) {
                    productQuantitySub.classList.add('disable');
                    if (response.price2) {
                        productTotalPrice.innerText = productQuantityInput.value * response['price2'] + ' ' + currency;
                    } else {
                        productTotalPrice.innerText = productQuantityInput.value * response['price1'] + ' ' + currency;
                    }
                }
            }

            const keywordsContainer = document.getElementsByClassName('product-keywords-container')[0];
            const keywordsList = document.createElement('ul');
            keywordsList.className = 'keywords';
            if(response.keywords) { 
                for(let key of response.keywords.split(' ')) {
                    const keyword = document.createElement('li');
                    keyword.innerText = key;
                    keywordsList.append(keyword);
                }
                keywordsContainer.append(keywordsList);
            } else {
                const keyword = document.createElement('li');
                keyword.innerText = 'There are no keywords';
                keyword.style.border = 'none';
                keywordsList.append(keyword);
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
                        const comments = document.createElement('div');
                        comments.className = 'product-comments';
                        comments.id = 'product_comments';

                        /*let vote5 = 0;
                        let vote4 = 0;
                        let vote3 = 0;
                        let vote2 = 0;
                        let vote1 = 0;

                        let commentsCount = 0;*/
                        for(let comment of response.results) {
                            /*
                            if(comment.rating > 0 || comment.rating === 5) {
                                commentsCount++;
                                const votes = document.getElementById(`${comment.rating}_star`);
                                console.log(votes)
                                const statusBar = document.getElementById(`rating_average_bar_status_star${comment.rating}`);
                                if(comment.rating === 5) {
                                    vote5++;
                                    votes.innerText = `( ${vote5} )`;
                                    statusBar.style.width = `calc( (${vote5} / ${commentsCount}) * 100%)`;

                                } else if(comment.rating === 4) {
                                    vote4++;
                                    votes.innerText = `( ${vote4} )`;
                                    statusBar.style.width = `calc( (${vote4} / ${commentsCount}) * 100%)`;
                                    
                                } else if(comment.rating === 3) {
                                    vote3++;
                                    votes.innerText = `( ${vote3} )`;
                                    statusBar.style.width = `calc( (${vote3} / ${commentsCount}) * 100%)`;

                                } else if(comment.rating === 2) {
                                    vote2++;
                                    votes.innerText = `( ${vote2} )`;
                                    statusBar.style.width = `calc( (${vote2} / ${commentsCount}) * 100%)`;

                                } else if(comment.rating === 1) {
                                    vote1++;
                                    votes.innerText = `( ${vote1} )`;
                                    statusBar.style.width = `calc( (${vote1} / ${commentsCount}) * 100%)`;
                                    
                                }
                            }
                            console.log(commentsCount);
                            */

                            

                            const commentContainer = document.createElement('div');
                            commentContainer.className = 'comment';
                            commentContainer.id = `comment_${comment.id}`;
                            commentContainer.dataset.commentId = comment.id;

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
                                <svg class="total-rating-stars" dataset-star-id="${comment.id}_${stars+1}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
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

                            if(comment['created_by'].username === localStorage.username) {
                                const commentEditContainer = document.createElement('div');
                                commentEditContainer.id = comment.id;
                                commentEditContainer.className = 'comment-edit-container';
                                commentEditContainer.innerHTML = `
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                                    <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
                                    <g><g><g><g><path d="M645.9,990H354.2c-38.2,0-73.1-30.8-78-68.7l-79.9-629c-2.4-19.4,3-37.7,15.4-51.7c12.3-14,29.9-21.7,49.3-21.7h478.1c19.5,0,37,7.7,49.3,21.7c12.3,14,17.8,32.4,15.3,51.7l-79.9,629C719.1,959.2,684.1,990,645.9,990z M261,256.2c-8.6,0-16.2,3.2-21.3,9c-5.1,5.9-7.5,13.8-6.4,22.4l79.9,628.9c2.5,19.6,21.2,36.1,41,36.1h291.8c19.8,0,38.5-16.5,41-36.1l79.9-629c1.1-8.6-1.1-16.5-6.3-22.3s-12.7-9-21.3-9L261,256.2L261,256.2z"/><path d="M773.4,192.9H226.6c-27,0-49-22.7-49-50.7c0-28,22-50.7,49-50.7h194c0.6-45.1,36-81.5,79.4-81.5c43.4,0,78.7,36.5,79.3,81.5h194c27,0,49,22.7,49,50.7S800.4,192.9,773.4,192.9z M226.6,128.8c-6.5,0-11.7,6-11.7,13.4c0,7.4,5.3,13.4,11.7,13.4h546.8c6.5,0,11.7-6,11.7-13.4c0-7.4-5.3-13.4-11.7-13.4H558.2c-5.8,0-11.3-2.7-14.8-7.3c-3.5-4.6-4.7-10.6-3.2-16.2c1.3-4.8,1.9-8.9,1.9-12.6c0-25.1-18.9-45.4-42.1-45.4c-23.2,0-42.2,20.4-42.2,45.4c0,3.6,0.6,7.7,2,12.7c1.5,5.6,0.3,11.6-3.3,16.1c-3.5,4.6-9,7.3-14.8,7.3L226.6,128.8L226.6,128.8z"/></g><g><path d="M374.7,905.9c-9.2,0-17.3-6.8-18.4-16.3l-69.9-547.4c-1.3-10.3,5.9-19.6,16.1-20.8c10-1.8,19.6,5.9,20.9,16.1l69.9,547.4c1.3,10.3-5.9,19.6-16.1,20.8C376.4,905.8,375.6,905.9,374.7,905.9z"/><path d="M609.7,905.9c-0.8,0-1.6,0-2.4-0.2c-10.2-1.3-17.4-10.6-16.1-20.8l69.9-547.4c1.3-10.3,10.9-17.9,20.9-16.1c10.2,1.3,17.4,10.6,16.1,20.8l-69.9,547.4C627,899,619,905.9,609.7,905.9z"/><path d="M489.3,905.9c-10.3,0-18.6-8.4-18.6-18.6V339.8c0-10.3,8.3-18.6,18.6-18.6c10.3,0,18.6,8.4,18.6,18.6v547.4C507.9,897.5,499.6,905.9,489.3,905.9z"/></g></g></g></g>
                                </svg>
                                <svg data-id="edit-comment" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 361.5 361.5" style="enable-background:new 0 0 361.5 361.5;" xml:space="preserve">
                                    <g>
                                        <path d="M361.5,31.068c0-7.063-2.75-13.702-7.742-18.694l-4.637-4.639C338.814-2.569,322.048-2.569,311.74,7.727   c-0.004,0.003-0.008,0.007-0.011,0.01l-22.358,22.356l-3.71-3.71c-1.407-1.406-3.314-2.196-5.304-2.196   c-1.988,0-3.896,0.79-5.303,2.197L21.761,279.681c-0.01,0.009-0.016,0.018-0.023,0.026c-0.867,0.871-1.531,1.966-1.891,3.232   l-19.563,69.01c-0.742,2.615-0.01,5.427,1.912,7.35c1.426,1.426,3.342,2.196,5.305,2.196c0.682,0,1.369-0.093,2.045-0.284   l69.01-19.563c0.022-0.007,1.84-0.458,3.258-1.912L314.67,106.879l0.647,0.647c7.166,7.165,7.166,18.824,0,25.99L222.97,225.86   c-2.929,2.93-2.929,7.678,0,10.607c1.465,1.464,3.385,2.196,5.304,2.196c1.919,0,3.839-0.732,5.304-2.196l92.346-92.345   c13.014-13.015,13.014-34.19,0-47.204l-0.646-0.646l9.833-9.834c1.407-1.407,2.196-3.314,2.196-5.304   c0-1.989-0.789-3.896-2.196-5.304l-3.71-3.71l22.355-22.357C358.75,44.77,361.5,38.131,361.5,31.068z M280.358,42.294L319.2,81.135   l-4.53,4.53l-38.842-38.841L280.358,42.294z M18.381,343.114l12.414-43.792L62.173,330.7L18.381,343.114z M76.511,323.825   L37.67,284.984l9.83-9.829l38.842,38.84L76.511,323.825z M96.949,303.389l-38.844-38.84L265.222,57.431l38.841,38.841   L96.949,303.389z M343.149,39.157l-22.356,22.357l-20.815-20.813l22.357-22.357c0.001-0.001,0.002-0.002,0.002-0.003   c4.461-4.458,11.717-4.458,16.176-0.001l4.636,4.639c2.161,2.16,3.351,5.033,3.351,8.089   C346.5,34.124,345.31,36.997,343.149,39.157z"/>
                                    </g>
                                </svg>
                                `;
                                commentDataContainer.append(commentData, commentEditContainer);
                                deleteComment(commentEditContainer.firstElementChild);
                                editComment(commentEditContainer.lastElementChild, commentContainer);
                            } else {
                                commentDataContainer.append(commentData);
                            }
                            
                            commentTitle.append(commentName, commentStarsContainer, commentCreatedAt);
                            commentContainer.append(commentTitle);
                            commentContainer.append(commentDataContainer);
                            comments.append(commentContainer);
                        }

                        commentsContainer.append(comments);
                        const productComments = document.getElementById('product_comments');
                        productComments.style.paddingBottom = `${productComments.lastChild.offsetHeight}px`;
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
                    <div id="full_product_content">
                        <div class="product-description-container content-containers">
                            <h3 id="product_description_title" class="product-content-title">Description</h3>
                            <p id="product_description_content"></p>
                        </div>
                        <div class="product-price-details-container content-containers">
                            <h3 id="product_original_price_title" class="product-price-details">Original Price</h3>
                            <span id="product_original_price" class="product-price-details"></span>
                            <h3 id="product_discount_title" class="product-price-details">Discount</h3>
                            <span id="product_discount" class="product-price-details"></span>
                            <h3 id="product_after_discount_title" class="product-price-details">After Discount</h3>
                            <span id="product_after_discount" class="product-price-details"></span>
                        </div>
                        <div class="product-quantity-container content-containers">
                            <h3 id="product_quantity_title" class="product-content-title">Quantitiy</h3>
                            <div class="product-quantity-inputs">
                                <input type="button" id="product_quantity_add" class="product-quantity-add-btn product-quantity-btn" value="+">
                                <input type="number" id="product_quantity_input" min="1" value="1">
                                <input type="button" id="product_quantity_sub" class="product-quantity-sub-btn product-quantity-btn" value="-">
                            </div>
                        </div>
                        <div class="product-total-price-container content-containers">
                            <h3 id="product_total_price_title" class="product-content-title">Total Price</h3>
                            <span id="product_total_price"></span>
                        </div>
                        <div class="product-keywords-container content-containers">
                            <h3 id="product_keywords_title" class="product-content-title">Keywords</h3>
                        </div>
                        <div class="product-user-rating-container content-containers">
                            <h3 id="product_user_rating_title" class="product-content-title">User Rating</h3>
                            <div class="product-user-rating-average-container">
                                <div class="product-user-rating-average-stars">
                                    <svg class="total-rating-stars" id="product_user_rating_average_star1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                                        <polygon stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="  259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08   29.274,197.007 188.165,173.919 "/>
                                    </svg>
                                    <svg class="total-rating-stars" id="product_user_rating_average_star2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                                        <polygon stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="  259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08   29.274,197.007 188.165,173.919 "/>
                                    </svg>
                                    <svg class="total-rating-stars" id="product_user_rating_average_star3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                                        <polygon stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="  259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08   29.274,197.007 188.165,173.919 "/>
                                    </svg>
                                    <svg class="total-rating-stars" id="product_user_rating_average_star4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                                        <polygon stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="  259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08   29.274,197.007 188.165,173.919 "/>
                                    </svg>
                                    <svg class="total-rating-stars" id="product_user_rating_average_star5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                                        <polygon stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="  259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08   29.274,197.007 188.165,173.919 "/>
                                    </svg>
                                </div>
                                <div class="product-user-rating-average-data">
                                    <span id="rating_average_data">0 </span> average based on <span id="rating_average_votes"> 0 </span> reviews.
                                </div>
                            </div>
                        </div>
                        <div class="product-comments-container content-containers">
                            <h3 id="product_comments_title" class="product-content-title">Comments</h3>
                            <div class="product-comments-inputs">
                                <input id="product_comment_textbox" type="text" placeholder="Type your comment here...">
                                <select id="choose_stars">
                                    <option value='5'>5 stars</option>
                                    <option value='4'>4 stars</option>
                                    <option value='3'>3 stars</option>
                                    <option value='2'>2 stars</option>
                                    <option value='1'>1 stars</option>
                                </select>
                                <svg id="create_comment" title="Create comment" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                                    <g><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"><path d="M525.2,4990.3c-143.7-49.8-249.1-124.6-314.3-228c-120.7-189.7-113.1,23-109.2-3453.3l5.7-3171.6l49.8-105.4c70.9-153.3,138-220.4,281.7-291.3l128.4-63.2l684.1-5.8l686-5.8v-1101.9c0-1220.7-3.8-1186.2,124.6-1282.1c72.8-57.5,155.2-76.7,253-57.5c65.2,11.5,210.8,149.5,1289.7,1228.4l1216.9,1215l2309.2,3.8l2309.2,5.8l107.3,49.8c136.1,63.2,239.5,166.7,302.8,302.8l49.8,107.3v3209.9v3209.9l-63.2,128.4c-70.9,143.7-138,210.8-291.3,281.7l-105.4,49.8l-4407.6,3.8C835.7,5024.8,621,5024.8,525.2,4990.3z M9154.5,4363.6c28.8-21.1,70.9-63.2,92-92c40.2-51.7,40.2-53.7,40.2-2924.3s0-2872.6-40.2-2924.4c-21.1-28.7-63.3-70.9-92-92c-51.7-40.2-67.1-40.2-2259.4-49.8l-2207.6-9.6L4563-1784c-115-51.7-197.4-128.4-1067.4-996.5l-944.8-940.9v879.6c0,977.3,1.9,960.1-130.3,1061.7l-67.1,51.7l-724.4,9.6c-693.7,9.6-726.3,11.5-776.1,49.8c-28.7,21.1-70.9,63.2-92,92c-40.2,51.7-40.2,59.4-46,2872.6c-1.9,1552.2,0,2847.7,5.7,2882.2c13.4,76.7,93.9,174.4,172.5,208.9c47.9,21.1,774.2,24.9,4133.6,21.1l4076.1-3.8L9154.5,4363.6z"/><path d="M2727.1,2847.8c-34.5-17.3-86.2-61.3-115-97.7c-74.7-97.7-72.8-256.8,0-352.6c101.6-134.1,72.8-130.3,1165.1-130.3s1063.6-3.8,1165.1,130.3c74.8,97.7,74.8,254.9,0,352.6c-101.6,134.1-72.8,130.3-1169,130.3C2903.4,2880.4,2782.7,2876.6,2727.1,2847.8z"/><path d="M2727.1,1621.3c-34.5-17.3-86.2-61.3-115-97.7c-74.7-97.7-72.8-256.8,0-352.6c107.3-139.9-65.2-130.3,2391.6-130.3c2456.8,0,2284.3-9.6,2391.6,130.3c74.7,97.7,74.7,254.9,0,352.6c-107.3,139.9,67.1,130.3-2395.4,130.3C2993.5,1653.9,2784.6,1650.1,2727.1,1621.3z"/><path d="M2727.1,394.9c-34.5-17.3-86.2-61.3-115-97.7c-74.7-97.7-72.8-256.8,0-352.6c105.4-138,3.8-130.3,1778.4-130.3c1774.5,0,1673-7.7,1778.4,130.3c42.2,55.6,51.7,88.1,51.7,176.3c0,88.1-9.6,120.7-51.7,176.3c-105.4,138-3.8,130.3-1782.2,130.3C2947.5,427.5,2784.6,423.6,2727.1,394.9z"/></g></g>
                                </svg>
                            </div>
                        </div>
                        <div class="product-main-buttons content-containers">
                            <button class="product-buttons" id="add_to_cart">
                                Add to Cart
                            </button>
                            <button class="product-buttons" id="add_to_favorite">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 612 792" enable-background="new 0 0 612 792" xml:space="preserve">
                                    <path stroke-miterlimit="10" d="M307.5,518.4c-0.5-0.4-0.9-0.7-1.2-1c-13.1-14.2-27.9-26.6-43.2-38.3  c-14.8-11.3-29.8-22.4-44.6-33.6c-12.9-9.8-25-20.5-35.8-32.6c-8.8-9.8-16-20.5-20.6-33c-4.6-12.6-6.4-25.6-4.9-38.9  c2.3-20.1,10.9-37.1,26.9-49.9c9-7.2,19.3-11.5,30.4-14.1c17.7-4.1,34.8-2.2,51.3,5.1c14.1,6.3,24.6,16.7,32.6,29.8  c2.5,4.2,4.6,8.6,6.9,12.9c0.3,0.5,0.5,1,1,1.7c0.5-1,0.9-1.9,1.3-2.7c6.3-14,15.3-25.8,27.9-34.8c10.3-7.4,21.7-11.7,34.3-13.3  c9.7-1.2,19.4-1.1,28.9,1.2c23.5,5.6,49,21.8,55.9,55.2c2,9.7,2.4,19.5,1.2,29.4c-0.7,6-2.8,11.8-4.9,17.5  c-6.1,16.2-15.8,29.9-27.7,42.2c-9.3,9.5-19.5,17.8-30,25.8c-14.8,11.4-29.7,22.5-44.4,34c-12.8,10-25.2,20.5-36.4,32.3  C310.7,514.8,309.2,516.6,307.5,518.4z" />
                                </svg>
                            </button>
                        </div>
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
                    <div id="full_product_content">
                        <div class="product-description-container content-containers">
                            <h3 id="product_description_title" class="product-content-title">Description</h3>
                            <p id="product_description_content"></p>
                        </div>
                        <div class="product-price-details-container content-containers">
                            <h3 id="product_original_price_title" class="product-price-details">Original Price</h3>
                            <span id="product_original_price" class="product-price-details"></span>
                            <h3 id="product_discount_title" class="product-price-details">Discount</h3>
                            <span id="product_discount" class="product-price-details"></span>
                            <h3 id="product_after_discount_title" class="product-price-details">After Discount</h3>
                            <span id="product_after_discount" class="product-price-details"></span>
                        </div>
                        <div class="product-quantity-container content-containers">
                            <h3 id="product_quantity_title" class="product-content-title">Quantitiy</h3>
                            <div class="product-quantity-inputs">
                                <input type="button" id="product_quantity_add" class="product-quantity-add-btn product-quantity-btn" value="+">
                                <input type="number" id="product_quantity_input" min="1" value="1">
                                <input type="button" id="product_quantity_sub" class="product-quantity-sub-btn product-quantity-btn" value="-">
                            </div>
                        </div>
                        <div class="product-total-price-container content-containers">
                            <h3 id="product_total_price_title" class="product-content-title">Total Price</h3>
                            <span id="product_total_price"></span>
                        </div>
                        <div class="product-keywords-container content-containers">
                            <h3 id="product_keywords_title" class="product-content-title">Keywords</h3>
                        </div>
                        <div class="product-user-rating-container content-containers">
                            <h3 id="product_user_rating_title" class="product-content-title">User Rating</h3>
                            <div class="product-user-rating-average-container">
                                <div class="product-user-rating-average-stars">
                                    <svg class="total-rating-stars" id="product_user_rating_average_star1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                                        <polygon stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="  259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08   29.274,197.007 188.165,173.919 "/>
                                    </svg>
                                    <svg class="total-rating-stars" id="product_user_rating_average_star2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                                        <polygon stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="  259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08   29.274,197.007 188.165,173.919 "/>
                                    </svg>
                                    <svg class="total-rating-stars" id="product_user_rating_average_star3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                                        <polygon stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="  259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08   29.274,197.007 188.165,173.919 "/>
                                    </svg>
                                    <svg class="total-rating-stars" id="product_user_rating_average_star4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                                        <polygon stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="  259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08   29.274,197.007 188.165,173.919 "/>
                                    </svg>
                                    <svg class="total-rating-stars" id="product_user_rating_average_star5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                                        <polygon stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="  259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08   29.274,197.007 188.165,173.919 "/>
                                    </svg>
                                </div>
                                <div class="product-user-rating-average-data">
                                    <span id="rating_average_data">0 </span> average based on <span id="rating_average_votes"> 0 </span> reviews.
                                </div>
                            </div>
                        </div>
                        <div class="product-comments-container content-containers">
                            <h3 id="product_comments_title" class="product-content-title">Comments</h3>
                            <div class="product-comments-inputs">
                                <input id="product_comment_textbox" type="text" placeholder="Type your comment here...">
                                <select id="choose_stars">
                                    <option value='5'>5 stars</option>
                                    <option value='4'>4 stars</option>
                                    <option value='3'>3 stars</option>
                                    <option value='2'>2 stars</option>
                                    <option value='1'>1 stars</option>
                                </select>
                                <svg id="create_comment" title="Create comment" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                                    <g><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"><path d="M525.2,4990.3c-143.7-49.8-249.1-124.6-314.3-228c-120.7-189.7-113.1,23-109.2-3453.3l5.7-3171.6l49.8-105.4c70.9-153.3,138-220.4,281.7-291.3l128.4-63.2l684.1-5.8l686-5.8v-1101.9c0-1220.7-3.8-1186.2,124.6-1282.1c72.8-57.5,155.2-76.7,253-57.5c65.2,11.5,210.8,149.5,1289.7,1228.4l1216.9,1215l2309.2,3.8l2309.2,5.8l107.3,49.8c136.1,63.2,239.5,166.7,302.8,302.8l49.8,107.3v3209.9v3209.9l-63.2,128.4c-70.9,143.7-138,210.8-291.3,281.7l-105.4,49.8l-4407.6,3.8C835.7,5024.8,621,5024.8,525.2,4990.3z M9154.5,4363.6c28.8-21.1,70.9-63.2,92-92c40.2-51.7,40.2-53.7,40.2-2924.3s0-2872.6-40.2-2924.4c-21.1-28.7-63.3-70.9-92-92c-51.7-40.2-67.1-40.2-2259.4-49.8l-2207.6-9.6L4563-1784c-115-51.7-197.4-128.4-1067.4-996.5l-944.8-940.9v879.6c0,977.3,1.9,960.1-130.3,1061.7l-67.1,51.7l-724.4,9.6c-693.7,9.6-726.3,11.5-776.1,49.8c-28.7,21.1-70.9,63.2-92,92c-40.2,51.7-40.2,59.4-46,2872.6c-1.9,1552.2,0,2847.7,5.7,2882.2c13.4,76.7,93.9,174.4,172.5,208.9c47.9,21.1,774.2,24.9,4133.6,21.1l4076.1-3.8L9154.5,4363.6z"/><path d="M2727.1,2847.8c-34.5-17.3-86.2-61.3-115-97.7c-74.7-97.7-72.8-256.8,0-352.6c101.6-134.1,72.8-130.3,1165.1-130.3s1063.6-3.8,1165.1,130.3c74.8,97.7,74.8,254.9,0,352.6c-101.6,134.1-72.8,130.3-1169,130.3C2903.4,2880.4,2782.7,2876.6,2727.1,2847.8z"/><path d="M2727.1,1621.3c-34.5-17.3-86.2-61.3-115-97.7c-74.7-97.7-72.8-256.8,0-352.6c107.3-139.9-65.2-130.3,2391.6-130.3c2456.8,0,2284.3-9.6,2391.6,130.3c74.7,97.7,74.7,254.9,0,352.6c-107.3,139.9,67.1,130.3-2395.4,130.3C2993.5,1653.9,2784.6,1650.1,2727.1,1621.3z"/><path d="M2727.1,394.9c-34.5-17.3-86.2-61.3-115-97.7c-74.7-97.7-72.8-256.8,0-352.6c105.4-138,3.8-130.3,1778.4-130.3c1774.5,0,1673-7.7,1778.4,130.3c42.2,55.6,51.7,88.1,51.7,176.3c0,88.1-9.6,120.7-51.7,176.3c-105.4,138-3.8,130.3-1782.2,130.3C2947.5,427.5,2784.6,423.6,2727.1,394.9z"/></g></g>
                                </svg>
                            </div>
                        </div>
                        <div class="product-main-buttons content-containers">
                            <button class="product-buttons" id="add_to_cart">
                                Add to Cart
                            </button>
                            <button class="product-buttons" id="add_to_favorite">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 612 792" enable-background="new 0 0 612 792" xml:space="preserve">
                                    <path stroke-miterlimit="10" d="M307.5,518.4c-0.5-0.4-0.9-0.7-1.2-1c-13.1-14.2-27.9-26.6-43.2-38.3  c-14.8-11.3-29.8-22.4-44.6-33.6c-12.9-9.8-25-20.5-35.8-32.6c-8.8-9.8-16-20.5-20.6-33c-4.6-12.6-6.4-25.6-4.9-38.9  c2.3-20.1,10.9-37.1,26.9-49.9c9-7.2,19.3-11.5,30.4-14.1c17.7-4.1,34.8-2.2,51.3,5.1c14.1,6.3,24.6,16.7,32.6,29.8  c2.5,4.2,4.6,8.6,6.9,12.9c0.3,0.5,0.5,1,1,1.7c0.5-1,0.9-1.9,1.3-2.7c6.3-14,15.3-25.8,27.9-34.8c10.3-7.4,21.7-11.7,34.3-13.3  c9.7-1.2,19.4-1.1,28.9,1.2c23.5,5.6,49,21.8,55.9,55.2c2,9.7,2.4,19.5,1.2,29.4c-0.7,6-2.8,11.8-4.9,17.5  c-6.1,16.2-15.8,29.9-27.7,42.2c-9.3,9.5-19.5,17.8-30,25.8c-14.8,11.4-29.7,22.5-44.4,34c-12.8,10-25.2,20.5-36.4,32.3  C310.7,514.8,309.2,516.6,307.5,518.4z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    `;
                }, 700);
            };

            createComment();
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
                            window.history.pushState('', '', '/');
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

            const viewProductContent = document.getElementById('view_product_content');

            const productMiniAlbum = document.getElementsByClassName('product-mini-album')[0];
            productMiniAlbum.style.top = `${viewProductContent.offsetHeight}px`
        })
}

export default viewProduct;