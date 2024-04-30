const commentForm = async function (event) {
    event.preventDefault();

    const comment = document.querySelector("#add-comment").value;

    if (comment) {
        const response = await fetch("api/users", {
            method: "POST",
            body: JSON.stringify({ comment }),
            headers: { "Content-Type" : "application/json" },
        });

        // if (response.ok) {
        //     document.location.reload();
        // } else {
        //     alert("Couldn't post comment.");
        // }
    }
};

document.querySelector(".comment-form").addEventListener("submit", commentForm);