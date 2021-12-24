import tile from '../../assets/icons/tile.png';
import slider from '../../assets/icons/sliders.png';

const viewOption = () => {
    const viewOptionElements = document.getElementsByClassName('view-option');
    for(let viewOptionElement of viewOptionElements) {
        viewOptionElement.onclick = (e) => {
            if(e.target.dataset.option === 'tile') {
                e.target.dataset.option = 'slider';
                e.target.style.backgroundImage = `url(${slider})`;
                e.target.parentElement.lastElementChild.style.flexWrap = 'wrap';
                e.target.parentElement.children[2].style.display = 'none';
                e.target.parentElement.children[3].style.display = 'none';
                e.target.style.width = '2em';
                e.target.style.height = '2em';
            } else if(e.target.dataset.option === 'slider') {
                e.target.dataset.option = 'tile';
                e.target.style.backgroundImage = `url(${tile})`;
                e.target.parentElement.lastElementChild.style.flexWrap = 'nowrap';
                e.target.parentElement.children[2].style.display = 'block';
                e.target.parentElement.children[3].style.display = 'block';
                e.target.style.width = '1.5em';
                e.target.style.height = '1.5em';
            }
        }  
    }
}

export default viewOption;