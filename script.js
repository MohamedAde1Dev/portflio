document.addEventListener('DOMContentLoaded', function() {
    // --- 1. تأثير الإمالة (Tilt Effect) على البطاقة الرئيسية ---
    const contentBox = document.querySelector('.content');

    // تأكد من وجود العنصر قبل إضافة المستمعين
    if (contentBox) {
        document.addEventListener('mousemove', (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const mouseX = (e.clientX - centerX) / 50;
            const mouseY = (e.clientY - centerY) / 50;

            contentBox.style.transform = perspective(1000px) rotateX(${mouseY * -1}deg) rotateY(${mouseX}deg) scale(1.0);
            contentBox.style.transition = 'none';
        });

        document.addEventListener('mouseleave', () => {
            contentBox.style.transition = 'transform 0.5s ease-out';
            contentBox.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.0)';
        });
    }
    
    // --- 2. إعداد الخلفية الحية (Particles.js) ---
    if (window.particlesJS) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#cccccc" },
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

    // --- 3. منطق بوت المحادثة (Chat Bot Logic) ---

    const chatIcon = document.getElementById('chat-bot-icon');
    const chatWindow = document.getElementById('chat-window');
    const closeChatBtn = document.getElementById('close-chat');
    const chatBody = document.getElementById('chat-body');
    const startChatBtn = document.getElementById('start-chat-btn');
    // const chatInputArea = document.getElementById('chat-input-area'); // غير مستخدم حالياً

    const botFaq = {
        'START': {
            message: "أهلاً بك مرة أخرى! كيف يمكنني مساعدتك؟",
            options: [
                { text: "طرق التواصل المتاحة", value: 'CONTACT' },
                { text: "الاستفسار عن مشروع جديد", value: 'NEW_PROJECT' },
                { text: "أسئلة عامة عن خبراتي", value: 'GENERAL_FAQ' }
            ]
        },
        'CONTACT': {
            message: "يسرني التواصل معك. إليك الطرق الأكثر احترافية:",
            response: `
                <p style="color: #ffcc00; font-weight: bold;">[أفضل طرق التواصل]</p>
                <ul>
                    <li><i class="fas fa-envelope"></i> البريد الإلكتروني (الأفضل للأعمال): <a href="mailto:alsaker804@gmail.com" style="color: #00ffff;">alsaker804@gmail.com</a></li>
                    <li><i class="fab fa-whatsapp"></i> واتساب (للرد السريع): يتم تزويدك بالرقم بعد الاستفسار الأولي عبر البريد.</li>
                    <li><i class="fab fa-linkedin"></i> ملف لينكدإن (للخبرات): <a href="#" style="color: #00ffff;">محمد عادل</a> (ضع رابطك هنا)</li>
                    <li style="color: #b0b0b0; font-size: 0.9em;">(يمكنك إضافة رابط الواتساب والفيسبوك هنا لاحقاً.)</li>
                </ul>
            `,
            options: [
                { text: "العودة للقائمة الرئيسية", value: 'START' }
            ]
        },
        'NEW_PROJECT': {
            message: "متحمس للعمل على مشروعك! لبدء الاستفسار:",
            response: `
                <p>لتحديد احتياجات مشروعك الجديد، يرجى إرسال بريد إلكتروني مفصل إلى <a href="mailto:alsaker804@gmail.com" style="color: #00ffff;">alsaker804@gmail.com</a> يحتوي على:</p>
                <ol>
                    <li>وصف عام للمشروع.</li>
                    <li>التقنيات المفضلة (إن وجدت).</li>
                    <li>الميزانية المتوقعة والجدول الزمني.</li>
                </ol>
                <p style="color: #ff007f;">سأقوم بالرد خلال 24 ساعة لترتيب مكالمة.</p>
            `,
            options: [
                { text: "العودة للقائمة الرئيسية", value: 'START' }
            ]
        },
        'GENERAL_FAQ': {
            message: "ما هي أبرز استفساراتك حول خبراتي؟",
            options: [
                { text: "هل تعمل بتقنية .NET؟", value: 'ANS_DOTNET' },
                { text: "ما هي لغات الواجهات الأمامية (Frontend) التي تجيدها؟", value: 'ANS_FRONTEND' },
                { text: "العودة للقائمة الرئيسية", value: 'START' }
            ]
        },
        'ANS_DOTNET': {
            message: "بالتأكيد! أنا متخصص في تطوير أنظمة الـ Backend باستخدام <span style='color: #00ffff;'>.NET Core و C#</span>، مع خبرة في قواعد بيانات SQL Server و PostgreSQL.",
            options: [
                { text: "العودة لأسئلة الخبرات", value: 'GENERAL_FAQ' },
                { text: "العودة للقائمة الرئيسية", value: 'START' }
            ]
        },
        'ANS_FRONTEND': {
            message: "أجيد تطوير الواجهات باستخدام <span style='color: #ff007f;'>React JS و Vue.js</span>، إضافة إلى HTML5, CSS3 و JavaScript الحديثة.",
            options: [
                { text: "العودة لأسئلة الخبرات", value: 'GENERAL_FAQ' },
                { text: "العودة للقائمة الرئيسية", value: 'START' }
            ]
        }
    };

    // 4. وظائف فتح وإغلاق النافذة
    chatIcon.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        chatIcon.style.display = 'none';
        chatBody.scrollTop = chatBody.scrollHeight;
    });

    closeChatBtn.addEventListener('click', () => {
        chatWindow.classList.remove('open');
        chatIcon.style.display = 'block';
    });

    // 5. وظيفة إضافة رسالة جديدة
    function addMessage(text, sender, isHtml = false) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        msgDiv.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
        
        if (isHtml) {
            msgDiv.innerHTML = text;
        } else {
            const p = document.createElement('p');
            p.innerHTML = text;
            msgDiv.appendChild(p);
        }
        
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // 6. وظيفة عرض الخيارات التفاعلية
    function displayOptions(options) {
        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('quick-reply-options');

        options.forEach(option => {
            const btn = document.createElement('button');
            btn.classList.add('quick-reply-btn');
            btn.textContent = option.text;
            btn.dataset.value = option.value;
            btn.addEventListener('click', handleUserSelection);
            optionsDiv.appendChild(btn);
        });

        const botMsgDiv = document.createElement('div');
        botMsgDiv.classList.add('message', 'bot-message');
        botMsgDiv.appendChild(optionsDiv);
        chatBody.appendChild(botMsgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // 7. معالج النقر على خيارات المستخدم
    function handleUserSelection(event) {
        const selectedValue = event.target.dataset.value;
        const selectedText = event.target.textContent;

        addMessage(selectedText, 'user');

        const optionsContainer = chatBody.lastElementChild.querySelector('.quick-reply-options');
        if (optionsContainer) {
            optionsContainer.style.display = 'none';
        }

        setTimeout(() => {
            handleBotResponse(selectedValue);
        }, 500);
    }

    // 8. وظيفة الرد على خيار المستخدم
    function handleBotResponse(key) {
        const responseData = botFaq[key];

        addMessage(responseData.message, 'bot');

        if (responseData.response) {
            addMessage(responseData.response, 'bot', true);
        }

        if (responseData.options) {
            displayOptions(responseData.options);
        }
    }

    // 9. معالج زر "ابدأ المحادثة"
    startChatBtn.addEventListener('click', () => {
        addMessage('Start', 'user');
        
        startChatBtn.style.display = 'none';
        
        setTimeout(() => {
            handleBotResponse('START');
        }, 500);
    });
});