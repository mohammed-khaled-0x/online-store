const sliderContainer = document.getElementById('main_sliders');

const slider = 'https://mystore9.herokuapp.com/products/slider/en';

const getSliders = async () => {

    await fetch(slider)
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
        const slides = document.createElement('div');
        slides.id = 'slides';
        slides.style.width = `calc(${sliderContainer.offsetWidth}px * ${response.length})`;
        slides.style.height = `${sliderContainer.offsetHeight}px`;
        const ballsContainer = document.createElement('div');
        ballsContainer.className = 'balls-container';
        for(let slider in response) {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.title = response[slider].name;
            slide.style.backgroundImage = `url(https://res.cloudinary.com/doit/${response[slider].image})`;
            const slideBall = document.createElement('div');
            slideBall.className = 'slide-ball';
            slideBall.dataset.index = slider;
            const slideBallBackground = document.createElement('div');
            slideBallBackground.className = 'slide-ball-background';
            slideBall.append(slideBallBackground);
            ballsContainer.append(slideBall);
            slides.append(slide);
        }
        sliderContainer.append(slides);
        sliderContainer.append(ballsContainer);
    })
    .then(() => {
        const mainSlidersContainer = document.getElementById('main_sliders');
        const slides = document.getElementById('slides');
        const sliders = document.getElementsByClassName('slide');
        const slideBall = document.getElementsByClassName('slide-ball');
        slideBall[0].classList.add('active');
        let index = 0;
        let slideWidth = sliders[0].offsetWidth;
        var sliderTime = setInterval( () => {
            slides.style.transition = '1s';
            if(index < sliders.length - 1) {
                index++;
                slides.style.left = `calc( -${slideWidth}px * ${index} )`;
                for(let ball of slideBall) {
                    ball.classList.remove('active');
                }
                slideBall[index].classList.add('active');
            } else {
                index = 0;
                slides.style.transition = '200ms';
                slides.style.left = `calc( -${slideWidth}px * ${index} )`;
                for(let ball of slideBall) {
                    ball.classList.remove('active');
                }
                slideBall[index].classList.add('active');
            }
        }, 5000 )
        /*mainSlidersContainer.onmouseleave = () => {
            var sliderTime = setInterval( () => {
                if(index < sliders.length - 1) {
                    index++;
                    slides.style.left = `calc( -${slideWidth}px * ${index} )`;
                    for(let ball of slideBall) {
                        ball.classList.remove('active');
                    }
                    slideBall[index].classList.add('active');
                } else {
                    index = 0;
                    slides.style.left = `calc( -${slideWidth}px * ${index} )`;
                    for(let ball of slideBall) {
                        ball.classList.remove('active');
                    }
                    slideBall[index].classList.add('active');
                }
            }, 5000 )
        }
        mainSlidersContainer.onmouseenter = () => {
            clearInterval(sliderTime);
        }*/

        const leftSlideClick = document.getElementById('left_slide_click');
        const rightSlideClick = document.getElementById('right_slide_click');

        leftSlideClick.onclick = () => {
                if(index > 0) {
                    index--;
                    slides.style.left = `calc( -${slideWidth}px * ${index} )`;
                    for(let ball of slideBall) {
                        ball.classList.remove('active');
                    }
                    slideBall[index].classList.add('active');
                } else {
                    index = sliders.length - 1
                    slides.style.left = `calc( -${slideWidth}px * ${index} )`;
                    for(let ball of slideBall) {
                        ball.classList.remove('active');
                    }
                    slideBall[index].classList.add('active');
                }
        }

        rightSlideClick.onclick = () => {
                if(index < sliders.length - 1) {
                    index++;
                    slides.style.left = `calc( -${slideWidth}px * ${index} )`;
                    for(let ball of slideBall) {
                        ball.classList.remove('active');
                    }
                    slideBall[index].classList.add('active');
                } else {
                    index = 0;
                    slides.style.left = `calc( -${slideWidth}px * ${index} )`;
                    for(let ball of slideBall) {
                        ball.classList.remove('active');
                    }
                    slideBall[index].classList.add('active');
                }
                
        }

        for( let clickedBall of slideBall) {
            clickedBall.onclick = () => {
                index = clickedBall.dataset.index;
                slides.style.left = `calc( -${slideWidth}px * ${index} )`;
                for(let ball of slideBall) {
                    ball.classList.remove('active');
                }           
                slideBall[index].classList.add('active');
                console.log(index)
                console.log(slideWidth)
            }
        }
    })
}

getSliders();