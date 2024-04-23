const createForm = async (event) => {
    event.preventDefault();

    const title = document.querySelector("add-#title").value;
    const post = document.querySelector("#add-post").value;

    if (title && post) {
        const response = await fetch("api/create", {
            method: "POST",
            body: JSON.stringify({ title, post }),
            headers: { "Content-Type" : "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Post unsucessful.");
        }
    }
};

document.querySelector(".create-form").addEventListener("submit", createForm);