
(() => {
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  const defaultSectionsOrder = ["work","play","info","connect"];
  const sections = (() => {
    const found = $$("[data-section-block]").map(el => el.getAttribute("data-section-block")).filter(Boolean);
    const uniq = Array.from(new Set(found));
    const ordered = defaultSectionsOrder.filter(k => uniq.includes(k));
    // In case someone adds new blocks later.
    for (const k of uniq) if (!ordered.includes(k)) ordered.push(k);
    return ordered;
  })();

  const i18n = {
    ru: {
      "meta.title": "myvisitself",
      "meta.desc": "Никита — Python-разработчик (Telegram-боты, скрипты), MTA game dev и сайты.",
      "a11y.skip": "Перейти к контенту",
      "nav.work": "Работа",
      "nav.play": "Игра",
      "nav.info": "Обо мне",
      "nav.connect": "Контакты",
      "nav.pay": "Оплата",
      "nav.available": "Доступен",
      "nav.yep": "Да",
      "hero.kicker": "PYTHON РАЗРАБОТЧИК • TELEGRAM-БОТЫ • СКРИПТЫ",
      "hero.hi": "Привет, я",
      "hero.name": "Никита",
      "hero.sub": "Мне 21. Делаю Telegram‑ботов, автоматизацию на Python, небольшие сайты и иногда пишу игровые системы для MTA.",
      "hero.btnOpen": "Открыть раздел",
      "hero.btnScroll": "Режим прокрутки",
      "hero.hint": "Подсказка: ← → (или колесо мыши) — выбор. Enter — открыть. Esc — закрыть.",
      "stack.work": "Боты, автоматизация, скрипты",
      "stack.play": "Игровые системы MTA",
      "stack.info": "Коротко обо мне",
      "stack.connect": "Ссылки и связь",
      "hud.pressEnter": "нажми Enter",
      "sections.work.title": "Работа",
      "sections.work.lead": "Практичный Python под реальные задачи.",
      "sections.work.bots.title": "Telegram-боты",
      "sections.work.bots.desc": "Регистрация, проверки подписки, бонусы, админка, интеграция с базой данных.",
      "sections.work.scripts.title": "Скрипты и автоматизация",
      "sections.work.scripts.desc": "Парсинг, отчёты, интеграции, обработка файлов, небольшие CLI‑утилиты.",
      "sections.work.web.title": "Веб",
      "sections.work.web.desc": "Лендинги, дашборды, простые бэкенды и боты как сервис.",
      "sections.play.title": "Игра",
      "sections.play.lead": "Игровые системы и эксперименты.",
      "sections.play.mta.title": "Разработка под MTA",
      "sections.play.mta.desc": "Логика геймплея, экономика, UI, события, анти-абуз скрипты, серверные утилиты.",
      "sections.play.demo.title": "Мини-демо (мышь)",
      "sections.play.demo.desc": "Небольшой интерактив — чтобы сайт ощущался живым.",
      "sections.info.title": "Обо мне",
      "sections.info.lead": "Коротко и по делу.",
      "sections.info.about.title": "Кто я",
      "sections.info.about.desc": "21 год. Люблю чистый UX, быстрые сайты и автоматизацию, которая экономит время.",
      "abouttile.b1": "Быстро отвечаю",
      "abouttile.b2": "Аккуратно передаю проект",
      "abouttile.b3": "Практично решаю задачи",
      "sections.info.stack.title": "Стек",
      "sections.info.values.title": "Как работаю",
      "sections.info.values.v1": "Быстрый MVP → итерации",
      "sections.info.values.v2": "Читаемый код и логи",
      "sections.info.values.v3": "Деплой и документация для передачи",
      "sections.connect.title": "Контакты",
      "sections.connect.lead": "Давай обсудим твою идею.",
      "sections.pay.title": "Оплата",
      "sections.pay.lead": "Доступны карты международных платёжных систем, а также российской — Мир.",
      "sections.pay.methods.title": "Способы оплаты",
      "sections.pay.methods.v1": "Международные банковские карты (Visa/Mastercard и т.п.)",
      "sections.pay.methods.v2": "Российская платёжная система: Мир",
      "sections.pay.process.title": "Как проходит оплата",
      "sections.pay.process.desc": "После согласования объёма и сроков пришлю счёт или ссылку на оплату. После оплаты подтвержу и отправлю короткое сообщение/чек.",

      "sections.connect.links.title": "Ссылки",
      "sections.connect.note": "Замените эти ссылки на реальные прямо в HTML.",
      "sections.connect.copy.title": "Быстрое сообщение",
      "sections.connect.copy.desc": "Клик — и короткий шаблон сообщения копируется.",
      "sections.connect.copy.btn": "Скопировать текст",
      "footer.made": "By kirya for you ♡",
      "footer.name": "Никита Дмитриевич",

      "sections.work.projects.title": "Проекты",
      "sections.work.projects.lead": "Пара лайв‑демо + архивы с исходниками.",
      "projects.open": "Открыть",
      "projects.preview": "Превью",
      "projects.downloadBot": "Скачать bot.zip",
      "projects.downloadAdapt": "Скачать Adapt_blogerBot.zip",
      "projects.couples.title": "Couples (мини‑сайт)",
      "projects.couples.desc": "Небольшая интерактивная страница — превью прямо на сайте.",
      "projects.altay.title": "Visit Altay (лендинг)",
      "projects.altay.desc": "Адаптивный лендинг со секциями и аккуратной вёрсткой.",
      "projects.bots.title": "Telegram‑боты (исходники)",
      "projects.bots.desc": "Два проекта из архивов — можно скачать и посмотреть структуру.",

      "projects.tgbot.title": "Zasidelis Adapt Bot",
      "projects.tgbot.desc": "Публичный Telegram‑бот — открой и протестируй сценарий.",
      "projects.openBot": "Открыть в Telegram",

      "sections.info.toolbox.title": "Тулбокс",
      "sections.info.toolbox.desc": "Небольшие настройки, сохраняются в браузере.",
      "toolbox.accent": "Акцентный цвет",
      "toolbox.motion": "Уменьшить анимации",
      "toolbox.motionBtn": "Переключить",
      "toolbox.sound": "Звук",
      "toolbox.soundBtn": "Переключить",
      "toolbox.hint": "Подсказка: Ctrl+K — палитра команд.",

      "sections.connect.form.title": "Написать мне",
      "sections.connect.form.desc": "Форма работает на статическом хостинге через сервис форм.",
      "form.name": "Имя",
      "form.email": "Почта",
      "form.msg": "Сообщение",
      "form.send": "Отправить",

      "palette.title": "Палитра команд",
      "palette.hint": "Enter — выполнить • Esc — закрыть",
      "palette.search": "Введите команду…",
      "palette.work": "Открыть: Работа",
      "palette.play": "Открыть: Игра",
      "palette.info": "Открыть: Обо мне",
      "palette.connect": "Открыть: Контакты",
      "palette.pay": "Открыть: Оплата",
      "palette.theme": "Переключить тему",
      "palette.fx": "Эффекты FX",
      "palette.copy": "Скопировать шаблон сообщения"
    },
    en: {
      "meta.title": "myvisitself",
      "meta.desc": "Nikita — Python developer (Telegram bots, scripts), MTA game dev, and websites.",
      "a11y.skip": "Skip to content",
      "nav.work": "Work",
      "nav.play": "Play",
      "nav.info": "Info",
      "nav.connect": "Connect",
      "nav.pay": "Payment",
      "nav.available": "Available",
      "nav.yep": "Yep",
      "hero.kicker": "PYTHON DEVELOPER • TELEGRAM BOTS • SCRIPTS",
      "hero.hi": "Hi, I'm",
      "hero.name": "Nikita",
      "hero.sub": "I'm 21. I build Telegram bots, automate stuff with Python, make small websites, and sometimes ship game systems for MTA.",
      "hero.btnOpen": "Open section",
      "hero.btnScroll": "Scroll mode",
      "hero.hint": "Tip: use ← → (or scroll) to select. Press Enter to open. Esc to close.",
      "stack.work": "Bots, automation, scripts",
      "stack.play": "MTA game systems",
      "stack.info": "About & skills",
      "stack.connect": "Contacts & links",
      "hud.pressEnter": "press Enter",
      "sections.work.title": "Work",
      "sections.work.lead": "Practical Python for business needs.",
      "sections.work.bots.title": "Telegram bots",
      "sections.work.bots.desc": "Funnels, subscription checks, bonuses, admin panels, database integration.",
      "sections.work.scripts.title": "Scripts & automation",
      "sections.work.scripts.desc": "Parsing, reports, integrations, file processing, small CLI tools.",
      "sections.work.web.title": "Web",
      "sections.work.web.desc": "Landing pages, dashboards, simple backends and bots as services.",
      "sections.play.title": "Play",
      "sections.play.lead": "Game systems & experiments.",
      "sections.play.mta.title": "MTA development",
      "sections.play.mta.desc": "Gameplay logic, economy, UI, events, anti-abuse scripts, serverside utilities.",
      "sections.play.demo.title": "Mini demo (mouse)",
      "sections.play.demo.desc": "A tiny interactive widget — just to make the page feel alive.",
      "sections.info.title": "Info",
      "sections.info.lead": "Short and straight to the point.",
      "sections.info.about.title": "About me",
      "sections.info.about.desc": "21 y.o. Developer. I like clean UX, fast sites, and automation that saves time.",
      "abouttile.b1": "Fast communication",
      "abouttile.b2": "Clean handoff",
      "abouttile.b3": "Practical solutions",
      "sections.info.stack.title": "Stack",
      "sections.info.values.title": "How I work",
      "sections.info.values.v1": "Fast MVP → iterations",
      "sections.info.values.v2": "Readable code & logs",
      "sections.info.values.v3": "Deployment & handoff docs",
      "sections.connect.title": "Connect",
      "sections.connect.lead": "Let’s talk about your idea.",
      "sections.pay.title": "Payment",
      "sections.pay.lead": "International cards and Russia’s MIR are supported.",
      "sections.pay.methods.title": "Available methods",
      "sections.pay.methods.v1": "International bank cards (Visa/Mastercard, etc.)",
      "sections.pay.methods.v2": "Russian payment system: MIR",
      "sections.pay.process.title": "How it works",
      "sections.pay.process.desc": "After we agree on scope and timeline, I send an invoice or payment link. You’ll get confirmation and a short receipt message.",

      "sections.connect.links.title": "Links",
      "sections.connect.note": "Replace these with your real contacts in the HTML.",
      "sections.connect.copy.title": "Quick copy",
      "sections.connect.copy.desc": "One click to copy a short message template.",
      "sections.connect.copy.btn": "Copy message",
      "footer.made": "By kirya for you ♡",
      "footer.name": "Nikita Dmitrievich",

      "sections.work.projects.title": "Projects",
      "sections.work.projects.lead": "A few live demos + source archives.",
      "projects.open": "Open live",
      "projects.preview": "Preview",
      "projects.downloadBot": "Download bot.zip",
      "projects.downloadAdapt": "Download Adapt_blogerBot.zip",
      "projects.couples.title": "Couples (mini-site)",
      "projects.couples.desc": "A neat interactive page — preview it right here.",
      "projects.altay.title": "Visit Altay (landing)",
      "projects.altay.desc": "Responsive landing page with sections and clean layout.",
      "projects.bots.title": "Telegram bots (source)",
      "projects.bots.desc": "Two archived projects — download and inspect structure.",

      "projects.tgbot.title": "Zasidelis Adapt Bot",
      "projects.tgbot.desc": "Public Telegram bot — open it and test the flow.",
      "projects.openBot": "Open in Telegram",

      "sections.info.toolbox.title": "Toolbox",
      "sections.info.toolbox.desc": "Small interactive settings saved in your browser.",
      "toolbox.accent": "Accent color",
      "toolbox.motion": "Reduced motion",
      "toolbox.motionBtn": "Toggle",
      "toolbox.sound": "Sound",
      "toolbox.soundBtn": "Toggle",
      "toolbox.hint": "Tip: press Ctrl+K to open the command palette.",

      "sections.connect.form.title": "Message me",
      "sections.connect.form.desc": "This form works on static hosting via a form provider.",
      "sections.connect.form.tip": "Replace XXXXXXXX with your Formspree form id (instructions in README).",
      "form.name": "Name",
      "form.email": "Email",
      "form.msg": "Message",
      "form.send": "Send",

      "palette.title": "Command palette",
      "palette.hint": "Enter — run • Esc — close",
      "palette.search": "Type to search…",
      "palette.work": "Open: Work",
      "palette.play": "Open: Play",
      "palette.info": "Open: Info",
      "palette.connect": "Open: Connect",
      "palette.pay": "Open: Payment",
      "palette.theme": "Toggle theme",
      "palette.fx": "FX effects",
      "palette.copy": "Copy message template"
    }
  };

  function getStored(key, fallback) {
    try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
  }
  function setStored(key, val) {
    try { localStorage.setItem(key, val); } catch {}
  }

  const state = {
    lang: getStored("lang", document.body.dataset.lang || "ru"),
    theme: getStored("theme", document.body.dataset.theme || "dark"),
    fx: getStored("fx", "on"),
    accentH: Number(getStored("accentH", "176")),
    rm: getStored("rm", "off"),
    snd: getStored("snd", "on"),
    active: "work",
    overlayOpen: false,
    draggingCube: false,
  };

  // Apply theme/lang/fx
  function applyTheme() {
    document.body.dataset.theme = state.theme;
    const icon = $("#themeBtn .iconbtn__icon");
    if (icon) icon.textContent = state.theme === "dark" ? "☾" : "☀";
  }

  function applyFX() {
    document.body.classList.toggle("fx-off", state.fx !== "on");
    const fxIcon = $("#fxBtn .iconbtn__icon");
    if (fxIcon) fxIcon.textContent = state.fx === "on" ? "FX" : "FX×";
  }

  function applyAccent() {
    const h = Number.isFinite(state.accentH) ? state.accentH : 176;
    document.documentElement.style.setProperty("--accent-h", String(h));
    // Secondary hue for gradients (keeps the "mystaticself" vibe while still being dynamic)
    const h2 = (h + 45) % 360;
    document.documentElement.style.setProperty("--accent2-h", String(h2));
    $$('[data-accent-range]').forEach(r => {
      try { r.value = String(h); } catch {}
    });
  }

  function applyReducedMotion() {
    document.body.classList.toggle("rm", state.rm === "on");
  }

  function applySound() {
    document.body.classList.toggle('snd-off', state.snd !== 'on');
  }

  // Tiny WebAudio SFX (no external files)
  let audioCtx = null;
  let audioUnlocked = false;
  const ensureAudio = () => {
    if (audioCtx) return audioCtx;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      return audioCtx;
    } catch {
      return null;
    }
  };
  const unlockAudioOnce = () => {
    if (audioUnlocked) return;
    audioUnlocked = true;
    const ctx = ensureAudio();
    if (!ctx) return;
    // resume is required on some browsers
    ctx.resume?.().catch?.(()=>{});
  };
  document.addEventListener('pointerdown', unlockAudioOnce, { once:true, capture:true });
  document.addEventListener('keydown', unlockAudioOnce, { once:true, capture:true });

  const playTone = (type) => {
    if (state.snd !== 'on') return;
    const ctx = ensureAudio();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume?.().catch?.(()=>{});

    const t0 = ctx.currentTime;
    const out = ctx.createGain();
    out.gain.setValueAtTime(0.0001, t0);
    out.connect(ctx.destination);

    const osc = ctx.createOscillator();
    const filt = ctx.createBiquadFilter();
    filt.type = 'lowpass';
    filt.frequency.setValueAtTime(1200, t0);
    osc.connect(filt);
    filt.connect(out);

    if (type === 'hover') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, t0);
      osc.frequency.exponentialRampToValueAtTime(780, t0 + 0.04);
      out.gain.exponentialRampToValueAtTime(0.06, t0 + 0.01);
      out.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.08);
      filt.frequency.exponentialRampToValueAtTime(900, t0 + 0.08);
      osc.start(t0);
      osc.stop(t0 + 0.085);
      return;
    }

    if (type === 'toggle') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, t0);
      osc.frequency.exponentialRampToValueAtTime(520, t0 + 0.09);
      out.gain.exponentialRampToValueAtTime(0.09, t0 + 0.015);
      out.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.13);
      filt.frequency.setValueAtTime(1400, t0);
      filt.frequency.exponentialRampToValueAtTime(700, t0 + 0.13);
      osc.start(t0);
      osc.stop(t0 + 0.14);
      return;
    }

    // click default
    osc.type = 'square';
    osc.frequency.setValueAtTime(420, t0);
    out.gain.exponentialRampToValueAtTime(0.07, t0 + 0.008);
    out.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.06);
    filt.frequency.setValueAtTime(1600, t0);
    filt.frequency.exponentialRampToValueAtTime(900, t0 + 0.06);
    osc.start(t0);
    osc.stop(t0 + 0.065);
  };

  function t(key) {
    return (i18n[state.lang] && i18n[state.lang][key]) || (i18n.en[key] ?? key);
  }

  function applyI18n() {
    document.documentElement.lang = state.lang;
    document.body.dataset.lang = state.lang;

    // meta (title/description)
    document.title = t("meta.title");
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", t("meta.desc"));

    $$("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });

    // update language buttons
    $$("[data-set-lang]").forEach(btn => {
      const lang = btn.getAttribute("data-set-lang");
      btn.setAttribute("aria-pressed", String(lang === state.lang));
    });

    const palSearch = $("#paletteSearch");
    if (palSearch) palSearch.placeholder = t("palette.search");
  }

  function pulseGlitch() {
    if (state.fx !== "on") return;
    const scene = $("#scene");
    if (!scene) return;
    scene.classList.add("glitching");
    window.setTimeout(() => scene.classList.remove("glitching"), 260);
  }

  function setActive(section, {glitch=true} = {}) {
    if (!sections.includes(section)) return;
    state.active = section;

    // highlight in cube
    $$("#cube .cubeface").forEach(face => {
      const is = face.dataset.section === section;
      face.setAttribute("aria-selected", String(is));
    });

    // highlight in top nav
    $$("[data-route]").forEach(a => a.classList.toggle("is-active", a.dataset.route === section));

    // update HUD
    const hud = $("#hudRoute");
    if (hud) hud.textContent = `#/${section}`;

    // highlight crumbs in overlay
    $$(".crumb").forEach(c => c.classList.toggle("is-active", c.dataset.ovGo === section));

    if (glitch) pulseGlitch();
  }

  // Overlay viewer
  const overlay = $("#overlay");
  const ovTitle = $("#ovTitle");
  const ovBody = $("#ovBody");

  // Overlay paging state (prevents overlaps on rapid navigation)
  state.overlaySection = state.overlaySection || null;
  let ovPending = null;
  let ovSwipeToken = 0;

  function setHash(route) {
    // route should be like "#/work" or "" to clear
    if (!route) {
      history.pushState("", document.title, window.location.pathname + window.location.search);
      onRoute();
      return;
    }
    if (window.location.hash !== route) window.location.hash = route;
  }

  
  // Prevent layout shift when overlay opens/closes.
  // IMPORTANT: must NOT recurse (a previous bug caused stack overflow and broke the whole app).
  function setBodyScrollLock(lock) {
    const sbw = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
    if (lock) {
      document.body.classList.add("no-scroll");
      document.body.style.setProperty("--sbw", sbw + "px");
    } else {
      document.body.classList.remove("no-scroll");
      document.body.style.removeProperty("--sbw");
    }
  }

function openOverlay(section) {
    if (!overlay) return;
    if (!sections.includes(section)) return;

    // If mobile drawer is open, close it when navigating.
    if (typeof state.closeMobileMenu === 'function') state.closeMobileMenu();

    const prevShown = state.overlaySection || state.active;

    // If a swipe is in progress, queue the latest request and bail out.
    if (state.overlayOpen && overlay.classList.contains("is-swiping")) {
      ovPending = section;
      // Still update title + active highlight immediately for responsiveness
      setActive(section, {glitch:false});
      const titleKey = `sections.${section}.title`;
      if (ovTitle) ovTitle.textContent = t(titleKey);
      return;
    }

    setActive(section, {glitch:true});

    // fill content by cloning readable section
    const block = document.getElementById(section);
    if (!block) return;

    const alreadyOpen = state.overlayOpen;
    if (!alreadyOpen) {
      overlay.classList.add("is-open", "is-glitch");
      overlay.setAttribute("aria-hidden", "false");
      state.overlayOpen = true;
      setBodyScrollLock(true);
    }

    // Title
    const titleKey = `sections.${section}.title`;
    if (ovTitle) ovTitle.textContent = t(titleKey);

    const makePage = () => {
      const clone = block.cloneNode(true);
      clone.removeAttribute("id");
      clone.classList.add("block--overlay");

      // IDs are stripped inside overlay to avoid collisions.
      clone.querySelectorAll("[id]").forEach(el => el.removeAttribute("id"));

      // IMPORTANT: widgets may have been initialized on the main page already.
      // cloneNode(true) copies attributes, including flags like data-mini-bound="1",
      // which would block initialization inside the overlay.
      clone.querySelectorAll('[data-mini-bound]').forEach(el => el.removeAttribute('data-mini-bound'));

      // If HTML is malformed (missing closing tags), a section can accidentally
      // capture following sections as children. Hard-guard: keep ONLY the current block.
      clone.querySelectorAll("[data-section-block]").forEach(el => {
        if (el.getAttribute("data-section-block") !== section) el.remove();
      });

      const page = document.createElement("div");
      page.className = "ovpage";
      page.appendChild(clone);
      return page;
    };

    if (ovBody) {
      // Keep overlay logic extremely stable: always render exactly ONE page.
      // This eliminates "merged sections" and any leftover content issues.
      ovBody.innerHTML = "";
      ovBody.appendChild(makePage());
      state.overlaySection = section;
    }

    applyI18n();
    // Toolbox controls are cloned into overlay pages; wire them up every time.
    bindToolbox(overlay);
    // Mini demo exists both in main DOM and in overlay clones.
    // Run on next frame to ensure the canvas has a real size inside animated overlay.
    requestAnimationFrame(() => startMini(overlay));

    if (state.fx === "on") {
      window.setTimeout(() => overlay.classList.remove("is-glitch"), 460);
    } else {
      overlay.classList.remove("is-glitch");
    }

    const closeBtn = $("#ovClose");
    if (closeBtn) closeBtn.focus({preventScroll:true});
  }

  function closeOverlay() {
    if (!overlay) return;
    overlay.classList.remove("is-open", "is-glitch");
    overlay.setAttribute("aria-hidden", "true");
    state.overlayOpen = false;
    setBodyScrollLock(false);
    if (typeof state.closeMobileMenu === 'function') state.closeMobileMenu();
  }

  function nextSection(dir) {
    const idx = sections.indexOf(state.active);
    const next = (idx + dir + sections.length) % sections.length;
    return sections[next];
  }

  function onRoute() {
    const h = window.location.hash || "";
    const m = h.match(/^#\/(work|play|info|connect)$/);
    if (m) {
      openOverlay(m[1]);
      return;
    }
    // If overlay open but route cleared
    closeOverlay();
  }

  // Wire up UI events
  function bindToolbox(root=document) {
    // Accent slider
    $$('[data-accent-range]', root).forEach((el) => {
      // keep in sync
      try { el.value = String(Number.isFinite(state.accentH) ? state.accentH : 176); } catch {}
      el.addEventListener('input', (e) => {
        const v = Number(e.target.value);
        if (!Number.isFinite(v)) return;
        state.accentH = v;
        setStored('accentH', String(state.accentH));
        applyAccent();
      }, { passive:true });
    });

    // Reduced motion
    $$('[data-motion-toggle]', root).forEach((btn) => {
      btn.addEventListener('click', () => {
        state.rm = state.rm === 'on' ? 'off' : 'on';
        setStored('rm', state.rm);
        applyReducedMotion();
        playTone('toggle');
      });
    });

    // Sound
    $$('[data-sound-toggle]', root).forEach((btn) => {
      btn.addEventListener('click', () => {
        state.snd = state.snd === 'on' ? 'off' : 'on';
        setStored('snd', state.snd);
        applySound();
        playTone('toggle');
      });
    });
  }

  function bind() {
    // nav links (prevent default scroll; use overlay route)
    $$("a[data-route]").forEach(a => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        setHash(`#/${a.dataset.route}`);
      });
    });

    // Mobile hamburger menu
    const menuBtn = $("#menuBtn");
    const mobileMenu = $("#mobileMenu");
    const closeMobileMenu = () => {
      if (!menuBtn || !mobileMenu) return;
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      menuBtn.setAttribute('aria-expanded', 'false');
    };
    const toggleMobileMenu = () => {
      if (!menuBtn || !mobileMenu) return;
      const open = !mobileMenu.classList.contains('is-open');
      mobileMenu.classList.toggle('is-open', open);
      mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) playTone('toggle');
    };
    menuBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMobileMenu();
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!menuBtn || !mobileMenu) return;
      if (!mobileMenu.classList.contains('is-open')) return;
      const t = e.target;
      if (!(t instanceof Node)) return;
      if (menuBtn.contains(t) || mobileMenu.contains(t)) return;
      closeMobileMenu();
    }, { capture:true });
    // Close on Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    });
    // Close when route changes (we open overlay)
    window.addEventListener('hashchange', closeMobileMenu);
    // Expose for overlay open/close
    state.closeMobileMenu = closeMobileMenu;

    // language toggle
    $$("[data-set-lang]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.lang = btn.dataset.setLang;
        setStored("lang", state.lang);
        applyI18n();
      });
    });

    // theme toggle
    $("#themeBtn")?.addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      setStored("theme", state.theme);
      applyTheme();
    });

    // FX toggle
    $("#fxBtn")?.addEventListener("click", () => {
      state.fx = state.fx === "on" ? "off" : "on";
      setStored("fx", state.fx);
      applyFX();
      playTone('toggle');
    });

    // Toolbox (main page + later overlay clones)
    bindToolbox(document);

    // cube faces hover/click
    let suppressClickUntil = 0;
    $$("#cube .cubeface").forEach(face => {
      face.addEventListener("mouseenter", () => setActive(face.dataset.section, {glitch:false}));
      face.addEventListener("focus", () => setActive(face.dataset.section, {glitch:false}));
      face.addEventListener("click", (e) => {
        if (Date.now() < suppressClickUntil) { e.preventDefault(); return; }
        setHash(`#/${face.dataset.section}`);
      });
    });

    // drag to rotate cube (360°)
    const cube = $("#cube");
    if (cube) {
      const sceneHost = cube.closest(".scene");
      // Base rotations for the 4 interactive faces.
      // We keep `ry` continuous (can be any number), and whenever we need to
      // "go" to a face we choose the closest equivalent angle.
      const angleBySection = {
        work: 0,
        play: -90,
        info: -180,
        connect: -270,
      };

      const closestEquivalent = (current, targetBase) => {
        // Choose targetBase + 360*k that is closest to current.
        const k = Math.round((current - targetBase) / 360);
        return targetBase + 360 * k;
      };

      let ry = angleBySection[state.active] ?? 0;
      let rx = 14;

      const applyRot = (animate=true) => {
        cube.classList.toggle("is-dragging", !animate);
        // Put rotation vars on the shared host too, so siblings (wireframe cube) stay perfectly aligned.
        [cube, sceneHost].forEach(el => {
          if (!el) return;
          el.style.setProperty("--cube-ry", `${ry}deg`);
          el.style.setProperty("--cube-rx", `${rx}deg`);
        });
      };
      applyRot(true);

      // keep cube aligned when active section changes (unless dragging)
      const _setActive = setActive;
      setActive = function(section, opts){
        _setActive(section, opts);
        if (!state.draggingCube) {
          const base = angleBySection[section];
          if (typeof base === "number") ry = closestEquivalent(ry, base);
          applyRot(true);
        }
      };

      let down = null;
      cube.addEventListener("pointerdown", (e) => {
        state.draggingCube = true;
        cube.setPointerCapture(e.pointerId);
        down = { x: e.clientX, y: e.clientY, ry, rx, t: Date.now(), moved: false };
        applyRot(false);
      });
      cube.addEventListener("pointermove", (e) => {
        if (!down) return;
        const dx = e.clientX - down.x;
        const dy = e.clientY - down.y;
        if (Math.abs(dx) + Math.abs(dy) > 6) down.moved = true;
        ry = down.ry + dx * 0.45;
        rx = Math.max(-8, Math.min(22, down.rx - dy * 0.10));
        applyRot(false);
      });
      const end = () => {
        if (!down) return;
        const moved = down.moved;
        down = null;
        // Do NOT snap the cube rotation: keep it freely rotatable (full 360+).
        // But still update the active face to the nearest section.
        const idx = ((Math.round((-ry) / 90) % 4) + 4) % 4;
        const sec = sections[idx];
        rx = 14;
        applyRot(true);
        _setActive(sec, {glitch:true});
        state.draggingCube = false;
        if (moved) suppressClickUntil = Date.now() + 240;
      };
      cube.addEventListener("pointerup", end);
      cube.addEventListener("pointercancel", end);
      cube.addEventListener("lostpointercapture", end);
    }

    // Overlay controls
    $("#ovClose")?.addEventListener("click", () => setHash(""));
    $("#ovBack")?.addEventListener("click", () => setHash(""));
    overlay?.addEventListener("click", (e) => {
      // click outside panel closes
      if (e.target === overlay) setHash("");
    });
    $("#ovPrev")?.addEventListener("click", () => setHash(`#/${nextSection(-1)}`));
    $("#ovNext")?.addEventListener("click", () => setHash(`#/${nextSection(1)}`));
    $$(".crumb").forEach(c => c.addEventListener("click", () => setHash(`#/${c.dataset.ovGo}`)));

    // keyboard navigation
    window.addEventListener("keydown", (e) => {
      const key = e.key;

      // ignore if typing in input/textarea
      const tag = (document.activeElement?.tagName || "").toLowerCase();
      if (["input","textarea"].includes(tag)) return;

      if (key === "Escape") {
        if (state.overlayOpen) {
          e.preventDefault();
          setHash("");
        }
        return;
      }

      if (!state.overlayOpen) {
        if (key === "ArrowLeft" || key === "ArrowRight") {
          e.preventDefault();
          const dir = key === "ArrowRight" ? 1 : -1;
          setActive(nextSection(dir), {glitch:true});
        }
        if (key === "Enter") {
          e.preventDefault();
          setHash(`#/${state.active}`);
        }
      } else {
        if (key === "ArrowLeft" || key === "ArrowRight") {
          e.preventDefault();
          const dir = key === "ArrowRight" ? 1 : -1;
          setHash(`#/${nextSection(dir)}`);
        }
      }
    });

    // mouse wheel selects (only when overlay closed)
    // Keep normal page scrolling: only react when user is near the top or hovering the scene.
    let wheelTimer = null;
    window.addEventListener("wheel", (e) => {
      if (state.overlayOpen) return;
      if (Math.abs(e.deltaY) < 2) return;
      const overScene = !!e.target?.closest?.("#scene");
      if (!overScene && window.scrollY > 180) return;
      if (wheelTimer) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      setActive(nextSection(dir), {glitch:true});
      wheelTimer = window.setTimeout(() => wheelTimer = null, 240);
    }, {passive:true});

    // textarea autogrow (no manual resize)
    const ta = $("#cfMsg");
    const autoGrow = () => {
      if (!ta) return;
      ta.style.height = "auto";
      const min = 120;
      const max = 200; // "не намного"
      const next = Math.max(min, Math.min(max, ta.scrollHeight));
      ta.style.height = `${next}px`;
    };
    ta?.addEventListener("input", autoGrow);
    // run once to normalize height
    autoGrow();

    // Project preview modal
    const preview = $("#preview");
    const previewFrame = $("#previewFrame");
    const previewOpen = $("#previewOpen");
    const previewTitle = $("#previewTitle");
    const closePreview = () => {
      if (!preview) return;
      preview.classList.remove("is-open");
      preview.setAttribute("aria-hidden", "true");
      if (previewFrame) previewFrame.src = "about:blank";
    };
    $("#previewClose")?.addEventListener("click", closePreview);
    preview?.addEventListener("click", (e) => { if (e.target === preview) closePreview(); });
    // Use event delegation so it works for both main DOM and overlay clones.
    document.addEventListener('click', (e) => {
      const t = e.target;
      if (!t || !(t instanceof Element)) return;
      const btn = t.closest('[data-preview], [data-preview-url], [data-previewUrl]');
      if (!btn) return;
      e.preventDefault();
      const url = btn.getAttribute('data-preview')
        || btn.getAttribute('data-preview-url')
        || btn.getAttribute('data-previewUrl');
      if (!url || !preview || !previewFrame) return;
      preview.classList.add('is-open');
      preview.setAttribute('aria-hidden', 'false');
      previewFrame.src = url;
      if (previewOpen) previewOpen.href = url;
      if (previewTitle) previewTitle.textContent = 'Preview';
    }, { capture:true });

    // Contact form handler (works with Formspree)
    const form = $("#contactForm");
    const formStatus = $("#formStatus");
    form?.addEventListener("submit", async (e) => {
      // If user didn't configure the form provider yet
      const action = form.getAttribute('action') || '';
      if (action.includes('XXXXXXXX')) {
        e.preventDefault();
        if (formStatus) formStatus.textContent = state.lang === 'ru'
          ? 'Сначала настрой Formspree (замени XXXXXXXX в action).'
          : 'Configure Formspree first (replace XXXXXXXX in action).';
        return;
      }

      // AJAX submit for nicer UX
      e.preventDefault();
      if (formStatus) formStatus.textContent = state.lang === 'ru' ? 'Отправка…' : 'Sending…';
      try {
        const fd = new FormData(form);
        const res = await fetch(action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: fd,
        });
        if (res.ok) {
          form.reset();
          if (formStatus) formStatus.textContent = state.lang === 'ru' ? 'Отправлено ✅' : 'Sent ✅';
        } else {
          if (formStatus) formStatus.textContent = state.lang === 'ru' ? 'Ошибка отправки. Попробуй позже.' : 'Send failed. Try again later.';
        }
      } catch {
        if (formStatus) formStatus.textContent = state.lang === 'ru' ? 'Сеть недоступна. Попробуй позже.' : 'Network error. Try again later.';
      }
      window.setTimeout(() => { if (formStatus) formStatus.textContent = ''; }, 2600);
    });

    // Command palette
    const palette = $("#palette");
    const palList = $("#paletteList");
    const palSearch = $("#paletteSearch");
    const closePalette = () => {
      if (!palette) return;
      palette.classList.remove('is-open');
      palette.setAttribute('aria-hidden', 'true');
    };
    const openPalette = () => {
      if (!palette) return;
      palette.classList.add('is-open');
      palette.setAttribute('aria-hidden', 'false');
      palSearch?.focus();
      palSearch && (palSearch.value = '');
      renderPalette('');
    };
    $("#paletteClose")?.addEventListener('click', closePalette);
    palette?.addEventListener('click', (e) => { if (e.target === palette) closePalette(); });

    const paletteItems = [
      { key: 'palette.work', k: '1', run: () => setHash('#/work') },
      { key: 'palette.play', k: '2', run: () => setHash('#/play') },
      { key: 'palette.info', k: '3', run: () => setHash('#/info') },
      { key: 'palette.connect', k: '4', run: () => setHash('#/connect') },
      { key: 'palette.theme', k: 'T', run: () => $("#themeBtn")?.click() },
      { key: 'palette.fx', k: 'F', run: () => $("#fxBtn")?.click() },
    ];

    const renderPalette = (q) => {
      if (!palList) return;
      const query = (q || '').trim().toLowerCase();
      const items = paletteItems.filter(it => t(it.key).toLowerCase().includes(query));
      palList.innerHTML = '';
      items.forEach((it, idx) => {
        const row = document.createElement('button');
        row.type = 'button';
        row.className = 'paletteitem';
        row.innerHTML = `<span>${t(it.key)}</span><span class="paletteitem__k">${it.k}</span>`;
        row.addEventListener('click', () => { closePalette(); it.run(); });
        row.dataset.idx = String(idx);
        palList.appendChild(row);
      });
    };

    palSearch?.addEventListener('input', () => renderPalette(palSearch.value));
    palSearch?.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { e.preventDefault(); closePalette(); return; }
      if (e.key === 'Enter') {
        e.preventDefault();
        const first = palList?.querySelector('.paletteitem');
        first?.click();
      }
    });

    window.addEventListener('keydown', (e) => {
      const isK = (e.key.toLowerCase() === 'k');
      if ((e.ctrlKey || e.metaKey) && isK) {
        e.preventDefault();
        if (palette?.classList.contains('is-open')) closePalette(); else openPalette();
      }

      if (palette?.classList.contains('is-open') && e.key === 'Escape') {
        e.preventDefault();
        closePalette();
      }
    });

    window.addEventListener("hashchange", onRoute);

    // Global SFX: hover/click on interactive elements
    let hoverLock = 0;
    document.addEventListener('mouseover', (e) => {
      if (Date.now() < hoverLock) return;
      const t = e.target;
      if (!t || !(t instanceof Element)) return;
      const hit = t.closest('button, a, .cubeface, .paletteitem');
      if (!hit) return;
      // avoid repeats when moving inside the same element
      if (hit.contains(e.relatedTarget)) return;
      if (hit.matches('button, a, .cubeface, .paletteitem')) {
        playTone('hover');
        hoverLock = Date.now() + 50;
      }
    }, { passive:true });

    document.addEventListener('click', (e) => {
      const t = e.target;
      if (!t || !(t instanceof Element)) return;
      const hit = t.closest('button, a, .cubeface, .paletteitem');
      if (!hit) return;
      playTone('click');
    }, { capture:true });
  }

  // Mini demo
  // Supports BOTH variants:
  // 1) Canvas demo (older version) — a small square follows pointer.
  // 2) DOM demo (.mini with .mini__dot) — dot follows pointer.
  // Works in overlay clones (IDs may be stripped), so we always scope by `root`.
  function startMini(root = document) {
    // --- Canvas variant ---
    const canvases = [];
    const byId = $("#mini", root);
    if (byId && byId.tagName === "CANVAS") canvases.push(byId);
    $$("canvas[data-mini]", root).forEach(c => canvases.push(c));

    canvases.forEach((canvas) => {
      if (!(canvas instanceof HTMLCanvasElement)) return;
      if (canvas.dataset.miniBound === "1") return;
      canvas.dataset.miniBound = "1";

      // Important: allow pointer tracking inside scrollable overlay (especially on touch).
      canvas.style.touchAction = "none";

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let x = 50, y = 90, vx = 0, vy = 0;
      let hasPointer = false;
      let tx = x, ty = y;
      const speed = 3.0;

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        // If canvas isn't laid out yet (first frames of overlay animation), retry later.
        if (!rect.width || !rect.height) return;
        const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      // Initial sizing: do it on the next frames to survive overlay transitions.
      requestAnimationFrame(() => { resize(); requestAnimationFrame(resize); });
      window.addEventListener("resize", resize, { passive:true });
      // Observe size changes (important when canvas lives in overlay content).
      if ('ResizeObserver' in window) {
        const ro = new ResizeObserver(() => resize());
        ro.observe(canvas);
      }

      const setTargetFromEvent = (e) => {
        const r = canvas.getBoundingClientRect();
        tx = (e.clientX - r.left);
        ty = (e.clientY - r.top);
        hasPointer = true;
      };

      // Overlay / panel mode: some browsers route pointer events to the parent tile
      // (because the panel is scrollable and animated). Bind to both canvas and wrapper
      // so the demo always reacts in the overlay.
      const wrapper = canvas.closest('.tile') || canvas.parentElement || canvas;
      wrapper.style.touchAction = 'none';
      canvas.style.pointerEvents = 'auto';

      const onMove = (e) => setTargetFromEvent(e);
      const onDown = (e) => {
        // Capture on whichever element receives the event.
        if (e.currentTarget && e.currentTarget.setPointerCapture) {
          e.currentTarget.setPointerCapture(e.pointerId);
        }
        setTargetFromEvent(e);
      };
      const onEnter = () => { hasPointer = true; };
      const onLeave = () => { hasPointer = false; };

      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerdown', onDown);
      canvas.addEventListener('pointerenter', onEnter);
      canvas.addEventListener('pointerleave', onLeave);
      canvas.addEventListener('lostpointercapture', onLeave);

      if (wrapper !== canvas) {
        wrapper.addEventListener('pointermove', onMove);
        wrapper.addEventListener('pointerdown', onDown);
        wrapper.addEventListener('pointerenter', onEnter);
        wrapper.addEventListener('pointerleave', onLeave);
      }

      const applyColors = () => {
        const isDark = document.body.dataset.theme === "dark";
        ctx.strokeStyle = isDark ? "rgba(255,255,255,.18)" : "rgba(0,0,0,.18)";
        ctx.fillStyle = isDark ? "rgba(73,197,182,.9)" : "rgba(11,13,18,.85)";
        ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";
      };
      applyColors();
      const mo = new MutationObserver(applyColors);
      mo.observe(document.body, {attributes:true, attributeFilter:["data-theme"]});

      const step = () => {
        if (hasPointer) {
          const dx = tx - x;
          const dy = ty - y;
          const dist = Math.hypot(dx, dy);
          if (dist > 1) {
            vx = (dx / dist) * speed;
            vy = (dy / dist) * speed;
          } else {
            vx *= 0.8;
            vy *= 0.8;
          }
        } else {
          vx *= 0.88;
          vy *= 0.88;
        }

        x += vx; y += vy;

        const w = canvas.getBoundingClientRect().width;
        const h = canvas.getBoundingClientRect().height;
        x = Math.max(18, Math.min(w - 18, x));
        y = Math.max(18, Math.min(h - 18, y));

        ctx.clearRect(0,0,w,h);
        ctx.globalAlpha = 0.18;
        for (let i=0;i<w;i+=22){ ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,h); ctx.stroke(); }
        for (let j=0;j<h;j+=22){ ctx.beginPath(); ctx.moveTo(0,j); ctx.lineTo(w,j); ctx.stroke(); }
        ctx.globalAlpha = 1;

        ctx.save();
        ctx.translate(x,y);
        ctx.rotate(Date.now()/900);
        ctx.fillRect(-10,-10,20,20);
        ctx.restore();

        ctx.globalAlpha = 0.85;
        ctx.fillText(state.lang === "ru" ? "Двигай мышью" : "Move your mouse", 12, 20);
        ctx.globalAlpha = 1;

        requestAnimationFrame(step);
      };
      step();
    });

    // --- DOM variant ---
    $$(".mini", root).forEach((mini) => {
      if (!(mini instanceof HTMLElement)) return;
      if (mini.dataset.miniBound === "1") return;
      mini.dataset.miniBound = "1";

      const pad = mini.querySelector(".mini__pad");
      const dot = mini.querySelector(".mini__dot");
      const val = mini.querySelector(".mini__val");
      if (!pad || !dot) return;
      pad.style.touchAction = "none";

      let tx = 0.5, ty = 0.5;
      let x = 0.5, y = 0.5;
      let active = false;

      const setTarget = (e) => {
        const r = pad.getBoundingClientRect();
        const px = (e.clientX - r.left) / Math.max(1, r.width);
        const py = (e.clientY - r.top) / Math.max(1, r.height);
        tx = Math.max(0, Math.min(1, px));
        ty = Math.max(0, Math.min(1, py));
        active = true;
      };

      pad.addEventListener("pointermove", setTarget);
      pad.addEventListener("pointerdown", (e) => { pad.setPointerCapture?.(e.pointerId); setTarget(e); });
      pad.addEventListener("pointerenter", () => { active = true; });
      pad.addEventListener("pointerleave", () => { active = false; });

      const tick = () => {
        const k = active ? 0.14 : 0.08;
        x += (tx - x) * k;
        y += (ty - y) * k;
        dot.style.transform = `translate(${(x * 100).toFixed(2)}%, ${(y * 100).toFixed(2)}%)`;
        if (val) val.textContent = `${Math.round(x * 100)}, ${Math.round(y * 100)}`;
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  // Init
  function init() {
    // Always honor the current document language as the initial language.
    // This prevents "stuck" language when opening from previews or after bad stored values.
    const forced = document.body.dataset.lang;
    if (forced) state.lang = forced;

    // If theme wasn't chosen before, follow system preference.
    if (!getStored("theme", null)) {
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      state.theme = prefersDark ? "dark" : "light";
    }

    // If user prefers reduced motion, default FX to off unless explicitly enabled before.
    if (!getStored("fx", null)) {
      const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      state.fx = reduce ? "off" : "on";
    }

    applyTheme();
    applyFX();
    applyAccent();
    applyReducedMotion();
    applySound();
    applyI18n();
    bind();
    startMini();

    // Subtle scroll reveals (keeps site feeling "alive")
    setupReveal();

    // set year
    const y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());

    // initial active
    setActive(state.active, {glitch:false});
    // initial route
    onRoute();
  }

  function setupReveal(){
    const els = Array.from(document.querySelectorAll(".tile, .block__head, .footer"));
    els.forEach(el => el.classList.add("reveal"));

    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "60px 0px" });

    els.forEach(el => io.observe(el));
  }

  init();
})();
