// Set up create form JS
const createForm = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#add-title").value;
    const post = document.querySelector("#add-post").value;

    // User must have title and post values entered in order to move on
    if (title && post) {
        const response = await fetch("/api/blogpost/create", {
            method: "POST",
            body: JSON.stringify({ title, post }),
            headers: { "Content-Type" : "application/json" },
        });

        // If creating post is successful, will redirect to dashboard with the rendered blogpost, else, alert pops up
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Post unsucessful.");
        }
    }
};

document.querySelector(".create-form").addEventListener("submit", createForm);