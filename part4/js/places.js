const API_URL = 'http://localhost:5000/api/v1/';

function getToken() {
  const m = document.cookie.match(/(?:^|; )token=([^;]*)/);
  return m ? decodeURIComponent(m[1]) : null;
}

window.onload = () => {
  const token = getToken();
  if (!token) return window.location.href = 'index.html';

  fetch(`${API_URL}places`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(async response => {
    if (!response.ok) {
      throw new Error(`Erreur API : ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('places-container');
    container.innerHTML = ''; // Vide à chaque chargement

    if (!data || data.length === 0) {
      container.innerHTML = '<p>Aucun lieu à afficher.</p>';
      return;
    }

    data.forEach(place => {
      const card = document.createElement('div');
      card.className = 'place-card';
      card.innerHTML = `
        <h3>${place.name}</h3>
        <p>${place.price}€ / nuit</p>
        <a class="details-button" href="place.html?id=${place.id}">Voir détails</a>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => {
    alert("Erreur lors du chargement des lieux : " + err.message);
  });
};
