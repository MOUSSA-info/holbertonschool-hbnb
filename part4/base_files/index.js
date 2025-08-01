// Get a cookie by its name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Show or hide login link based on token
function checkAuthentication() {
    const token = getCookie('token');
    const loginLink = document.getElementById('login-link');

    if (!token) {
        loginLink.style.display = 'block';
    } else {
        loginLink.style.display = 'none';
        fetchPlaces(token);
    }
}

// Fetch places from API
async function fetchPlaces(token) {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/v1/places/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch places');
        }

        const data = await response.json();
        displayPlaces(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Display places dynamically
function displayPlaces(places) {
    const container = document.getElementById('places-list');
    container.innerHTML = ''; // Clear previous content

    places.forEach(place => {
        const card = document.createElement('div');
        card.className = 'place-card';
        card.dataset.price = place.price_per_night;

        card.innerHTML = `
            <h3>${place.name}</h3>
            <p>Price per night: $${place.price_per_night}</p>
            <button class="details-button" onclick="location.href='place.html?id=${place.id}'">View Details</button>
        `;

        container.appendChild(card);
    });
}

// Populate filter options
function populatePriceFilter() {
    const priceFilter = document.getElementById('price-filter');
    const options = ['All', 10, 50, 100];

    options.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value === 'All' ? 'All' : `${value} €`;
        priceFilter.appendChild(option);
    });
}

// Add filter functionality
function setupFilter() {
    document.getElementById('price-filter').addEventListener('change', (event) => {
        const selected = event.target.value;
        const cards = document.querySelectorAll('.place-card');

        cards.forEach(card => {
            const price = parseFloat(card.dataset.price);
            if (selected === 'All' || price <= parseFloat(selected)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

//Init
document.addEventListener('DOMContentLoaded', () => {
    populatePriceFilter();
    checkAuthentication();
    setupFilter();
});

