const loginForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#username-text").value.trim();
    const password = document.querySelector("#password-text").value.trim();

    if (email && password) {
        const response = await fetch("api/users/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type" : "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Login failed.");
        }
    }
};

document.querySelector(".login-form").addEventListener("submit", loginForm);