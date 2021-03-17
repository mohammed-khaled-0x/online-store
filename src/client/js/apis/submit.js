// Submit using enter button

const emailInput = document.getElementById('login_email');

emailInput.onkeyup = (e) => {
    if(e.keyCode === 13) {

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
                    if(rememberLogin.checked) {
                        localStorage.setItem('token', response['auth_token']);
                        localStorage.setItem('remember_login', 'yes');
                    } else {
                        localStorage.setItem('remember_login', 'no');
                        //sessionStorage.setItem('token', response['auth_token'])
                    }
                } else {
                }
            })
        } else {
            
        }

    }
}

const passwordInput = document.getElementById('login_password');

passwordInput.onkeyup = (e) => {
    if(e.keyCode === 13) {

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
                    if(rememberLogin.checked) {
                        localStorage.setItem('token', response['auth_token']);
                        localStorage.setItem('remember_login', 'yes');
                    } else {
                        localStorage.setItem('remember_login', 'no');
                        //sessionStorage.setItem('token', response['auth_token'])
                    }
                } else {
                }
            })
        } else {
            
        }

    }
}