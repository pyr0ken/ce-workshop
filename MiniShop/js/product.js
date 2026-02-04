// Product Detail Page JavaScript for MiniStyle

// ==================== GET PRODUCT ID FROM URL ====================
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// ==================== RENDER PRODUCT DETAIL ====================
function renderProductDetail() {
    const productId = getProductIdFromUrl();
    const product = products.find(p => p.id === productId);
    const productDetail = document.getElementById('product-detail');
    const breadcrumbName = document.getElementById('breadcrumb-name');
    
    if (!product || !productDetail) {
        productDetail.innerHTML = `
            <div class="p-12 text-center">
                <div class="text-6xl mb-4">😕</div>
                <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">محصول یافت نشد</h2>
                <a href="index.html" class="inline-block bg-gradient-to-r from-pink-400 to-blue-400 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all">
                    بازگشت به فروشگاه
                </a>
            </div>
        `;
        return;
    }
    
    // Update breadcrumb
    if (breadcrumbName) {
        breadcrumbName.textContent = product.name;
    }
    
    // Render product detail
    productDetail.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <!-- Product Image -->
            <div class="relative bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-8 flex items-center justify-center">
                <img src="${product.image}" alt="${product.name}" class="max-w-full max-h-96 object-contain rounded-2xl shadow-2xl">
                ${product.badge ? `
                    <span class="absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-bold ${
                        product.stock 
                            ? 'bg-gradient-to-r from-pink-400 to-blue-400 text-white shadow-lg' 
                            : 'bg-gray-400 text-white'
                    }">
                        ${product.badge}
                    </span>
                ` : ''}
            </div>
            
            <!-- Product Info -->
            <div class="p-8 lg:p-12">
                <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">${product.name}</h1>
                
                <!-- Rating -->
                <div class="flex items-center gap-2 mb-4">
                    <div class="flex text-yellow-400">
                        ${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 >= 0.5 ? '½' : ''}
                    </div>
                    <span class="text-gray-600 dark:text-gray-400">${product.rating} از ۵</span>
                    <span class="text-gray-400">(${product.reviews} نظر)</span>
                </div>
                
                <!-- Price -->
                <div class="mb-6">
                    <span class="text-4xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">${formatPrice(product.price)}</span>
                    <span class="text-lg text-gray-500"> تومان</span>
                </div>
                
                <!-- Stock Status -->
                <div class="mb-6">
                    ${product.stock 
                        ? '<span class="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full"><span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>موجود در انبار</span>'
                        : '<span class="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full"><span class="w-2 h-2 bg-red-500 rounded-full"></span>ناموجود</span>'
                    }
                </div>
                
                <!-- Description -->
                <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">${product.description}</p>
                
                <!-- Features -->
                <div class="mb-8">
                    <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-3">ویژگی‌ها:</h3>
                    <ul class="space-y-2">
                        ${product.features.map(feature => `
                            <li class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <svg class="w-5 h-5 text-pink-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                ${feature}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <!-- Actions -->
                <div class="flex gap-4">
                    ${product.stock ? `
                        <button onclick="addToCart(${product.id})" class="flex-1 bg-gradient-to-r from-pink-400 to-blue-400 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-pink-300/50 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            افزودن به سبد خرید
                        </button>
                    ` : `
                        <button disabled class="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 py-4 rounded-xl font-bold text-lg cursor-not-allowed">
                            ناموجود
                        </button>
                    `}
                    <a href="index.html#products" class="px-6 py-4 border-2 border-pink-200 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-300 hover:border-pink-400 hover:text-pink-500 transition-all duration-300 flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        بازگشت
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Render related products
    renderRelatedProducts(productId);
}

// ==================== RENDER RELATED PRODUCTS ====================
function renderRelatedProducts(currentProductId) {
    const relatedContainer = document.getElementById('related-products');
    if (!relatedContainer) return;
    
    const relatedProducts = products
        .filter(p => p.id !== currentProductId && p.stock)
        .slice(0, 4);
    
    relatedContainer.innerHTML = relatedProducts.map(product => `
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-pink-100/50 dark:shadow-none overflow-hidden hover:shadow-2xl hover:shadow-pink-200/50 hover:scale-105 transition-all duration-300">
            <div class="relative overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500">
            </div>
            <div class="p-4">
                <h3 class="text-sm font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">${product.name}</h3>
                <div class="flex items-center justify-between">
                    <span class="text-lg font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">${formatPrice(product.price)}</span>
                    <button onclick="addToCart(${product.id})" class="w-10 h-10 bg-gradient-to-r from-pink-400 to-blue-400 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Render product detail on page load
document.addEventListener('DOMContentLoaded', renderProductDetail);
