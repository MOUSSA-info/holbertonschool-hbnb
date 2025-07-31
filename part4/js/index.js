// Fonction pour récupérer la valeur d'un cookie par son nom
function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Fonction principale pour gérer l'état d'authentification et déclencher fetch + affichage
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

let placesData = []; // On conserve la liste complète pour filtrage client

// Fonction pour récupérer la liste des lieux depuis l'API
async function fetchPlaces(token) {
  try {
    const response = await fetch('http://localhost:5000/api/places', {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération: ${response.statusText}`);
    }

    const data = await response.json();
    placesData = data;  // Sauvegarde pour filtrage client
    displayPlaces(data);
  } catch (error) {
    alert(error.message);
  }
}

// Fonction pour afficher la liste des lieux dans le DOM
function displayPlaces(places) {
  const container = document.getElementById('places-list');
  container.innerHTML = ''; // Nettoyer avant affichage

  if (places.length === 0) {
    container.innerHTML = '<p>Aucun lieu à afficher.</p>';
    return;
  }

  places.forEach(place => {
    const card = document.createElement('div');
    card.classList.add('place-card');
    card.dataset.price = place.price; // stockage direct du prix pour filtrage

    card.innerHTML = `
      <h3>${place.name}</h3>
      <p>Prix : ${place.price}€ / nuit</p>
      <p>${place.description || ''}</p>
      <a class="details-button" href="place.html?id=${place.id}">Voir détails</a>
    `;
    container.appendChild(card);
  });
}

// Filtrage client basé sur la sélection du prix max
function setupPriceFilter() {
  const filterSelect = document.getElementById('price-filter');
  filterSelect.addEventListener('change', () => {
    const maxPrice = filterSelect.value;
    const placeCards = document.querySelectorAll('.place-card');

    placeCards.forEach(card => {
      const price = parseFloat(card.dataset.price);
      if (maxPrice === 'all' || price <= maxPrice) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// Initialisation complète lorsque le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
  checkAuthentication();
  setupPriceFilter();
});
