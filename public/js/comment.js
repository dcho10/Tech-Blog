// Set up comment form JS
const commentForm = async (event) => {
    event.preventDefault();

    const comment = document.querySelector("#add-comment").value;
    // Use split method to get the dynamic id value
    const blogPostId = window.location.href.split("/")[window.location.href.split("/").length-1];

    // User must have comment values entered in order to move on
    if (comment) {
        const response = await fetch(`/api/blogpost/blogpost/${blogPostId}`, {
            method: "POST",
            body: JSON.stringify({ comment, blogPostId }),
            headers: { "Content-Type" : "application/json" },
        });

        // If posting comment is successful, page will reload with the rendered comment, else, alert pops up
        if (response.ok) {
            document.location.reload();
        } else {
            alert("Couldn't post comment.");
        }
    }
};

document.querySelector(".comment-form").addEventListener("submit", commentForm);