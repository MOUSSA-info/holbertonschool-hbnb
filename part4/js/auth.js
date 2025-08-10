document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  if (!loginForm) return;

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value;

    if (!email || !password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert('Identifiants incorrects. Veuillez réessayer.');
        } else {
          const errText = await response.text();
          alert(`Erreur lors de la connexion (${response.status}) : ${errText}`);
        }
        return;
      }

      const data = await response.json();

      if (!data.token && !data.access_token) {
        alert("Erreur : aucun token reçu depuis l'API.");
        return;
      }

      // Stockage du token dans un cookie valable 1h
      document.cookie = `token=${data.access_token || data.token}; path=/; max-age=3600`;

      // Redirection
      window.location.href = 'index.html';

    } catch (error) {
      alert('Une erreur réseau est survenue : ' + error.message);
    }
  });
});
