// Set up edit form JS
const editForm = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector("#add-title").value;
    const post = document.querySelector("#add-post").value;

    // Targets id for blogpost
    const blogPostId = window.location.href.split("/").pop();

    // User must have title and post values entered in order to move on
    if (title && post) {
        // Use split method to obtain the dynamic id for fetch request
        const response = await fetch(`/api/blogpost/edit/${blogPostId}`, {
            method: "PUT",
            body: JSON.stringify({ title, post }),
            headers: { "Content-Type" : "application/json" },
        });

        // If editing post is successful, dashboard will have updated post, else, alert pops up
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Post unsucessful.");
        }
    }
};

document.querySelector(".create-form").addEventListener("submit", editForm);