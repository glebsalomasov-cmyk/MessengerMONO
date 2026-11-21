/* ========== НАСТРОЙКИ (ЗАПОЛНИ) ========== */
const TG_BOT_TOKEN = '9126521953:AAFkYQkCY24MDU8FxiYyA1u5eB5mF3-0L5Q';   // токен от @BotFather, например '123456:ABC-DEF...'
const TG_CHAT_ID   = '59076250542';   // твой id, узнай у @userinfobot
const CRYPTO_ADDRESS = ''; // адрес кошелька USDT/TON для копирования
/* ========================================== */

const translations = {
    ru: {
        nav_philosophy: 'Манифест', nav_features: 'Возможности', nav_impact: 'Модель', nav_reports: 'Отчёты', nav_donate: 'Поддержать', nav_cta: 'Ранний доступ',
        a11y_theme: 'Переключить тему', a11y_lang: 'Переключить язык',
        hero_label: 'Приватный мессенджер с миссией',
        hero_title: 'Общение<br>без <em>шума</em>.',
        hero_desc: 'MONO — мессенджер без алгоритмов, рекламы и лишнего шума. 90% прибыли мы направляем на благотворительность: слова должны нести добро.',
        hero_cta: 'Получить ранний доступ', hero_secondary: 'Читать манифест', hero_scroll: 'листайте',
        marquee: 'приватность · спокойствие · честность · человечность · забота · ',
        phil_label: 'Манифест', phil_title: 'Четыре принципа,<br>которые мы не нарушаем',
        p1_title: 'Тишина — это функция', p1_text: 'Никаких историй, рилсов и бесконечной ленты. Только ваши диалоги и люди, которые вам дороги.',
        p2_title: 'Приватность по умолчанию', p2_text: 'Сквозное шифрование включено всегда. Ни рекламы, ни трекеров, ни продажи данных. Никогда.',
        p3_title: 'Люди важнее алгоритмов', p3_text: 'Никакая нейросеть не решает, что вам читать и с кем говорить. Порядок ваших сообщений — только ваш.',
        p4_title: 'Добро встроено в код', p4_text: '90% прибыли уходит в проверенные фонды каждый месяц. Отчёты — публичны и открыты для всех.',
        feat_label: 'Возможности', feat_title: 'Создан, чтобы доверять',
        f1_title: 'Сквозное шифрование', f1_desc: 'Протокол Signal: прочитать переписку можете только вы и собеседник.',
        f2_title: 'Исчезающие сообщения', f2_desc: 'Таймер от 1 секунды до недели. Следы стираются автоматически.',
        f3_title: 'Мгновенная доставка', f3_desc: 'WebSocket и лёгкие серверы: задержка меньше моргания.',
        f4_title: 'Открытый код', f4_desc: 'Клиент и сервер открыты для аудита. Доверие проверяется, а не декларируется.',
        f5_title: 'Без рекламы и трекеров', f5_desc: 'Никаких пикселей, профилей и «рекомендаций». Интерфейс принадлежит вам.',
        f6_title: 'Все платформы', f6_desc: 'iOS, Android, веб и десктоп. Синхронизация без облака-посредника.',
        chat_label: 'Интерфейс', chat_title: 'Спокойный диалог',
        chat_desc: 'Без галочек «прочитано» и тревоги мгновенного ответа. Сообщения приходят, когда нужны. Попробуй написать сам — Анна ответит.',
        chat_online: 'в сети', chat_input: 'Ваше сообщение…',
        impact_label: 'Наша модель', impact_title: 'Честность как <em>функция</em>',
        impact_charity_title: 'Благотворительность', impact_charity_desc: 'Образование, экология, медицина. Фонды выбираете вы голосованием внутри приложения.',
        impact_product_title: 'Жизнь продукта', impact_product_desc: 'Серверы, разработка, аудит безопасности. Ровно столько, сколько нужно.',
        impact_note: 'Каждый месяц мы публикуем отчёт: куда ушёл каждый рубль.',
        reports_label: 'Отчёты', reports_title: 'Куда ушли деньги',
        rep1_title: 'Октябрь 2026', rep2_title: 'Сентябрь 2026', rep3_title: 'Август 2026',
        rep_edu: 'Образование', rep_eco: 'Экология', rep_med: 'Медицина', rep_prod: 'Продукт',
        rep_note: 'Данные демонстрационные до первого реального отчёта.',
        roadmap_label: 'Дорожная карта', roadmap_title: 'Путь впереди',
        rm_done: 'готово', rm_progress: 'в работе', rm_plan: 'план',
        rm1_title: 'Веб-бета', rm1_text: 'Открытая веб-версия для первых 500 пользователей.',
        rm2_title: 'Мобильная бета', rm2_text: 'iOS и Android: тихие уведомления и оффлайн-черновики.',
        rm3_title: 'Группы и звонки', rm3_text: 'Групповые диалоги до 32 человек и шифрованные звонки.',
        rm4_title: 'Голосование фондов', rm4_text: 'Пользователи сами выбирают, каким фондам помочь в следующем месяце.',
        donate_label: 'Поддержать', donate_title: 'Слова, которые помогают',
        donate_desc: 'Пожертвования не обязательны — но именно они делают миссию быстрее. 90% каждого доната уйдёт в фонд месяца.',
        donate_boosty: 'Поддержать на Boosty', donate_crypto: 'Скопировать крипто-кошелёк',
        donate_copied: 'Адрес скопирован!', donate_demo: 'Это демо: добавь адрес кошелька в script.js.',
        faq_label: 'FAQ', faq_title: 'Вопросы и ответы',
        q1_title: 'Это правда бесплатно?', q1_text: 'Да. MONO бесплатен навсегда. Пожертвования — добровольны, а 90% прибыли от них идёт на благотворительность.',
        q2_title: 'Как работает шифрование?', q2_text: 'Протокол Signal: ключи хранятся только на ваших устройствах. Сервер передаёт, но не может прочитать.',
        q3_title: 'Как проверить 90%?', q3_text: 'Каждый месяц публикуем отчёт с чеками фондов и выписками. Любое расхождение видно сразу.',
        q4_title: 'Когда мобильная версия?', q4_text: 'Бета iOS и Android — в четвёртом квартале 2026. Оставьте почту, и вы получите приглашение первыми.',
        dl_title: 'Готовы к тишине?', dl_desc: 'Оставьте почту — пришлём приглашение, когда откроем двери.',
        dl_placeholder: 'ваша@почта.ру', dl_btn: 'Присоединиться',
        dl_success: 'Готово! Приглашение уже летит к вам. Спасибо, что вы с нами.',
        dl_note: 'Веб-версия работает уже сейчас. iOS и Android — скоро.',
        footer_rights: '© 2026 MONO. Сделано с заботой.',
        footer_privacy: 'Конфиденциальность', footer_terms: 'Условия', footer_contact: 'Контакты',
        title: 'MONO — мессенджер с миссией'
    },
    en: {
        nav_philosophy: 'Manifesto', nav_features: 'Features', nav_impact: 'Model', nav_reports: 'Reports', nav_donate: 'Donate', nav_cta: 'Early access',
        a11y_theme: 'Toggle theme', a11y_lang: 'Switch language',
        hero_label: 'A private messenger with a mission',
        hero_title: 'Communication<br>without <em>noise</em>.',
        hero_desc: 'MONO is a messenger free of algorithms, ads and excess noise. We direct 90% of profits to charity: words should carry good.',
        hero_cta: 'Get early access', hero_secondary: 'Read the manifesto', hero_scroll: 'scroll',
        marquee: 'privacy · calm · honesty · humanity · care · ',
        phil_label: 'Manifesto', phil_title: 'Four principles<br>we never break',
        p1_title: 'Silence is a feature', p1_text: 'No stories, no reels, no infinite feed. Only your conversations and the people you cherish.',
        p2_title: 'Privacy by default', p2_text: 'End-to-end encryption is always on. No ads, no trackers, no data selling. Ever.',
        p3_title: 'People over algorithms', p3_text: 'No neural network decides what you read or whom you talk to. The order of your messages is yours alone.',
        p4_title: 'Goodness built into code', p4_text: '90% of profits go to verified foundations every month. Reports are public and open to all.',
        feat_label: 'Features', feat_title: 'Built to be trusted',
        f1_title: 'End-to-end encryption', f1_desc: 'Signal protocol: only you and your partner can read the conversation.',
        f2_title: 'Disappearing messages', f2_desc: 'Timers from 1 second to a week. Traces erase themselves.',
        f3_title: 'Instant delivery', f3_desc: 'WebSocket and lightweight servers: latency under a blink.',
        f4_title: 'Open source', f4_desc: 'Client and server are open for audit. Trust is verified, not declared.',
        f5_title: 'No ads & trackers', f5_desc: 'No pixels, profiles or "recommendations". The interface belongs to you.',
        f6_title: 'All platforms', f6_desc: 'iOS, Android, web and desktop. Sync without a middleman cloud.',
        chat_label: 'Interface', chat_title: 'A calm conversation',
        chat_desc: 'No "read" ticks, no pressure to reply instantly. Messages arrive when they matter. Try writing — Anna will answer.',
        chat_online: 'online', chat_input: 'Your message…',
        impact_label: 'Our model', impact_title: 'Honesty as a <em>feature</em>',
        impact_charity_title: 'Charity', impact_charity_desc: 'Education, ecology, medicine. You vote for the foundations inside the app.',
        impact_product_title: 'Product life', impact_product_desc: 'Servers, development, security audits. Exactly as much as needed.',
        impact_note: 'Every month we publish a report: where every ruble went.',
        reports_label: 'Reports', reports_title: 'Where the money went',
        rep1_title: 'October 2026', rep2_title: 'September 2026', rep3_title: 'August 2026',
        rep_edu: 'Education', rep_eco: 'Ecology', rep_med: 'Medicine', rep_prod: 'Product',
        rep_note: 'Data is a demo until the first real report.',
        roadmap_label: 'Roadmap', roadmap_title: 'The path ahead',
        rm_done: 'done', rm_progress: 'in progress', rm_plan: 'planned',
        rm1_title: 'Web beta', rm1_text: 'Open web version for the first 500 users.',
        rm2_title: 'Mobile beta', rm2_text: 'iOS and Android: quiet notifications and offline drafts.',
        rm3_title: 'Groups & calls', rm3_text: 'Group chats up to 32 people and encrypted calls.',
        rm4_title: 'Foundation voting', rm4_text: 'Users choose which foundations to support next month.',
        donate_label: 'Donate', donate_title: 'Words that help',
        donate_desc: 'Donations are optional — but they make the mission faster. 90% of every donation goes to the foundation of the month.',
        donate_boosty: 'Support on Boosty', donate_crypto: 'Copy crypto wallet',
        donate_copied: 'Address copied!', donate_demo: 'Demo: add your wallet address in script.js.',
        faq_label: 'FAQ', faq_title: 'Questions & answers',
        q1_title: 'Is it really free?', q1_text: 'Yes. MONO is free forever. Donations are voluntary, and 90% of that profit goes to charity.',
        q2_title: 'How does encryption work?', q2_text: 'Signal protocol: keys live only on your devices. The server relays but cannot read.',
        q3_title: 'How to verify the 90%?', q3_text: 'Every month we publish a report with foundation receipts and statements. Any discrepancy is visible at once.',
        q4_title: 'When is mobile?', q4_text: 'iOS and Android beta in Q4 2026. Leave your email to get invited first.',
        dl_title: 'Ready for silence?', dl_desc: "Leave your email — we'll send an invite when we open the doors.",
        dl_placeholder: 'your@email.com', dl_btn: 'Join',
        dl_success: 'Done! Your invite is on its way. Thank you for being with us.',
        dl_note: 'The web version is live now. iOS & Android — soon.',
        footer_rights: '© 2026 MONO. Made with care.',
        footer_privacy: 'Privacy', footer_terms: 'Terms', footer_contact: 'Contact',
        title: 'MONO — messenger with a mission'
    }
};

const chatScripts = {
    ru: [
        { s: 'in',  t: 'Привет! Как ты?' },
        { s: 'out', t: 'Привет! Хорошо. Тут так тихо…' },
        { s: 'in',  t: 'Да. Никакой рекламы. Только мы.' },
        { s: 'out', t: 'И 90% ушло в фонд 🌱' }
    ],
    en: [
        { s: 'in',  t: 'Hey! How are you?' },
        { s: 'out', t: 'Hey! Good. It\u2019s so quiet here…' },
        { s: 'in',  t: 'Yes. No ads at all. Just us.' },
        { s: 'out', t: 'And 90% went to charity 🌱' }
    ]
};
const chatReplies = {
    ru: ['Именно 🤍', 'И без галочек «прочитано» — живи в своём ритме.', 'Сохрани эту мысль.', 'Тишина с тобой согласна.', 'Напиши мне позже, я подожду.'],
    en: ['Exactly 🤍', 'And no "read" ticks — live at your own pace.', 'Keep that thought.', 'The silence agrees with you.', 'Message me later, I\u2019ll wait.']
};

let currentLang = 'ru';
let chatTimers = [];
let chatUserMode = false;
let replyIndex = 0;
let lenis = null;

/* ---------- TOAST ---------- */
const toast = document.getElementById('toast');
let toastTimer;
function showToast(text) {
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

/* ---------- LANGUAGE ---------- */
function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.title = translations[lang].title;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const k = el.getAttribute('data-i18n');
        if (translations[lang][k] !== undefined) el.innerHTML = translations[lang][k];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const k = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][k] !== undefined) el.placeholder = translations[lang][k];
    });
    document.querySelectorAll('[data-i18n-aria], #themeToggle, #langSwitch').forEach(el => {
        if (el.id === 'themeToggle') el.setAttribute('aria-label', translations[lang].a11y_theme);
        if (el.id === 'langSwitch') el.setAttribute('aria-label', translations[lang].a11y_lang);
    });
    document.querySelectorAll('.cur').forEach(el => { el.textContent = lang === 'ru' ? '₽' : '$'; });
    document.getElementById('langSwitch').textContent = lang === 'ru' ? 'EN' : 'RU';
    localStorage.setItem('mono-lang', lang);
    prepareAllLines();
    if (!chatUserMode) startChat();
}
function detectLang() {
    const saved = localStorage.getItem('mono-lang');
    if (saved) return saved;
    return (navigator.language || 'en').startsWith('ru') ? 'ru' : 'en';
}

/* ---------- LINE MASK ---------- */
function prepareAllLines() {
    document.querySelectorAll('[data-lines]').forEach(el => {
        const dict = translations[currentLang][el.getAttribute('data-i18n')];
        const html = dict || el.innerHTML;
        const parts = html.split(/<br\s*\/?>/i);
        el.innerHTML = parts.map(p => '<span class="line"><span class="line-i">' + p + '</span></span>').join('');
        el.querySelectorAll('.line-i').forEach((s, i) => { s.style.transitionDelay = (i * 0.12) + 's'; });
    });
}

/* ---------- REVEAL OBSERVER ---------- */
function initReveals() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) { en.target.classList.add('in'); observer.unobserve(en.target); }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal, .split-bar, [data-lines]').forEach(el => observer.observe(el));
}

/* ---------- CURSOR ---------- */
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursorDot.style.transform = 'translate(' + (mx - 2) + 'px,' + (my - 2) + 'px)';
});
(function loopCursor() {
    cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18;
    cursor.style.transform = 'translate(' + (cx - cursor.offsetWidth / 2) + 'px,' + (cy - cursor.offsetHeight / 2) + 'px)';
    requestAnimationFrame(loopCursor);
})();
document.querySelectorAll('a, button, input').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
});

/* ---------- SCROLL: progress + horizontal ---------- */
const hSection = document.querySelector('.h-section');
const hTrack = document.getElementById('hTrack');
const hBar = document.getElementById('hBar');
const progressBar = document.getElementById('progress');

function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    progressBar.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')';
    const rect = hSection.getBoundingClientRect();
    const total = hSection.offsetHeight - innerHeight;
    const p = Math.min(1, Math.max(0, -rect.top / total));
    const shift = Math.max(0, hTrack.scrollWidth - innerWidth);
    hTrack.style.transform = 'translateX(' + (-p * shift) + 'px)';
    hBar.style.transform = 'scaleX(' + p + ')';
}
function sizeHorizontal() {
    const shift = Math.max(0, hTrack.scrollWidth - innerWidth);
    hSection.style.height = (innerHeight + shift) + 'px';
    onScroll();
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', sizeHorizontal);

/* ---------- LENIS + ANCHORS ---------- */
function initLenis() {
    if (window.Lenis) {
        lenis = new Lenis({ duration: 1.15 });
        const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
        lenis.on('scroll', onScroll);
    }
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            if (lenis) lenis.scrollTo(target, { offset: -70 });
            else window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        });
    });
}

/* ---------- DOT GRID ---------- */
const canvas = document.getElementById('dotGrid');
const ctx = canvas.getContext('2d');
let dots = []; const SP = 34;
let mxc = -9999, myc = -9999;
function resizeCanvas() {
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    dots = [];
    for (let x = SP / 2; x < canvas.width; x += SP)
        for (let y = SP / 2; y < canvas.height; y += SP)
            dots.push({ ox: x, oy: y });
}
canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mxc = e.clientX - r.left; myc = e.clientY - r.top;
});
canvas.addEventListener('mouseleave', () => { mxc = myc = -9999; });
function drawDots(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(128,120,110,0.35)';
    dots.forEach((d, i) => {
        let x = d.ox + Math.sin(t / 1400 + i * 0.15) * 2;
        let y = d.oy + Math.cos(t / 1600 + i * 0.1) * 2;
        const dist = Math.hypot(mxc - d.ox, myc - d.oy);
        if (dist < 110) {
            const f = (110 - dist) / 6;
            const a = Math.atan2(myc - d.oy, mxc - d.ox);
            x -= Math.cos(a) * f; y -= Math.sin(a) * f;
        }
        ctx.beginPath(); ctx.arc(x, y, 1.4, 0, Math.PI * 2); ctx.fill();
    });
    requestAnimationFrame(drawDots);
}

/* ---------- CHAT ---------- */
const chatBody = document.getElementById('chatBody');
function addBubble(side, text) {
    const b = document.createElement('div');
    b.className = 'bubble ' + side;
    b.textContent = text;
    chatBody.appendChild(b);
    while (chatBody.children.length > 8) chatBody.removeChild(chatBody.firstChild);
}
function startChat() {
    chatTimers.forEach(clearTimeout); chatTimers = [];
    chatBody.innerHTML = '';
    chatScripts[currentLang].forEach((m, i) => {
        chatTimers.push(setTimeout(() => addBubble(m.s, m.t), 800 + i * 1100));
    });
    chatTimers.push(setTimeout(startChat, 800 + chatScripts[currentLang].length * 1100 + 5000));
}
document.getElementById('chatForm').addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;
    if (!chatUserMode) { chatUserMode = true; chatTimers.forEach(clearTimeout); }
    addBubble('out', text);
    input.value = '';
    setTimeout(() => {
        addBubble('in', chatReplies[currentLang][replyIndex % chatReplies[currentLang].length]);
        replyIndex++;
    }, 900 + Math.random() * 700);
});

/* ---------- ACCORDIONS ---------- */
document.querySelectorAll('.acc-head').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const group = item.parentElement;
        const isOpen = item.classList.contains('open');
        group.querySelectorAll('.acc.open').forEach(o => {
            o.classList.remove('open');
            o.querySelector('.acc-panel').style.maxHeight = null;
            o.querySelector('.acc-head').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
            item.classList.add('open');
            const panel = item.querySelector('.acc-panel');
            panel.style.maxHeight = panel.scrollHeight + 'px';
            btn.setAttribute('aria-expanded', 'true');
        }
    });
});

/* ---------- THEME ---------- */
const themeToggle = document.getElementById('themeToggle');
function applyTheme(theme) {
    if (theme === 'night') document.body.setAttribute('data-theme', 'night');
    else document.body.removeAttribute('data-theme');
    themeToggle.textContent = theme === 'night' ? '☀' : '☾';
    localStorage.setItem('mono-theme', theme);
}
themeToggle.addEventListener('click', () => {
    const next = document.body.getAttribute('data-theme') === 'night' ? 'day' : 'night';
    applyTheme(next);
});

/* ---------- DONATE ---------- */
document.getElementById('copyCrypto').addEventListener('click', () => {
    if (!CRYPTO_ADDRESS) { showToast(translations[currentLang].donate_demo); return; }
    navigator.clipboard.writeText(CRYPTO_ADDRESS).then(() => showToast(translations[currentLang].donate_copied));
});

/* ---------- EARLY ACCESS FORM -> TELEGRAM ---------- */
document.getElementById('earlyForm').addEventListener('submit', e => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    const finish = () => {
        const p = document.createElement('p');
        p.className = 'form-success';
        p.innerHTML = translations[currentLang].dl_success;
        e.target.replaceWith(p);
    };
    if (TG_BOT_TOKEN && TG_CHAT_ID) {
        fetch('https://api.telegram.org/bot' + TG_BOT_TOKEN + '/sendMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: TG_CHAT_ID, text: 'MONO · ранний доступ: ' + email })
        }).then(finish).catch(err => { console.warn(err); finish(); });
    } else {
        console.warn('TG_BOT_TOKEN не заполнен — заявка не отправлена (демо-режим).');
        finish();
    }
});

/* ---------- PRELOADER + INIT ---------- */
addEventListener('load', () => {
    applyLang(detectLang());
    applyTheme(localStorage.getItem('mono-theme') || 'day');
    resizeCanvas();
    requestAnimationFrame(drawDots);
    initLenis();
    sizeHorizontal();
    setTimeout(() => {
        document.getElementById('preloader').classList.add('done');
        document.body.classList.remove('loading');
        setTimeout(initReveals, 500);
    }, 600);
});
document.getElementById('langSwitch').addEventListener('click', () => {
    applyLang(currentLang === 'ru' ? 'en' : 'ru');
});