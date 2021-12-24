import notifications from '../assistants functions/notifications';

// Login button
const loginButton = document.getElementById('login_button')

loginButton.onclick = async () => {

    // Collect All user inputs from login form
    const emailInput = document.getElementById('login_email');
    const passwordInput = document.getElementById('login_password');
    
    // Handling errors resulting from blank inputs
    let inputs = [emailInput, passwordInput];

    let checkEmptyInputs = false;

    for(let string of inputs) {
        if(string.value === '') {
            const dotError =  document.querySelector(`[data-input='${string.id}']`);
            const errorMessage =  document.querySelector(`[data-input='${string.id}-error-message']`);
            dotError.style.display = 'inline';
            errorMessage.style.display = 'inline';
            errorMessage.innerText = 'This input can\'t be empty.'
            setTimeout( () => {
                const labelError =  document.querySelector(`[for='${string.id}']`);
                dotError.style.opacity = 1;
                errorMessage.style.opacity = 1;
                string.style.borderBottomColor = '#f00';
                labelError.style.backgroundImage = 'linear-gradient(45deg, #f00, #fff)';
            }, 100)
            checkEmptyInputs = false;
        } else {
            checkEmptyInputs = true;
            const dotError =  document.querySelector(`[data-input='${string.id}']`);
            const errorMessage =  document.querySelector(`[data-input='${string.id}-error-message']`);
            const labelError =  document.querySelector(`[for='${string.id}']`);
            dotError.style.opacity = 0;
            errorMessage.style.opacity = 0;
            string.style.borderBottomColor = '#fbc8c8';
            labelError.style.backgroundImage = 'linear-gradient(45deg, #ffd3b5, #fbc8c8, #f3e1ff)';
            setTimeout( () => {
                dotError.style.display = 'none';
                errorMessage.style.display = 'none';
            }, 1000)
        }
    }

    if(checkEmptyInputs) {
        fetch("https://mystore9.herokuapp.com/auth/token/login", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": `${emailInput.value}`,
                "password": `${passwordInput.value}`,
            })
        })
        .then(response => {
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
            let checkErrorInputs = false;
            for(let string of inputs) {
                if(response.non_field_errors) {
                    setTimeout( () => {
                        const dotError =  document.querySelector(`[data-input='${string.id}']`);
                        const errorMessage =  document.querySelector(`[data-input='${string.id}-error-message']`);
                        dotError.style.display = 'inline';
                        errorMessage.style.display = 'inline';
                        errorMessage.innerText = 'The email or password is wrong.';
                        setTimeout( () => {
                            const labelError =  document.querySelector(`[for='${string.id}']`);
                            dotError.style.opacity = 1;
                            errorMessage.style.opacity = 1;
                            string.style.borderBottomColor = '#f00';
                            labelError.style.backgroundImage = 'linear-gradient(45deg, #f00, #fff)';
                        }, 100)
                    }, 1000)
                    checkErrorInputs = false;
                } else {
                    checkErrorInputs = true;
                }
            }

            if(checkErrorInputs) {
                const rememberLogin = document.getElementById('remember_login');
                localStorage.setItem('token', response['auth_token']);
                if(rememberLogin.checked) {
                    localStorage.setItem('remember_login', 'yes');
                } else {
                    localStorage.setItem('remember_login', 'no');
                    if(localStorage.lang === 'en') {
                        notifications('You did not ask the application to remember your login, you will have to log in again if the page is reloaded', 'warn', '60s')
                    } else if(localStorage.lang === 'ar') {
                        notifications('لم تطلب من التطبيق تذكر معلومات تسجيل الدخول الخاصة بك ، فسيتعين عليك تسجيل الدخول مرة أخرى إذا تم إعادة تحميل الصفحة', 'warn', '60s')
                    } else {
                        notifications('You did not ask the application to remember your login, you will have to log in again if the page is reloaded', 'warn', '60s')
                    }
                }

                const getUserData = async () => {
                    await fetch("https://mystore9.herokuapp.com/auth/users/me/", {
                        method: "GET",
                        credentials: "same-origin",
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": `Token ${response['auth_token']}`
                        }
                    })
                    .then(response => {
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
                    .then(response => {
                        console.log(response);

                        if(response.username) {
                            const logForm = document.getElementById('log_form');
                            logForm.style.opacity = 0;
                            setTimeout(() => {
                                logForm.style.display = 'none';
                            }, 1000);

                            const logName = document.getElementById('log_name');
                            logName.innerText = `${response['first_name']} ${response['last_name']}`;
                            logName.dataset.login = 'true';

                            const greetingLogin = document.getElementById('greeting_login');
                            const greetingSignup = document.getElementById('greeting_signup');
                            const greetingLogout = document.getElementById('greeting_logout');

                            greetingLogin.style.display = 'none';
                            greetingSignup.style.display = 'none';
                            greetingLogout.style.display = 'block';

                            localStorage.setItem('username', response.username);

                            if(localStorage.lang === 'en') {
                                notifications('You have signed in successfully', 'ok')
                            } else if(localStorage.lang === 'ar') {
                                notifications('سجلت دخولك بنجاح', 'ok')
                            } else {
                                notifications('You have signed in successfully', 'ok')
                            }

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
                                    
                                    logName.dataset.login = 'false';

                                    if(localStorage.lang === 'en') {
                                        logName.innerText = 'Do you have an account?';
                                        notifications('You have log out successfully', 'ok');
                                    } else if(localStorage.lang === 'ar') {
                                        logName.innerText = 'عندك حساب؟';
                                        notifications('تم الخروج بنجاح', 'ok');
                                    } else {
                                        logName.innerText = 'Do you have an account?';
                                        notifications('You have log out successfully', 'ok');
                                    }

                                    const accountSettingContainer = document.getElementById('account_setting_container');
                                    accountSettingContainer.style.display = 'none';
                                })
                            }
                        }                        
                    })
                }
                getUserData();

                const accountSettingContainer = document.getElementById('account_setting_container');
                accountSettingContainer.style.display = 'flex';

            } else {
            }
        })
    } else {
        
    }

   
}