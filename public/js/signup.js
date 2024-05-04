// Set up signup form JS
const signupForm = async (event) => {
    event.preventDefault();

    // Use trim to remove any white space from both ends of during signup entry
    const username = document.querySelector("#username-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    // User must have username, email, and password values entered in order to move on
    if (username && email && password) {
        const response = await fetch ("/api/users", {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
            headers: { "Content-Type" : "application/json" },
        });

        // If signup successful, redirected to home
        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Signup failed");
        }
    }
}

document.querySelector(".signup-form").addEventListener("submit", signupForm);