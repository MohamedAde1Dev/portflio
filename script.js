document.addEventListener('DOMContentLoaded', function() {
    // 1. إعداد الخلفية الحية (Particles.js) كما كان سابقاً
    if (window.particlesJS) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#cccccc" }, // لون أفتح قليلاً
                "shape": { "type": "circle" },
                "opacity": { "value": 0.6, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": false },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": false }, "resize": true }
            },
            "retina_detect": true
        });
    }

    // 2. تأثير الإمالة (Tilt Effect) على البطاقة الرئيسية
    const contentBox = document.querySelector('.content');

    document.addEventListener('mousemove', (e) => {
        // حساب مركز الشاشة
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // حساب المسافة من المركز (تتراوح بين -50 إلى 50 تقريباً)
        const mouseX = (e.clientX - centerX) / 50;
        const mouseY = (e.clientY - centerY) / 50;

        // تطبيق تأثير الإمالة 3D على حاوية المحتوى
        contentBox.style.transform = perspective(1000px) rotateX(${mouseY * -1}deg) rotateY(${mouseX}deg) scale(1.0);
        contentBox.style.transition = 'none'; // تعطيل الانتقال عند الحركة
    });

    // استعادة الحركة السلسة عند توقف الماوس (لتجنب الاهتزاز)
    document.addEventListener('mouseleave', () => {
        contentBox.style.transition = 'transform 0.5s ease-out';
        contentBox.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.0)';
    });
});