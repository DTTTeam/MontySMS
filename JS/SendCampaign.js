document.addEventListener("DOMContentLoaded", () => {
    const validationData = JSON.parse(localStorage.getItem('validationData'));

    if (validationData) {
        displayValidationData(validationData);
        setupEventListeners(validationData.campaignId);
        showLoadingIndicator(false);
    }
});

// Display validation data in the UI
function displayValidationData(validationData) {
    if (validationData.campaignName) {
        document.querySelector('#campaignName span').textContent = validationData.campaignName;
    }
    if (validationData.totalCost !== undefined) {
        document.querySelector('#totalCost span').textContent = validationData.totalCost;
    }
    if (validationData.inValidUrl && validationData.inValidUrl.trim() !== "") {
        const invalidUrlElem = document.querySelector('#invalidUrl a');
        invalidUrlElem.href = validationData.inValidUrl;
    } else {
        document.getElementById('invalidUrl').style.display = 'none';
    }
    if (validationData.totalValidCount !== undefined) {
        document.querySelector('#totalValidCount span').textContent = validationData.totalValidCount;
    }
    if (validationData.totalInValidCount !== undefined && validationData.totalInValidCount > 0) {
        document.querySelector('#totalInValidCount span').textContent = validationData.totalInValidCount;
    } else {
        document.getElementById('totalInValidCount').style.display = 'none';
    }

    renderValidationChart(validationData.totalValidCount, validationData.totalInValidCount);
}

// Set up event listeners for buttons
function setupEventListeners(campaignId) {
    document.getElementById('sendButton').addEventListener('click', () => {
        sendCampaign(campaignId);
    });

    document.getElementById('backButton').addEventListener('click', () => {
        localStorage.setItem('backNavigation', 'true');
        window.location.href = 'SMSCampaign.html';
    });
}

// Render validation chart using Chart.js
function renderValidationChart(validCount, invalidCount) {
    const ctx = document.getElementById('validationChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Valid', 'Invalid'],
            datasets: [{
                label: 'Numbers',
                data: [validCount, invalidCount],
                backgroundColor: [
                    '#4caf50', // Green for valid
                    '#f44336', // Red for invalid
                ],
                borderColor: [
                    '#4caf50',
                    '#f44336',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Send campaign request to the server
async function sendCampaign(campaignId) {
    const apiSendCampaign = process.env.API_SendCampaign;
    const sendButton = document.getElementById('sendButton');
    let data = null; // Declare data variable outside the try block

    const requestBody = {
        CampaignId: campaignId
    };

    try {
        showLoadingIndicator(true);
        sendButton.style.display = 'none'; // Hide the button

        const response = await fetchWithAuth(apiSendCampaign, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        data = await response.json();

        if (data.success) {
            showNotification('Campaign sent successfully!', 'success');
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Error sending campaign:', error);
        showNotification('Failed to send campaign: ' + error.message, 'error');
        sendButton.style.display = 'block'; // Show the button again if there's an error
    } finally {
        showLoadingIndicator(false);
        // Ensure button remains hidden after successful send
        if (data && data.success) {
            sendButton.style.display = 'none';
        }
    }
}

// Fetch data with authentication
async function fetchWithAuth(url, options, retry = true) {
    const accessToken = localStorage.getItem('accessToken');
    const TenantKey = process.env.Key_Tenant;
    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
        'Tenant': TenantKey
    };

    try {
        const response = await fetch(url, options);

        if (response.status === 401 && retry) {
            const newAccessToken = await refreshToken();
            options.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return fetchWithAuth(url, options, false);
        }

        return response;
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        throw error;
    }
}

// Refresh authentication token
async function refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');
    const apiRefreshToken = process.env.API_RefreshToken;
    const TenantKey = process.env.Key_Tenant;

    try {
        const response = await fetch(apiRefreshToken, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Tenant': TenantKey
            },
            body: JSON.stringify({ RefreshToken: refreshToken })
        });

        if (!response.ok) {
            throw new Error(`Failed to refresh token: ${response.statusText}`);
        }

        const data = await response.json();
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        return data.data.accessToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
}

// Show or hide the loading indicator
function showLoadingIndicator(show) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = show ? 'block' : 'none';
}

// Show a notification message
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.className = 'notification';
        notification.classList.add(type === "error" ? 'error' : 'success');
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    } else {
        console.error('Notification element not found');
    }
}
