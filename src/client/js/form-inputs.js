// All inputs container
const inputBox = document.getElementsByClassName('input-box');

// While typing or focus on any input the label move up, when blur the label move down to default
for(let i of inputBox) {
    i.onclick = () => {
        i.parentElement.firstElementChild.style.top = '-1em';
        i.parentElement.firstElementChild.style.fontSize = '1em';
    }

    i.onfocus = () => {
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