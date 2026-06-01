const money = (value) => `${value.toFixed(2)} BYN`;

const memoryStore = {};
const storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return memoryStore[key] || null;
    }
  },
  set(key, value) {
    memoryStore[key] = value;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // Some mobile file previewers block localStorage for standalone HTML files.
    }
  }
};

const dishes = [
  { id: 1, cat: "ramen", name: "Тори пайтан рамен", price: 22.9, img: "assets/ramen-paitan.jpg", badge: "Hit", hot: true, kbju: "690 ккал · Б 34 · Ж 28 · У 72", desc: "Кремовый куриный бульон, лапша, яйцо, нори, кукуруза, зеленый лук.", mods: ["Острота 0", "Острота 2", "Доп. яйцо +2 BYN"] },
  { id: 2, cat: "poke", name: "Поке с лососем", price: 24.5, img: "assets/poke-salmon.jpg", badge: "New", kbju: "540 ккал · Б 31 · Ж 18 · У 61", desc: "Рис, лосось, авокадо, огурец, эдамаме, нори, соус понзу.", mods: ["Без лука", "Больше соуса", "Авокадо +3 BYN"] },
  { id: 3, cat: "kids", name: "Каном Крок", price: 12.9, img: "assets/kids-kanom-krok.jpg", badge: "Kids", kbju: "330 ккал · Б 5 · Ж 18 · У 38", desc: "Крошечные кокосовые блинчики-полусферы: хрустящая корочка снаружи и теплый нежный крем внутри.", mods: ["Без зеленого лука", "Доп. кокос", "Сладкий соус +1 BYN"] },
  { id: 4, cat: "wok", name: "Wok терияки с курицей", price: 18.7, img: "assets/wok-chicken.jpg", badge: "Spicy", hot: true, kbju: "610 ккал · Б 29 · Ж 19 · У 83", desc: "Удон, курица гриль, брокколи, перец, морковь, кунжут, терияки.", mods: ["Удон", "Рис", "Тофу вместо курицы"] },
  { id: 5, cat: "ramen", name: "Острый мисо рамен", price: 20.4, img: "assets/ramen-miso.jpg", badge: "45 min", hot: true, kbju: "650 ккал · Б 28 · Ж 25 · У 76", desc: "Красный мисо-бульон, свинина, яйцо, бамбук, чили-масло, нори.", mods: ["Острота 1", "Без грибов", "Доп. мясо +5 BYN"] },
  { id: 6, cat: "poke", name: "Поке vegan", price: 19.9, img: "assets/poke-vegan.jpg", badge: "Vegan", kbju: "470 ккал · Б 18 · Ж 16 · У 64", desc: "Рис, хрустящий тофу, авокадо, чука, огурец, ореховый соус.", mods: ["Киноа вместо риса", "Без орехов"] },
  { id: 7, cat: "poke", name: "Поке с тунцом и манго", price: 25.9, img: "assets/poke-tuna.jpg", badge: "Chef", kbju: "560 ккал · Б 33 · Ж 17 · У 66", desc: "Тунец, рис, манго, вакаме, редис, огурец, спайси-майо.", mods: ["Без спайси", "Манго +2 BYN", "Тунец +5 BYN"] },
  { id: 8, cat: "poke", name: "Поке с креветкой", price: 23.8, img: "assets/poke-shrimp.jpg", badge: "Fresh", kbju: "520 ккал · Б 29 · Ж 15 · У 62", desc: "Креветка, рис, авокадо, ананас, кукуруза, красная капуста, юдзу.", mods: ["Без ананаса", "Больше юдзу", "Креветка +4 BYN"] },
  { id: 9, cat: "ramen", name: "Шою рамен", price: 21.6, img: "assets/ramen-shoyu.jpg", badge: "Classic", kbju: "620 ккал · Б 30 · Ж 21 · У 74", desc: "Соевый бульон, лапша, чашу, маринованное яйцо, бамбук, нарутомаки.", mods: ["Без свинины", "Больше лука", "Нори +1 BYN"] },
  { id: 10, cat: "ramen", name: "Vegan тантанмен", price: 19.8, img: "assets/ramen-vegan.jpg", badge: "Vegan", hot: true, kbju: "590 ккал · Б 22 · Ж 24 · У 70", desc: "Кунжутный бульон, лапша, тофу, бок-чой, грибы, чили-масло.", mods: ["Без чили", "Грибы +2 BYN", "Тофу +3 BYN"] },
  { id: 11, cat: "kids", name: "Каном Токио", price: 11.8, img: "assets/kids-kanom-tokyo.jpg", badge: "Sweet", kbju: "360 ккал · Б 8 · Ж 14 · У 50", desc: "Маленькие мягкие блинчики-трубочки с заварным кремом или сосиской и каплей сладкого майонеза.", mods: ["Кастард", "Сосиска", "Без майонеза"] },
  { id: 12, cat: "kids", name: "Фруктовые шейки", price: 9.9, img: "assets/kids-fruit-shakes.jpg", badge: "Fresh", kbju: "210 ккал · Б 3 · Ж 2 · У 45", desc: "Свежий манго, арбуз или банан, перемолотые со льдом. Идеальное спасение от тайской жары для ребенка.", mods: ["Манго", "Арбуз", "Банан"] },
  { id: 13, cat: "kids", name: "Корн-дог", price: 10.9, img: "assets/kids-corn-dog.jpg", badge: "Crunch", kbju: "430 ккал · Б 13 · Ж 22 · У 44", desc: "Сосиска на деревянной палочке в толстом слое хрустящего теста из кукурузной муки, обжаренная во фритюре.", mods: ["Кетчуп", "Сырный соус +1 BYN", "Без соуса"] },
  { id: 14, cat: "wok", name: "Wok соба с говядиной", price: 22.8, img: "assets/wok-beef.jpg", badge: "Umami", kbju: "670 ккал · Б 35 · Ж 24 · У 78", desc: "Соба, говядина, грибы, бок-чой, морковь, зеленый лук, soy-garlic.", mods: ["Без грибов", "Острота 2", "Говядина +5 BYN"] },
  { id: 15, cat: "wok", name: "Рис wok с креветкой", price: 21.9, img: "assets/wok-shrimp.jpg", badge: "Fresh", kbju: "590 ккал · Б 31 · Ж 17 · У 76", desc: "Жасминовый рис, креветка, яйцо, горошек, кукуруза, морковь, юдзу-соя.", mods: ["Без яйца", "Креветка +4 BYN", "Больше юдзу"] },
  { id: 16, cat: "wok", name: "Vegan sweet chili wok", price: 18.4, img: "assets/wok-vegan.jpg", badge: "Vegan", hot: true, kbju: "560 ккал · Б 20 · Ж 18 · У 80", desc: "Рисовая лапша, хрустящий тофу, эдамаме, брокколи, перец, sweet chili.", mods: ["Без чили", "Тофу +3 BYN", "Рис вместо лапши"] }
];

const categories = [
  ["all", "Все"],
  ["ramen", "Рамен"],
  ["poke", "Поке"],
  ["kids", "Детям"],
  ["wok", "Wok"]
];

const state = {
  tab: "home",
  category: "all",
  cart: JSON.parse(storage.get("golden-wok-cart") || storage.get("nori-cart") || "[]"),
  orders: JSON.parse(storage.get("golden-wok-orders") || storage.get("nori-orders") || "[]"),
  bonus: Number(storage.get("golden-wok-bonus") || storage.get("nori-bonus") || 18),
  user: JSON.parse(storage.get("golden-wok-user") || storage.get("nori-user") || '{"name":"Гость","phone":"+375 29 000-00-00"}')
};

function save() {
  storage.set("golden-wok-cart", JSON.stringify(state.cart));
  storage.set("golden-wok-orders", JSON.stringify(state.orders));
  storage.set("golden-wok-bonus", String(state.bonus));
  storage.set("golden-wok-user", JSON.stringify(state.user));
}

function cartTotal() {
  return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function cartQty() {
  return state.cart.reduce((sum, item) => sum + item.qty, 0);
}

function toast(text) {
  const el = document.querySelector("#toast");
  el.textContent = text;
  el.hidden = false;
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.hidden = true, 2200);
}

function render() {
  document.querySelectorAll(".bottom-nav button").forEach(btn => btn.classList.toggle("active", btn.dataset.tab === state.tab));
  const view = document.querySelector("#view");
  const screens = { home, orders, loyalty, profile, admin, kitchen, tracking };
  view.innerHTML = screens[state.tab] ? screens[state.tab]() : home();
  bindView();
  bindTilt();
}

function home() {
  const filtered = state.category === "all" ? dishes : dishes.filter(d => d.cat === state.category);
  return `
    <section class="hero">
      <div class="hero-kicker">Golden WOK · Grodno</div>
      <div class="hero-copy">
        <img class="hero-logo" src="assets/golden-wok-logo-420.png" alt="Golden WOK">
        <h1>Golden WOK</h1>
        <p>Горячая азиатская кухня с золотым wok-характером, доставкой до 45 минут и понятным статусом заказа.</p>
      </div>
    </section>
    <section class="promise-strip">
      <div><strong>45</strong><span>мин гарантия</span></div>
      <div><strong>5%</strong><span>кэшбэк</span></div>
      <div><strong>4</strong><span>зоны Гродно</span></div>
    </section>
    <div class="quick-row">
      <button class="quick-action primary" data-action="repeat">Повторить заказ</button>
      <button class="quick-action" data-tab-go="tracking">Трекинг demo</button>
      <button class="quick-action" data-tab-go="kitchen">Кухня</button>
      <button class="quick-action" data-tab-go="admin">Админ</button>
    </div>
    <div class="chips">
      ${categories.map(([id, label]) => `<button class="chip ${state.category === id ? "active" : ""}" data-category="${id}">${label}</button>`).join("")}
    </div>
    ${categoryFeature()}
    <div class="section-title"><h2>Сегодня в Golden WOK</h2><span>${filtered.length} блюд</span></div>
    <section class="dish-list">
      ${filtered.map(dishCard).join("")}
    </section>
    ${cartQty() ? `<div class="cart-bar"><div><strong>${cartQty()} позиции</strong><br><span>${money(cartTotal())}</span></div><button data-action="cart">Корзина</button></div>` : ""}
  `;
}

function categoryFeature() {
  if (state.category === "all") return "";
  const features = {
    ramen: {
      img: "assets/ramen-paitan.jpg",
      label: "ramen house",
      text: "Бульоны с глубиной, лапша с упругостью и топпинги, которые держат температуру до двери."
    },
    poke: {
      img: "assets/poke-salmon.jpg",
      label: "poke bar",
      text: "Собираем миски как витрину: рис, белок, свежие топпинги и яркий соус."
    },
    kids: {
      img: "assets/kids-kanom-krok.jpg",
      label: "kids thai",
      text: "Мягкие, сладкие и хрустящие позиции для детей: ярко, понятно и без лишней остроты."
    },
    wok: {
      img: "assets/wok-chicken.jpg",
      label: "wok fire",
      text: "Лапша, рис и овощи быстро обжариваются в соусах, которые раскрываются горячими."
    }
  };
  const feature = features[state.category];
  return `
    <section class="category-feature" style="--feature-image: url('${feature.img}')">
      <div>
        <span>${feature.label}</span>
        <strong>${feature.text}</strong>
      </div>
    </section>
  `;
}

function dishCard(d) {
  return `
    <article class="dish-card">
      <img src="${d.img}" alt="${d.name}">
      <div>
        <div class="dish-meta"><span class="badge ${d.hot ? "hot" : ""}">${d.badge}</span><span class="badge">${d.kbju.split("·")[0].trim()}</span></div>
        <h3>${d.name}</h3>
        <p>${d.desc}</p>
        <div class="dish-footer"><span class="price">${money(d.price)}</span><button class="add-button" data-dish="${d.id}" aria-label="Добавить ${d.name}">+</button></div>
      </div>
    </article>
  `;
}

function orders() {
  const orders = state.orders.length ? state.orders : demoOrders();
  return `
    <div class="section-title"><h2>Мои заказы</h2><span>активные и история</span></div>
    ${orders.map(order => `
      <section class="panel">
        <div class="row"><h3>${order.id}</h3><span class="status-pill">${order.status}</span></div>
        <p class="muted">${order.items}</p>
        <div class="row"><strong>${money(order.total)}</strong><button class="secondary-button" data-action="repeat">Повторить</button></div>
      </section>
    `).join("")}
  `;
}

function loyalty() {
  return `
    <section class="panel">
      <div class="row"><h3>Баллы Golden WOK</h3><strong>${state.bonus}</strong></div>
      <p class="muted">Кэшбэк 5% после каждого доставленного заказа. Оплатить баллами можно до 50% суммы.</p>
      <progress max="120" value="${state.bonus}" style="width:100%; height:14px"></progress>
    </section>
    <section class="panel"><h3>Уровни</h3><p>Кохай → Сэмпай → Сэнсэй → Самурай. Чем выше уровень, тем больше персональных акций.</p></section>
    <section class="panel"><h3>Реферальный код</h3><p class="muted">WOK-${state.user.phone.slice(-4).replace(/\D/g, "") || "2026"}</p><button class="primary-button" data-action="copy-ref">Поделиться кодом</button></section>
  `;
}

function profile() {
  return `
    <section class="panel">
      <h3>Профиль</h3>
      <label class="field"><span>Имя</span><input id="nameInput" value="${state.user.name}"></label>
      <label class="field"><span>Телефон</span><input id="phoneInput" value="${state.user.phone}"></label>
      <button class="primary-button" data-action="save-profile">Сохранить</button>
    </section>
    <section class="panel"><h3>Адреса</h3><p class="muted">ул. Советская, 12 · зона A · доставка 4 BYN</p><button class="secondary-button" data-action="address">Изменить адрес</button></section>
    <section class="panel"><h3>Telegram</h3><p class="muted">Связка нужна для надежных уведомлений на iOS и быстрого повтора заказа.</p><button class="secondary-button" data-action="telegram">Связать Telegram</button></section>
  `;
}

function tracking() {
  return `
    <section class="tracking-hero">
      <span>NR-1042</span>
      <strong>32 мин</strong>
      <p>Кухня Golden WOK уже готовит. Если не уложимся в 45 минут, система создаст компенсационный промокод.</p>
    </section>
    <section class="panel">
      <div class="row"><h3>Заказ NR-1042</h3><span class="status-pill">Готовится</span></div>
      <div class="kpi-grid">
        <div class="kpi"><span class="muted">ETA</span><strong>32 мин</strong></div>
        <div class="kpi"><span class="muted">Гарантия</span><strong>45 мин</strong></div>
      </div>
    </section>
    <section class="panel">
      <h3>Таймлайн</h3>
      <div class="timeline">
        <div class="step done">Заказ принят</div>
        <div class="step done">Кухня готовит</div>
        <div class="step">Упаковка и чек-лист</div>
        <div class="step">Курьер выехал</div>
        <div class="step">Доставлено</div>
      </div>
    </section>
    <section class="panel"><h3>Чек-лист сборки</h3><p class="muted">Палочки, имбирь, васаби, 2 соевых соуса, термосумка.</p><button class="secondary-button" data-action="courier">Связаться в Telegram</button></section>
  `;
}

function kitchen() {
  return `
    <div class="section-title"><h2>Кухня</h2><span>KDS</span></div>
    <section class="kitchen-alert">
      <strong>3 активных заказа</strong>
      <span>Следующая отправка через 13 минут</span>
    </section>
    ${["NR-1042", "NR-1043", "NR-1044"].map((id, idx) => `
      <section class="panel">
        <div class="row"><h3>${id}</h3><span class="status-pill">${idx ? "Новый" : "Готовится"}</span></div>
        <p class="muted">${idx ? "Поке vegan, Wok терияки" : "Тори пайтан рамен x2, Ролл Нори сет"}</p>
        <div class="timeline">
          <label><input type="checkbox" ${idx ? "" : "checked"}> Палочки</label>
          <label><input type="checkbox"> Имбирь и васаби</label>
          <label><input type="checkbox"> Соусы по блюдам</label>
        </div>
        <div class="split" style="margin-top:12px"><button class="secondary-button" data-action="kitchen-status">Готовлю</button><button class="primary-button" data-action="kitchen-status">К выдаче</button></div>
      </section>
    `).join("")}
  `;
}

function admin() {
  return `
    <div class="section-title"><h2>Админ-панель</h2><span>MVP</span></div>
    <section class="admin-hero">
      <span>Soft launch dashboard</span>
      <strong>Операционный пульс Golden WOK</strong>
      <p>Меню, промокоды, кухня и ежедневная выручка в одном контуре.</p>
    </section>
    <section class="kpi-grid">
      <div class="kpi"><span class="muted">Выручка сегодня</span><strong>1 248</strong><span>BYN</span></div>
      <div class="kpi"><span class="muted">Заказы</span><strong>42</strong><span>+12%</span></div>
      <div class="kpi"><span class="muted">Средний чек</span><strong>29.7</strong><span>BYN</span></div>
      <div class="kpi"><span class="muted">Повторные</span><strong>38%</strong><span>клиентов</span></div>
    </section>
    <section class="panel"><h3>Меню</h3><p class="muted">Стоп-лист, цены, остатки, бейджи, фото.</p><button class="secondary-button" data-action="admin-demo">Открыть управление</button></section>
    <section class="panel"><h3>Промокоды</h3><p class="muted">WOK45 · -10% от 30 BYN · 64 использования.</p><button class="secondary-button" data-action="admin-demo">Создать промокод</button></section>
    <section class="panel"><h3>ABC-анализ</h3><p class="muted">A: рамен и сеты · B: poke · C: сезонные позиции.</p></section>
  `;
}

function demoOrders() {
  return [
    { id: "NR-1042", status: "Готовится", items: "Тори пайтан рамен x2, Ролл Нори сет", total: 76.8 },
    { id: "NR-0998", status: "Доставлено", items: "Поке с лососем, Wok терияки", total: 43.2 }
  ];
}

function openDish(id) {
  const d = dishes.find(item => item.id === Number(id));
  openSheet(`
    <div class="sheet-panel">
      <img class="sheet-hero" src="${d.img}" alt="${d.name}">
      <div class="sheet-head"><div><h2>${d.name}</h2><p class="muted">${d.kbju}</p></div><button class="close-button" data-close>×</button></div>
      <p>${d.desc}</p>
      <section class="panel"><h3>Модификаторы</h3>${d.mods.map((m, i) => `<label class="row"><span>${m}</span><input type="${i === 0 ? "radio" : "checkbox"}" name="mods"></label>`).join("")}</section>
      <button class="primary-button" data-add="${d.id}">Добавить · ${money(d.price)}</button>
    </div>
  `);
}

function openCart() {
  if (!state.cart.length) return toast("Корзина пока пустая");
  openSheet(`
    <div class="sheet-panel">
      <div class="sheet-head"><h2>Корзина</h2><button class="close-button" data-close>×</button></div>
      ${state.cart.map(item => `
        <section class="panel">
          <div class="row"><h3>${item.name}</h3><strong>${money(item.price * item.qty)}</strong></div>
          <div class="row"><span class="muted">КБЖУ и модификаторы сохранены в заказе</span><span class="qty"><button data-dec="${item.id}">-</button><span>${item.qty}</span><button data-inc="${item.id}">+</button></span></div>
        </section>
      `).join("")}
      <label class="field"><span>Промокод</span><input id="promoInput" placeholder="WOK45"></label>
      <label class="row panel"><span>Списать баллы до 50%</span><input id="bonusToggle" type="checkbox"></label>
      <div class="panel">
        <div class="row"><span>Товары</span><strong>${money(cartTotal())}</strong></div>
        <div class="row"><span>Доставка зона A</span><strong>${cartTotal() > 35 ? "0 BYN" : "4 BYN"}</strong></div>
      </div>
      <button class="primary-button" data-action="checkout">Оформить</button>
    </div>
  `);
}

function openCheckout() {
  openSheet(`
    <div class="sheet-panel">
      <div class="sheet-head"><h2>Оформление</h2><button class="close-button" data-close>×</button></div>
      <div class="split"><button class="secondary-button">Доставка</button><button class="secondary-button">Самовывоз -10%</button></div>
      <label class="field"><span>Адрес</span><input id="addressInput" value="Гродно, ул. Советская, 12"></label>
      <label class="field"><span>Имя</span><input id="checkoutName" value="${state.user.name}"></label>
      <label class="field"><span>Телефон</span><input id="checkoutPhone" value="${state.user.phone}"></label>
      <label class="field"><span>Оплата</span><select id="payMethod"><option>Карта bePaid</option><option>ЕРИП</option><option>При получении</option></select></label>
      <section class="panel"><h3>Зона доставки</h3><p class="muted">4 зоны Гродно: зона A выбрана автоматически. Минимальный заказ 25 BYN.</p></section>
      <button class="primary-button" data-action="place-order">Заказать · ${money(cartTotal())}</button>
    </div>
  `);
}

function openSheet(html) {
  const sheet = document.querySelector("#sheet");
  sheet.innerHTML = html;
  sheet.hidden = false;
  bindSheet();
}

function closeSheet() {
  document.querySelector("#sheet").hidden = true;
}

function addDish(id) {
  const d = dishes.find(item => item.id === Number(id));
  const found = state.cart.find(item => item.id === d.id);
  if (found) found.qty += 1;
  else state.cart.push({ id: d.id, name: d.name, price: d.price, qty: 1 });
  save();
  render();
  toast(`${d.name} добавлен`);
}

function placeOrder() {
  const total = cartTotal();
  const order = { id: `NR-${Math.floor(1100 + Math.random() * 800)}`, status: "Новый", items: state.cart.map(i => `${i.name} x${i.qty}`).join(", "), total };
  state.orders.unshift(order);
  state.bonus += Math.round(total * 0.05);
  state.cart = [];
  save();
  closeSheet();
  state.tab = "tracking";
  render();
  toast("Заказ создан, платежный шлюз имитирован");
}

function bindView() {
  document.querySelectorAll("[data-tab-go]").forEach(el => el.addEventListener("click", () => { state.tab = el.dataset.tabGo; render(); }));
  document.querySelectorAll("[data-category]").forEach(el => el.addEventListener("click", () => { state.category = el.dataset.category; render(); }));
  document.querySelectorAll("[data-dish]").forEach(el => el.addEventListener("click", () => openDish(el.dataset.dish)));
  document.querySelectorAll("[data-action]").forEach(el => el.addEventListener("click", handleAction));
}

function bindTilt() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  document.querySelectorAll(".hero, .dish-card, .tracking-hero, .admin-hero").forEach(card => {
    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-x", `${(-y * 7).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(x * 7).toFixed(2)}deg`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
}

function bindSheet() {
  document.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeSheet));
  document.querySelectorAll("[data-add]").forEach(el => el.addEventListener("click", () => { addDish(el.dataset.add); closeSheet(); }));
  document.querySelectorAll("[data-inc]").forEach(el => el.addEventListener("click", () => { const item = state.cart.find(i => i.id === Number(el.dataset.inc)); item.qty += 1; save(); openCart(); render(); }));
  document.querySelectorAll("[data-dec]").forEach(el => el.addEventListener("click", () => { const item = state.cart.find(i => i.id === Number(el.dataset.dec)); item.qty -= 1; state.cart = state.cart.filter(i => i.qty > 0); save(); state.cart.length ? openCart() : closeSheet(); render(); }));
  document.querySelectorAll("[data-action]").forEach(el => el.addEventListener("click", handleAction));
}

function handleAction(event) {
  const action = event.currentTarget.dataset.action;
  if (action === "cart") openCart();
  if (action === "checkout") openCheckout();
  if (action === "place-order") placeOrder();
  if (action === "repeat") { state.cart = [{ id: 1, name: "Тори пайтан рамен", price: 22.9, qty: 2 }, { id: 4, name: "Wok терияки с курицей", price: 18.7, qty: 1 }]; save(); render(); toast("Последний заказ в корзине"); }
  if (action === "save-profile") { state.user.name = document.querySelector("#nameInput").value; state.user.phone = document.querySelector("#phoneInput").value; save(); toast("Профиль сохранен"); }
  if (["copy-ref", "address", "telegram", "courier", "kitchen-status", "admin-demo"].includes(action)) toast("Демо-действие выполнено");
}

document.querySelectorAll(".bottom-nav button").forEach(btn => btn.addEventListener("click", () => { state.tab = btn.dataset.tab; render(); }));
document.querySelector("#modeButton").addEventListener("click", () => { state.tab = state.tab === "admin" ? "home" : "admin"; render(); });
document.querySelector("#notifyButton").addEventListener("click", () => toast("Push и Telegram-уведомления включены в демо-режиме"));

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

render();
