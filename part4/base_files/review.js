function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

function getPlaceIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function checkAuthentication() {
  const token = getCookie('token');
  if (!token) {
    window.location.href = 'index.html';
    return null;
  }
  return token;
}

async function submitReview(token, placeId, reviewText, rating) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        place_id: placeId,
        content: reviewText,
        rating: Number(rating)
      })
    });

    if (response.ok) {
      alert('Review submitted successfully!');
      document.getElementById('review-form').reset();
    } else {
      const errorData = await response.json();
      alert('Failed to submit review: ' + (errorData.msg || 'Unknown error'));
    }
  } catch (error) {
    alert('Error submitting review: ' + error.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const token = checkAuthentication();
  const placeId = getPlaceIdFromURL();

  if (!token || !placeId) return;

  const reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const reviewText = document.getElementById('review').value.trim();
      const rating = document.getElementById('rating').value;

      if (!reviewText || !rating) {
        alert('Please fill out both the review and rating.');
        return;
      }

      await submitReview(token, placeId, reviewText, rating);
    });
  }
});
