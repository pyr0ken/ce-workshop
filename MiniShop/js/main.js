// Main JavaScript for MiniStyle - Men's Clothing & Accessories
// Dark Mode, Mobile Menu, and Common Functions

// ==================== DARK MODE ====================
const darkModeToggle = document.getElementById('dark-mode-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    html.classList.add('dark');
    themeIcon.textContent = '☀️';
}

// Toggle dark mode
darkModeToggle?.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeIcon.textContent = isDark ? '☀️' : '🌙';
});

// ==================== MOBILE MENU ====================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// ==================== TOAST NOTIFICATION ====================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        
        // Show toast
        setTimeout(() => {
            toast.classList.remove('translate-y-20', 'opacity-0');
        }, 10);
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0');
        }, 3000);
    }
}

// ==================== PRODUCTS DATA - Men's Clothing & Accessories ====================
const products = [
    {
        id: 1,
        name: 'تیشرت ساده مردانه سفید',
        price: 280000,
        image: 'assets/images/product1.jpg',
        stock: true,
        rating: 4.7,
        reviews: 89,
        badge: 'پرفروش',
        description: 'تیشرت ساده و شیک مردانه با پارچه نرم و breathable. مناسب برای استفاده روزمره و تابستان. جنس ۱۰۰٪ پنبه با کیفیت بالا.',
        features: [
            'جنس ۱۰۰٪ پنبه',
            'نرم و راحت',
            'قابل شستشو در ماشین',
            'دوام بالا',
            'مناسب فصل تابستان'
        ]
    },
    {
        id: 2,
        name: 'شلوار جین مردانه آبی',
        price: 650000,
        image: 'assets/images/product2.jpg',
        stock: true,
        rating: 4.8,
        reviews: 124,
        badge: 'پیشنهاد ویژه',
        description: 'شلوار جین کلاسیک مردانه با کیفیت بالا. طراحی مدرن با دوام عالی. مناسب برای استفاده روزمره و مهمانی‌ها.',
        features: [
            'جنس جین با کیفیت',
            'دوخت محکم',
            'طراحی کلاسیک',
            'رنگ ثابت',
            'سایزبندی کامل'
        ]
    },
    {
        id: 3,
        name: 'پیراهن آستین بلند آبی',
        price: 480000,
        image: 'assets/images/product3.jpg',
        stock: true,
            rating: 4.6,
        reviews: 67,
        badge: 'جدید',
        description: 'پیراهن آستین بلند مردانه با طراحی رسمی. مناسب برای محیط کار و قرارهای رسمی. پارچه با کیفیت و اتوپذیری آسان.',
        features: [
            'پارچه با کیفیت',
            'اتوپذیری آسان',
            'طراحی رسمی',
            'دکمه‌های محکم',
            'مناسب محیط کار'
        ]
    },
    {
        id: 4,
        name: 'کفش اسپرت مردانه سفید-صورتی',
        price: 890000,
        image: 'assets/images/product4.jpg',
        stock: true,
        rating: 4.9,
        reviews: 156,
        badge: 'محبوب',
        description: 'کفش اسپرت مدرن مردانه با طراحی خاص و رنگ‌بندی جذاب. راحتی فوق‌العاده برای پیاده‌روی‌های طولانی.',
        features: [
            'کفی راحت',
            'طراحی مدرن',
            'سبک و راحت',
            'قابل استفاده روزمره',
            'کیفیت دوخت عالی'
        ]
    },
    {
        id: 5,
        name: 'ساعت مچی کلاسیک چرمی',
        price: 1200000,
        image: 'assets/images/product5.jpg',
        stock: true,
        rating: 4.8,
        reviews: 92,
        badge: 'اکسسوری',
        description: 'ساعت مچی کلاسیک مردانه با بند چرمی طبیعی. طراحی شیک و مناسب برای استفاده رسمی و روزمره.',
        features: [
            'بند چرم طبیعی',
            'موتور ژاپنی',
            'طراحی کلاسیک',
            'مقاوم در برابر آب',
            'گارانتی ۱ ساله'
        ]
    },
    {
        id: 6,
        name: 'عینک آفتابی مردانه مشکی',
        price: 450000,
        image: 'assets/images/product6.jpg',
        stock: true,
        rating: 4.5,
        reviews: 78,
        badge: null,
        description: 'عینک آفتابی مردانه با فریم مشکی کلاسیک. لنز UV400 برای محافظت از چشم در برابر اشعه‌های مضر خورشید.',
        features: [
            'لنز UV400',
            'فریم مقاوم',
            'طراحی کلاسیک',
            'سبک و راحت',
            'مناسب همه صورت‌ها'
        ]
    },
    {
        id: 7,
        name: 'کاپشن بهاری آبی روشن',
        price: 980000,
        image: 'assets/images/product7.jpg',
        stock: false,
        rating: 4.7,
        reviews: 45,
        badge: 'ناموجود',
        description: 'کاپشن سبک بهاری مردانه با طراحی مدرن. مناسب برای فصل بهار و پاییز. پارچه ضد آب و باد.',
        features: [
            'پارچه ضد آب',
            'طراحی مدرن',
            'جیب‌های کاربردی',
            'سبک و راحت',
            'مناسب بهار و پاییز'
        ]
    },
    {
        id: 8,
        name: 'کیف چرمی مردانه قهوه‌ای',
        price: 750000,
        image: 'assets/images/product8.jpg',
        stock: true,
        rating: 4.6,
        reviews: 63,
        badge: 'اکسسوری',
        description: 'کیف چرمی دست‌دوز مردانه با کیفیت عالی. مناسب برای حمل لپ‌تاپ و اسناد. طراحی کلاسیک و شیک.',
        features: [
            'چرم طبیعی',
            'دوخت دستی',
            'طراحی کلاسیک',
            'فضای داخلی مناسب',
            'دوام بالا'
        ]
    }
];

// ==================== FORMAT PRICE ====================
function formatPrice(price) {
    return price.toLocaleString('fa-IR');
}

// ==================== UPDATE CART BADGE ====================
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('#cart-badge');
    badges.forEach(badge => {
        badge.textContent = totalItems;
        if (totalItems > 0) {
            badge.classList.add('animate-bounce');
            setTimeout(() => badge.classList.remove('animate-bounce'), 1000);
        }
    });
}

// Initialize cart badge on page load
document.addEventListener('DOMContentLoaded', updateCartBadge);
