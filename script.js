async function loadCMS() {
      try {
        const r = await fetch("/cms/content.json", { cache: "no-store" });
        if (!r.ok) return null;
        return await r.json();
      } catch (e) { return null; }
    }
    function getByPath(obj, path) { return path.split(".").reduce((a, k) => a?.[k], obj); }

    function clearStatus(){
      const el = document.getElementById("formStatus");
      if(!el) return;
      el.textContent = "";
      el.classList.remove("isSuccess","isError");
    }

    function showStatus(type, message){
      const el = document.getElementById("formStatus");
      if(!el) return;

      el.textContent = message;
      el.classList.remove("isSuccess","isError");
      el.classList.add(type === "success" ? "isSuccess" : "isError");
    }

    function apply(lang, dict) {
      document.documentElement.lang = lang;
      window.CURRENT_LANG = lang;

      document.querySelectorAll("[data-i18n]").forEach(el => {
        const v = getByPath(dict, el.getAttribute("data-i18n"));
        if (typeof v !== "string") return;

        if (el.classList.contains("faqAnswer") || el.classList.contains("lead")) {
          el.innerHTML = v;
        } else {
          el.textContent = v;
        }
      });

      localStorage.setItem("inv_lang", lang);

      // update globe code
      const codeEl = document.getElementById("langCode");
      if (codeEl) codeEl.textContent = lang.toUpperCase();

      // sync mobile select
      const mobileSel = document.getElementById("langSelectMobile");
      if (mobileSel) mobileSel.value = lang;
      clearStatus();
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("on");
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));

    const CONTENT = {
      en: {
        tagline: "InvoHub landing page",
        kicker: "UAE • e-Invoicing readiness",
        nav: { what: "What We Do", benefits: "Benefits", how: "How it works", integrations: "Integrations", pricing: "Pricing", faq: "FAQ", ctaFull: "Get started →", ctaShort:"Start →" },
        hero: {
          titleMain: "UAE e-Invoicing.",
          titleSub: "Structured Before It Becomes Mandatory.",
          lead: "If your company issues VAT invoices in the UAE, structured e-Invoicing will change how invoices are created, validated, and transmitted.<br><br>This is not a format update. It is a compliance architecture shift.<p class=\"leadP\">UAE e-Invoicing requires:</p><div class=\"leadBox\"><ul class=\"leadCards\"><li><b>Structured,</b> machine-readable data</li><li><b>Mandatory</b> field validation</li><li><b>Accredited</b> ASP provider transmission</li><li><b>Continuous</b> transaction control logic</li></ul></div><p>Most ERP systems are not ready by default.<br>InvoHub prepares your business — without replacing your ERP and without disrupting operations.</p>",
          cta1: "Download the UAE e-Invoicing Readiness Checklist →",
          cta2: "Book a 20-minute Readiness Call",
          meta: "ERP-neutral",
          meta2: "Structured • Confidential"
        },
        trust: { title: "Trusted by finance teams who prefer control over reaction" },
        what: {
          kicker: "What We Do",
          title: "What We Do",
          note: "We work in partnership with registered ASP providers within the UAE e-Invoicing ecosystem.\n\nYou keep your accounting system.\nYou gain structured compliance.",
          li2: "Validate mandatory VAT data fields",
          d2: "Ensure completeness, consistency, and readiness for structured formats.",
          li4: "Align your system with accredited ASP requirements",
          d4: "Map your ERP output to the ASP handoff format without operational disruption.",
          li5: "Provide controlled implementation roadmap",
          d5: "Phased plan with ownership and controls — without disrupting operations."
        },
        benefits: {
          kicker: "Benefits That Truly Matter",
          title: "Benefits That Truly Matter",
          note: "Preparation reduces operational risk — and keeps finance + IT aligned.",
          b1t: "Control", b1: "Avoid last-minute changes by defining scope, data, and responsibilities early.",
          b2t: "Continuity", b2: "Keep your accounting system — no ERP replacement required.",
          b3t: "Compliance", b3: "Structured data readiness: mandatory fields + ASP transmission alignment."
        },
        how: {
          kicker: "How it works",
          title: "Get clear answers in 3 simple steps",
          note: "From scope → data → roadmap. Clear. Structured. Confidential.",
          s1t: "Assess", s1: "Assess your exposure and document scope.",
          s2t: "Validate", s2: "Validate mandatory VAT data fields for structured readiness.",
          s3t: "Align", s3: "Align with accredited ASP requirements and create a controlled roadmap."
        },
        int: {
          kicker: "Integrations",
          title: "Seamless Integrations",
          note: "Designed to integrate with your ERP stack, ASP providers, and a CMS.",
          i1t: "ERP systems", i1: "ERP-neutral approach. Keep your system and map outputs.",
          i2t: "Accredited ASP", i2: "Handoff format alignment for transmission workflows.",
          i3t: "CMS ready", i3: "Override all copy via /cms/content.json (Strapi, Contentful, Sanity, WP).",
          i4t: "CRM / forms", i4: "Connect the form to any endpoint (HubSpot / Zoho / custom)."
        },
        price: {
          kicker: "Pricing",
          title: "Pricing",
          note: "Replace with your real pricing when ready.",
          b1: "Start", p1t: "Readiness Call", p1d: "A 20-minute call to frame scope, timeline, and next steps.",
          p1l1: "Scope questions", p1l2: "High-level readiness guidance", p1l3: "Next-step plan",
          b2: "Popular", p2t: "Readiness Assessment", p2d: "Structured review of mandatory fields and document scope.",
          p2l1: "Mandatory field checklist", p2l2: "Document scope mapping", p2l3: "Risk + gap summary",
          b3: "Scale", p3t: "Implementation Roadmap", p3d: "Controlled plan aligned with accredited ASP requirements.",
          p3l1: "ERP → ASP flow mapping", p3l2: "Roles & controls", p3l3: "Phased rollout plan"
        },
        faq: {
          kicker: "FAQ",
          title: "FAQ",
          note: "Short answers to the most common readiness questions.",
          q1: "Is UAE e-Invoicing just a PDF upgrade?",
          a1: "No.<br>A PDF is a visual document for humans.<br>UAE e-Invoicing requires structured, machine-readable tax data.<br>Invoices must follow defined data structures, mandatory VAT fields, and validation rules before transmission through accredited ASP providers.<br>This is a compliance architecture shift — not a formatting change.",
          q2: "Do we need to replace our ERP system?",
          a2: "In most cases, no.<br>The issue is not the ERP itself — it is how invoice data is structured and validated inside it.<br>We assess your current setup, identify structural gaps, and prepare your system for integration with accredited providers — without disrupting operations.",
          q3: "Are you an accredited ASP provider?",
          a3: "No.<br>We do not provide transmission infrastructure.<br>ASP providers transmit and validate invoices within the official network.<br>InvoHub prepares your internal structure before you connect to them.<br>This ensures smoother onboarding and reduced rejection risk",
          q4: "When will UAE e-Invoicing become mandatory?",
          a4: "The UAE is implementing a phased structured e-Invoicing framework.<br>Accredited providers are already being approved, and technical standards are being defined.<br>Preparation should begin before enforcement phases are announced — because structural adjustments take time.<br>Reactive implementation increases operational risk.",
          q5: "Which companies are affected?",
          a5: "If your business issues VAT invoices in B2B or B2G transactions in the UAE, you will be affected.<br>This applies across industries and company sizes.<br>E-Invoicing impacts finance workflows, ERP configuration, VAT controls, and invoice validation logic — not only IT systems.",
          q6: "What risks exist if we are not prepared?",
          a6: "<p>Potential risks include:</p><ul><li>Invoice rejection during transmission</li><li>Disrupted billing cycles</li><li>VAT reporting inconsistencies</li><li>Operational delays</li><li>Increased compliance exposure.</li></ul> <p>Preparation reduces both technical and tax risk.</p>",
          q7: "What does the readiness process look like?",
          a7: "<p>Our approach is structured and controlled:</p><ul><li>Invoice data and ERP assessment</li><li>Mandatory field and compliance gap analysis</li><li>Mapping to UAE e-Invoicing requirements</li><li>Clear preparation roadmap before ASP integration\</li></ul><p>No unnecessary system replacement.</p><p>No disruption.</p><p>No guesswork.</p>",
        },
        start: {
          kicker: "Next Step",
          title: "Prepare Before It Becomes Mandatory",
          lead: "Identify compliance gaps and integration risks before connecting to accredited providers. Request the UAE e-Invoicing Readiness Checklist or schedule a short strategic call. <br>No disruption. No guesswork",
          meta: "Your information is treated with strict confidentiality.",
          statusSuccess: "Thanks! Your request was sent. We’ll contact you shortly.",
          statusError: "Something went wrong. Please try again in a minute.",
        },
        form: { name: "Full Name", email: "Business Email", phone: "Phone Number", erp: "Current ERP Platform", submit: "Request Assessment →" },
        footerLegal: {
          privacy: "Privacy",
          terms: "Terms",
          cookies: "Cookie Policy",
        },
        telegram: {
          join: "Join our Telegram channel →"
        },
      },

      ru: {
        tagline: "Лендинг InvoHub",
        kicker: "ОАЭ e-Invoicing | Подготовка бизнеса",
        nav: { what: "Что делаем", benefits: "Преимущества", how: "Как работает", integrations: "Интеграции", pricing: "Пакеты", faq: "FAQ", ctaFull: "Начать →", ctaShort:"Старт →" },
        hero: {
          titleMain: "e-Invoicing в ОАЭ.",
          titleSub: "Контроль до наступления обязательности",
          lead: "Если ваш бизнес выставляет счета с НДС в ОАЭ, электронный инвойс изменит не форму документа — а логику контроля операций.<br>Речь идет не о PDF. Речь идет о данных и контроле.<p class=\"leadP\">Новая модель электронного инвойса в ОАЭ предполагает:</p><div class=\"leadBox\"><ul class=\"leadCards\"><li><b>формирование</b> структурированных данных</li><li><b>обязательную</b> проверку налоговых данных</li><li><b>передачу</b> через ASP</li><li><b>автоматический</b> контроль операций</li></ul></div><p>Для большинства компаний это означает доработку структуры данных в ERP и пересмотр внутренних процедур.<br>InvoHub помогает подготовиться к этим изменениям — без замены системы и без сбоев в работе. <br>Без замены ERP. Без операционных потрясений. С фокусом на управляемость и комплаенс.</p>",
          cta1: "Получить чек-лист готовности к e-Invoicing в ОАЭ →",
          cta2: "Назначить 20-минутную консультацию",
          meta: "Под контролем",
          meta2: "Независимо от ERP • Конфиденциально"
        },
        trust: { title: "Для финансовых команд, которые предпочитают контроль вместо реакции" },
        what: {
          kicker: "Что мы делаем",
          title: "Что мы делаем",
          note: "Работаем в партнёрстве с зарегистрированными ASP-провайдерами в экосистеме e-Invoicing ОАЭ.\n\nВы сохраняете учетную систему.\nВы получаете структурное соответствие.",
          li2: "Проверяем обязательные VAT-поля",
          d2: "Проверяем полноту и согласованность данных для структурированного формата.",
          li4: "Согласуем вашу систему с требованиями аккредитованных ASP",
          d4: "Сопоставляем вывод ERP с форматом передачи в ASP без сбоев операций.",
          li5: "Формируем управляемую дорожную карту внедрения",
          d5: "Поэтапный план с ролями и контролями — без сбоев в операциях."
        },
        benefits: {
          kicker: "Преимущества",
          title: "Преимущества, которые важны",
          note: "Подготовка снижает операционные риски и синхронизирует финансы + IT.",
          b1t: "Контроль", b1: "Уйти от авралов: заранее определить объём, данные и ответственность.",
          b2t: "Непрерывность", b2: "Сохраняете учетную систему — менять ERP не нужно.",
          b3t: "Соответствие", b3: "Готовность данных: обязательные поля + передача через ASP."
        },
        how: {
          kicker: "Как это работает",
          title: "3 простых шага к ясности",
          note: "От объёма → к данным → к дорожной карте. Чётко. Структурно. Конфиденциально.",
          s1t: "Оценка", s1: "Оценить влияние и перечень документов.",
          s2t: "Проверка", s2: "Проверить обязательные VAT-поля для структурной готовности.",
          s3t: "Согласование", s3: "Согласовать требования ASP и сформировать дорожную карту."
        },
        int: {
          kicker: "Интеграция",
          title: "Интеграция без боли",
          note: "Интеграция с ERP, ASP-провайдерами и CMS.",
          i1t: "ERP системы", i1: "ERP-нейтрально: сохраняете систему и сопоставляете вывод.",
          i2t: "Аккредитованные ASP", i2: "Сопоставление формата и процессов передачи.",
          i3t: "CMS готово", i3: "Все тексты можно заменить через /cms/content.json (Strapi, Contentful, Sanity, WP).",
          i4t: "CRM / формы", i4: "Подключение формы к любому endpoint (HubSpot / Zoho / custom)."
        },
        price: {
          kicker: "Цены",
          title: "Цены",
          note: "Замените на реальные цены, когда будете готовы.",
          b1: "Старт", p1t: "Звонок готовности", p1d: "20 минут: объём, сроки, следующие шаги.",
          p1l1: "Вопросы по объёму", p1l2: "Общая оценка готовности", p1l3: "План следующих шагов",
          b2: "Популярно", p2t: "Оценка готовности", p2d: "Структурная проверка обязательных полей и объёма документов.",
          p2l1: "Чек-лист обязательных полей", p2l2: "Карта документов", p2l3: "Риски и гэпы",
          b3: "Масштаб", p3t: "Дорожная карта", p3d: "Управляемый план с учетом требований аккредитованных ASP.",
          p3l1: "Карта потока ERP → ASP", p3l2: "Роли и контроли", p3l3: "Поэтапное внедрение"
        },
        faq: {
          kicker: "FAQ",
          title: "Вопросы",
          note: "Короткие ответы на частые вопросы.",
          q1: "Является ли электронный инвойс просто обновлением PDF?",
          a1: "Нет.<br>PDF — это визуальный документ для человека.<br>Электронный инвойс требует структурированных, машиночитаемых налоговых данных.<br>Счета должны соответствовать установленной структуре данных, содержать обязательные реквизиты по НДС и проходить проверку перед передачей через аккредитованных ASP-провайдеров.<br>Это изменение архитектуры комплаенса, а не формата документа.",
          q2: "Нужно ли нам менять ERP-систему?",
          a2: "В большинстве случаев — нет.<br>Проблема не в самой ERP, а в том, как внутри неё формируются и валидируются данные счета.<br>Мы анализируем текущую конфигурацию, выявляем структурные разрывы и подготавливаем систему к интеграции с аккредитованными провайдерами — без нарушения операционной деятельности.",
          q3: "Вы являетесь аккредитованным ASP-провайдером?",
          a3: "Нет.<br>Мы не предоставляем инфраструктуру передачи данных.<br>ASP-провайдеры обеспечивают передачу и валидацию счетов в рамках официальной сети.<br>InvoHub готовит вашу внутреннюю структуру до подключения к ним.<br>Это снижает риск отказов и упрощает процесс подключения.",
          q4: "Когда UAE e-Invoicing станет обязательным?",
          a4: "В ОАЭ внедряется поэтапная модель структурированного e-Invoicing.<br>Аккредитованные провайдеры уже утверждаются, технические стандарты формируются.<br>Подготовку следует начинать до объявления обязательных этапов — поскольку структурные изменения требуют времени.",
          q5: "Какие компании подпадают под требования?",
          a5: "Если ваша компания выставляет счета с НДС в рамках B2B или B2G операций в ОАЭ, требования будут распространяться на вас.<br>Это касается всех отраслей и масштабов бизнеса.<br>E-Invoicing влияет на финансовые процессы, настройку ERP, контроль НДС и логику валидации счетов — а не только на ИТ-инфраструктуру.",
          q6: "Какие риски возникают при отсутствии подготовки?",
          a6: "<p>Возможные риски включают:</p><ul><li>отказ в передаче счета</li><li>сбои в цикле выставления и получения платежей</li><li>расхождения в отчетности по НДС</li><li>операционные задержки</li><li>рост регуляторного и налогового риска.</li></ul><p>Подготовка снижает как технические, так и налоговые риски.</p>",
          q7: "Как выглядит процесс подготовки?",
          a7: "<p>Наш подход системный и управляемый</p><ul><li>анализ структуры данных счетов и конфигурации ERP</li><li>проверка обязательных реквизитов и выявление комплаенс-разрывов</li><li>сопоставление с требованиями UAE e-Invoicing</li><li>формирование четкой дорожной карты до интеграции с ASPБез замены системы.</li></ul><p>Без операционных сбоев. Без неопределенности.</p>",
        },
        start: {
          kicker: "Следующий шаг",
          title: "Подготовьтесь до того, как это станет обязательным",
          lead: "Выявите пробелы в комплаенсе и риски интеграции до подключения к аккредитованным провайдерам. Запросите чек-лист готовности к UAE e-Invoicing или запланируйте короткий звонок по оценке готовности.<br>Без сбоев. Без неопределенности.",
          meta: "Ваша информация обрабатывается с соблюдением строгой конфиденциальности.",
          statusSuccess: "Благодарим, Ваш запрос был отправлен. Мы свяжемся с Вами в ближайшее время.",
          statusError: "При отправке произошла ошибка. Пожалуйста, повторите попытку.",
        },
        form: { name: "Полное имя", email: "Контактный e-mail", phone: "Контактный телефон", erp: "Текущая ERP-система", submit: "Запросить анализ →" },
        footerLegal: {
          privacy: "Конфиденциальность",
          terms: "Условия использования",
          cookies: "Политика cookie",
        },
        telegram: {
          join: "Подписаться на Telegram-канал →"
        },
      }
    };


    (async function init() {
      const langItems = document.querySelectorAll(".langItem");

       langItems.forEach(item => {
          item.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            const selected = item.dataset.lang;
            apply(selected, window.CURRENT_CONTENT[selected]);

            setLangMenu(false); // ✅ closes properly
         });
       });

       function setActiveLangUI(lang){
          document.querySelectorAll(".langItem").forEach(b=>{
            b.classList.toggle("isActive", b.dataset.lang === lang);
          });
       }

        document.querySelectorAll(".langItem").forEach(item => {
          item.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            const selected = item.dataset.lang;
            apply(selected, window.CURRENT_CONTENT[selected]);

            setActiveLangUI(selected);

            // close desktop language popup if open
            setLangMenu(false);

            // close mobile menu if open
            if (typeof setMobileMenu === "function") setMobileMenu(false);
          });
        });

      document.getElementById("y").textContent = new Date().getFullYear();

      const cms = await loadCMS();
      const content = cms || CONTENT;
      window.CURRENT_CONTENT = content;

      const saved = localStorage.getItem("inv_lang");
      const lang = (saved && content[saved]) ? saved : "en";
      apply(lang, content[lang]);
      setActiveLangUI(lang);

      const startedAt = Date.now();
      const form = document.getElementById("leadForm");
      form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Honeypot check (if you use one)
        const honeypot = document.getElementById("_gotcha");
        if (honeypot && honeypot.value.trim() !== "") {
          e.target.reset();
          return;
        }
        const seconds = (Date.now() - startedAt) / 1000;
        if (seconds < 3) {
          e.target.reset();
          return;
        }

        const formData = new FormData(form);

        try {
          const response = await fetch("https://formspree.io/f/mykddkov", {
            method: "POST",
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });

          if (response.ok) {
            showStatus("success", window.CURRENT_CONTENT[window.CURRENT_LANG].start.statusSuccess);
            form.reset();
          } else {
            showStatus("error", window.CURRENT_CONTENT[window.CURRENT_LANG].start.statusError);
          }

        } catch (error) {
          showStatus("error", window.CURRENT_CONTENT[window.CURRENT_LANG].start.statusError);
        }
      });
    })();

    // ===== Cursor spotlight (CSS vars: --mx / --my) =====
    (function () {
      const root = document.documentElement;
      let raf = 0;

      function setSpotlight(x, y) {
        root.style.setProperty("--mx", x + "px");
        root.style.setProperty("--my", y + "px");
      }

      window.addEventListener("pointermove", (e) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          setSpotlight(e.clientX, e.clientY);
          raf = 0;
        });
      }, { passive: true });

      // set initial position
      setSpotlight(window.innerWidth * 0.5, window.innerHeight * 0.22);
    })();

    // ===== Subtle parallax on background + floaters =====
    (function () {
      const bg = document.querySelector(".bgAnim");
      const floats = document.querySelector(".floaters");
      const heroGlow = document.querySelector(".heroGlow");
      if (!bg || !floats) return;

      let ticking = false;

      function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY || 0;

          // small values = premium (not gimmicky)
          bg.style.transform = `translate3d(0, ${y * -0.015}px, 0)`;
          floats.style.transform = `translate3d(0, ${y * -0.03}px, 0)`;
          if (heroGlow) heroGlow.style.transform = `translate3d(0, ${y * -0.02}px, 0)`;

          ticking = false;
        });
      }

      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    })();

    // ==== Language select box ===
    const langToggle = document.getElementById("langToggle");
    const langMenu = document.getElementById("langMenu");

    function positionLangMenu() {
      const r = langToggle.getBoundingClientRect();
      const gap = 8;

      // align menu with nav baseline: same left edge as button
      langMenu.style.top = `${Math.round(r.bottom + gap)}px`;
      langMenu.style.left = `${Math.round(r.left)}px`;

      // optional: keep inside viewport (simple clamp)
      const menuRect = langMenu.getBoundingClientRect();
      const overflowRight = menuRect.right - window.innerWidth;
      if (overflowRight > 0) {
        langMenu.style.left = `${Math.max(8, Math.round(r.left - overflowRight - 8))}px`;
      }
    }

    function setLangMenu(open) {
      langMenu.classList.toggle("open", open);
      langToggle.setAttribute("aria-expanded", String(open));

      if (open) {
        positionLangMenu();
      }
    }

    langToggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      setLangMenu(!langMenu.classList.contains("open"));
    });

    langMenu.addEventListener("click", (e) => e.stopPropagation());
    document.addEventListener("click", () => {
      langMenu.classList.remove("open");
      langToggle.setAttribute("aria-expanded", "false");
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setLangMenu(false); });

    // keep it “locked” to the button even if user scrolls/resizes
    window.addEventListener("scroll", () => {
      if (langMenu.classList.contains("open")) positionLangMenu();
    }, { passive: true });

    window.addEventListener("resize", () => {
      if (langMenu.classList.contains("open")) positionLangMenu();
    });

    // ===== Mobile hamburger menu =====
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    function setMobileMenu(open){
      mobileMenu.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
    }

    menuBtn.addEventListener("click", (e)=>{
      e.preventDefault();
      e.stopPropagation();
      setMobileMenu(!mobileMenu.classList.contains("open"));
    });

    // close menu on outside click
    document.addEventListener("click", ()=> setMobileMenu(false));

    // prevent inside clicks from closing
    mobileMenu.addEventListener("click", (e)=> e.stopPropagation());

    // close on ESC
    document.addEventListener("keydown", (e)=>{
      if(e.key === "Escape") setMobileMenu(false);
    });

    // close when clicking a link
    mobileMenu.querySelectorAll("a").forEach(a=>{
      a.addEventListener("click", ()=> setMobileMenu(false));
    });
