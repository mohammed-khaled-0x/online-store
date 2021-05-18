const cartMainContainer = document.getElementsByClassName('cart')[0];
const userCartContainer = document.getElementById('user_cart_container');
const userCart = document.getElementById('user_cart');

cartMainContainer.onmouseenter = () => {
    userCartContainer.style.display = 'flex';
    userCartContainer.style.opacity = 1;
    userCart.style.display = 'flex';
    //setTimeout(() => {
        userCart.style.opacity = 1;
        userCart.style.top = '1.2em';
    //}, 2)
}

// When leave the Login and signup buttons box it will hide
cartMainContainer.onmouseleave = () => {
    //const wait = setTimeout( () => {
        userCartContainer.style.opacity = 0;
        userCart.style.opacity = 0;
        userCart.style.top = '2.2em';
        userCartContainer.style.display = 'none';
        userCart.style.display = 'none';
    //}, 1000)

    // When the mouse is return to login and signup buttons box
    userCartContainer.onmouseenter = () => {
        //clearTimeout(wait)
    }
}
