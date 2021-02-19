const loginGreetingButton = document.getElementById('greeting-login');
const signupGreetingButton = document.getElementById('greeting-signup');
const logForm = document.getElementById('log_form');
const logFormContainer = document.getElementsByClassName('form-container')[0];
const logContainer = document.getElementsByClassName('log-container')[0];

loginGreetingButton.onclick = () => {
    location.href='#login';
    logForm.style.display = 'flex';
    logFormContainer.style.width = '35em';
    logFormContainer.style.height = '25em';
    logContainer.style.height = '17em';
    setTimeout(() => {
        logForm.style.opacity = 1;
    }, 350);
};

signupGreetingButton.onclick = () => {
    location.href='#signup';
    logForm.style.display = 'flex';
    logFormContainer.style.width = '45em';
    logFormContainer.style.height = '35em';
    logContainer.style.height = '27em';
    setTimeout(() => {
        logForm.style.opacity = 1;
    }, 350);
};

const closeButton = document.getElementsByClassName('close-button')[0];
closeButton.onclick = () => {
    closeButton.style.animationName = 'close-button-spin';
    logForm.style.opacity = 0;
    setTimeout(() => {
        logForm.style.display = 'none';
        closeButton.style.animationName = '';
    }, 1000);
};

const logBackground = document.getElementsByClassName('log-background')[0];
logBackground.onclick = () => {
    logForm.style.opacity = 0;
    setTimeout(() => {
        logForm.style.display = 'none';
    }, 1000);
}


const greeting = document.getElementsByClassName('greeting')[0];
const inupBox = document.getElementsByClassName('in-up-box')[0];
const inup = document.getElementsByClassName('in-up')[0];
greeting.onclick = () => {
    if(logForm.style.display !== 'flex') {
        inupBox.style.display = 'flex';
        inupBox.style.opacity = 1;
        inup.style.display = 'flex';
        setTimeout(() => {
            inup.style.opacity = 1;
            inup.style.top = '1.2em';
        }, 2)
    }
}

greeting.onmouseleave = () => {
    inupBox.style.opacity = 0;
    inup.style.opacity = 0;
    inup.style.top = '2.2em';
    setTimeout(() => {
        inupBox.style.display = 'none';
        inup.style.display = 'none';
    }, 700)
}

const signupHref = document.getElementById('signup_href');
const loginHref = document.getElementById('login_href');


signupHref.onclick = () => {
    logFormContainer.style.width = '45em';
    logFormContainer.style.height = '35em';
    logContainer.style.height = '27em';
    setTimeout(() => {
        logContainer.scrollTo(5000, 0);
    }, 1000)
};
loginHref.onclick = () => {
    logFormContainer.style.width = '35em';
    logFormContainer.style.height = '25em';
    logContainer.style.height = '17em';
    setTimeout(() => {
        logContainer.scrollTo(-1000, 0);
    }, 500)
};