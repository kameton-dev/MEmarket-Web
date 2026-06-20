// База данных приложений
const initialApps = [
    { id: 1, name: "Telegram Mobile (ME)", developer: "Millennium Team", category: "social", iconColor: "#00abec", rating: "⭐⭐⭐⭐⭐", size: "14.2 МБ", isFeatured: true, isNew: false, description: "Специализированная сборка неофициального клиента Telegram, адаптированная под ограничения оперативной памяти старых моделей Lumia.", package: "millennium.telegram.wp", os: "Windows Phone 8.1 / 10M", format: "XAP", repo: "main" },
    { id: 2, name: "YTube Classic Lite", developer: "WP Revival", category: "media", iconColor: "#d33b22", rating: "⭐⭐⭐⭐", size: "8.1 МБ", isFeatured: true, isNew: true, description: "Удобный клиент для обхода современных ограничений YouTube на старых смартфонах. Проигрывает видео в разрешениях до 720p без лагов.", package: "wprevival.ytube.lite", os: "Windows 10 Mobile", format: "APPX", repo: "main" },
    { id: 3, name: "WPSaps (OSM Maps)", developer: "GeoCommunity", category: "navigation", iconColor: "#5133ab", rating: "⭐⭐⭐⭐", size: "26.0 МБ", isFeatured: false, isNew: false, description: "Навигационная система на базе OpenStreetMap. Позволяет загружать кеш карт для полноценной офлайн-навигации без интернета.", package: "geocommunity.maps.wp", os: "Windows Phone 8.1", format: "XAP", repo: "main" },
    { id: 4, name: "Winaero Tweaker Mobile", developer: "Sergey Tkachenko", category: "tools", iconColor: "#00a300", rating: "⭐⭐⭐⭐⭐", size: "4.5 МБ", isFeatured: true, isNew: false, description: "Легендарный твикер операционной системы, портированный на Windows 10 Mobile. Позволяет тонко настраивать системные файлы и реестр.", package: "winaero.tweaker.mobile", os: "Windows 10 Mobile", format: "APPX", repo: "main" },
    { id: 5, name: "VK Mobile Classic", developer: "ME Devs", category: "social", iconColor: "#2d72d9", rating: "⭐⭐⭐⭐", size: "11.2 МБ", isFeatured: false, isNew: true, description: "Классический клиент ВКонтакте, возрождающий дизайн официального приложения 2013-2015 годов. Полностью рабочие диалоги.", package: "medevs.vk.classic", os: "Windows Phone 8.1", format: "XAP", repo: "main" },
    { id: 6, name: "Lumia Weather Metro", developer: "Skyline Dev", category: "tools", iconColor: "#e27415", rating: "⭐⭐⭐⭐", size: "6.0 МБ", isFeatured: false, isNew: false, description: "Минималистичный виджет погоды с поддержкой отображения подробной информации на живых плитках стартового экрана устройства.", package: "skyline.weather.metro", os: "Windows Phone 8.1 / 10M", format: "XAP", repo: "main" }
];

let appsDatabase = [...initialApps];
let activeRepositories = [
    { name: "Official MEmarket Repo", url: "https://repo.memarket.org/main.json", count: 6, id: "main" }
];

// Автоматический запуск при полной загрузке скрипта
document.addEventListener("DOMContentLoaded", () => {
    applySavedTheme(); // Применяем сохраненную тему оформления
    renderApps(appsDatabase);
    renderRepositories();
});

// Рендеринг карточек приложений
function renderApps(appsToRender) {
    const listContainer = document.getElementById("apps-list");
    if (!listContainer) return; // Безопасный выход, если контейнера нет на странице
    
    listContainer.innerHTML = "";

    if (appsToRender.length === 0) {
        listContainer.innerHTML = "<p style='grid-column: span 3; text-align: center; color: #888; font-weight: 300; padding: 40px;'>Приложения не найдены.</p>";
        return;
    }

    appsToRender.forEach(app => {
        const appTile = document.createElement("div");
        appTile.className = "app-tile";
        appTile.onclick = () => openAppDetails(app);

        appTile.innerHTML = `
            <div class="app-tile-icon" style="background-color: ${app.iconColor};">
                ${app.name.substring(0, 1)}
            </div>
            <div class="app-tile-details">
                <div>
                    <div class="app-tile-title" title="${app.name}">${app.name}</div>
                    <div class="app-tile-publisher">${app.developer}</div>
                </div>
                <div class="app-tile-meta">
                    <div class="app-tile-rating">${app.rating}</div>
                    <div class="app-tile-price">${app.format}</div>
                </div>
            </div>
        `;
        listContainer.appendChild(appTile);
    });
}

// Рендеринг списка репозиториев
function renderRepositories() {
    const reposContainer = document.getElementById("repos-container");
    if (!reposContainer) return; // Безопасный выход
    reposContainer.innerHTML = "";

    activeRepositories.forEach(repo => {
        const badge = document.createElement("div");
        badge.className = "repo-badge";
        badge.innerHTML = `
            <span>📦 <strong>${repo.name}</strong> (${repo.id})</span>
            ${repo.id !== 'main' ? `<span class="remove-btn" onclick="removeRepository('${repo.id}', event)">✕</span>` : ''}
        `;
        reposContainer.appendChild(badge);
    });
}

// Навигационные переключения Pivot-фильтров в магазине
function filterCategory(category) {
    document.querySelectorAll('.pivot-item').forEach(item => item.classList.remove('active'));
    
    let filtered = [];
    if (category === 'all') {
        document.getElementById('pivot-all')?.classList.add('active');
        filtered = appsDatabase;
    } else if (category === 'featured') {
        document.getElementById('pivot-featured')?.classList.add('active');
        filtered = appsDatabase.filter(app => app.isFeatured);
    } else if (category === 'new') {
        document.getElementById('pivot-new')?.classList.add('active');
        filtered = appsDatabase.filter(app => app.isNew);
    }
    renderApps(filtered);
}

// Поиск
function handleSearch() {
    const searchInput = document.getElementById("app-search");
    if (!searchInput) return;
    
    const query = searchInput.value.toLowerCase();
    const filtered = appsDatabase.filter(app => 
        app.name.toLowerCase().includes(query) || 
        app.developer.toLowerCase().includes(query)
    );
    renderApps(filtered);
}

// Выбор акцентной темы (с сохранением в локальное хранилище)
function setTheme(color, hoverColor) {
    document.documentElement.style.setProperty('--accent-color', color);
    document.documentElement.style.setProperty('--accent-hover', hoverColor);
    
    // Сохраняем тему в браузере
    localStorage.setItem('theme-color', color);
    localStorage.setItem('theme-hover', hoverColor);
    
    showToast("Персонализация", "Выбран новый системный цвет оформления");
}

// Автоматическое применение ранее сохраненной темы
function applySavedTheme() {
    const savedColor = localStorage.getItem('theme-color');
    const savedHover = localStorage.getItem('theme-hover');
    if (savedColor && savedHover) {
        document.documentElement.style.setProperty('--accent-color', savedColor);
        document.documentElement.style.setProperty('--accent-hover', savedHover);
    }
}

// Переключение разделов сайта (перенаправление на физические страницы)
function switchNav(section) {
    // Определяем, находимся ли мы сейчас в подпапке (docs, about, download)
    const isSubfolder = window.location.pathname.includes('/docs/') || 
                        window.location.pathname.includes('/about/') || 
                        window.location.pathname.includes('/download/');
    const prefix = isSubfolder ? '../' : '';

    if (section === 'store') {
        window.location.href = prefix + 'index.html';
    } else if (section === 'instructions') {
        // Перенаправляем на физическую страницу документации к блоку установки
        window.location.href = prefix + 'docs/index.html#install';
    } else if (section === 'about') {
        window.location.href = prefix + 'about/index.html';
    }
}

// Имитация скачивания клиента
function simulateClientDownload(platform) {
    showToast("Загрузка", `Началось скачивание официального клиента для ${platform}`);
}

// Добавление кастомного репозитория
function addNewRepository() {
    const urlInput = document.getElementById("repo-url-input");
    if (!urlInput) return;
    const url = urlInput.value.trim();

    if (!url) {
        showToast("Ошибка", "Пожалуйста, введите корректный адрес репозитория");
        return;
    }

    const repoId = "custom-" + Math.floor(Math.random() * 1000);
    const newRepo = {
        name: url.includes("lumiadev") ? "LumiaDev Community" : "Alternative Legacy Repo",
        url: url,
        count: 2,
        id: repoId
    };

    const customApps = [
        { id: Date.now() + 1, name: "Nokia Camera Pro", developer: "Nokia Corp", category: "media", iconColor: "#7200ca", rating: "⭐⭐⭐⭐⭐", size: "21.1 МБ", isFeatured: false, isNew: true, description: "Оригинальное приложение камеры от Nokia с возможностью тонкой ручной настройки параметров экспозиции.", package: "nokia.camera.pro", os: "Windows Phone 8.1", format: "XAP", repo: repoId },
        { id: Date.now() + 2, name: "Pocket File Explorer", developer: "Files Team", category: "tools", iconColor: "#00aba9", rating: "⭐⭐⭐⭐", size: "3.2 МБ", isFeatured: true, isNew: true, description: "Удобный файловый менеджер с возможностью прямого доступа к файловой системе телефона после Interop Unlock.", package: "files.team.pocketexplorer", os: "Windows 10 Mobile", format: "APPX", repo: repoId }
    ];

    activeRepositories.push(newRepo);
    appsDatabase = [...appsDatabase, ...customApps];
    
    urlInput.value = "";
    renderRepositories();
    renderApps(appsDatabase);
    
    showToast("Репозиторий подключен", `Успешно импортировано приложений: ${newRepo.count}`);
}

// Удаление репозитория
function removeRepository(repoId, event) {
    if (event) event.stopPropagation(); // Исключаем клик по родителю
    activeRepositories = activeRepositories.filter(r => r.id !== repoId);
    appsDatabase = appsDatabase.filter(app => app.repo !== repoId);
    renderRepositories();
    renderApps(appsDatabase);
    showToast("Репозиторий удален", "Приложения из данного источника исключены из каталога");
}

// Открытие модального окна подробностей о приложении
let activeApp = null;
function openAppDetails(app) {
    activeApp = app;
    document.getElementById("modal-title").innerText = app.name;
    document.getElementById("modal-dev").innerText = app.developer;
    document.getElementById("modal-icon").innerText = app.name.substring(0, 1);
    document.getElementById("modal-icon").style.backgroundColor = app.iconColor;
    document.getElementById("modal-desc-text").innerText = app.description;
    document.getElementById("modal-rating").innerText = app.rating;
    document.getElementById("modal-repo-badge").innerText = `Репозиторий: ${app.repo}`;

    document.getElementById("spec-package").innerText = app.package;
    document.getElementById("spec-size").innerText = app.size;
    document.getElementById("spec-os").innerText = app.os;
    document.getElementById("spec-format").innerText = app.format;

    switchModalPivot('desc');
    document.getElementById("app-modal").classList.add("open");
}

function closeAppModal(event) {
    if (event.target === document.getElementById("app-modal")) {
        document.getElementById("app-modal").classList.remove("open");
    }
}

function closeAppModalDirect() {
    document.getElementById("app-modal").classList.remove("open");
}

function switchModalPivot(pane) {
    document.querySelectorAll('.modal-pivot-item').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.modal-pane').forEach(p => p.classList.remove('active'));

    if (pane === 'desc') {
        document.getElementById('m-pivot-desc').classList.add('active');
        document.getElementById('pane-desc').classList.add('active');
    } else if (pane === 'specs') {
        document.getElementById('m-pivot-specs').classList.add('active');
        document.getElementById('pane-specs').classList.add('active');
    }
}

function simulateDownload() {
    if (activeApp) {
        showToast("Загрузка", `Файл ${activeApp.name}.${activeApp.format.toLowerCase()} успешно загружен.`);
        closeAppModalDirect();
    }
}

// Логика системного Toast-уведомления
let toastTimeout;
function showToast(title, message) {
    clearTimeout(toastTimeout);
    
    const toastElement = document.getElementById("toast");
    const titleElement = document.getElementById("toast-title");
    const msgElement = document.getElementById("toast-msg");
    
    if (!toastElement || !titleElement || !msgElement) return;

    titleElement.innerText = title;
    msgElement.innerText = message;
    toastElement.classList.add("show");

    toastTimeout = setTimeout(() => {
        hideToast();
    }, 4000);
}

function hideToast() {
    const toastElement = document.getElementById("toast");
    if (toastElement) {
        toastElement.classList.remove("show");
    }
}