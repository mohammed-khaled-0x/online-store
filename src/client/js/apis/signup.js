const signupButton = document.getElementById('signup_button')

signupButton.onclick = async () => {

    
    
    //Collect All user inputs from signup form
    const firstNameInput = document.getElementById('signup_firstname');
    const lastNameInput = document.getElementById('signup_lastname');
    const userNameInput = document.getElementById('signup_username');
    const phoneInput = document.getElementById('signup_phone');
    const emailInput = document.getElementById('signup_email');
    const passwordInput = document.getElementById('signup_password');
    const repasswordInput = document.getElementById('signup_repassword');
    
    //Handling errors resulting from blank inputs
    let inputs = [firstNameInput, lastNameInput,
                  userNameInput, phoneInput,
                  emailInput, passwordInput,
                  repasswordInput];

    let checkEmptyInputs = false;

    for(let string of inputs) {
        if(string.value === '') {
            const dotError =  document.querySelector(`[data-input='${string.id}']`);
            dotError.style.display = 'inline';
            setTimeout( () => {
                const labelError =  document.querySelector(`[for='${string.id}']`);
                dotError.style.opacity = 1;
                string.style.borderBottomColor = '#f00';
                labelError.style.backgroundImage = 'linear-gradient(45deg, #f00, #fff)';
            }, 100)
            checkEmptyInputs = false;
        } else {
            checkEmptyInputs = true;
            const dotError =  document.querySelector(`[data-input='${string.id}']`);
            const labelError =  document.querySelector(`[for='${string.id}']`);
            dotError.style.opacity = 0;
            string.style.borderBottomColor = '#fbc8c8';
            labelError.style.backgroundImage = 'linear-gradient(45deg, #ffd3b5, #fbc8c8, #f3e1ff)';
            setTimeout( () => {
                dotError.style.display = 'none';
            }, 1000)
        }
    }

    if(checkEmptyInputs) {
        fetch("https://mystore9.herokuapp.com/auth/users/", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": `${userNameInput.value}`,
                "phone": `${phoneInput.value}`,
                "first_name": `${firstNameInput.value}`,
                "last_name": `${lastNameInput.value}`,
                "email": `${emailInput.value}`,
                "password": `${passwordInput.value}`,
                "re_password": `${repasswordInput.value}`
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
    } else {

    }

   
}


