// Cart functionality with LocalStorage for MiniStyle

// ==================== CART MANAGEMENT ====================
const CART_KEY = 'cart';

// Get cart from LocalStorage
function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

// Save cart to LocalStorage
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
}

// Add product to cart
function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        showToast('محصول یافت نشد!', 'error');
        return;
    }
    
    if (!product.stock) {
        showToast('این محصول ناموجود است!', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCart(cart);
    showToast(`${product.name} به سبد خرید اضافه شد! ✨`);
}

// Remove product from cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    showToast('محصول از سبد خرید حذف شد! 🗑️');
    
    // Refresh cart page if on cart page
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
}

// Update product quantity in cart
function updateQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        item.quantity = quantity;
        saveCart(cart);
        
        // Refresh cart page if on cart page
        if (window.location.pathname.includes('cart.html')) {
            renderCart();
        }
    }
}

// Clear entire cart
function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartBadge();
    showToast('سبد خرید خالی شد! 🛒');
    
    // Refresh cart page if on cart page
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
}

// Calculate cart totals
function calculateTotals() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = subtotal > 1000000 ? 100000 : 0;
    const shipping = subtotal > 500000 ? 0 : 50000;
    const total = subtotal - discount + shipping;
    
    return { subtotal, discount, shipping, total };
}

// ==================== RENDER PRODUCTS ON HOME PAGE ====================
function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;
    
    productGrid.innerHTML = products.map((product, index) => `
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-pink-100/50 dark:shadow-none overflow-hidden hover:shadow-2xl hover:shadow-pink-200/50 hover:scale-105 transition-all duration-300 animate-slide-up" style="animation-delay: ${index * 0.1}s;">
            <div class="relative overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-72 object-cover transform hover:scale-110 transition-transform duration-500">
                ${product.badge ? `
                    <span class="absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-bold ${
                        product.stock 
                            ? 'bg-gradient-to-r from-pink-400 to-blue-400 text-white shadow-lg' 
                            : 'bg-gray-400 text-white'
                    }">
                        ${product.badge}
                    </span>
                ` : ''}
            </div>
            <div class="p-5">
                <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">${product.name}</h3>
                <div class="flex items-center gap-1 mb-3">
                    <span class="text-yellow-400">★</span>
                    <span class="text-sm text-gray-600 dark:text-gray-400">${product.rating}</span>
                    <span class="text-sm text-gray-400">(${product.reviews} نظر)</span>
                </div>
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">${formatPrice(product.price)}</span>
                        <span class="text-sm text-gray-500"> تومان</span>
                    </div>
                </div>
                <div class="mt-4 flex gap-2">
                    ${product.stock ? `
                        <button onclick="addToCart(${product.id})" class="flex-1 bg-gradient-to-r from-pink-400 to-blue-400 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-pink-300/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            افزودن به سبد
                        </button>
                    ` : `
                        <button disabled class="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 py-3 rounded-xl font-bold cursor-not-allowed">
                            ناموجود
                        </button>
                    `}
                    <a href="product.html?id=${product.id}" class="px-4 py-3 border-2 border-pink-200 dark:border-gray-600 rounded-xl text-pink-500 dark:text-gray-300 hover:border-pink-400 hover:text-pink-600 transition-all duration-300">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Render products on page load
document.addEventListener('DOMContentLoaded', renderProducts);
