const API_URL = 'http://localhost:5000/api/v1/';

// ---- Fonction utilitaire : récupérer un cookie ----
function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// ---- Vérifie auth et démarre chargement ----
function checkAuthentication() {
  const token = getCookie('token');
  const loginLink = document.getElementById('login-link');

  if (!token) {
    loginLink.style.display = 'inline-block';
  } else {
    loginLink.style.display = 'none';
    fetchPlaces(token);
  }
}

let placesData = [];

// ---- Récupération des lieux ----
async function fetchPlaces(token) {
  try {
    const response = await fetch(API_URL + 'places', {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération: ${response.statusText}`);
    }

    const data = await response.json();
    placesData = data;
    displayPlaces(data);
  } catch (error) {
    alert(error.message);
  }
}

// ---- Affichage des lieux ----
function displayPlaces(places) {
  const container = document.getElementById('places-list');
  container.innerHTML = '';

  if (places.length === 0) {
    container.innerHTML = '<p>Aucun lieu à afficher.</p>';
    return;
  }

  places.forEach(place => {
    const card = document.createElement('div');
    card.classList.add('place-card');
    card.dataset.price = place.price;

    card.innerHTML = `
      <h3>${place.name}</h3>
      <p>Prix : ${place.price}€ / nuit</p>
      <p>${place.description || ''}</p>
      <a class="details-button" href="place.html?id=${place.id}">Voir détails</a>
    `;
    container.appendChild(card);
  });
}

// ---- Filtre prix ----
function setupPriceFilter() {
  const filterSelect = document.getElementById('price-filter');
  filterSelect.addEventListener('change', () => {
    const maxPrice = filterSelect.value;
    const placeCards = document.querySelectorAll('.place-card');

    placeCards.forEach(card => {
      const price = parseFloat(card.dataset.price);
      card.style.display = (maxPrice === 'all' || price <= maxPrice) ? 'block' : 'none';
    });
  });
}

// ---- Démarrage ----
document.addEventListener('DOMContentLoaded', () => {
  checkAuthentication();
  setupPriceFilter();
});
