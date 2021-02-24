// Login Button
const loginGreetingButton = document.getElementById('greeting-login');
// Signup button
const signupGreetingButton = document.getElementById('greeting-signup');
// Login and signup form
const logForm = document.getElementById('log_form');
// Form container
const logFormContainer = document.getElementsByClassName('form-container')[0];
// Login and signup inputs container
const logContainer = document.getElementsByClassName('log-container')[0];

// ======================================================== //

// Show login and signup form while click on login or signup

// Show login container while click on login button
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

// Show signup container while click on signup button
signupGreetingButton.onclick = () => {
    location.href='#signup';
    logForm.style.display = 'flex';
    logFormContainer.style.width = '45em';
    logFormContainer.style.height = '38em';
    logContainer.style.height = '27em';
    setTimeout(() => {
        logForm.style.opacity = 1;
    }, 350);
};

// ======================================================== //

// When click the cancel button or background form should close login and signup form

// Close button
const closeButton = document.getElementsByClassName('close-button')[0];
// When click the cancel button
closeButton.onclick = () => {
    const dotError = document.querySelectorAll('[data-input]');
    for(let i of dotError) {
        i.style.opacity = 0;
        setTimeout( () => {
            i.style.display = 'none';
        }, 1000)
    }

    closeButton.style.animationName = 'close-button-spin';
    logForm.style.opacity = 0;
    setTimeout(() => {
        logForm.style.display = 'none';
        closeButton.style.animationName = '';
    }, 1000);
};

// Gray background for making focus on form
const logBackground = document.getElementsByClassName('log-background')[0];
// When click the background of the form
logBackground.onclick = () => {
    logForm.style.opacity = 0;
    setTimeout(() => {
        logForm.style.display = 'none';
    }, 1000);
}

// Greeting Container
const greeting = document.getElementsByClassName('greeting')[0];
// Login and signup buttons box
const loginSignupBox = document.getElementsByClassName('login-signup-box')[0];
// Login and signup buttons
const loginSignup = document.getElementsByClassName('login-signup')[0];

// When click on greeting container Login and signup buttons box show
greeting.onclick = () => {
    loginSignupBox.style.display = 'flex';
    loginSignupBox.style.opacity = 1;
    loginSignup.style.display = 'flex';
    setTimeout(() => {
        loginSignup.style.opacity = 1;
        loginSignup.style.top = '1.2em';
    }, 2)
}

// When leave the Login and signup buttons box it will hide
greeting.onmouseleave = () => {
    const x = setTimeout( () => {
        loginSignupBox.style.opacity = 0;
        loginSignup.style.opacity = 0;
        loginSignup.style.top = '2.2em';
        setTimeout(() => {
            loginSignupBox.style.display = 'none';
            loginSignup.style.display = 'none';
        }, 700)
    }, 1000)

    // When the mouse is return to login and signup buttons box
    loginSignupBox.onmouseenter = () => {
        clearTimeout(x)
        console.log('test')
    }
}


// Link button to go to login container
const loginHref = document.getElementById('login_href');
// Link button to go to signup container
const signupHref = document.getElementById('signup_href');

loginHref.onclick = () => {
    logFormContainer.style.width = '35em';
    logFormContainer.style.height = '25em';
    logContainer.style.height = '17em';
    setTimeout(() => {
        logContainer.scrollTo(-1000, 0);
    }, 500)
};

signupHref.onclick = () => {
    logFormContainer.style.width = '45em';
    logFormContainer.style.height = '38em';
    logContainer.style.height = '27em';
    setTimeout(() => {
        logContainer.scrollTo(5000, 0);
    }, 1000)
};