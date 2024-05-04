const deletePost = async (event) => {

    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blogpost/${id}`, {
        method: 'DELETE',
      });
  
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