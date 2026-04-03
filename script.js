document.addEventListener('DOMContentLoaded', function () {
    // 1. تشغيل الأنميشن - تأكد من وجود المكتبة أولاً
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }

    // 2. تغيير خلفية الـ Nav
    window.addEventListener('scroll', function () {
        const nav = document.querySelector('nav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.style.background = '#0f172a';
                nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
            } else {
                nav.style.background = 'rgba(15, 23, 42, 0.9)';
                nav.style.boxShadow = 'none';
            }
        }
    });

    // 3. الـ Smooth Scroll الآمن (حل نهائي لخطأ الكونسول)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // لو اللينك # بس أو مش بيبدأ بـ #، تجاهله
            if (targetId === "#" || !targetId.startsWith('#')) return;

            const targetElement = document.getElementById(targetId.substring(1));
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// 4. فتح وقفل المنيو
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// 5. التنقل بين الصفحات
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // قفل المنيو بعد الضغط
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.remove('active');
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
}