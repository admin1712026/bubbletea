// ==================== ПЕРЕХОД МЕЖДУ СТРАНИЦАМИ ====================
function initPageTransition() {
    // Создаём элемент для анимации перехода
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    transition.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #FF6363 0%, #FFB5B5 100%);
        z-index: 9999;
        transform: translateY(100%);
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
    `;
    document.body.appendChild(transition);
    
    // Анимация появления страницы при загрузке
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Обработчик для кнопки "Смотреть все"
    const viewAllBtn = document.getElementById('viewAllMenu');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            transition.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    }
    
    // Обработчик для всех внутренних ссылок на другие страницы
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        if (link.id === 'viewAllMenu') return; // Уже обработан
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            transition.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
}

// ==================== АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКОВ ПРИ СКРОЛЛЕ ====================
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация перехода между страницами
    initPageTransition();
    // Intersection Observer для появления элементов
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Добавляем задержку для каскадного эффекта
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Наблюдаем за всеми элементами с классом fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // ==================== АНИМАЦИЯ ПУЗЫРЬКОВ НА ФОНЕ ====================
    createBubbles();
    
    // ==================== СЛАЙДЕР ОТЗЫВОВ ====================
    initReviewsSlider();
    
    // ==================== ОБРАБОТКА ФОРМЫ ====================
    initContactForm();
    
    // ==================== ПЛАВНАЯ ПРОКРУТКА ====================
    initSmoothScroll();
});

// Создание анимированных пузырьков
function createBubbles() {
    const bubblesContainer = document.getElementById('bubbles');
    if (!bubblesContainer) return;
    
    const colors = ['#FF6363', '#FFB5B5', '#FFE566', '#98FB98', '#DDA0DD'];
    const bubbleCount = 15;
    
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const size = Math.random() * 30 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 8;
        const delay = Math.random() * 5;
        
        bubble.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            left: ${left}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        bubblesContainer.appendChild(bubble);
        
        // Удаляем пузырёк после завершения анимации и создаём новый
        setTimeout(() => {
            bubble.remove();
            createBubble();
        }, (duration + delay) * 1000);
    }
    
    // Создаём начальные пузырьки
    for (let i = 0; i < bubbleCount; i++) {
        setTimeout(() => createBubble(), i * 500);
    }
}

// Слайдер отзывов
function initReviewsSlider() {
    const dots = document.querySelectorAll('.reviews-dots .dot');
    const reviewsGrid = document.getElementById('reviewsGrid');
    
    if (!dots.length || !reviewsGrid) return;
    
    let currentSlide = 0;
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
    
    function updateSlider() {
        // На мобильных устройствах можно добавить прокрутку
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Добавляем эффект при клике
        const items = reviewsGrid.querySelectorAll('.review-item');
        items.forEach((item, index) => {
            item.style.transform = index === currentSlide ? 'scale(1.02)' : 'scale(1)';
            item.style.opacity = index === currentSlide ? '1' : '0.7';
        });
        
        // Сбрасываем через секунду
        setTimeout(() => {
            items.forEach(item => {
                item.style.transform = '';
                item.style.opacity = '';
            });
        }, 1000);
    }
    
    // Автоматическая смена слайдов
    setInterval(() => {
        currentSlide = (currentSlide + 1) % dots.length;
        updateSlider();
    }, 5000);
}

// Обработка формы
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Очистка предыдущих ошибок
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
            const errorMsg = group.querySelector('.error-message');
            if (errorMsg) errorMsg.textContent = '';
        });
        
        // Валидация
        let isValid = true;
        const name = form.querySelector('input[type="text"]');
        const email = form.querySelector('input[type="email"]');
        const phone = form.querySelector('input[type="tel"]');
        const message = form.querySelector('textarea');
        
        // Проверка имени
        if (!name.value.trim()) {
            showError(name, 'Пожалуйста, введите ваше имя');
            isValid = false;
        }
        
        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'Пожалуйста, введите email');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, 'Введите корректный email');
            isValid = false;
        }
        
        // Проверка телефона
        if (!phone.value.trim()) {
            showError(phone, 'Пожалуйста, введите телефон');
            isValid = false;
        }
        
        // Проверка сообщения
        if (!message.value.trim()) {
            showError(message, 'Пожалуйста, введите сообщение');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Анимация кнопки
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = 'Отправляется...';
        button.disabled = true;
        button.style.opacity = '0.7';
        
        // Имитация отправки
        setTimeout(() => {
            button.textContent = 'Отправлено!';
            button.style.background = '#7ED957';
            
            // Очистка формы
            form.reset();
            
            // Возврат к исходному состоянию
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.opacity = '1';
                button.style.background = '';
            }, 2000);
        }, 1500);
    });
    
    // Анимация фокуса на полях
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
        
        // Очистка ошибки при вводе
        input.addEventListener('input', function() {
            this.parentElement.classList.remove('error');
            const errorMsg = this.parentElement.querySelector('.error-message');
            if (errorMsg) errorMsg.textContent = '';
        });
    });
}

function showError(input, message) {
    const group = input.parentElement;
    group.classList.add('error');
    const errorMsg = group.querySelector('.error-message');
    if (errorMsg) errorMsg.textContent = message;
}

// Плавная прокрутка
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== ПАРАЛЛАКС ЭФФЕКТ ДЛЯ КРУГОВ ====================
window.addEventListener('scroll', function() {
    const circles = document.querySelectorAll('.circle');
    const scrollY = window.scrollY;
    
    circles.forEach((circle, index) => {
        const speed = (index + 1) * 0.1;
        circle.style.transform = `translate(-50%, calc(-50% + ${scrollY * speed}px))`;
    });
});

// ==================== АНИМАЦИЯ ПУЗЫРЬКОВ В СТАКАНАХ ПРИ НАВЕДЕНИИ ====================
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const bubbles = this.querySelectorAll('.menu-bubble');
        bubbles.forEach((bubble, index) => {
            bubble.style.animationDuration = '1.5s';
        });
    });
    
    item.addEventListener('mouseleave', function() {
        const bubbles = this.querySelectorAll('.menu-bubble');
        bubbles.forEach(bubble => {
            bubble.style.animationDuration = '2.5s';
        });
    });
});

// ==================== ЭФФЕКТ ПЕЧАТИ ДЛЯ ЗАГОЛОВКА ====================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                // Пропускаем HTML теги
                const closeTag = text.indexOf('>', i);
                element.innerHTML += text.substring(i, closeTag + 1);
                i = closeTag + 1;
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ==================== СЧЁТЧИК ДЛЯ СТАТИСТИКИ ====================
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString('ru-RU');
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// ==================== ИНТЕРАКТИВНЫЕ BLOB-ЭЛЕМЕНТЫ ====================
document.querySelectorAll('.franchise-blob, .decor-blob').forEach(blob => {
    blob.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(15deg)';
        this.style.transition = 'transform 0.4s ease';
    });
    
    blob.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ==================== КУРСОР-СЛЕДОВАТЕЛЬ (ОПЦИОНАЛЬНО) ====================
// Раскомментируйте для включения кастомного курсора
/*
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    width: 20px;
    height: 20px;
    background: rgba(255, 99, 99, 0.5);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

document.querySelectorAll('a, button, .menu-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
    });
});
*/

// POP & DROP website loaded successfully!

// ====================  ��  SUPABASE ====================
async function loadDrinksFromSupabase() {
    try {
        const response = await fetch('/api/drinks');
        if (!response.ok) {
            console.warn('? � ������� ��������� ������� �� Supabase');
            return;
        }
        
        const drinks = await response.json();
        console.log('? ������ ��������� �� Supabase:', drinks.length);
        
    } catch (err) {
        console.error('? ����� ��� ��������:', err.message);
    }
}

// �������� ������ ��� ��������
window.addEventListener('load', () => loadDrinksFromSupabase());
