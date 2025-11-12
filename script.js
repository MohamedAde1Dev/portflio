document.addEventListener('DOMContentLoaded', function() {
    // 1. تأثير الكتابة والمسح (Typing/Deleting Effect)
    const typingTextElement = document.getElementById('typing-text');
    const texts = ["System Architect", "Full Stack Developer", "Backend Specialist"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentText = texts[textIndex];
        const display = isDeleting
            ? currentText.substring(0, charIndex - 1)
            : currentText.substring(0, charIndex + 1);

        typingTextElement.textContent = display;

        if (!isDeleting && charIndex === currentText.length) {
            // انتهى من الكتابة، انتظر وابدأ المسح
            isDeleting = true;
            setTimeout(typeWriter, 1500); // وقت الانتظار
        } else if (isDeleting && charIndex === 0) {
            // انتهى من المسح، انتقل للنص التالي وابدأ الكتابة
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeWriter, 500); // وقت التأخير قبل بدء الكتابة
        } else {
            // استمر في الكتابة أو المسح
            const speed = isDeleting ? 70 : 150;
            charIndex += isDeleting ? -1 : 1;
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter();

    // 2. إعداد الخلفية الحية (Particles.js) - محاكاة الفقاقيع (Bubbles)
    if (window.particlesJS) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 30, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00ffff" }, // لون الفقاقيع (نيون أزرق)
                "shape": { "type": "circle" },
                "opacity": { "value": 0.3, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } }, // حيوية أكثر
                "size": { "value": 10, "random": true, "anim": { "enable": false } }, // حجم أكبر للفقاقيع
                "line_linked": { "enable": false },
                "move": { "enable": true, "speed": 1.5, "direction": "bottom", "random": true, "straight": false, "out_mode": "out", "bounce": false } // تتحرك للأعلى (مثل الفقاقيع)
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": false }, "resize": true },
                "modes": { "bubble": { "distance": 200, "size": 15, "duration": 2, "opacity": 0.8 } } // تأثير فقاعة عند التمرير
            },
            "retina_detect": true
        });
    }

    // 3. منطق بوت المحادثة (Chat Bot Logic) - تحويل النصوص للإنجليزية
    const chatIcon = document.getElementById('chat-bot-icon');
    const chatWindow = document.getElementById('chat-window');
    const closeChatBtn = document.getElementById('close-chat');
    const chatBody = document.getElementById('chat-body');
    const startChatBtn = document.getElementById('start-chat-btn');

    const botFaq = {
        'START': {
            message: "Welcome back! How can I assist you?",
            options: [
                { text: "Contact Information", value: 'CONTACT' },
                { text: "Inquire about a New Project", value: 'NEW_PROJECT' },
                { text: "General Expertise Questions", value: 'GENERAL_FAQ' }
            ]
        },
        'CONTACT': {
            message: "I'd be happy to connect. Here are the professional ways to reach me:",
            response: `
                <p style="color: #ffcc00; font-weight: bold;">[Preferred Contact Methods]</p>
                <ul>
                    <li><i class="fas fa-envelope"></i> Email (Best for business): <a href="mailto:alsaker804@gmail.com" style="color: #00ffff;">alsaker804@gmail.com</a></li>
                    <li><i class="fab fa-whatsapp"></i> WhatsApp (Quick reply): The number will be provided after initial email inquiry.</li>
                    <li><i class="fab fa-linkedin"></i> LinkedIn Profile: <a href="#" style="color: #00ffff;">Mohamed Adel</a> (Link here)</li>
                </ul>
            `,
            options: [
                { text: "Back to Main Menu", value: 'START' }
            ]
        },
        'NEW_PROJECT': {
            message: "Excited to work on your project! To start the inquiry:",
            response: `
                <p>Please send a detailed email to <a href="mailto:alsaker804@gmail.com" style="color: #00ffff;">alsaker804@gmail.com</a> including:</p>
                <ol>
                    <li>Project overview and goals.</li>
                    <li>Preferred technologies (if any).</li>
                    <li>Expected budget and timeline.</li>
                </ol>
                <p style="color: #ff007f;">I'll reply within 24 hours to schedule a call.</p>
            `,
            options: [
                { text: "Back to Main Menu", value: 'START' }
            ]
        },
        'GENERAL_FAQ': {
            message: "What are your top questions about my expertise?",
            options: [
                { text: "What Backend technologies do you specialize in?", value: 'ANS_DOTNET' },
                { text: "What Frontend frameworks do you use?", value: 'ANS_FRONTEND' },
                { text: "Back to Main Menu", value: 'START' }
            ]
        },
        'ANS_DOTNET': {
            message: "I specialize in developing <span style='color: #00ffff;'>.NET Core and C# Backend systems</span>, with strong experience in SQL Server and PostgreSQL databases.",
            options: [
                { text: "Back to FAQ", value: 'GENERAL_FAQ' },
                { text: "Back to Main Menu", value: 'START' }
            ]
        },
        'ANS_FRONTEND': {
            message: "I build modern interfaces using <span style='color: #ff007f;'>React JS and Vue.js</span>, alongside expert-level HTML5, CSS3, and modern JavaScript.",
            options: [
                { text: "Back to FAQ", value: 'GENERAL_FAQ' },
                { text: "Back to Main Menu", value: 'START' }
            ]
        }
    };

    // --- (باقي منطق البوت لفتح/غلق النافذة ومعالجة الرسائل - بدون تغيير في المنطق) ---
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
        addMessage('Start Chat', 'user');
        
        startChatBtn.style.display = 'none';
        
        setTimeout(() => {
            handleBotResponse('START');
        }, 500);
    });
});