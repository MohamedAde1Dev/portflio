// ===================================
// 2. تفعيل الانتقال السلس (Smooth Scroll)
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // منع الانتقال الافتراضي السريع للمتصفح
        e.preventDefault(); 

        // تحديد العنصر الذي سيتم الانتقال إليه (باستخدام الـ href)
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // استخدام خاصية scrollIntoView مع الخيار 'smooth'
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            // ملاحظة إضافية للتعويض عن الـ Navbar الثابت
            // بما أن الـ Navbar ثابت، فإنه يغطي جزءًا من القسم عند الانتقال إليه.
            // لتعويض ذلك، يمكن إضافة هامش علوي بسيط في CSS (أو استخدام الـ JavaScript)
        }
    });
});