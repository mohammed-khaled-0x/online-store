const showHidePassowrd = document.getElementsByClassName('show-hide-password');

for(let i of showHidePassowrd) {
    i.onclick = () => {
        if(i.dataset.showHideLoginPassword === 'show') {
            const pass = document.getElementById('login_password');
            pass.type = 'text';
            i.dataset.showHideLoginPassword = 'hide';
            i.innerText = 'hide';
        } else if (i.dataset.showHideLoginPassword === 'hide') {
            const pass = document.getElementById('login_password');
            pass.type = 'password';
            i.dataset.showHideLoginPassword = 'show';
            i.innerText = 'show';
        } else if (i.dataset.showHideSignupPassword === 'show') {
            const pass = document.getElementById('signup_password');
            pass.type = 'text';
            i.dataset.showHideSignupPassword = 'hide';
            i.innerText = 'hide';
        } else if (i.dataset.showHideSignupPassword === 'hide') {
            const pass = document.getElementById('signup_password');
            pass.type = 'password';
            i.dataset.showHideSignupPassword = 'show';
            i.innerText = 'show';
        } else if (i.dataset.showHideSignupRepassword === 'show') {
            const pass = document.getElementById('signup_repassword');
            pass.type = 'text';
            i.dataset.showHideSignupRepassword = 'hide';
            i.innerText = 'hide';
        } else if (i.dataset.showHideSignupRepassword === 'hide') {
            const pass = document.getElementById('signup_repassword');
            pass.type = 'password';
            i.dataset.showHideSignupRepassword = 'show';
            i.innerText = 'show';
        }
    };
}