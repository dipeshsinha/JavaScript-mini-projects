const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// email validation

function isValidEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, "Email is not valid");
    }
}

function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if(input.value.trim() === '') {
            showError(input, `${getInputName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}
// Check Length

function checkLength(input, minLength, maxLength) {
    if(input.value.length < minLength) {
        showError(input, `${getInputName(input)} should have length more than ${minLength}`);
    } else if(input.value.length > maxLength) {
        showError(input, `${getInputName(input)} should have length less than ${maxLength}`);
    } else {
        showSuccess(input);
    }
}

function getInputName(input) {
    return input.id.charAt(0).toUpperCase() +  input.id.slice(1);
}

function passwordLengthValidation(input, input2) {
    if (input.value !== input2.value) {
        showError(input2, "Passwords do not match");
    } else {
        showSuccess(input2);
    }
}



form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 20);
    checkLength(password, 6, 20);
    isValidEmail(email);
    passwordLengthValidation(password, password2);
})