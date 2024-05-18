// Togle class Active
const navbarNav = document.querySelector('.navbar-nav');
// Ketika Humbeger menu diklik
document.querySelector('#hamburger-menu').
  onclick = () => {
    navbarNav.classList.toggle('active');
  };

const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function (e) { 
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }
});