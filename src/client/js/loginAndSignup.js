const loginGreetingButton = document.getElementById('greeting-login');
const signupGreetingButton = document.getElementById('greeting-signup');
const logForm = document.getElementById('log_form');
const logFormContainer = document.getElementsByClassName('form-container')[0];

loginGreetingButton.onclick = () => {
    logForm.style.display = 'flex'
    //logFormContainer.style.justifyContent = 'flex-start';
};

signupGreetingButton.onclick = () => {
    logForm.style.display = 'flex'
    //logFormContainer.style.justifyContent = 'flex-end';
    location.href='#signup'
};