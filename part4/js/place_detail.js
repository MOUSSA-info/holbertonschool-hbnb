const API_URL = 'http://localhost:5000/api/v1/';

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function getPlaceIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function displayPlaceDetails(place) {
  const container = document.getElementById('place-details');
  container.innerHTML = '';

  let amenities = Array.isArray(place.amenities) ? place.amenities.join(', ') : '';

  container.innerHTML = `
    <div class="place-details">
      <h2>${place.name}</h2>
      <div class="place-info">
        <p><strong>Hôte :</strong> ${place.host || 'Inconnu'}</p>
        <p><strong>Prix :</strong> ${place.price} € / nuit</p>
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

async function fetchPlaceDetails(token, placeId) {
  try {
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    const response = await fetch(`${API_URL}places/${placeId}`, { headers });

    if (!response.ok) throw new Error(`Erreur détails : ${response.statusText}`);

    const place = await response.json();
    displayPlaceDetails(place);

  } catch (error) {
    alert(error.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const placeId = getPlaceIdFromURL();
  if (!placeId) {
    alert('ID du lieu manquant.');
    return;
  }

  const token = getCookie('token');
  const addReviewSection = document.getElementById('add-review');

  if (token) {
    addReviewSection.style.display = 'block';
    fetchPlaceDetails(token, placeId);
  } else {
    addReviewSection.style.display = 'none';
    fetchPlaceDetails(null, placeId);
  }

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
      alert('Veuillez saisir un commentaire et une note entre 1 et 5.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}places/${placeId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ comment, rating })
      });

      if (res.ok) {
        alert('Avis ajouté avec succès !');
        fetchPlaceDetails(token, placeId); // recharge les avis seulement
        reviewForm.reset();
      } else {
        const errData = await res.json();
        alert('Erreur lors de l’ajout : ' + (errData.message || res.statusText));
      }
    } catch (err) {
      alert('Erreur réseau : ' + err.message);
    }
  });
});
