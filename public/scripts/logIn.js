document.addEventListener('DOMContentLoaded', function () {
    // Select the form element using its ID
    var loginForm = document.getElementById('loginForm');

    // Add a submit event listener to the form
    loginForm.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Call the login function with the event
        loginUser(event);
    });
});

function loginUser(event) {
    event.preventDefault();

    // Get input values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Validate inputs
    if (!username || !password) {
        alert('Please fill in both username and password');
        return;
    }

    // Send a POST request to the server to validate login credentials
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Invalid credentials');
        }
        return response.json();
    })
    .then(data => {
        // Handle success
        console.log('Login successful');
        alert('Login successful');
        // Dynamically generate the URL for the user's profile page
        var profileURL = 'http://localhost:3000/html/profile.html?username=' + encodeURIComponent(username);

        // Redirect to the user's profile page
        window.location.href = profileURL;
    })
    .catch(error => {
        // Handle error, show an alert
        console.error(error.message);
        alert('Invalid credentials. Please try again.');
    });
}
