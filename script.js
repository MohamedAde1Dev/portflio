document.addEventListener('DOMContentLoaded', function() {

    // 1. Tilt Effect
    const contentBox = document.querySelector('.content');

    if (contentBox) {
        document.addEventListener('mousemove', (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const mouseX = (e.clientX - centerX) / 50;
            const mouseY = (e.clientY - centerY) / 50;

            // ✅ إصلاح الـ Syntax Error — استخدام backticks بدل علامات التنصيص العادية
            contentBox.style.transform = perspective(1000px) rotateX(${mouseY * -1}deg) rotateY(${mouseX}deg) scale(1.0);
            contentBox.style.transition = 'none';
        });

        document.addEventListener('mouseleave', () => {
            contentBox.style.transition = 'transform 0.5s ease-out';
            contentBox.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.0)';
        });
    }

    // 2. Typing Effect (Disabled)
    // Code block removed to prevent SyntaxError.

    // 3. Particles.js Setup (Bubbles)
    if (window.particlesJS) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 30, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00ffff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.3, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 10, "random": true, "anim": { "enable": false } },
                "line_linked": { "enable": false },
                "move": { "enable": true, "speed": 1.5, "direction": "bottom", "random": true, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": false }, "resize": true },
                "modes": { "bubble": { "distance": 200, "size": 15, "duration": 2, "opacity": 0.8 } }
            },
            "retina_detect": true
        });
    }

    // 4. Chat Bot Logic
    const chatIcon = document.getElementById('chat-bot-icon');
    const chatWindow = document.getElementById('chat-window');
    const closeChatBtn = document.getElementById('close-chat');
    const chatBody = document.getElementById('chat-body');
    const startChatBtn = document.getElementById('start-chat-btn');

    const botFaq = {
        'START': {
            message: "Hello! How can I help you?",
            options: [
                { text: "Contact Information", value: 'CONTACT' },
                { text: "Troubleshooting", value: 'TROUBLESHOOT' }
            ]
        },
        'CONTACT': {
            message: "You can reach me via the following email:",
            response: `
                <p style="color: #ffcc00; font-weight: bold;">[Contact]</p>
                <ul>
                    <li><i class="fas fa-envelope"></i> Email: <a href="mailto:alsaker804@gmail.com" style="color: #00ffff;">alsaker804@gmail.com</a></li>
                </ul>
            `,
            options: [
                { text: "Back to Main Menu", value: 'START' }
            ]
        },
        'TROUBLESHOOT': {
            message: "For most site issues, the best solution is simple:",
            response: `
                <p style="color: #ff007f; font-weight: bold;">[Solution]</p>
                <p>Please restart the website (refresh the page).</p>
            `,
            options: [
                { text: "Back to Main Menu", value: 'START' }
            ]
        }
    };

    chatIcon.addEventListener('click', () => {
        chatWindow.classList.add('open'); 
        chatIcon.style.display = 'none'; 
        chatBody.scrollTop = chatBody.scrollHeight;
    });

    closeChatBtn.addEventListener('click', () => {
        chatWindow.classList.remove('open'); 
        chatIcon.style.display = 'block'; 
    });

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

    startChatBtn.addEventListener('click', () => {
        addMessage('Start Chat', 'user');
        
        startChatBtn.style.display = 'none';
        
        setTimeout(() => {
            handleBotResponse('START');
        }, 500);
    });
});