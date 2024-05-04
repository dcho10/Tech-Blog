// Set up logout JS
const logout = async () => {
    const response = await fetch("api/users/logout", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
    });

    // If logout successful, redirected to home
    if (response.ok) {
        document.location.replace("/");
    } else {
        alert(response.statusText);
    }
};

document.querySelector("#logout").addEventListener("click", logout);