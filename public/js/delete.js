// Set up delete post JS
const deletePost = async (event) => {

    // Will target the blogpost-id
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      
      // Creates dynamic id value to be deleted
      const response = await fetch(`/api/blogpost/${id}`, {
        method: 'DELETE',
      });
      
      // If delete successful, will delete the blogpost and the page will be updated with the deleted post, else, alert pops up
      if (response.ok) {
        event.target.closest(".display-blogpost").remove();
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    }
};

document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', deletePost);
});