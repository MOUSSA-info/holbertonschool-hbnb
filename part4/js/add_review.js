// Fonction pour récupérer un cookie par son nom
function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : null;
}

// Fonction pour extraire l'ID du lieu dans l'URL (query string)
function getPlaceIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Vérifie l'authentification, redirige si non connecté
function checkAuthentication() {
  const token = getCookie('token');
  if (!token) {
    window.location.href = 'index.html';
  }
  return token;
}

// Gère la soumission du formulaire
async function submitReview(token, placeId, comment, rating) {
  try {
    const response = await fetch(`http://localhost:5000/api/places/${placeId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ comment, rating })
    });
    return response;
  } catch (error) {
    throw new Error('Erreur réseau : ' + error.message);
  }
}

// Gestion du DOM quand il est prêt
document.addEventListener('DOMContentLoaded', () => {
  const token = checkAuthentication();              // redirection si non connecté
  const placeId = getPlaceIdFromURL();               // récupère l’id du lieu
  const form = document.getElementById('review-form');

  if (!placeId) {
    alert('Aucun ID de lieu spécifié dans l’URL.');
    window.location.href = 'index.html';
    return;
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const comment = form.comment.value.trim();
      const rating = parseInt(form.rating.value);

      if (!comment || isNaN(rating) || rating < 1 || rating > 5) {
        alert('Veuillez saisir un commentaire valide et une note entre 1 et 5.');
        return;
      }

      try {
        const response = await submitReview(token, placeId, comment, rating);
        if (response.ok) {
          alert('Avis soumis avec succès !');
          form.reset();
        } else {
          const errorData = await response.json().catch(() => ({}));
          alert('Échec de la soumission de l’avis : ' + (errorData.message || response.statusText));
        }
      } catch (error) {
        alert(error.message);
      }
    });
  }
});
