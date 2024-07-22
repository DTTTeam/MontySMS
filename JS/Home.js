const apiLogin = process.env.API_Login;
const tenantKey = process.env.Key_Tenant;
const url = process.env.URL;
const registerPageUrl = process.env.Register;

Office.onReady((info) => {
    // Office is ready
    $(document).ready(() => {
        const loginForm = document.getElementById('loginForm');
        const registerButton = document.getElementById('registerButton');
        const togglePasswordIcon = document.getElementById('togglePasswordVisibility');

        if (loginForm) {
            clearSavedData(); // Clear saved data when the page loads
            loginForm.addEventListener('submit', handleFormSubmit);
        }

        if (registerButton) {
            registerButton.addEventListener('click', openRegisterPage);
        }

        if (togglePasswordIcon) {
            togglePasswordIcon.addEventListener('click', togglePasswordVisibility);
        }
    });
});

function openRegisterPage() {
    window.location.href = registerPageUrl;
}

function handleFormSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        showNotification("Username and password cannot be empty.", "error");
        return;
    }

    showSpinner();
    clearSavedData(); // Clear saved data before login
    login(username, password);
}

async function login(username, password) {
    const payload = {
        Username: username,
        Password: password,
        URL: url
    };

    try {
        const response = await fetch(apiLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Tenant': tenantKey
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
            localStorage.setItem('login', 'true');

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

function showSpinner() {
    document.getElementById('spinner').style.display = 'flex';
}

function hideSpinner() {
    document.getElementById('spinner').style.display = 'none';
}

function clearSavedData() {
    localStorage.removeItem('formData');
    Excel.run((context) => {
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        const usedRange = sheet.getUsedRange();
        usedRange.load("rowCount");

        return context.sync().then(() => {
            if (usedRange.rowCount > 1) {
                const range = sheet.getRange("A2:A" + usedRange.rowCount);
                return context.sync().then(() => {
                    range.clear(Excel.ClearApplyTo.contents);
                    return context.sync().then(() => {
                        console.log("Mobile numbers column cleared, header intact.");
                    });
                });
            } else {
                console.log("No data to clear, only the header row exists.");
            }
        }).then(() => {
            console.log('Saved data cleared.');
        });
    }).catch((error) => {
        console.error('Error clearing saved data:', error);
    });
}

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

function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const eyeIcon = document.getElementById('togglePasswordVisibility');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeIcon.classList.add('visible');
    } else {
        passwordField.type = 'password';
        eyeIcon.classList.remove('visible');
    }
}
