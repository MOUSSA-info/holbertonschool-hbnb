window.onload = () => {
  const token = getToken();
  if (!token) return window.location.href = 'index.html';

  fetch('http://localhost:5000/api/places', {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('places-container');
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
  });
}
