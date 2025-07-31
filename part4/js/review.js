document.getElementById("review-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const token = getToken();
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const comment = e.target.comment.value;
  const rating = parseInt(e.target.rating.value);

  fetch(`http://localhost:5000/api/places/${id}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ comment, rating })
  }).then(() => window.location.href = `place.html?id=${id}`);
});
