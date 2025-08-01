function getPlaceIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function checkAuthentication() {
  const token = getCookie('token');
  const addReviewSection = document.querySelector('.add-review');

  if (!token) {
    addReviewSection.style.display = 'none';
  } else {
    addReviewSection.style.display = 'block';
  }

  return token;
}

async function fetchPlaceDetails(placeId, token) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/places/${placeId}`, {
      headers: token ? {
        'Authorization': `Bearer ${token}`
      } : {}
    });

    if (!response.ok) throw new Error('Failed to fetch place details');

    const place = await response.json();
    displayPlaceDetails(place);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

function displayPlaceDetails(place) {
  const section = document.querySelector('.place-details .place-info');
  section.innerHTML = ''; // Clear existing static content

  const title = document.createElement('h2');
  title.textContent = place.title;

  const host = document.createElement('p');
  host.textContent = `Host: ${place.owner_name || 'Unknown'}`;

  const price = document.createElement('p');
  price.textContent = `Price: $${place.price} per night`;

  const description = document.createElement('p');
  description.textContent = `Description: ${place.description}`;

  const amenities = document.createElement('p');
  amenities.textContent = `Amenities: ${(place.amenities || []).join(', ')}`;

  section.append(title, host, price, description, amenities);

  displayReviews(place.reviews || []);
}

function displayReviews(reviews) {
  const reviewsSection = document.getElementById('reviews');
  reviewsSection.innerHTML = '<h2>Reviews</h2>'; // reset

  if (reviews.length === 0) {
    const noReview = document.createElement('p');
    noReview.textContent = 'No reviews yet.';
    reviewsSection.appendChild(noReview);
    return;
  }

  reviews.forEach(review => {
    const reviewCard = document.createElement('div');
    reviewCard.classList.add('review-card');

    const content = document.createElement('p');
    content.textContent = `"${review.content}"`;

    const small = document.createElement('small');
    small.textContent = `- ${review.author || 'Anonymous'}, Rating: ${review.rating}/5`;

    reviewCard.append(content, small);
    reviewsSection.appendChild(reviewCard);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const placeId = getPlaceIdFromURL();
  const token = checkAuthentication();
  if (placeId) fetchPlaceDetails(placeId, token);
});

