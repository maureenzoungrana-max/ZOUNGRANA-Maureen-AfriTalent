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
// compteurs animés js
const counters = document.querySelectorAll('.count'); // sélection de tous les éléments de la classe count
const speed = 200; // Vitesse d'animation (plus le chiffre est bas, plus c'est rapide)
const observerOptions = {
  root: null, // utilise la fenêtre d'affichage (viewport)
  rootMargin: '0px',// aucune marge                                   
  threshold: 0.5 // l'animation démarre quand 50% de l'élément est visible
};
const observer = new IntersectionObserver((entries, observer) => {          // Création de l'observer
  entries.forEach(entry => {       // boucle pour les éléments détectés
    if (entry.isIntersecting) {      // Vérification de la visibilité
      const counter = entry.target;
      const targetValue = parseInt(counter.getAttribute('data-target'), 10); // 10=précision à la base décimal
      const updateCount = () => {
        const currentText = parseInt(counter.innerText, 10); // Lit le nombre actuellement affiché dans le compteur
        const increment = targetValue / speed; // ce qu'on ajoute au compteur
        if (currentText < targetValue) {
          counter.innerText = Math.ceil(currentText + increment);   // incrémentation avec nombre arrondi comme resultat
          setTimeout(updateCount, 1);    // rappelle la fonction après 1ms
        } else {
          counter.innerText = targetValue; // S'assure d'atteindre la valeur exacte
        }
      };
      updateCount(); // lancement du compteur
      observer.unobserve(counter); // Arrête d'observer une fois l'animation lancée
    }
  });
}, observerOptions);
counters.forEach(counter => { //  boucle sur chaque compteur trouver
  observer.observe(counter);          // observation du compteur
});
// Les sections qui apparaissent en fondu (fade-in)
const observer_Animation = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-visible');     // Ajout de la classe CSS
      observer_Animation.unobserve(entry.target);     // L'effet ne se joue qu'une seule fois
    }
  });
}, {
  threshold: 0.15 // Déclenche l'apparition quand 15% de la section est visible
});

// Sélection de toutes les balises <section> de la page
document.querySelectorAll('section').forEach(section => {
  observer_Animation.observe(section);
});
// animation des cartes
const observerCartes = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('carte-visible');
      observerCartes.unobserve(entry.target);                 // Arrêt de la surveillance
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('#freelance .card').forEach(card => {
  observerCartes.observe(card);
});
// ligne de copyright
document.getElementById("copyright").innerHTML = "© " + new Date().getFullYear() + " AfriTalent" +" | Tous droits réservés";
// barre de filtre
function filtrerFreelances(categorie) {
  // Gère l'état actif des boutons
  const boutons = document.querySelectorAll('.filtre');
  boutons.forEach(btn => btn.classList.remove('actif'));
  event.target.classList.add('actif');

  // Filtrage des cartes
  const cartes = document.querySelectorAll('#freelance .card');
  cartes.forEach(carte => {
    const categorieCarte = carte.getAttribute('data-categorie');

    if (categorie === 'tous' || categorieCarte === categorie) {
      carte.classList.remove('masque'); // Affiche la carte
      carte.classList.add('categorie', 'actif'); 
    } else {
      carte.classList.add('masque'); // Masque la carte
    }
  });
}
// validation du formulaire
const formulaire = document.getElementById('formulaire');
document.getElementById('formulaire').addEventListener('submit', function(event) {
    event.preventDefault();     // Empêcher l'envoi du formulaire par défaut       
    const nom = document.getElementById('nom');
    const prenom = document.getElementById('prenom');
    const email = document.getElementById('email');
    const address = document.getElementById('address');
    const telephone = document.getElementById('telephone');
    const age = document.getElementById('age');
    const message = document.getElementById('message');
    // Réinitialisation des erreurs
    resetErrors();
    // Variables pour vérifier la validité
    let isValid = true;
    // Validation du Nom (minimum 2 caractères)
    if (nom.value.trim().length < 2) {
        showError('nomError', prenom.value.trim() === '' 
            ? 'Ce champ est obligatoire.'  // si c'est vrai ecrire ...
            : 'Le nom doit contenir au moins 2 caractères.');  // si c'est faux...
        isValid = false;
    }
    // Validation du prénom (minimum 2 caractères)
    if (prenom.value.trim().length < 2) {
        showError('prenomError', prenom.value.trim() === '' 
            ? 'Ce champ est obligatoire.' 
            : 'Le prénom doit contenir au moins 2 caractères.'); 
        isValid = false;
    }
    // Validation de l'Email (Regex standard)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        showError('emailError', 'Veuillez entrer une adresse email valide.');
        isValid = false;
    }
    // Validation du numero de téléphone
    const phoneRegex = /^(\+221\s?)?[0-9]{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
    if (!phoneRegex.test(telephone.value.trim())) {
      showError('phoneError', 'Veuillez entrer un numéro téléphone valide.');
        isValid = false;
    }
    // validation de l'age
    if (age.value.trim() == ''){
      showError('ageError', 'Ce champ est obligatoire.');
      isValid = false;
    }
    // Validation de l'addresse
    if (address.value.trim() === '') {
        showError('addressError', 'Ce champ est obligatoire.');
        isValid = false;
    }
    // Validation du Message (non vide)
    if (message.value.trim() === '') {
        showError('messageError', 'Le message ne peut pas être vide.');
        isValid = false;
    }
    // Soumission si tout est valide
    // Soumission si tout est valide
    if (isValid) {
        // Récupérer les données du formulaire
        const donneesFormulaire = new FormData(formulaire);
        alert('Formulaire soumis avec succès !');
        // Envoyer les données avec l'API Fetch
        fetch('https://formspree.io/f/mqeodbkq', {
            method: 'POST',
            body: donneesFormulaire,
            headers: {
                'Accept': 'application/json'
            }
        })
    }
});
// Afficher les erreurs
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.parentElement.classList.add('invalid');
}
// Masquer les erreurs
function resetErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(function(el) {
        el.textContent = '';
        el.parentElement.classList.remove('invalid');
    });
}

