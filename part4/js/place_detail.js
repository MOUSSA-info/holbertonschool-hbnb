// Fonction pour récupérer un cookie par son nom
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

// Récupère l'ID du lieu depuis les paramètres URL
function getPlaceIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Affiche les détails du lieu
function displayPlaceDetails(place) {
  const container = document.getElementById('place-details');
  container.innerHTML = ''; // Vide le conteneur

  // Création des éléments et insertion HTML
  let amenities = '';
  if (Array.isArray(place.amenities)) {
    amenities = place.amenities.join(', ');
  }

  // Affichage place details
  container.innerHTML = `
    <div class="place-details">
      <h2>${place.name}</h2>
      <div class="place-info">
        <p><strong>Hôte :</strong> ${place.host || 'Inconnu'}</p>
        <p><strong>Prix :</strong> ${place.price} € par nuit</p>
        <p><strong>Description :</strong> ${place.description || ''}</p>
        <p><strong>Agréments :</strong> ${amenities}</p>
      </div>
    </div>
    <hr />
    <h3>Avis</h3>
    <div id="reviews-list">
      ${place.reviews && place.reviews.length > 0
        ? place.reviews.map(review => `
          <div class="review-card">
            <p>"${review.comment}"</p>
            <p><strong>${review.user}</strong></p>
            <p>Note : ${review.rating} ★</p>
          </div>`).join('')
        : '<p>Aucun avis pour le moment.</p>'
      }
    </div>`;
}

// Fonction pour récupérer les détails de l’API
async function fetchPlaceDetails(token, placeId) {
  try {
    const response = await fetch(`http://localhost:5000/api/places/${placeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des détails : ${response.statusText}`);
    }

    const place = await response.json();
    displayPlaceDetails(place);

  } catch (error) {
    alert(error.message);
  }
}

// Initialisation après chargement DOM
document.addEventListener('DOMContentLoaded', () => {
  const placeId = getPlaceIdFromURL();
  if (!placeId) {
    alert('ID du lieu non spécifié dans l’URL.');
    return;
  }

  const token = getCookie('token');

  // Affichage ou non du formulaire d'ajout d'avis
  const addReviewSection = document.getElementById('add-review');
  if (token) {
    addReviewSection.style.display = 'block';
    fetchPlaceDetails(token, placeId);
  } else {
    addReviewSection.style.display = 'none';
    // Optionnel : tu peux charger les détails en mode public sans token
    fetchPlaceDetails('', placeId);
  }

  // Gestion soumission du formulaire d'avis
  const reviewForm = document.getElementById('review-form');
  reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!token) {
      alert('Vous devez être connecté pour ajouter un avis.');
      return;
    }

    const comment = reviewForm.comment.value.trim();
    const rating = parseInt(reviewForm.rating.value);
    if (!comment || isNaN(rating) || rating < 1 || rating > 5) {
      alert('Veuillez saisir un commentaire valide et une note entre 1 et 5.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/places/${placeId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ comment, rating })
      });

      if (res.ok) {
        alert('Avis ajouté avec succès.');
        // Rafraîchir la page pour afficher les nouveaux avis
        window.location.reload();
      } else {
        const errorData = await res.json();
        alert('Erreur lors de l’ajout de l’avis : ' + (errorData.message || res.statusText));
      }
    } catch (err) {
      alert('Erreur réseau : ' + err.message);
    }
  });
});
