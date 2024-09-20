// script.js

// Function to set a cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to check cookie and display/hide banner
function checkCookie() {
    var cookieConsent = getCookie("cookieConsent");
    if (!cookieConsent) {
        document.getElementById("cookie-banner").style.display = "block";
    } else {
        document.getElementById("cookie-banner").style.display = "none";
    }
}

// Function to handle the accept button click
document.getElementById("accept-cookies").addEventListener("click", function () {
    setCookie("cookieConsent", "true", 30);
    document.getElementById("cookie-banner").style.display = "none";
});

// Check cookie on page load
document.addEventListener("DOMContentLoaded", function () {
    checkCookie();
});
