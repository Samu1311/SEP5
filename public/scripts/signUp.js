document.addEventListener('DOMContentLoaded', function () {
    // Select the form element using its ID
    var signUpForm = document.getElementById('signupForm');

    // Add a submit event listener to the form
    signUpForm.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Call the signUpUser function with the event
        signUpUser(event);
    });
});

function signUpUser(event) {
    event.preventDefault();

    // Get input values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm_password').value;
    var firstName = document.getElementById('f_name').value;
    var lastName = document.getElementById('l_name').value;
    var email = document.getElementById('email').value;
    var confirmEmail = document.getElementById('confirm_email').value;
    var phoneNumber = document.getElementById('phone_number').value;
    var country = document.getElementById('country').value;
    var dob = document.getElementById('dob').value;
    var gender = document.getElementById('gender').value;
    var numberOfPeople = document.getElementById('no_of_people').value;

    // Validate inputs
    if (!username || !password || !confirmPassword || !firstName || !lastName || !email || !confirmEmail || !phoneNumber || !country || !dob || !gender || !numberOfPeople) {
        alert('Please fill in all fields');
        return;
    }

    // Validate email and confirm email
    if (email !== confirmEmail) {
        alert('Email and Confirm Email must match');
        return;
    }

    // Validate password and confirm password
    if (password !== confirmPassword) {
        alert('Password and Confirm Password must match');
        return;
    }
    // Send a POST request to the server to create the user
    fetch('/SignUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            country: country,
            dob: dob,
            gender: gender,
            numberOfPeople: numberOfPeople,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error creating the user');
        }
        if (response.ok) {
            console.log('User created successfully');
            alert('User created successfully');
            // Redirect after successful signup
            window.location.href = "http://localhost:3000/html/home.html";
        }
        return response.json();
    })
    .then(data => {
        // Handle success
        console.log('User created successfully');
    })
    .catch(error => {
        // Handle error
        console.error(error.message);
    });
}