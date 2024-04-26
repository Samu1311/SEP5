document.addEventListener('DOMContentLoaded', function () {
    // Get the username from the query parameter
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('username');

    // Display the username in the placeholder
    document.getElementById('usernamePlaceholder').innerText = username;

// Fetch user progress data
    function fetchUserProgress() {
    fetch(`/api/user/${username}/progress`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching user progress');
            }
            return response.json();
        })
        .then(data => {
            // Update individual progress bars
            updateProgressBar('progressBar1', data.recycling_exp);
            updateProgressBar('progressBar2', data.pollution_exp);
            updateProgressBar('progressBar3', data.food_exp);
            updateProgressBar('progressBar4', data.activeacting_exp);
            updateProgressBar('progressBar5', data.sporty_exp);
            // Calculate the sum of all experience values for progressBar6
            const totalExp = data.recycling_exp + data.pollution_exp + data.food_exp + data.activeacting_exp + data.sporty_exp;
            updateProgressBar('progressBar6', totalExp);
        })
        .catch(error => {
            console.error(error.message);
            // Retry the fetch after a short delay
            setTimeout(fetchUserProgress, 2000);
        });
    }
    // Initial fetch
    fetchUserProgress();

    const pollutionButton = document.getElementById('pollutionButton'); 

    // Add a click event listener to the Pollution button
    pollutionButton.addEventListener('click', function (event) {
        event.preventDefault();

        // Dynamically generate the URL for the user's pollution page
        const pollutionURL = 'http://localhost:3000/html/pollution.html?username=' + encodeURIComponent(username);

        // Redirect to the user's pollution page
        window.location.href = pollutionURL;
    });
});

function updateProgressBar(progressBarId, exp) {
    const progressBar = document.getElementById(progressBarId);
    const percentage = calculatePercentage(exp);
    progressBar.style.width = percentage + '%';
}

function calculatePercentage(exp) {
    // Assuming a maximum experience value of 200 for each category
    const maxExp = 200;
    const percentage = (exp / maxExp) * 100;
    return percentage;
}
