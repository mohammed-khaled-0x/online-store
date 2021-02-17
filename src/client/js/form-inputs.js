const inputBox = document.getElementsByClassName('input-box');

for(let i of inputBox) {
    i.onclick = () => {
        i.parentElement.firstElementChild.style.top = '-1em';
        i.parentElement.firstElementChild.style.fontSize = '1em';
    }

    i.onblur = () => {
        if(i.value === '') {
            i.parentElement.firstElementChild.style.top = '0.5em';
            i.parentElement.firstElementChild.style.fontSize = '1.2em';
        } 
    }
}