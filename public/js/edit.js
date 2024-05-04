const editForm = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector("#add-title").value;
    const post = document.querySelector("#add-post").value;

    const blogPostId = window.location.href.split("/").pop();

    if (title && post) {
        const response = await fetch(`/api/blogpost/edit/${blogPostId}`, {
            method: "PUT",
            body: JSON.stringify({ title, post }),
            headers: { "Content-Type" : "application/json" },
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Post unsucessful.");
        }
    }
};

document.querySelector(".create-form").addEventListener("submit", editForm);