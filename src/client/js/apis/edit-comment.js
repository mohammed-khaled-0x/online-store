import deleteComment from './delete-comment';

const editComment = async (element, commentContainer) => {
    element.onclick = async (e) => {

        const createCommentButton = document.getElementById('create_comment');

        const inputsContainer = createCommentButton.parentElement;
        inputsContainer.removeChild(createCommentButton);
        console.log(inputsContainer)
        
        inputsContainer.innerHTML += `
        <svg id="update_comment" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 117.72 117.72" style="enable-background:new 0 0 117.72 117.72" xml:space="preserve">
            <style type="text/css">
                <![CDATA[
    	            .st0{fill:#01A601;}
                ]]>
            </style>
            <g>
                <path class="st0" d="M58.86,0c9.13,0,17.77,2.08,25.49,5.79c-3.16,2.5-6.09,4.9-8.82,7.21c-5.2-1.89-10.81-2.92-16.66-2.92 c-13.47,0-25.67,5.46-34.49,14.29c-8.83,8.83-14.29,21.02-14.29,34.49c0,13.47,5.46,25.66,14.29,34.49 c8.83,8.83,21.02,14.29,34.49,14.29s25.67-5.46,34.49-14.29c8.83-8.83,14.29-21.02,14.29-34.49c0-3.2-0.31-6.34-0.9-9.37 c2.53-3.3,5.12-6.59,7.77-9.85c2.08,6.02,3.21,12.49,3.21,19.22c0,16.25-6.59,30.97-17.24,41.62 c-10.65,10.65-25.37,17.24-41.62,17.24c-16.25,0-30.97-6.59-41.62-17.24C6.59,89.83,0,75.11,0,58.86 c0-16.25,6.59-30.97,17.24-41.62S42.61,0,58.86,0L58.86,0z M31.44,49.19L45.8,49l1.07,0.28c2.9,1.67,5.63,3.58,8.18,5.74 c1.84,1.56,3.6,3.26,5.27,5.1c5.15-8.29,10.64-15.9,16.44-22.9c6.35-7.67,13.09-14.63,20.17-20.98l1.4-0.54H114l-3.16,3.51 C101.13,30,92.32,41.15,84.36,52.65C76.4,64.16,69.28,76.04,62.95,88.27l-1.97,3.8l-1.81-3.87c-3.34-7.17-7.34-13.75-12.11-19.63 c-4.77-5.88-10.32-11.1-16.79-15.54L31.44,49.19L31.44,49.19z"/>
            </g>
        </svg>
        `;
        

        const oldComment = element.parentElement.parentElement.firstElementChild.innerText;
        const commentBox = document.getElementById('product_comment_textbox');
        commentBox.value = oldComment;

        

        const chooseStars = document.getElementById('choose_stars');
        

        let stars;

        for(let starContainer of commentContainer.firstElementChild.children) {
            if(starContainer.className === 'comment-stars-container') {
                stars = starContainer.childElementCount;
                break;
            }
        }

        chooseStars.value = stars;


        const updateComment = document.getElementById('update_comment');

        chooseStars.onchange = () => {
            updateComment.style.cursor = 'pointer';
            updateComment.style.opacity = 1;
        }

        commentBox.onkeyup = async (e) => {
            updateComment.style.cursor = 'pointer';
            updateComment.style.opacity = 1;

            if(e.keyCode === 13) {
                const data = {
                    "rating": chooseStars.value,
                    "comment": commentBox.value
                }

                await fetch(`https://mystore9.herokuapp.com/products/reviews_update/${commentContainer.dataset.commentId}`, {
                    method: "PUT",
                    credentials: "same-origin",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Token ${localStorage.token}`
                    },
                    body: JSON.stringify(data)
                })
                .then(response => {
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
                    if(response.comment) {

                        const logName = document.getElementById('log_name');
                        console.log(logName)

                        const commentContainer = document.createElement('div');
                        commentContainer.id = `comment_${comment.id}`; 
                        commentContainer.className = 'comment';
                        commentContainer.dataset.commentId = comment.id;
                        
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
                        <svg data-id="edit-comment" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 361.5 361.5" style="enable-background:new 0 0 361.5 361.5;" xml:space="preserve">
                            <g>
                                <path d="M361.5,31.068c0-7.063-2.75-13.702-7.742-18.694l-4.637-4.639C338.814-2.569,322.048-2.569,311.74,7.727   c-0.004,0.003-0.008,0.007-0.011,0.01l-22.358,22.356l-3.71-3.71c-1.407-1.406-3.314-2.196-5.304-2.196   c-1.988,0-3.896,0.79-5.303,2.197L21.761,279.681c-0.01,0.009-0.016,0.018-0.023,0.026c-0.867,0.871-1.531,1.966-1.891,3.232   l-19.563,69.01c-0.742,2.615-0.01,5.427,1.912,7.35c1.426,1.426,3.342,2.196,5.305,2.196c0.682,0,1.369-0.093,2.045-0.284   l69.01-19.563c0.022-0.007,1.84-0.458,3.258-1.912L314.67,106.879l0.647,0.647c7.166,7.165,7.166,18.824,0,25.99L222.97,225.86   c-2.929,2.93-2.929,7.678,0,10.607c1.465,1.464,3.385,2.196,5.304,2.196c1.919,0,3.839-0.732,5.304-2.196l92.346-92.345   c13.014-13.015,13.014-34.19,0-47.204l-0.646-0.646l9.833-9.834c1.407-1.407,2.196-3.314,2.196-5.304   c0-1.989-0.789-3.896-2.196-5.304l-3.71-3.71l22.355-22.357C358.75,44.77,361.5,38.131,361.5,31.068z M280.358,42.294L319.2,81.135   l-4.53,4.53l-38.842-38.841L280.358,42.294z M18.381,343.114l12.414-43.792L62.173,330.7L18.381,343.114z M76.511,323.825   L37.67,284.984l9.83-9.829l38.842,38.84L76.511,323.825z M96.949,303.389l-38.844-38.84L265.222,57.431l38.841,38.841   L96.949,303.389z M343.149,39.157l-22.356,22.357l-20.815-20.813l22.357-22.357c0.001-0.001,0.002-0.002,0.002-0.003   c4.461-4.458,11.717-4.458,16.176-0.001l4.636,4.639c2.161,2.16,3.351,5.033,3.351,8.089   C346.5,34.124,345.31,36.997,343.149,39.157z"/>
                            </g>
                        </svg>
                        `
                        deleteComment(commentEditContainer.firstElementChild);
                        editComment(commentEditContainer.lastElementChild, commentContainer);

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

                    inputsContainer.lastElementChild.remove();
                    inputsContainer.append(createCommentButton);
                    commentBox.value = '';
                    chooseStars.value = 5;
                })
            }
        }

        updateComment.onclick = async () => {
            const data = {
                "rating": chooseStars.value,
                "comment": commentBox.value
            }

            await fetch(`https://mystore9.herokuapp.com/products/reviews_update/${commentContainer.dataset.commentId}`, {
                method: "PUT",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.token}`
                },
                body: JSON.stringify(data)
            })
            .then(response => {
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
                if(response.comment) {

                    const logName = document.getElementById('log_name');
                    console.log(logName)

                    const commentContainer = document.createElement('div');
                    commentContainer.id = `comment_${comment.id}`; 
                    commentContainer.className = 'comment';
                    commentContainer.dataset.commentId = comment.id;
                    
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
                    <svg data-id="edit-comment" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 361.5 361.5" style="enable-background:new 0 0 361.5 361.5;" xml:space="preserve">
                        <g>
                            <path d="M361.5,31.068c0-7.063-2.75-13.702-7.742-18.694l-4.637-4.639C338.814-2.569,322.048-2.569,311.74,7.727   c-0.004,0.003-0.008,0.007-0.011,0.01l-22.358,22.356l-3.71-3.71c-1.407-1.406-3.314-2.196-5.304-2.196   c-1.988,0-3.896,0.79-5.303,2.197L21.761,279.681c-0.01,0.009-0.016,0.018-0.023,0.026c-0.867,0.871-1.531,1.966-1.891,3.232   l-19.563,69.01c-0.742,2.615-0.01,5.427,1.912,7.35c1.426,1.426,3.342,2.196,5.305,2.196c0.682,0,1.369-0.093,2.045-0.284   l69.01-19.563c0.022-0.007,1.84-0.458,3.258-1.912L314.67,106.879l0.647,0.647c7.166,7.165,7.166,18.824,0,25.99L222.97,225.86   c-2.929,2.93-2.929,7.678,0,10.607c1.465,1.464,3.385,2.196,5.304,2.196c1.919,0,3.839-0.732,5.304-2.196l92.346-92.345   c13.014-13.015,13.014-34.19,0-47.204l-0.646-0.646l9.833-9.834c1.407-1.407,2.196-3.314,2.196-5.304   c0-1.989-0.789-3.896-2.196-5.304l-3.71-3.71l22.355-22.357C358.75,44.77,361.5,38.131,361.5,31.068z M280.358,42.294L319.2,81.135   l-4.53,4.53l-38.842-38.841L280.358,42.294z M18.381,343.114l12.414-43.792L62.173,330.7L18.381,343.114z M76.511,323.825   L37.67,284.984l9.83-9.829l38.842,38.84L76.511,323.825z M96.949,303.389l-38.844-38.84L265.222,57.431l38.841,38.841   L96.949,303.389z M343.149,39.157l-22.356,22.357l-20.815-20.813l22.357-22.357c0.001-0.001,0.002-0.002,0.002-0.003   c4.461-4.458,11.717-4.458,16.176-0.001l4.636,4.639c2.161,2.16,3.351,5.033,3.351,8.089   C346.5,34.124,345.31,36.997,343.149,39.157z"/>
                        </g>
                    </svg>
                    `
                    deleteComment(commentEditContainer.firstElementChild);
                    editComment(commentEditContainer.lastElementChild, commentContainer);

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

                inputsContainer.lastElementChild.remove();
                inputsContainer.append(createCommentButton);
                commentBox.value = '';
                chooseStars.value = 5;
            })
        }

        const comment = document.getElementById(`comment_${element.parentElement.id}`);
        comment.parentElement.removeChild(comment);

        
    }
}
/*

const comment = element.parentElement.parentElement.firstElementChild;
        comment.classList.add('edit-comment');
        comment.contentEditable = 'true';
        comment.focus();
        const parentElement = e.target.parentElement;
        parentElement.lastElementChild.remove();
        parentElement.innerHTML += `
        <svg id="update_comment" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 117.72 117.72" style="enable-background:new 0 0 117.72 117.72" xml:space="preserve"><style type="text/css"><![CDATA[
	.st0{fill:#01A601;}
]]></style><g><path class="st0" d="M58.86,0c9.13,0,17.77,2.08,25.49,5.79c-3.16,2.5-6.09,4.9-8.82,7.21c-5.2-1.89-10.81-2.92-16.66-2.92 c-13.47,0-25.67,5.46-34.49,14.29c-8.83,8.83-14.29,21.02-14.29,34.49c0,13.47,5.46,25.66,14.29,34.49 c8.83,8.83,21.02,14.29,34.49,14.29s25.67-5.46,34.49-14.29c8.83-8.83,14.29-21.02,14.29-34.49c0-3.2-0.31-6.34-0.9-9.37 c2.53-3.3,5.12-6.59,7.77-9.85c2.08,6.02,3.21,12.49,3.21,19.22c0,16.25-6.59,30.97-17.24,41.62 c-10.65,10.65-25.37,17.24-41.62,17.24c-16.25,0-30.97-6.59-41.62-17.24C6.59,89.83,0,75.11,0,58.86 c0-16.25,6.59-30.97,17.24-41.62S42.61,0,58.86,0L58.86,0z M31.44,49.19L45.8,49l1.07,0.28c2.9,1.67,5.63,3.58,8.18,5.74 c1.84,1.56,3.6,3.26,5.27,5.1c5.15-8.29,10.64-15.9,16.44-22.9c6.35-7.67,13.09-14.63,20.17-20.98l1.4-0.54H114l-3.16,3.51 C101.13,30,92.32,41.15,84.36,52.65C76.4,64.16,69.28,76.04,62.95,88.27l-1.97,3.8l-1.81-3.87c-3.34-7.17-7.34-13.75-12.11-19.63 c-4.77-5.88-10.32-11.1-16.79-15.54L31.44,49.19L31.44,49.19z"/></g></svg>
        `;

        console.log(commentContainer);
        for(let i = 0; i < commentContainer.firstElementChild.childElementCount; i++) {
            console.log('test')
            if(commentContainer.firstElementChild.children[i].className === 'comment-stars-container') {
                console.log('yes')
            }
        }
        
        const updateComment = document.getElementById('update_comment');

        updateComment.onclick = async () => {
            const comment = document.getElementsByClassName('edit-comment')[0];
            console.log(commentContainer.dataset.commentId)
            
            /*await fetch(`https://mystore9.herokuapp.com/products/reviews_update/${commentId}`, {
                method: "DELETE",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.token}`
                },
                body: {
                    "rating": 3,
                    "comment": comment.value
                }
            })
            .then(response => {
                console.log(response)
            })
        }

*/

export default editComment;