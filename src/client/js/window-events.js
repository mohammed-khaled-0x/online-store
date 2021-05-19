import notifications from './assistants functions/notifications';
import labelsProducts from './apis/labels-products';
import currencies from './apis/currencies';
import getShipping from './apis/shipping';

window.onload = () => {
    if(localStorage['remember_login'] === 'yes') {
        if(localStorage.token) {
            fetch("https://mystore9.herokuapp.com/auth/users/me/", {
                method: "GET",
                credentials: "same-origin",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Token ${localStorage.token}`
                }
            })
            .then( response => {
                if(response.statusText !== 'ok' || response.status !== 404) {
                    const convertResponse = response.json();
                    console.log(convertResponse)
                    return convertResponse;
                } else {
                    console.log('there is an error while fetching');
                    const convertResponse = response.json();
                    console.log(convertResponse)
                    return convertResponse;
                }
            })
            .then( response => {
                if(response.username) {
                    
                    const logName = document.getElementById('log_name');
                    logName.innerText = `${response['first_name']} ${response['last_name']}`;

                    const greetingLogin = document.getElementById('greeting_login');
                    const greetingSignup = document.getElementById('greeting_signup');
                    const greetingLogout = document.getElementById('greeting_logout');

                    greetingLogin.style.display = 'none';
                    greetingSignup.style.display = 'none';
                    greetingLogout.style.display = 'block';

                    localStorage.username = response.username;

                    greetingLogout.onclick = async () => {
                        await  fetch("https://mystore9.herokuapp.com/auth/token/logout", {
                            method: 'POST',
                            credentials: 'omit',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json',
                                "Authorization": `Token ${localStorage.token}`
                            }
                        })
                        .then(response => {

                            localStorage.removeItem('token');
                            localStorage.removeItem('username');
                            localStorage['remember_login'] = 'no';

                            greetingLogin.style.display = 'block';
                            greetingSignup.style.display = 'block';
                            greetingLogout.style.display = 'none';

                            logName.innerText = 'Do you have an account?';

                            notifications('You have log out successfully', 'ok');

                            const accountSettingContainer = document.getElementById('account_setting_container');
                            accountSettingContainer.style.display = 'none';
                        })
                    }
                }
            })
            const accountSettingContainer = document.getElementById('account_setting_container');
            accountSettingContainer.style.display = 'flex'
        }
    } else {
        localStorage.removeItem('token');
        localStorage.removeItem('username');        
    }
    
    if(localStorage.currencyId) {
        currencies(localStorage.currency);
        labelsProducts(localStorage.currencyId);
        getShipping(localStorage.currencyId)
    } else {
        currencies();
        labelsProducts();
        getShipping();
    }

    
}

window.onbeforeunload = () => {
    if(localStorage['remember_login'] === 'no') {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }
}