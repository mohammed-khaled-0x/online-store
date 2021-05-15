import notifications from './../assistants functions/notifications';
import deleteComment from './delete-comment';


const createComment = () => {
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
                            console.log(logName)
    
                            const commentContainer = document.createElement('div');
                            commentContainer.id = `comment_${comment.id}`; 
                            commentContainer.className = 'comment';
                            
                            const commentTitle = document.createElement('div');
                            commentTitle.className = 'commentTitle';
                            
                            const commentName = document.createElement('span');
                            commentName.className = 'comment-name';
                            commentName.innerText = `${logName.innerText}:`;
                            
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
                            const commentEditContainer = document.createElement('div');
                            commentEditContainer.id = response.id;
                            commentEditContainer.className = 'comment-edit-container';
                            commentEditContainer.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                                <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
                                <g><g><g><g><path d="M645.9,990H354.2c-38.2,0-73.1-30.8-78-68.7l-79.9-629c-2.4-19.4,3-37.7,15.4-51.7c12.3-14,29.9-21.7,49.3-21.7h478.1c19.5,0,37,7.7,49.3,21.7c12.3,14,17.8,32.4,15.3,51.7l-79.9,629C719.1,959.2,684.1,990,645.9,990z M261,256.2c-8.6,0-16.2,3.2-21.3,9c-5.1,5.9-7.5,13.8-6.4,22.4l79.9,628.9c2.5,19.6,21.2,36.1,41,36.1h291.8c19.8,0,38.5-16.5,41-36.1l79.9-629c1.1-8.6-1.1-16.5-6.3-22.3s-12.7-9-21.3-9L261,256.2L261,256.2z"/><path d="M773.4,192.9H226.6c-27,0-49-22.7-49-50.7c0-28,22-50.7,49-50.7h194c0.6-45.1,36-81.5,79.4-81.5c43.4,0,78.7,36.5,79.3,81.5h194c27,0,49,22.7,49,50.7S800.4,192.9,773.4,192.9z M226.6,128.8c-6.5,0-11.7,6-11.7,13.4c0,7.4,5.3,13.4,11.7,13.4h546.8c6.5,0,11.7-6,11.7-13.4c0-7.4-5.3-13.4-11.7-13.4H558.2c-5.8,0-11.3-2.7-14.8-7.3c-3.5-4.6-4.7-10.6-3.2-16.2c1.3-4.8,1.9-8.9,1.9-12.6c0-25.1-18.9-45.4-42.1-45.4c-23.2,0-42.2,20.4-42.2,45.4c0,3.6,0.6,7.7,2,12.7c1.5,5.6,0.3,11.6-3.3,16.1c-3.5,4.6-9,7.3-14.8,7.3L226.6,128.8L226.6,128.8z"/></g><g><path d="M374.7,905.9c-9.2,0-17.3-6.8-18.4-16.3l-69.9-547.4c-1.3-10.3,5.9-19.6,16.1-20.8c10-1.8,19.6,5.9,20.9,16.1l69.9,547.4c1.3,10.3-5.9,19.6-16.1,20.8C376.4,905.8,375.6,905.9,374.7,905.9z"/><path d="M609.7,905.9c-0.8,0-1.6,0-2.4-0.2c-10.2-1.3-17.4-10.6-16.1-20.8l69.9-547.4c1.3-10.3,10.9-17.9,20.9-16.1c10.2,1.3,17.4,10.6,16.1,20.8l-69.9,547.4C627,899,619,905.9,609.7,905.9z"/><path d="M489.3,905.9c-10.3,0-18.6-8.4-18.6-18.6V339.8c0-10.3,8.3-18.6,18.6-18.6c10.3,0,18.6,8.4,18.6,18.6v547.4C507.9,897.5,499.6,905.9,489.3,905.9z"/></g></g></g></g>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 361.5 361.5" style="enable-background:new 0 0 361.5 361.5;" xml:space="preserve">
                                <g>
                                    <path d="M361.5,31.068c0-7.063-2.75-13.702-7.742-18.694l-4.637-4.639C338.814-2.569,322.048-2.569,311.74,7.727   c-0.004,0.003-0.008,0.007-0.011,0.01l-22.358,22.356l-3.71-3.71c-1.407-1.406-3.314-2.196-5.304-2.196   c-1.988,0-3.896,0.79-5.303,2.197L21.761,279.681c-0.01,0.009-0.016,0.018-0.023,0.026c-0.867,0.871-1.531,1.966-1.891,3.232   l-19.563,69.01c-0.742,2.615-0.01,5.427,1.912,7.35c1.426,1.426,3.342,2.196,5.305,2.196c0.682,0,1.369-0.093,2.045-0.284   l69.01-19.563c0.022-0.007,1.84-0.458,3.258-1.912L314.67,106.879l0.647,0.647c7.166,7.165,7.166,18.824,0,25.99L222.97,225.86   c-2.929,2.93-2.929,7.678,0,10.607c1.465,1.464,3.385,2.196,5.304,2.196c1.919,0,3.839-0.732,5.304-2.196l92.346-92.345   c13.014-13.015,13.014-34.19,0-47.204l-0.646-0.646l9.833-9.834c1.407-1.407,2.196-3.314,2.196-5.304   c0-1.989-0.789-3.896-2.196-5.304l-3.71-3.71l22.355-22.357C358.75,44.77,361.5,38.131,361.5,31.068z M280.358,42.294L319.2,81.135   l-4.53,4.53l-38.842-38.841L280.358,42.294z M18.381,343.114l12.414-43.792L62.173,330.7L18.381,343.114z M76.511,323.825   L37.67,284.984l9.83-9.829l38.842,38.84L76.511,323.825z M96.949,303.389l-38.844-38.84L265.222,57.431l38.841,38.841   L96.949,303.389z M343.149,39.157l-22.356,22.357l-20.815-20.813l22.357-22.357c0.001-0.001,0.002-0.002,0.002-0.003   c4.461-4.458,11.717-4.458,16.176-0.001l4.636,4.639c2.161,2.16,3.351,5.033,3.351,8.089   C346.5,34.124,345.31,36.997,343.149,39.157z"/>
                                </g>
                            </svg>
                            `
                            deleteComment(commentEditContainer.firstElementChild);
                            commentDataContainer.append(commentData, commentEditContainer);
    
                            commentTitle.append(commentName, commentStarsContainer, commentCreatedAt);
                            commentContainer.append(commentTitle);
                            commentContainer.append(commentDataContainer);
                            
                            const prductComments = document.getElementById('product_comments');
                            if(prductComments) {
                                if(prductComments.childElementCount > 0) {
                                    prductComments.insertBefore(commentContainer, prductComments.firstChild);
                                } else {
                                    prductComments.append(commentContainer)
                                }
                            } else {
                                const comments = document.createElement('div');
                                comments.className = 'product-comments';
                                comments.id = 'product_comments';
                                comments.append(commentContainer)
    
                                const productCommentsContainer = document.getElementsByClassName('product-comments-container')[0];
                                productCommentsContainer.append(comments);
                            }
    
                        }
                    })
                    commentTextbox.value = '';
                    createCommentButton.style.opacity = 0.2;
                    createCommentButton.style.cursor = 'not-allowed';
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
                            console.log(logName)
    
                            const commentContainer = document.createElement('div');
                            commentContainer.id = `comment_${comment.id}`;
                            commentContainer.className = 'comment';
    
                            const commentTitle = document.createElement('div');
                            commentTitle.className = 'commentTitle';
    
                            const commentName = document.createElement('span');
                            commentName.className = 'comment-name';
                            commentName.innerText = `${logName.innerText}:`;
    
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
                            const commentEditContainer = document.createElement('div');
                            commentEditContainer.id = response.id;
                            commentEditContainer.className = 'comment-edit-container';
                            commentEditContainer.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                                <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
                                <g><g><g><g><path d="M645.9,990H354.2c-38.2,0-73.1-30.8-78-68.7l-79.9-629c-2.4-19.4,3-37.7,15.4-51.7c12.3-14,29.9-21.7,49.3-21.7h478.1c19.5,0,37,7.7,49.3,21.7c12.3,14,17.8,32.4,15.3,51.7l-79.9,629C719.1,959.2,684.1,990,645.9,990z M261,256.2c-8.6,0-16.2,3.2-21.3,9c-5.1,5.9-7.5,13.8-6.4,22.4l79.9,628.9c2.5,19.6,21.2,36.1,41,36.1h291.8c19.8,0,38.5-16.5,41-36.1l79.9-629c1.1-8.6-1.1-16.5-6.3-22.3s-12.7-9-21.3-9L261,256.2L261,256.2z"/><path d="M773.4,192.9H226.6c-27,0-49-22.7-49-50.7c0-28,22-50.7,49-50.7h194c0.6-45.1,36-81.5,79.4-81.5c43.4,0,78.7,36.5,79.3,81.5h194c27,0,49,22.7,49,50.7S800.4,192.9,773.4,192.9z M226.6,128.8c-6.5,0-11.7,6-11.7,13.4c0,7.4,5.3,13.4,11.7,13.4h546.8c6.5,0,11.7-6,11.7-13.4c0-7.4-5.3-13.4-11.7-13.4H558.2c-5.8,0-11.3-2.7-14.8-7.3c-3.5-4.6-4.7-10.6-3.2-16.2c1.3-4.8,1.9-8.9,1.9-12.6c0-25.1-18.9-45.4-42.1-45.4c-23.2,0-42.2,20.4-42.2,45.4c0,3.6,0.6,7.7,2,12.7c1.5,5.6,0.3,11.6-3.3,16.1c-3.5,4.6-9,7.3-14.8,7.3L226.6,128.8L226.6,128.8z"/></g><g><path d="M374.7,905.9c-9.2,0-17.3-6.8-18.4-16.3l-69.9-547.4c-1.3-10.3,5.9-19.6,16.1-20.8c10-1.8,19.6,5.9,20.9,16.1l69.9,547.4c1.3,10.3-5.9,19.6-16.1,20.8C376.4,905.8,375.6,905.9,374.7,905.9z"/><path d="M609.7,905.9c-0.8,0-1.6,0-2.4-0.2c-10.2-1.3-17.4-10.6-16.1-20.8l69.9-547.4c1.3-10.3,10.9-17.9,20.9-16.1c10.2,1.3,17.4,10.6,16.1,20.8l-69.9,547.4C627,899,619,905.9,609.7,905.9z"/><path d="M489.3,905.9c-10.3,0-18.6-8.4-18.6-18.6V339.8c0-10.3,8.3-18.6,18.6-18.6c10.3,0,18.6,8.4,18.6,18.6v547.4C507.9,897.5,499.6,905.9,489.3,905.9z"/></g></g></g></g>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 361.5 361.5" style="enable-background:new 0 0 361.5 361.5;" xml:space="preserve">
                                <g>
                                    <path d="M361.5,31.068c0-7.063-2.75-13.702-7.742-18.694l-4.637-4.639C338.814-2.569,322.048-2.569,311.74,7.727   c-0.004,0.003-0.008,0.007-0.011,0.01l-22.358,22.356l-3.71-3.71c-1.407-1.406-3.314-2.196-5.304-2.196   c-1.988,0-3.896,0.79-5.303,2.197L21.761,279.681c-0.01,0.009-0.016,0.018-0.023,0.026c-0.867,0.871-1.531,1.966-1.891,3.232   l-19.563,69.01c-0.742,2.615-0.01,5.427,1.912,7.35c1.426,1.426,3.342,2.196,5.305,2.196c0.682,0,1.369-0.093,2.045-0.284   l69.01-19.563c0.022-0.007,1.84-0.458,3.258-1.912L314.67,106.879l0.647,0.647c7.166,7.165,7.166,18.824,0,25.99L222.97,225.86   c-2.929,2.93-2.929,7.678,0,10.607c1.465,1.464,3.385,2.196,5.304,2.196c1.919,0,3.839-0.732,5.304-2.196l92.346-92.345   c13.014-13.015,13.014-34.19,0-47.204l-0.646-0.646l9.833-9.834c1.407-1.407,2.196-3.314,2.196-5.304   c0-1.989-0.789-3.896-2.196-5.304l-3.71-3.71l22.355-22.357C358.75,44.77,361.5,38.131,361.5,31.068z M280.358,42.294L319.2,81.135   l-4.53,4.53l-38.842-38.841L280.358,42.294z M18.381,343.114l12.414-43.792L62.173,330.7L18.381,343.114z M76.511,323.825   L37.67,284.984l9.83-9.829l38.842,38.84L76.511,323.825z M96.949,303.389l-38.844-38.84L265.222,57.431l38.841,38.841   L96.949,303.389z M343.149,39.157l-22.356,22.357l-20.815-20.813l22.357-22.357c0.001-0.001,0.002-0.002,0.002-0.003   c4.461-4.458,11.717-4.458,16.176-0.001l4.636,4.639c2.161,2.16,3.351,5.033,3.351,8.089   C346.5,34.124,345.31,36.997,343.149,39.157z"/>
                                </g>
                            </svg>
                            `;
    
                            deleteComment(commentEditContainer.firstElementChild);
                            commentDataContainer.append(commentData, commentEditContainer);
    
                            commentTitle.append(commentName, commentStarsContainer, commentCreatedAt);
                            commentContainer.append(commentTitle);
                            commentContainer.append(commentDataContainer);
                            
                            const prductComments = document.getElementById('product_comments');
                            if(prductComments) {
                                if(prductComments.childElementCount > 0) {
                                    prductComments.insertBefore(commentContainer, prductComments.firstChild);
                                } else {
                                    prductComments.append(commentContainer)
                                }
                            } else {
                                const comments = document.createElement('div');
                                comments.className = 'product-comments';
                                comments.id = 'product_comments';
                                comments.append(commentContainer)
    
                                const productCommentsContainer = document.getElementsByClassName('product-comments-container')[0];
                                productCommentsContainer.append(comments);
                            }
    
                        }
                    })
                    commentTextbox.value = '';
                    createCommentButton.style.opacity = 0.2;
                    createCommentButton.style.cursor = 'not-allowed';
                } else {
                    notifications('You must log in or sign up', 'warn');
                }
                
            }
        } else {
            createCommentButton.style.opacity = 0.2;
            createCommentButton.style.cursor = 'not-allowed';
        }
    }
}

export default createComment;