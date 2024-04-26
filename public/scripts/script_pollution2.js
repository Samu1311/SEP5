document.addEventListener('DOMContentLoaded', function () {
    // Extract the username from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    // Call the function to update badge counters
    updateBadgeCounters(username);

    // Progress Bar 1
    const inputField1 = document.getElementById('numberInput1');
    const addButton1 = document.getElementById('addButton1');
    const counterDisplay1 = document.getElementById('counter1');
    const progressBar1 = document.getElementById('progressBar1');

    // Add event listener to the Add button
    addButton1.addEventListener('click', function () {
        const value = parseInt(inputField1.value);
        if (!isNaN(value)) {
            // Send a POST request to update the badge counter in the database
            fetch(`/api/user/${username}/pollution-badges/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    badgeNumber: 1, // Adjust based on the badge number
                    value,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    // Update badge counter on the page
                    counterDisplay1.textContent = 'Counter: ' + data.updatedCounter;
                    progressBar1.value = data.updatedCounter;
                })
                .catch(error => {
                    console.error(error.message);
                });
        }
    });

    // Update badge counters function
    function updateBadgeCounters(username) {
        // Send a GET request to the server to retrieve badge counters
        fetch(`/api/user/${username}/pollution-badges`)
            .then(response => response.json())
            .then(data => {
                // Update badge counters on the page
                counterDisplay1.textContent = 'Counter: ' + data.badge1Counter;
                progressBar1.value = data.badge1Counter;

                // Repeat similar updates for other badges (if needed)
            })
            .catch(error => {
                console.error(error.message);
            });
    }
});
