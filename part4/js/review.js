const API_URL = 'http://localhost:5000/api/v1/';

function getToken() {
  const m = document.cookie.match(/(?:^|; )token=([^;]*)/);
  return m ? decodeURIComponent(m[1]) : null;
}

document.getElementById("review-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = getToken();
  if (!token) {
    alert('Vous devez être connecté pour laisser un avis.');
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) {
    alert('Aucun ID de lieu trouvé.');
    return;
  }

  const comment = e.target.comment.value.trim();
  const rating = parseInt(e.target.rating.value);

  if (!comment || isNaN(rating) || rating < 1 || rating > 5) {
    alert('Veuillez saisir un commentaire valide et une note entre 1 et 5.');
    return;
  }

  try {
    const res = await fetch(`${API_URL}places/${id}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ comment, rating })
    });

    if (res.ok) {
      alert('Avis ajouté avec succès !');
      // Recharge la page place.html avec le même ID
      window.location.href = `place.html?id=${id}`;
    } else {
      const errData = await res.json().catch(() => ({}));
      alert('Erreur lors de l’ajout : ' + (errData.message || res.statusText));
    }
  } catch (error) {
    alert('Erreur réseau : ' + error.message);
  }
});
