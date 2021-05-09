window.onload = () => {
    console.log('load');
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

                            localStorage.token = '';
                            localStorage['remember_login'] = 'no';

                            greetingLogin.style.display = 'block';
                            greetingSignup.style.display = 'block';
                            greetingLogout.style.display = 'none';

                            logName.innerText = 'Do you have an account?';

                            notifications('You have log out successfully', 'ok')
                        })
                    }
                }
            })
            
        }
    }
}

window.onbeforeunload = () => {
    if(localStorage['remember_login'] === 'no') {
        localStorage.removeItem('token');
    }
}