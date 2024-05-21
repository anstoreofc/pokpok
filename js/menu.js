                        let cart = [];

        function toRupiah(amount) {
            return 'Rp' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }

        function addToCart(name, price) {
            const existingItemIndex = cart.findIndex(item => item.name === name);
            if (existingItemIndex >= 0) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            saveCartToCache();
            updateCartItems();
            showAlert(name + ' telah ditambahkan ke keranjang.');
        }

        function toggleCartModal() {
            const modal = document.getElementById('cartModal');
            const modalContent = modal.querySelector('.cart-modal-content');
            if (modal.style.display === 'block') {
                modal.classList.remove('show');
                modalContent.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 400);
            } else {
                modal.style.display = 'block';
                setTimeout(() => {
                    modal.classList.add('show');
                    modalContent.classList.add('show');
                }, 10);
            }
            updateCartItems();
        }

        function toggleAlertModal() {
            const modal = document.getElementById('alertModal');
            const modalContent = modal.querySelector('.alert-modal-content');
            if (modal.style.display === 'block') {
                modal.classList.remove('show');
                modalContent.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 400);
            } else {
                modal.style.display = 'block';
                setTimeout(() => {
                    modal.classList.add('show');
                    modalContent.classList.add('show');
                }, 10);
            }
        }

        function showAlert(message) {
            const alertMessage = document.getElementById('alertMessage');
            alertMessage.textContent = message;
            toggleAlertModal();
            setTimeout(() => {
                toggleAlertModal();
            }, 2000);
        }

        function updateCartItems() {
            const cartItemsContainer = document.getElementById('cartItems');
            const cartTotalContainer = document.getElementById('cartTotal');
            cartItemsContainer.innerHTML = '';
            let total = 0;
            cart.forEach((item, index) => {
                total += item.price * item.quantity;
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <span>${item.name} (x${item.quantity})</span>
                    <span>${toRupiah(item.price * item.quantity)}</span>
                    <button onclick="removeFromCart(${index})">Hapus</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
            cartTotalContainer.innerHTML = `<h3>Total: ${toRupiah(total)}</h3>`;

            const checkoutBtn = document.querySelector('.checkout-btn');
            if (cart.length > 0) {
                checkoutBtn.removeAttribute('disabled');
            } else {
                checkoutBtn.setAttribute('disabled', 'disabled');
            }
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            saveCartToCache();
            updateCartItems();
        }

        function saveCartToCache() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        function loadCartFromCache() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                cart = JSON.parse(savedCart);
            }
        }

        function checkout() {
            if (cart.length === 0) {
                showAlert('Keranjang belanja kosong.');
                return;
            }

            let message = 'Halo, Saya ingin memesan :\n \n';
            cart.forEach(item => {
                message += `${item.name} (x${item.quantity}) - ${toRupiah(item.price * item.quantity)}\n`;
            });
            const waLink = `https://wa.me/62895335544695?text=${encodeURIComponent(message)}`;
            window.location.href = waLink;
        }

        document.addEventListener('DOMContentLoaded', () => {
            loadCartFromCache();
            updateCartItems();
        });

        window.onclick = function(event) {
            const cartModal = document.getElementById('cartModal');
            const alertModal = document.getElementById('alertModal');
            if (event.target === cartModal) {
                cartModal.classList.remove('show');
                cartModal.querySelector('.cart-modal-content').classList.remove('show');
                setTimeout(() => {
                    cartModal.style.display = 'none';
                }, 400);
            }
            if (event.target === alertModal) {
                alertModal.classList.remove('show');
                alertModal.querySelector('.alert-modal-content').classList.remove('show');
                setTimeout(() => {
                    alertModal.style.display = 'none';
                }, 400);
            }
        }