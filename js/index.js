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
      feather.replace();
              document.getElementById('contact-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah pengiriman formulir standar

            // Mengambil nilai dari input
            const name = document.querySelector('input[placeholder="Nama"]').value;
            const message = document.querySelector('input[placeholder="Pesan"]').value;
            const adminPhone = '62895335544695'; // Ganti dengan nomor WhatsApp admin

            // Membentuk URL WhatsApp dengan pesan
            const whatsappURL = `https://wa.me/${adminPhone}?text=${encodeURIComponent(`Halo, Saya ${name}, pesan saya adalah ${message}`)}`;

            // Redirect ke URL WhatsApp
            window.location.href = whatsappURL;
        });

        feather.replace(); // Mengganti ikon dengan Feather Icons