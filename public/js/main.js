document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form-container');
  if(form) {
    form.style.opacity = 0;
    form.style.transition = 'opacity 0.8s ease';
    requestAnimationFrame(() => {
      form.style.opacity = 1;
    });
  }
});





