function onresize  ()  {
    const browserWidth = window.outerWidth;
    const browserHeight = window.outerHeight;

    const categories = document.getElementById('categories');
    const mainWidth = document.getElementsByClassName('main-width');
    const sliderContainer = document.getElementById('main_sliders');
    const slides = document.getElementById('slides');
    const topSection = document.getElementById('top_section');

    if(browserWidth <= 1024) {
        categories.style.display = 'none';

        for(let element of mainWidth) {
            element.style.width = '100%';
            element.style.maxWidth = '100%';
            element.style.minWidth = '0';
            if(element.id === 'top_section') {
                element.style.minHeight = '30vw';
                topSection.style.height = '50vw';
            }
        }

        sliderContainer.style.width = '100%';
        sliderContainer.style.height = `50vw`;
        //slides.style.width = `${slides.childElementCount}00%`;

    } else {
        categories.style.display = 'block';

        for(let element of mainWidth) {
            element.style.width = '80%';
            element.style.minWidth = '66em';
            element.style.maxWidth = '70%';
            if(element.id === 'top_section') {
                element.style.minHeight = '';
                topSection.style.height = '30em';
            }
        }

        sliderContainer.style.width = '50em';
        sliderContainer.style.height = `30em`;
    }
}


window.onresize = () => {
    setTimeout(onresize(), 2000)
}
export default onresize;