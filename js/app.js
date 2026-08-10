document.addEventListener("DOMContentLoaded", function () {
    applySavedTheme();
});

function switchNav(section) {
    var isSubfolder = window.location.pathname.indexOf('/docs/') !== -1 || 
                      window.location.pathname.indexOf('/about/') !== -1 || 
                      window.location.pathname.indexOf('/download/') !== -1;
    var prefix = isSubfolder ? '../' : '';

    if (section === 'store') {
        window.location.href = prefix + 'index.html';
    } else if (section === 'instructions') {
        window.location.href = prefix + 'docs/index.html#install';
    } else if (section === 'about') {
        window.location.href = prefix + 'about/index.html';
    }
}

function simulateClientDownload(platform) {
    showToast("Загрузка", "Началось скачивание официального клиента для " + platform);
}

var toastTimeout;
function showToast(title, message) {
    clearTimeout(toastTimeout);
    
    var toastElement = document.getElementById("toast");
    var titleElement = document.getElementById("toast-title");
    var msgElement = document.getElementById("toast-msg");
    
    if (!toastElement || !titleElement || !msgElement) return;

    titleElement.innerText = title;
    msgElement.innerText = message;
    
    toastElement.classList.add("show");

    toastTimeout = setTimeout(function () {
        hideToast();
    }, 4000);
}

function hideToast() {
    var toastElement = document.getElementById("toast");
    if (toastElement) {
        toastElement.classList.remove("show");
    }
}

function applySavedTheme() {}