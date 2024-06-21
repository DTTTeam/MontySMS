const apiLogin = process.env.API_Login;
const TenantKey = process.env.Key_Tenant;
const URL = process.env.URL;
const registerPageUrl = process.env.Register;

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('loginForm');
    const registerButton = document.getElementById('registerButton');

    if (loginForm) {
        loginForm.addEventListener('submit', handleFormSubmit);
    }

    if (registerButton) {
        registerButton.addEventListener('click', openRegisterPage);
    }
});

// Open register page
function openRegisterPage() {
    window.location.href = registerPageUrl;
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        showNotification("Username and password cannot be empty.", "error");
        return;
    }

    showSpinner();
    login(username, password);
}

// Login function
async function login(username, password) {
    const payload = {
        "Username": username,
        "Password": password,
        "URL": URL
    };

    try {
        const response = await fetch(apiLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Tenant': TenantKey
            },
            body: JSON.stringify(payload)
        });

        hideSpinner();

        if (!response.ok) {
            showNotification("Login failed. Please check your username and password.", "error");
            throw new Error('Login failed');
        }

        const data = await response.json();

        if (data && data.data) {
            localStorage.setItem('accessToken', data.data.accessToken);
            localStorage.setItem('refreshToken', data.data.refreshToken);
            localStorage.setItem('externalUserId', data.data.externalUserId);
            localStorage.setItem('clientId', data.data.clientId);

            window.location.href = "SMSCampaign.html";
        } else {
            showNotification("Unexpected response format.", "error");
            throw new Error('Unexpected response format');
        }
    } catch (error) {
        hideSpinner();
        showNotification("Login failed. Please check your username and password.", "error");
        console.error('Error:', error);
    }
}

// Show spinner
function showSpinner() {
    document.getElementById('spinner').style.display = 'flex';
}

// Hide spinner
function hideSpinner() {
    document.getElementById('spinner').style.display = 'none';
}

// Show notification
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification';
    notification.classList.add(type === "error" ? 'error' : 'success');
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}
