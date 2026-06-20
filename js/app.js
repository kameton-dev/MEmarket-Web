document.addEventListener("DOMContentLoaded", () => {
    applySavedTheme();
});

function setTheme(color, hoverColor) {
    document.documentElement.style.setProperty('--accent-color', color);
    document.documentElement.style.setProperty('--accent-hover', hoverColor);
    
    localStorage.setItem('theme-color', color);
    localStorage.setItem('theme-hover', hoverColor);
    
    showToast("Персонализация", "Выбран новый системный цвет оформления");
}

function applySavedTheme() {
    const savedColor = localStorage.getItem('theme-color');
    const savedHover = localStorage.getItem('theme-hover');
    if (savedColor && savedHover) {
        document.documentElement.style.setProperty('--accent-color', savedColor);
        document.documentElement.style.setProperty('--accent-hover', savedHover);
    }
}

function switchNav(section) {
    const isSubfolder = window.location.pathname.includes('/docs/') || 
                        window.location.pathname.includes('/about/') || 
                        window.location.pathname.includes('/download/');
    const prefix = isSubfolder ? '../' : '';

    if (section === 'store') {
        window.location.href = prefix + 'index.html';
    } else if (section === 'instructions') {
        window.location.href = prefix + 'docs/index.html#install';
    } else if (section === 'about') {
        window.location.href = prefix + 'about/index.html';
    }
}

function simulateClientDownload(platform) {
    showToast("Загрузка", `Началось скачивание официального клиента для ${platform}`);
}

// тост
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

// скрыть тост
function hideToast() {
    const toastElement = document.getElementById("toast");
    if (toastElement) {
        toastElement.classList.remove("show");
    }
}