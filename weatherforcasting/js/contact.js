/**
 * WeatherCast — Contact Page JavaScript
 * Handles contact form submission and validation
 */

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            clearAllFieldErrors();
            hideContactMessage();

            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const message = document.getElementById('contactMsg').value.trim();

            // Validate
            let valid = true;

            if (!name) {
                showFieldError('contactName', 'contactNameError', 'Name is required.');
                valid = false;
            }

            if (!email) {
                showFieldError('contactEmail', 'contactEmailError', 'Email is required.');
                valid = false;
            } else if (!isValidEmail(email)) {
                showFieldError('contactEmail', 'contactEmailError', 'Please enter a valid email address.');
                valid = false;
            }

            if (!message) {
                showFieldError('contactMsg', 'contactMsgError', 'Message is required.');
                valid = false;
            }

            if (!valid) return;

            // Submit
            const btn = document.getElementById('contactBtn');
            btn.classList.add('loading');
            btn.disabled = true;

            try {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('message', message);

                const response = await fetch('../php/contact.php', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    showContactMessage('Thank you! Your message has been sent successfully.', 'success');
                    contactForm.reset();
                } else {
                    showContactMessage(data.message || 'Failed to send message. Please try again.', 'error');
                }
            } catch (error) {
                showContactMessage('Unable to connect to the server. Please try again later.', 'error');
            } finally {
                btn.classList.remove('loading');
                btn.disabled = false;
            }
        });
    }
});

function showContactMessage(message, type) {
    const el = document.getElementById('contactMessage');
    if (!el) return;
    el.className = `auth-message ${type}`;
    el.textContent = message;
    el.style.display = 'block';
}

function hideContactMessage() {
    const el = document.getElementById('contactMessage');
    if (!el) return;
    el.className = 'auth-message';
    el.textContent = '';
    el.style.display = 'none';
}
