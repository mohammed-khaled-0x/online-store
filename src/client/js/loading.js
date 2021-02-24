// Main body container
const bodyContainer = document.getElementById('body');
// Loading
const loading = document.getElementById('loading');

// Loading will be shown until the page has completed loading
window.onload = () => {
    setTimeout( () => {
        bodyContainer.style.display = 'block';
        bodyContainer.style.opacity = 1;
        loading.style.opacity = 0;
        setTimeout( () => {
            loading.style.display = 'none';
            loading.style.animationName = '';
        }, 1000);
    }, 5000);
};