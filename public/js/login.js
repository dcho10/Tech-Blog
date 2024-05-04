// Set up login form JS
const loginForm = async (event) => {
    event.preventDefault();

    // Use trim to get remove any white spaces from both ends during login entry
    const username = document.querySelector("#username-text").value.trim();
    const password = document.querySelector("#password-text").value.trim();

    // User must have username and password values entered in order to move on
    if (username && password) {
        const response = await fetch("api/users/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type" : "application/json" },
        });

        // If login is successful, user will be redirected to their dashboard, else, alert pops up
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Incorrect username or password, please try again.");
        }
    }
};

document.querySelector(".login-form").addEventListener("submit", loginForm);