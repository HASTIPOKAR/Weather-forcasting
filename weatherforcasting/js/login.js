/**
 * WeatherCast — Login & Registration JavaScript
 * Handles: form submission, validation, PHP API calls
 */

document.addEventListener('DOMContentLoaded', function () {
    // ==========================================
    // Login Form
    // ==========================================
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            clearAllFieldErrors();
            hideAuthMessage();

            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;

            // Client-side validation
            let valid = true;

            if (!email) {
                showFieldError('loginEmail', 'emailError', 'Email is required.');
                valid = false;
            } else if (!isValidEmail(email)) {
                showFieldError('loginEmail', 'emailError', 'Please enter a valid email address.');
                valid = false;
            }

            if (!password) {
                showFieldError('loginPassword', 'passwordError', 'Password is required.');
                valid = false;
            }

            if (!valid) return;

            // Submit to PHP
            const btn = document.getElementById('loginBtn');
            btn.classList.add('loading');
            btn.disabled = true;

            try {
                const formData = new FormData();
                formData.append('email', email);
                formData.append('password', password);

                const response = await fetch('../php/login.php', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    showAuthMessage('Login successful! Redirecting...', 'success');
                    setTimeout(() => {
                        window.location.href = 'weather.html';
                    }, 1200);
                } else {
                    showAuthMessage(data.message || 'Invalid email or password.', 'error');
                }
            } catch (error) {
                showAuthMessage('Unable to connect to the server. Please try again later.', 'error');
            } finally {
                btn.classList.remove('loading');
                btn.disabled = false;
            }
        });
    }

    // ==========================================
    // Registration Form
    // ==========================================
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            clearAllFieldErrors();
            hideAuthMessage();

            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;

            // Client-side validation
            let valid = true;

            if (!name) {
                showFieldError('regName', 'nameError', 'Name is required.');
                valid = false;
            } else if (name.length > 100) {
                showFieldError('regName', 'nameError', 'Name must be under 100 characters.');
                valid = false;
            }

            if (!email) {
                showFieldError('regEmail', 'emailError', 'Email is required.');
                valid = false;
            } else if (!isValidEmail(email)) {
                showFieldError('regEmail', 'emailError', 'Please enter a valid email address.');
                valid = false;
            }

            if (!password) {
                showFieldError('regPassword', 'passwordError', 'Password is required.');
                valid = false;
            } else if (password.length < 6) {
                showFieldError('regPassword', 'passwordError', 'Password must be at least 6 characters.');
                valid = false;
            }

            if (!confirmPassword) {
                showFieldError('regConfirmPassword', 'confirmPasswordError', 'Please confirm your password.');
                valid = false;
            } else if (password !== confirmPassword) {
                showFieldError('regConfirmPassword', 'confirmPasswordError', 'Passwords do not match.');
                valid = false;
            }

            if (!valid) return;

            // Submit to PHP
            const btn = document.getElementById('registerBtn');
            btn.classList.add('loading');
            btn.disabled = true;

            try {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('password', password);
                formData.append('confirm_password', confirmPassword);

                const response = await fetch('../php/register.php', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    showAuthMessage('Registration successful! Redirecting to login...', 'success');
                    registerForm.reset();
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                } else {
                    showAuthMessage(data.message || 'Registration failed. Please try again.', 'error');
                }
            } catch (error) {
                showAuthMessage('Unable to connect to the server. Please try again later.', 'error');
            } finally {
                btn.classList.remove('loading');
                btn.disabled = false;
            }
        });
    }
});

// ==========================================
// Auth Message Display
// ==========================================
function showAuthMessage(message, type) {
    const el = document.getElementById('authMessage');
    if (!el) return;
    el.className = `auth-message ${type}`;
    el.textContent = message;
    el.style.display = 'block';
}

function hideAuthMessage() {
    const el = document.getElementById('authMessage');
    if (!el) return;
    el.className = 'auth-message';
    el.textContent = '';
    el.style.display = 'none';
}
