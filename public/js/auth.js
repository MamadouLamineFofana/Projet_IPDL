document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form[action="/api/auth/login"]');
    
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(loginForm);
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify(Object.fromEntries(formData)),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          window.location.href = '/';
        } else {
          const error = await response.json();
          showError(error.message || 'Échec de la connexion');
        }
      });
    }
  });
  
  function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-error';
    errorDiv.textContent = message;
    
    const form = document.querySelector('form');
    form.prepend(errorDiv);
    
    setTimeout(() => errorDiv.remove(), 5000);
  }