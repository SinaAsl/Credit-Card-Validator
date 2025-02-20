let form = document.getElementById("mainForm");
let cardInput = document.getElementById("credit_card_number");
let nameInput = document.getElementById("fname");
let emailInput = document.getElementById("email");
let errMessage = document.getElementById("error");

// Defining the Function to highlight errors in pink
function highlightError(element, hasError) {
    element.style.backgroundColor = hasError ? "#700064" : "white";
}

// Capitalize name input after typing
nameInput.addEventListener("blur", function () {
    nameInput.value = nameInput.value.toUpperCase();
    validateName(); // Run name validation on blur
});

// Validate Name (must contain given + family name)
function validateName() {
    let name = nameInput.value.trim(); //this will remove white space, tabs and new lines
    let nameParts = name.split(" "); //splitting the name into array, the separator is space " "
    let isValid = nameParts.length >= 2; // Must have at least two words

    highlightError(nameInput, !isValid);
    return isValid;
}

// Validate Email (Regex check)
function validateEmail() {
    let email = emailInput.value.trim();
    let isValid = /^\S+@\S+\.\S+$/.test(email); // Basic email regex check

    highlightError(emailInput, !isValid);
    return isValid;
}

// Validate Credit Card (Luhn’s Algorithm & non-zero check)
function validateCard() {
    let cardNumber = cardInput.value.trim();
    
    if (!/^\d+$/.test(cardNumber) || cardNumber.length < 11 || cardNumber.length > 19 || !luhnCheck(cardNumber)) {
        highlightError(cardInput, true);
        return false;
    }
    
    highlightError(cardInput, false);
    return true;
}

// Luhn Algorithm for credit card validation
function luhnCheck(number) {
    let digits = number.split("").map(Number).reverse();
    let sum = 0;

    for (let i = 0; i < digits.length; i++) {
        let num = digits[i];

        if (i % 2 === 1) {
            num *= 2;
            if (num > 9) num -= 9;
        }

        sum += num;
    }

    return sum % 10 === 0;
}

// Validate on form submit
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    let isNameValid = validateName();
    let isEmailValid = validateEmail();
    let isCardValid = validateCard();

    if (isNameValid && isEmailValid && isCardValid) {
        sendEmail(); // If all fields are valid, send email
    } else {
        errMessage.textContent = "Please correct errors before submitting.";
    }
});

// Send email using mailto:
function sendEmail() {
    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let card = cardInput.value.trim();
    
    let mailtoLink = `mailto:challenge@dn-uk.com?subject=User%20Validation&body=Name: ${name}%0AEmail: ${email}%0ACredit Card: ${card}`;
    
    window.location.href = mailtoLink;
    alert("Request sent successfully!");

}
