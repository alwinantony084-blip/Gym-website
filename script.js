// Toggle mobile menu
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Smooth scroll + Close menu on link click (mobile)
document.querySelectorAll('#nav-menu a').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href.startsWith('#')) {
      navMenu.classList.remove('active');
      return;
    }
    e.preventDefault(); // Prevent default jump

    const targetId = href.substring(1); // Get target section id
    const targetSection = document.getElementById(targetId);
    const headerOffset = 90; // Adjust based on your header height

    if (targetSection) {
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    navMenu.classList.remove('active'); // Close mobile menu
  });
});

// Scroll header background change
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  header.style.background = window.scrollY > 50 ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0.7)";
});
