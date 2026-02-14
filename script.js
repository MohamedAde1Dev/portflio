// Change Nav background on scroll
window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = '#0f172a';
        nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
    } else {
        nav.style.background = 'rgba(15, 23, 42, 0.9)';
        nav.style.boxShadow = 'none';
    }
});

// Smooth scrolling for links (Optional - browser supports it via CSS now)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//----------------------------------------------------
// وظيفة التنقل بين الصفحات
function showPage(pageId) {
    // إخفاء كل الصفحات
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // إظهار الصفحة المطلوبة
    document.getElementById(pageId).classList.add('active');

    // إغلاق قائمة الموبايل إذا كنت تستخدمها
    window.scrollTo(0, 0);
}

// تشغيل مكتبة الأنيميشن
AOS.init({
    duration: 1000,
    once: true
});