const commentForm = async (event) => {
    event.preventDefault();

    const comment = document.querySelector("#add-comment").value;
    const blogPostId = window.location.href.split("/")[window.location.href.split("/").length-1];

    if (comment) {
        const response = await fetch(`/api/blogpost/blogpost/${blogPostId}`, {
            method: "POST",
            body: JSON.stringify({ comment, blogPostId }),
            headers: { "Content-Type" : "application/json" },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert("Couldn't post comment.");
        }
    }
};

document.querySelector(".comment-form").addEventListener("submit", commentForm);