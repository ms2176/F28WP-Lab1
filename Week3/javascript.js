const form = document.getElementById('userRegistrationForm');
const username = document.getElementById('username');
const password = document.getElementById('password');
const email = document.getElementById('email');
const confirmPassword = document.getElementById('confirmPassword');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const emailError = document.getElementById('emailError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

function invalidInput(input, errorElement, message){
    input.classList.add('error');
    errorElement.innerText = message;
}

function validInput(input, errorElement, validmessage){
    input.classList.remove('error');
    input.classList.add('sucess-border');
    errorElement.innerText = validmessage;
}

function checkUsername(){
    if(username.value.trim() === ''){
        invalidInput(username, usernameError, 'Username cannot be blank');
    } else {
        validInput(username, usernameError, 'Username is valid');
    }
}

function checkEmail(){
    if(email.value.trim() === ''){
        invalidInput(email, emailError, 'Email cannot be blank');
    } else if (!email.value.includes('@')) {
        invalidInput(email, emailError, 'Email must contain @');
    }
    else {
        validInput(email, emailError, 'Email is valid');
    }
}

function checkPassword(){
    if(password.value.trim() === ''){
        invalidInput(password, passwordError, 'Password cannot be blank');
    } else if(password.value.length < 8){
        invalidInput(password, passwordError, "Password must be at least 8 characters long");
    } else {
        validInput(password, passwordError, 'Password is valid');
    }
}

function checkConfirmPassword(){
    if(confirmPassword.value.trim() === ''){
        invalidInput(confirmPassword, confirmPasswordError, 'Confirm Password cannot be blank');
    } else if(confirmPassword.value !== password.value){
        invalidInput(confirmPassword, confirmPasswordError, 'Passwords do not match');
    } else if (confirmPassword.value == password.value){
        validInput(confirmPassword, confirmPasswordError, 'Passwords match');
    }
    else {
        validInput(confirmPassword, confirmPasswordError, 'Password is valid');
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkUsername();
    checkEmail();
    checkPassword();
    checkConfirmPassword();

    if (
        username.classList.contains("error") || 
        email.classList.contains("error") || 
        password.classList.contains("error") || 
        confirmPassword.classList.contains("error")
      )  {
        alert("Please fill out the form correctly");
    }
});

username.addEventListener("blur", checkUsername);
email.addEventListener("blur", checkEmail);
password.addEventListener("blur", checkPassword);
confirmPassword.addEventListener("blur", checkConfirmPassword);

// MODAL CODE

const modal = document.getElementById("formModal");
const closeButton = document.getElementById("close");
const ctaButton = document.querySelector(".cta-button");

ctaButton.addEventListener("click", () => {
    modal.style.display = "block";
});

closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});