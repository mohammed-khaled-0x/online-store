const bodyContainer = document.getElementById('body');
const loading = document.getElementById('loading');

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