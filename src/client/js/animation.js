//Search Lens Hover Animation
const circleOne = document.getElementsByClassName('lens-circle')[0];
const circleTwo = document.getElementsByClassName('lens-circle')[1];
const circleThree = document.getElementsByClassName('lens-circle')[2];
const circleFour = document.getElementsByClassName('lens-circle')[3];
const circleFive = document.getElementsByClassName('lens-circle')[4];

const searchLens = document.getElementsByClassName('search-lens')[0];
searchLens.onmousedown = () => {
    circleOne.setAttribute('r', '208');
    circleTwo.setAttribute('r', '176');
    circleThree.setAttribute('r', '144');
    circleFour.setAttribute('r', '112');
    circleFive.setAttribute('r', '80');
}

searchLens.onmouseenter = () => {
    circleOne.setAttribute('r', '156');
    circleTwo.setAttribute('r', '132');
    circleThree.setAttribute('r', '108');
    circleFour.setAttribute('r', '84');
    circleFive.setAttribute('r', '60');
}

searchLens.onmouseleave = () => {
    circleOne.setAttribute('r', '104');
    circleTwo.setAttribute('r', '88');
    circleThree.setAttribute('r', '72');
    circleFour.setAttribute('r', '56');
    circleFive.setAttribute('r', '40');
}

