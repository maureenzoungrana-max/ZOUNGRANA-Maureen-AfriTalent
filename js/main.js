// dark mode
const toggleButton = document.getElementById('theme-toggle');
// Vérifier si un thème a déjà été sauvegardé et garde le thème meme quand on change de page
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleButton.innerHTML = '<i class="bi bi-moon-fill"></i>'; // Changer l'icône
}
// ajoute ou enleve le thème avec le clic
toggleButton.addEventListener('click', () => {
    // Basculer la classe du thème
    const isDarkMode = document.body.classList.toggle('dark-mode');   
    // Mettre à jour l'icône et maintient du thème dans chaque page
    if (isDarkMode) {
        toggleButton.innerHTML = '<i class="bi bi-moon-fill"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        toggleButton.innerHTML = '<i class="bi bi-sun-fill"></i>';
        localStorage.setItem('theme', 'light');
    }
});
// bouton qui apparait au scroll
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const backToTopButton = document.getElementById('back-to-top');
    if (scrollPosition > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});
// navbar changeant de style
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
// Ajoute la classe .scrolled si on défile de plus de 50px, sinon la retire
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});