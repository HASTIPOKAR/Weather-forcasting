/**
 * WeatherCast — Shared Validation & Utilities
 * Used across all pages for navigation, toast, and validation
 */

// ==========================================
// Toast Notification System
// ==========================================
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    toast.innerHTML = `<span>${icons[type] || ''}</span> ${escapeHTML(message)}`;

    container.appendChild(toast);

    // Remove after animation
    setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3500);
}

// ==========================================
// HTML Escaping
// ==========================================
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ==========================================
// Validation Helpers
// ==========================================
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.add('error');
    if (error) {
        error.textContent = message;
        error.classList.add('visible');
    }
}

function clearFieldError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.remove('error');
    if (error) {
        error.textContent = '';
        error.classList.remove('visible');
    }
}

function clearAllFieldErrors() {
    document.querySelectorAll('.field-error').forEach(el => {
        el.textContent = '';
        el.classList.remove('visible');
    });
    document.querySelectorAll('input.error').forEach(el => {
        el.classList.remove('error');
    });
}

// ==========================================
// Password Toggle
// ==========================================
function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;

    if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
    } else {
        input.type = 'password';
        btn.textContent = '👁️';
    }
}

// ==========================================
// Navigation — Mobile Toggle
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('open');
        });

        // Close mobile nav on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }

    // Check session and update nav auth area
    checkSession();
});

// ==========================================
// Session Check & Nav Auth Update
// ==========================================
let currentUser = null;

async function checkSession() {
    try {
        const response = await fetch('../php/session_check.php');
        const data = await response.json();

        if (data.logged_in) {
            currentUser = data.user;
            updateNavAuth(true, data.user);
        } else {
            currentUser = null;
            updateNavAuth(false);
        }
    } catch (e) {
        // Silently fail — not running on PHP server
        currentUser = null;
        updateNavAuth(false);
    }
}

function updateNavAuth(loggedIn, user) {
    const navAuth = document.getElementById('navAuth');
    const mobileAuth = document.getElementById('mobileAuth');

    if (!navAuth) return;

    if (loggedIn && user) {
        const initial = user.name ? user.name.charAt(0).toUpperCase() : '?';
        navAuth.innerHTML = `
            <div class="nav-user-info">
                <div class="user-avatar">${escapeHTML(initial)}</div>
                <span class="user-name">${escapeHTML(user.name)}</span>
                <button class="btn-logout" onclick="handleLogout()">Logout</button>
            </div>
        `;

        // Show side panels on home page
        const sidePanels = document.getElementById('sidePanels');
        if (sidePanels) {
            sidePanels.classList.add('active');
            loadHistory();
            loadFavorites();
        }

        // Mobile auth
        if (mobileAuth) {
            mobileAuth.style.display = 'flex';
            mobileAuth.innerHTML = `
                <span style="color:var(--text-secondary); font-size:0.9rem;">Hi, ${escapeHTML(user.name)}</span>
                <button class="btn-logout" style="margin-left:auto;" onclick="handleLogout()">Logout</button>
            `;
        }
    } else {
        navAuth.innerHTML = `
            <a href="login.html" class="btn-login">Log In</a>
            <a href="register.html" class="btn-signup">Sign Up</a>
        `;

        // Mobile auth
        if (mobileAuth) {
            mobileAuth.style.display = 'flex';
            mobileAuth.innerHTML = `
                <a href="login.html" class="btn-login" style="flex:1;text-align:center;padding:10px;">Log In</a>
                <a href="register.html" class="btn-signup" style="flex:1;text-align:center;padding:10px;">Sign Up</a>
            `;
        }
    }
}

// ==========================================
// Logout
// ==========================================
async function handleLogout() {
    try {
        const response = await fetch('../php/logout.php');
        const data = await response.json();

        if (data.success) {
            currentUser = null;
            showToast('Logged out successfully.', 'success');
            updateNavAuth(false);

            // Hide side panels
            const sidePanels = document.getElementById('sidePanels');
            if (sidePanels) sidePanels.classList.remove('active');

            // If on a page that requires auth, redirect
            setTimeout(() => {
                window.location.href = 'weather.html';
            }, 1000);
        }
    } catch (e) {
        showToast('Failed to log out.', 'error');
    }
}
