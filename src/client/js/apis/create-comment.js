import notifications from './../assistants functions/notifications';

const createCommentButton = document.getElementById('create_comment');
const commentTextbox = document.getElementById('product_comment_textbox');

commentTextbox.onkeyup = (e) => {
    if(commentTextbox.value) {
        createCommentButton.style.opacity = 1;
        createCommentButton.style.cursor = 'pointer';
        console.log(e)
        if(e.keyCode === 13) {
            if(localStorage.token) {
                const getUserRatingStars = document.getElementById('choose_stars').value;
                const viewProductContent = document.getElementById('view_product_content');
                const productId = Number(viewProductContent.dataset.productId);
                const rating = Number(getUserRatingStars);
                const comment = commentTextbox.value;
                fetch("https://mystore9.herokuapp.com/products/reviews_create/ ", {
                    method: "POST",
                    credentials: "same-origin",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Token ${localStorage.token}`
                    },
                    body: JSON.stringify({
                        "product": productId,
                        "rating": rating,
                        "comment": comment
                    })
                })
                .then(response => {
                    console.log(response);
                    console.log(commentTextbox.value);
                    if(response.statusText !== 'ok' || response.status !== 404) {
                        const convertResponse = response.json();
                        console.log(convertResponse)
                        return convertResponse;
                    } else {
                        console.log('there is an error while fetching');
                        const convertResponse = response.json();
                        console.log(convertResponse)
                        return convertResponse;
                    }
                })
                .then( response => {
                    if(response.id) {

                        const logName = document.getElementById('log_name');

                        const commentContainer = document.createElement('div');
                        commentContainer.className = 'comment';

                        const commentTitle = document.createElement('div');
                        commentTitle.className = 'commentTitle';

                        const commentName = document.createElement('span');
                        commentName.className = 'comment-name';
                        commentName.innerText = logName.innerText;

                        const commentStarsContainer = document.createElement('div');
                        commentStarsContainer.className = 'comment-stars-container';

                        const commentRating = response.rating;

                        for(let stars = 0; stars < commentRating; stars++) {
                            commentStarsContainer.innerHTML += `
                            <svg class="total-rating-stars" id="product_user_rating_average_star1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                                <polygon stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="  259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08   29.274,197.007 188.165,173.919 "/>
                            </svg>
                            `
                        }

                        const commentCreatedAt = document.createElement('span');
                        commentCreatedAt.className = 'comment-created-at';
                        commentCreatedAt.innerText = `(${response['created_at']})`;

                        const commentDataContainer = document.createElement('div');
                        commentDataContainer.className = 'comment-data-container';
                        
                        const commentData = document.createElement('p');
                        commentData.className = 'comment-data';
                        commentData.innerText = response.comment;

                        commentDataContainer.append(commentData);
                        
                        commentTitle.append(commentName, commentStarsContainer, commentCreatedAt);
                        commentContainer.append(commentTitle);
                        commentContainer.append(commentDataContainer);

                        const prductComments = document.getElementById('product_comments');
                        if(prductComments.childElementCount > 0) {
                            prductComments.insertBefore(commentContainer, prductComments.firstChild);
                        } else {
                            prductComments.append(commentDataContainer)
                        }

                    }
                })
                commentTextbox.value = '';
            } else {
                notifications('You must log in or sign up', 'warn');
            }
            
        }

        createCommentButton.onclick = async () => {
            if(localStorage.token) {
                const getUserRatingStars = document.getElementById('choose_stars').value;
                const viewProductContent = document.getElementById('view_product_content');
                const productId = Number(viewProductContent.dataset.productId);
                const rating = Number(getUserRatingStars);
                const comment = commentTextbox.value;
                await fetch("https://mystore9.herokuapp.com/products/reviews_create/ ", {
                    method: "POST",
                    credentials: "same-origin",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Token ${localStorage.token}`
                    },
                    body: JSON.stringify({
                        "product": productId,
                        "rating": rating,
                        "comment": comment
                    })
                })
                .then(response => {
                    console.log(response);
                    if(response.statusText !== 'ok' || response.status !== 404) {
                        const convertResponse = response.json();
                        console.log(convertResponse)
                        return convertResponse;
                    } else {
                        console.log('there is an error while fetching');
                        const convertResponse = response.json();
                        console.log(convertResponse)
                        return convertResponse;
                    }
                })
                .then( response => {
                    if(response.id) {

                        const logName = document.getElementById('log_name');

                        const commentContainer = document.createElement('div');
                        commentContainer.className = 'comment';

                        const commentTitle = document.createElement('div');
                        commentTitle.className = 'commentTitle';

                        const commentName = document.createElement('span');
                        commentName.className = 'comment-name';
                        commentName.innerText = logName.innerText;

                        const commentStarsContainer = document.createElement('div');
                        commentStarsContainer.className = 'comment-stars-container';

                        const commentRating = response.rating;

                        for(let stars = 0; stars < commentRating; stars++) {
                            commentStarsContainer.innerHTML += `
                            <svg class="total-rating-stars" id="product_user_rating_average_star1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                                <polygon stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="  259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08   29.274,197.007 188.165,173.919 "/>
                            </svg>
                            `
                        }

                        const commentCreatedAt = document.createElement('span');
                        commentCreatedAt.className = 'comment-created-at';
                        commentCreatedAt.innerText = `(${response['created_at']})`;

                        const commentDataContainer = document.createElement('div');
                        commentDataContainer.className = 'comment-data-container';
                        
                        const commentData = document.createElement('p');
                        commentData.className = 'comment-data';
                        commentData.innerText = response.comment;

                        commentDataContainer.append(commentData);
                        
                        commentTitle.append(commentName, commentStarsContainer, commentCreatedAt);
                        commentContainer.append(commentTitle);
                        commentContainer.append(commentDataContainer);

                        const prductComments = document.getElementById('product_comments');
                        const commentsContainer = document.getElementsByClassName('product-comments-container')[0];
                        const comments = document.createElement('div');
                        comments.className = 'product-comments';
                        comments.id = 'product_comments';
                        if(comments.childElementCount > 0) {
                            prductComments.insertBefore(commentContainer, prductComments.firstChild);
                        } else {
                            console.log(commentsContainer);

                            comments.append(commentDataContainer)
                            comments.append(prductComments);
                            commentsContainer.append(comments);
                        }
                    }
                })
                commentTextbox.value = '';
            } else {
                notifications('You must log in or sign up', 'warn');
            }
            
        }
    } else {
        createCommentButton.style.opacity = 0.2;
        createCommentButton.style.cursor = 'not-allowed';
    }
}