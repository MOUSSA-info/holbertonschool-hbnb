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
      const response = await fetch('http://localhost:5000/api/login', {  
        // Remplace par l'URL correcte de ton API login
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password})
      });

      if (response.ok) {
        const data = await response.json();

        // Stocke le token JWT dans un cookie valide pour 1 heure
        document.cookie = `token=${data.access_token || data.token}; path=/; max-age=3600`;

        // Redirige vers la page principale (index.html)
        window.location.href = 'index.html';
      } else if (response.status === 401) {
        alert('Identifiants incorrects. Veuillez réessayer.');
      } else {
        alert('Erreur lors de la connexion : ' + response.statusText);
      }
    } catch (error) {
      alert('Une erreur réseau est survenue : ' + error.message);
    }
  });
});
