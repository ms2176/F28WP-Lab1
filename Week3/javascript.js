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
    input.classList.add('invalid');
    errorElement.innerText = message;
}

function validInput(input, errorElement){
    input.classList.remove('invalid');
    errorElement.innerText = '';
}

function checkUsername(){
    if(username.value.trim() === ''){
        invalidInput(username, usernameError, 'Username cannot be blank');
    } else {
        validInput(username, usernameError);
    }
}

function checkEmail(){
    if(email.value.trim() === ''){
        invalidInput(email, emailError, 'Email cannot be blank');
    } else if (!email.value.includes('@')) {
        invalidInput(email, emailError, 'Email must contain @');
    }
    else {
        validInput(email, emailError);
    }
}

function checkPassword(){
    if(password.value.trim() === ''){
        invalidInput(password, passwordError, 'Password cannot be blank');
    } else if(password.value.length < 8){
        invalidInput(password, passwordError, "Password must be at least 8 characters long");
    } else {
        validInput(password, passwordError);
    }
}

function checkConfirmPassword(){
    if(confirmPassword.value.trim() === ''){
        invalidInput(confirmPassword, confirmPasswordError, 'Confirm Password cannot be blank');
    } else if(confirmPassword.value !== password.value){
        invalidInput(confirmPassword, confirmPasswordError, 'Passwords do not match');
    } else {
        validInput(confirmPassword, confirmPasswordError);
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

/*SLIDESHOW*/

let slideIndex = 1;

showSlides(slideIndex);

function plusSlides(n){
    showSlides(slideIndex += n);
}

function showSlides(n){
    const slides = document.getElementsByClassName("mySlides");
    
    if(n > slides.length){
        slideIndex = 1;
    }
    if(n < 1){
        slideIndex = slides.length;
    }
    for(let i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}