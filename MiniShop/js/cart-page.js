// Cart Page JavaScript for MiniStyle

// ==================== RENDER CART ====================
function renderCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummaryContainer = document.getElementById('cart-summary');
    const cartContent = document.getElementById('cart-content');
    const emptyCart = document.getElementById('empty-cart');
    
    // Show empty cart state if cart is empty
    if (cart.length === 0) {
        if (cartContent) cartContent.classList.add('hidden');
        if (emptyCart) emptyCart.classList.remove('hidden');
        return;
    }
    
    // Show cart content
    if (cartContent) cartContent.classList.remove('hidden');
    if (emptyCart) emptyCart.classList.add('hidden');
    
    // Calculate totals
    const { subtotal, discount, shipping, total } = calculateTotals();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Render cart items
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = `
            <div class="p-6 border-b border-pink-200 dark:border-gray-700">
                <h2 class="text-xl font-bold text-gray-800 dark:text-white">
                    سبد خرید (${totalItems} کالا)
                </h2>
            </div>
            <div class="divide-y divide-pink-100 dark:divide-gray-700">
                ${cart.map(item => `
                    <div class="p-6 flex gap-4 animate-fade-in">
                        <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-xl">
                        <div class="flex-1">
                            <h3 class="font-bold text-gray-800 dark:text-white mb-1">${item.name}</h3>
                            <p class="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent font-bold text-lg mb-3">
                                ${formatPrice(item.price)} تومان
                            </p>
                            <div class="flex items-center gap-4">
                                <!-- Quantity Controls -->
                                <div class="flex items-center gap-2 bg-pink-50 dark:bg-gray-700 rounded-lg p-1">
                                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" 
                                        class="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-600 rounded-md hover:bg-pink-100 dark:hover:bg-gray-500 transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                                    </button>
                                    <span class="w-8 text-center font-bold">${item.quantity}</span>
                                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" 
                                        class="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-600 rounded-md hover:bg-pink-100 dark:hover:bg-gray-500 transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                                    </button>
                                </div>
                                
                                <!-- Remove Button -->
                                <button onclick="removeFromCart(${item.id})" 
                                    class="text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    حذف
                                </button>
                            </div>
                        </div>
                        <div class="text-left">
                            <p class="font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                                ${formatPrice(item.price * item.quantity)} تومان
                            </p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="p-6 border-t border-pink-200 dark:border-gray-700">
                <button onclick="clearCart()" class="text-red-500 hover:text-red-600 flex items-center gap-2 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    پاک کردن سبد خرید
                </button>
            </div>
        `;
    }
    
    // Render cart summary
    if (cartSummaryContainer) {
        cartSummaryContainer.innerHTML = `
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-6">خلاصه سفارش</h3>
            
            <div class="space-y-4 mb-6">
                <div class="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>مجموع کالاها (${totalItems})</span>
                    <span>${formatPrice(subtotal)} تومان</span>
                </div>
                ${discount > 0 ? `
                    <div class="flex justify-between text-green-600">
                        <span>تخفیف</span>
                        <span>-${formatPrice(discount)} تومان</span>
                    </div>
                ` : ''}
                <div class="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>هزینه ارسال</span>
                    <span>${shipping === 0 ? 'رایگان' : formatPrice(shipping) + ' تومان'}</span>
                </div>
            </div>
            
            <div class="border-t border-pink-200 dark:border-gray-700 pt-4 mb-6">
                <div class="flex justify-between text-xl font-bold text-gray-800 dark:text-white">
                    <span>مبلغ قابل پرداخت</span>
                    <span class="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">${formatPrice(total)} تومان</span>
                </div>
            </div>
            
            <button onclick="checkout()" class="w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-pink-300/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                ادامه فرآیند خرید
            </button>
            
            <a href="index.html#products" class="w-full mt-4 block text-center py-3 border-2 border-pink-200 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-300 hover:border-pink-400 hover:text-pink-500 transition-all duration-300">
                ادامه خرید
            </a>
        `;
    }
}

// ==================== CHECKOUT FUNCTION ====================
function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        showToast('سبد خرید شما خالی است!', 'error');
        return;
    }
    
    // In a real app, this would redirect to checkout page
    showToast('در حال انتقال به صفحه پرداخت... 💳', 'info');
    
    // Simulate checkout process
    setTimeout(() => {
        alert('این یک نمونه است. در پروژه واقعی، به درگاه پرداخت منتقل می‌شوید. 🛍️');
    }, 1500);
}

// Render cart on page load
document.addEventListener('DOMContentLoaded', renderCart);
