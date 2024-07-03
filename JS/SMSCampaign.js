let isCampaignLaunching = false;
const groupContactsMap = {}; // Map to store group contacts
const groupContactNumbers = new Set(); // Set to track group contact numbers
const manualContacts = new Set(); // S
var fieldOrder = [];
let count = 0;
const phoneNumbers = [];
const fixedOrder = [
    "Mobile Number", "LongUrl", "Title", "FirstName", "LastName",
    "Country", "Email", "Address", "City", "Gender"
];
const placeholderMap = {
    "title": "Title",
    "firstname": "FirstName",
    "lastname": "LastName",
    "mobile": "Mobile Number",
    "email": "Email",
    "dob": "DOB",
    "address": "Address",
    "city": "City",
    "gender": "Gender",
    "country": "Country"
};



document.addEventListener("DOMContentLoaded", function () {
    Office.onReady(function (info) {
        if (info.host === Office.HostType.Excel) {
            AddMobileNumberColumn();
            setupEventListeners();
            const container = document.querySelector('.campaign-container');
            if (container) {
             
                container.style.backgroundColor = '#fff'; // Ensure background is white
            }
            fetchData().then(() => {
                const backNavigation = localStorage.getItem('backNavigation');
                if (backNavigation === 'true') {
                    localStorage.removeItem('backNavigation');
                    updateMessageCounter();
                    restoreFormData();
                } else {
                    localStorage.removeItem('formData');
                }
            });
        } else {
            console.error("This script only runs in Excel.");
        }
    });
});
function setupEventListeners() {
    const templateDropdown = document.getElementById('template');
    templateDropdown.addEventListener('change', handleTemplateChange);

    const columnTypeDropdown = document.getElementById('columnTypeDropdown');
    columnTypeDropdown.addEventListener('change', handleColumnTypeChange);

    const dropdownButton = document.getElementById('dropdownButton');
    if (!dropdownButton.dataset.eventAdded) {
        dropdownButton.addEventListener('click', toggleDropdown);
        dropdownButton.dataset.eventAdded = true;
    }

    const checkboxes = document.querySelectorAll('#dropdownContent input[type=checkbox]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            updateMessage(this.value, this.checked);
        });
    });
    const contactDropdownButton = document.getElementById('contactDropdownButton');
    if (!contactDropdownButton.dataset.eventAdded) {
        contactDropdownButton.addEventListener('click', toggleContactDropdown);
        contactDropdownButton.dataset.eventAdded = true;
    }

    const groupDropdownButton = document.getElementById('groupDropdownButton');
    if (!groupDropdownButton.dataset.eventAdded) {
        groupDropdownButton.addEventListener('click', toggleGroupDropdown);
        groupDropdownButton.dataset.eventAdded = true;
    }

    const messageElement = document.getElementById('message');
    if (!messageElement.dataset.eventAdded) {
        messageElement.addEventListener('input', updateMessageCounter);
        messageElement.dataset.eventAdded = true;
    }

    const launchButton = document.getElementById('launchButton');
    if (!launchButton.dataset.eventAdded) {
        launchButton.addEventListener('click', launchCampaign);
        launchButton.dataset.eventAdded = true;
    }

    const backButton = document.getElementById('backButton');
    if (!backButton.dataset.eventAdded) {
        backButton.addEventListener('click', () => {
            localStorage.setItem('backNavigation', 'true');
            window.location.href = 'Home.html';
        });
        backButton.dataset.eventAdded = true;
    }

    const campaignForm = document.getElementById('campaignForm');
    if (!campaignForm.dataset.eventAdded) {
        campaignForm.addEventListener('submit', function (event) {
            event.preventDefault();
            launchCampaign();
        });
        campaignForm.dataset.eventAdded = true;
    }

    templateDropdown.addEventListener('change', function () {
        const templateId = this.value;
        if (templateId) {
            fetchTemplateById(templateId).then(() => {
                messageElement.readOnly = true;
                dropdownButton.style.display = 'none';
                document.getElementById('shortenUrlButton').style.display = 'none';
            }).catch(error => {
                console.error(`Error fetching template: ${error}`);
            });
        } else {
            messageElement.readOnly = false;
            dropdownButton.style.display = 'block';
            messageElement.value = '';
            document.getElementById('shortenUrlButton').style.display = 'block';
        }
    });

    if (!document.body.dataset.fetchDataCalled) {
        fetchSenders();
        fetchGroups();
        fetchTemplates();
        fetchBalance();
        fetchContacts();
        document.body.dataset.fetchDataCalled = true;
    }

    const urlModal = document.getElementById("urlModal");
    const shortenUrlButton = document.getElementById("shortenUrlButton");
    const closeModal = document.getElementsByClassName("close")[0];
    const urlForm = document.getElementById("urlForm");

    shortenUrlButton.onclick = function () {
        urlModal.style.display = "block";
    }

    closeModal.onclick = function () {
        urlModal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == urlModal) {
            urlModal.style.display = "none";
        }
    }

    urlForm.onsubmit = async function (event) {
        event.preventDefault();
        const longUrl = document.getElementById("longUrl").value;

        try {
            const shortUrl = await getShortUrl(longUrl);
            insertShortUrlIntoMessage(shortUrl);
            urlModal.style.display = "none";
        } catch (error) {
            console.error('Error getting short URL:', error);
            showNotification('Error getting short URL. Please try again.', "error");
        }
    }
}
async function fetchData() {
    await fetchSenders();
    await fetchGroups();
    await fetchTemplates();
    await fetchBalance();
}

// Group and contact function
function fetchGroups() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';

    const apiGetGroup = process.env.API_GetGroup;

    fetchWithAuth(apiGetGroup, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.data && data.data.phoneBooks) {
                populateGroups(data.data.phoneBooks);
            } else {
                console.error('Unexpected response format:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching groups:', error);
        })
        .finally(() => {
            loadingIndicator.style.display = 'none';
        });
}
function populateGroups(groups) {
    const groupDropdownContent = document.getElementById('groupDropdownContent');

    // Clear previous content to prevent duplicates
    groupDropdownContent.innerHTML = `
        <input type="text" id="groupSearch" placeholder="Search for groups..." onkeyup="filterGroups()">
    `;

    groups.forEach(group => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = group.recordGuid;
        checkbox.addEventListener('change', fetchContactsFromGroup);
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(group.name));
        groupDropdownContent.appendChild(label);
    });
    restoreFormData();
}
function fetchContactsFromGroup() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';

    const selectedGroups = Array.from(document.querySelectorAll('#groupDropdownContent input[type=checkbox]:checked')).map(checkbox => checkbox.value);
    const apiGetContactByGroup = process.env.API_GetContactByGroup;

    const fetchPromises = selectedGroups.filter(groupId => !groupContactsMap[groupId]).map(groupId => {
        const apiUrl = `${apiGetContactByGroup}${groupId}`;
        return fetchWithAuth(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        }).then(data => {
            groupContactsMap[groupId] = data.data.phoneBookContacts.map(contact => contact.mobileNumber);
            groupContactsMap[groupId].forEach(contact => groupContactNumbers.add(contact));
        });
    });

    Promise.all(fetchPromises)
        .then(() => {
            Object.keys(groupContactsMap).forEach(groupId => {
                if (!selectedGroups.includes(groupId)) {
                    groupContactsMap[groupId].forEach(contact => groupContactNumbers.delete(contact));
                    delete groupContactsMap[groupId];
                }
            });

            updateExcel();
        })
        .catch(error => {
            console.error('Error fetching contacts:', error);
        })
        .finally(() => {
            loadingIndicator.style.display = 'none';
        });
}
function manageContactInExcel(event) {
    const mobileNumber = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
        addContactToExcel(mobileNumber);
    } else {
        removeContactFromExcel(mobileNumber);
    }
}
function addContactToExcel(mobileNumber) {
    manualContacts.add(mobileNumber);
    updateExcel();
}
function removeContactFromExcel(mobileNumber) {
    manualContacts.delete(mobileNumber);
    updateExcel();
}
function toggleContactDropdown() {
    const contactDropdownContent = document.getElementById("contactDropdownContent");
    const groupDropdownContent = document.getElementById("groupDropdownContent");

    // Hide group dropdown if it's open
    if (groupDropdownContent.classList.contains("show")) {
        groupDropdownContent.classList.remove("show");
    }

    // Toggle contact dropdown
    contactDropdownContent.classList.toggle("show");
}
window.filterContacts = function () {
    const searchInput = document.getElementById('contactSearch').value.toLowerCase();
    const labels = document.querySelectorAll('#contactDropdownContent label');
    labels.forEach(label => {
        const text = label.textContent.toLowerCase();
        if (text.includes(searchInput)) {
            label.style.display = '';
        } else {
            label.style.display = 'none';
        }
    });
};

window.filterGroups = function () {
    const searchInput = document.getElementById('groupSearch').value.toLowerCase();
    const labels = document.querySelectorAll('#groupDropdownContent label');
    labels.forEach(label => {
        const text = label.textContent.toLowerCase();
        if (text.includes(searchInput)) {
            label.style.display = '';
        } else {
            label.style.display = 'none';
        }
    });
};
function fetchContacts() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';

    const apiGetContact = process.env.API_GetContact;

    fetchWithAuth(apiGetContact, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.data && data.data.contacts) {
                populateContacts(data.data.contacts);
            } else {
                console.error('Unexpected response format:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching contacts:', error);
        })
        .finally(() => {
            loadingIndicator.style.display = 'none';
        });
}
function populateContacts(contacts) {
    const contactDropdownContent = document.getElementById('contactDropdownContent');

    // Clear previous content to prevent duplicates
    contactDropdownContent.innerHTML = `
        <input type="text" id="contactSearch" placeholder="Search for contacts..." onkeyup="filterContacts()">
    `;

    contacts.forEach(contact => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = contact.mobileNumber;
        checkbox.addEventListener('change', manageContactInExcel);
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(`${contact.firstName} ${contact.lastName} (${contact.mobileNumber})`));
        contactDropdownContent.appendChild(label);
    });
}
function toggleGroupDropdown() {
    const groupDropdownContent = document.getElementById("groupDropdownContent");
    const contactDropdownContent = document.getElementById("contactDropdownContent");

    // Hide contact dropdown if it's open
    if (contactDropdownContent.classList.contains("show")) {
        contactDropdownContent.classList.remove("show");
    }

    // Toggle group dropdown
    groupDropdownContent.classList.toggle("show");
}
function updateExcel() {
    Excel.run(function (context) {
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        const usedRange = sheet.getUsedRange();
        usedRange.load('values');

        return context.sync().then(function () {
            const currentValues = usedRange.values.map(row => row[0]).filter(value => value); // Existing values in column A
            console.log('Current values:', currentValues);

            // Collect group contacts
            const groupContacts = [];
            Object.values(groupContactsMap).forEach(contacts => {
                groupContacts.push(...contacts);
            });

            // Collect manual contacts
            const manualContactsArray = Array.from(manualContacts);

            // Combine both lists
            const newValues = [...new Set([...manualContactsArray, ...groupContacts])]; // Remove duplicates

            // Create 2D array for setting values in Excel
            const updatedValues = newValues.map(value => [value]);

            // Ensure we have at least one row to avoid mismatch error
            if (updatedValues.length === 0) {
                updatedValues.push([""]);
            }

            // Update Excel
            const rangeToUpdate = sheet.getRange(`A2:A${updatedValues.length + 1}`);
            rangeToUpdate.values = updatedValues;

            // Clear remaining cells
            if (updatedValues.length < usedRange.values.length) {
                const rangeToClear = sheet.getRange(`A${updatedValues.length + 2}:A${usedRange.values.length + 1}`);
                rangeToClear.clear();
            }

            return context.sync();
        });
    }).catch(function (error) {
        console.log("Error updating Excel:", error);
    });
}
//End 





//Fetch

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


//URL and Balance
function insertShortUrlIntoMessage(shortUrl) {
    const messageField = document.getElementById('message');
    messageField.value += ` ${shortUrl}`;
    updateMessageCounter();
}
async function getShortUrl(longUrl) {
    const apiUrl = process.env.API_ShortUrl;




    try {
        const response = await fetchWithAuth(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data); // Log the entire response
        return data.data.shortUrl;
    } catch (error) {
        console.error('Error getting short URL:', error);
        throw error;
    }
}
function fetchBalance() {
    const apiGetBalance = `${process.env.API_GetBalance}${localStorage.getItem("clientId")}`;

    fetchWithAuth(apiGetBalance, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
                const balanceData = data.data[0]; // Accessing the first element of the data array
                document.getElementById('currentBalance').textContent = `${balanceData.currentBalance} ${balanceData.currencyCode}`;
            } else {
                console.error('Unexpected response format:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching balance:', error);
        });
}


//Sender
function fetchSenders() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';

    const apiGetSender = process.env.API_GETSender;

    fetchWithAuth(apiGetSender, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.data && data.data.senders) {
                populateSenders(data.data.senders);
            } else {
                console.error('Unexpected response format:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching senders:', error);
        })
        .finally(() => {
            loadingIndicator.style.display = 'none';
        });
}
function populateSenders(senders) {
    const senderSelect = document.getElementById('sender');
    senderSelect.innerHTML = '<option value="">Select a sender</option>'; // Clear existing options and add default option

    senders.forEach(sender => {
        const option = document.createElement('option');
        option.value = sender.recordGuid;
        option.text = sender.name;
        senderSelect.appendChild(option);
    });

    restoreFormData(); // Make sure to call restoreFormData after populating the dropdown
}



//Template
function fetchTemplates() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';

    const apiGetTemplates = process.env.API_GetTemplate;

    fetchWithAuth(apiGetTemplates, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.data && data.data.smsTemplates) {
                populateTemplates(data.data.smsTemplates);
            } else {
                console.error('Unexpected response format:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching templates:', error);
        })
        .finally(() => {
            loadingIndicator.style.display = 'none';
        });
}
function populateTemplates(templates) {
    const templateSelect = document.getElementById('template');
    templateSelect.innerHTML = '<option value="">Select a template</option>'; // Clear existing options

    templates.forEach(template => {
        const option = document.createElement('option');
        option.value = template.recordGuid;
        option.text = template.name;
        templateSelect.appendChild(option);
    });
    restoreFormData();
}
function fetchTemplateById(templateId) {
    return new Promise((resolve, reject) => {
        const loadingIndicator = document.getElementById('loadingIndicator');
        loadingIndicator.style.display = 'block';

        const apiGetTemplateById = `${process.env.API_GetTemplateById}${templateId}`;
        console.log(`Fetching template with ID: ${templateId}`);

        fetchWithAuth(apiGetTemplateById, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(`Response status: ${response.status}`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Response data:', data);
                if (data && data.data && data.data.smsTemplate) {
                    const template = data.data.smsTemplate;
                    console.log('Template fetched:', template);
                    displayTemplate(template);
                    const placeholders = extractPlaceholders(template.text);
                    console.log('Extracted placeholders:', placeholders);
                    updateMessageCounter();
                    resolve(template);
                } else {
                    console.error('Unexpected response format:', data);
                    reject('Unexpected response format');
                }
            })
            .catch(error => {
                console.error(`Error fetching template with ID ${templateId}:`, error);
                reject(error);
            })
            .finally(() => {
                loadingIndicator.style.display = 'none';
            });
    });
}
function handleTemplateChange() {
    const templateId = document.getElementById('template').value;
    const messageField = document.getElementById('message');
    const dropdownButton = document.getElementById('dropdownButton');

    if (templateId) {
        messageField.readOnly = true;
        dropdownButton.style.display = 'none';
        fetchTemplateById(templateId)
            .then(template => {
                if (template && template.text) {
                    messageField.value = template.text;
                } else {
                    console.error('Template text is undefined or template is null');
                }
            })
            .catch(error => {
                console.error(`Error fetching template: ${error}`);
            });
    } else {
        messageField.readOnly = false;
        dropdownButton.style.display = 'block';
        messageField.value = ''; // Clear the message field
    }
}
function displayTemplate(template) {
    const messageField = document.getElementById('message');
    messageField.value = template.text;
}
function extractPlaceholders(message) {
    const regex = /\{(\w+)\}/g;
    const placeholders = [];
    let match;
    while ((match = regex.exec(message)) !== null) {
        placeholders.push(`{${match[1]}}`);
    }
    return placeholders;
}




//Campaign
async function downloadExcelFile(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    worksheet.addRows(data);

    // Apply formatting to headers
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell, colNumber) => {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF0B5394' } // Dark blue color
        };
        cell.font = {
            color: { argb: 'FFFFFFFF' }, // White color
            bold: true,
            size: 12
        };
        cell.alignment = {
            horizontal: 'center'
        };
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "SampleDestinationsWithVariablesAndLongUrl .xlsx";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
}
const loadingIndicator = document.getElementById('loadingIndicator');
function showLoading() {
    loadingIndicator.style.display = 'block';
}
function hideLoading() {
    loadingIndicator.style.display = 'none';
}
function handleValidationError() {
    isCampaignLaunching = false;
    hideLoading();
}
function handleValidationSuccess(response, campaignName) {
    hideLoading();
    const data = response.data;

    var validationData = {
        campaignName: campaignName,
        campaignId: data.campaignId,
        validUrl: data.validUrl || '', // Handle null values
        inValidUrl: data.inValidUrl || '', // Handle null values
        totalValidCount: data.totalValidCount || 0, // Handle null values
        totalInValidCount: data.totalInValidCount || 0, // Handle null values
        totalCost: data.totalValidRate || 0, // Handle null values
        reason: data.reason || ''
    };
    console.log(validationData);
    if (validationData.reason === "do not have enough balance") {
        showNotification("You do not have enough balance.");
        return; // Prevent navigation to the next HTML page
    }

    localStorage.setItem('validationData', JSON.stringify(validationData));
    saveFormData();
    window.location.href = 'SendCampaign.html';
}
async function validateCampaignNormally(campaignName, campaignContent, senderId, phoneNumbers, hasShortUrl, longUrl) {
    showLoading(); // Show loading indicator
    const apiValidate = process.env.API_Validate;
    const placeholders = extractPlaceholders(campaignContent);

    const requestBody = {
        Campaign: {
            ChannelId: process.env.SMS_Channel,
            Name: campaignName,
            Content: campaignContent,
            SenderId: senderId,
            HasShortUrl: hasShortUrl,
            LongUrl: longUrl,
            ClientAccountId: localStorage.getItem('clientId'),
            Variables: placeholders,
            HasBlacklistShortUrl: false
        },
        PhoneNumbers: phoneNumbers.map(String)
    };

    try {
        const response = await fetchWithAuth(apiValidate, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error validating campaign:', error);
        throw error;
    } finally {
        hideLoading(); // Hide loading indicator when the operation is complete
    }
}
async function validateCampaignWithFile(campaignName, campaignContent, senderId, hasShortUrl, longUrl) {
    showLoading(); // Show loading indicator
    const apiValidateFile = process.env.API_Validate_File;
    const tenantKey = process.env.Key_Tenant;
    const SMSCHannel = process.env.SMS_Channel;
    const placeholders = extractPlaceholders(campaignContent);

    try {
        await Excel.run(async (context) => {
            const workbook = context.workbook;
            const worksheet = workbook.worksheets.getActiveWorksheet();

            const usedRange = worksheet.getUsedRange();
            usedRange.load("values");

            await context.sync();

            const workbookBlob = await getWorkbookBlob(usedRange.values);

            const formData = new FormData();
            formData.append('file', workbookBlob, "SampleDestinationsWithVariablesAndLongUrl.xlsx");
            formData.append('countryCode', '');
            formData.append('Campaign', JSON.stringify({
                channelId: SMSCHannel,
                Name: campaignName,
                Content: campaignContent,
                SenderId: senderId,
                HasShortUrl: hasShortUrl,
                LongUrl: longUrl,
                ClientAccountId: localStorage.getItem('clientId'),
                Variables: placeholders,
                HasBlacklistShortUrl: false
            }));
            formData.append('LongUrlFromFile', "false");

            const response = await fetchWithAuth(apiValidateFile, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                    'Origin': 'https://app.montymobile.com',
                    'Pragma': 'no-cache',
                    'Referer': 'https://app.montymobile.com/',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-site',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
                    'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data = await response.json();
            handleValidationSuccess(data, campaignName);
        });
    } catch (error) {
        console.error("Error validating campaign with file: ", error);
        showNotification('Error validating campaign. Please try again.', "Error");
    } finally {
        hideLoading(); // Hide loading indicator when the operation is complete
    }
}
function launchCampaign() {
    if (isCampaignLaunching) {
        showNotification('Campaign launch already in progress...', "Valid");
        return;
    }
    isCampaignLaunching = true;
    showLoading(); // Show loading indicator
    localStorage.removeItem('formData');
    const campaignName = document.getElementById('campaignName').value;
    const sender = document.getElementById('sender').value;
    let message = document.getElementById('message').value;
    const longUrlInput = document.getElementById('longUrl').value;

    getNonEmptyMobileNumbers().then(phoneNumbers => {
        if (!campaignName || !sender || !message || phoneNumbers.length <= 1) {
            showNotification('Please enter all mandatory fields: campaign name, sender, mobile number, and message.', "Error");
            isCampaignLaunching = false;
            hideLoading(); // Hide loading indicator
            return;
        }

        let hasShortUrl = false;
        let longUrl = null;

        if (longUrlInput) {
            hasShortUrl = true;
            longUrl = longUrlInput;
            getShortUrl(longUrlInput).then(shortUrl => {
                handleColumnType().then(isVariable => {
                    if (isVariable) {
                        validateCampaignWithFile(campaignName, message, sender, hasShortUrl, longUrl).then(data => {
                            handleValidationSuccess(data, campaignName);
                        }).catch(error => {
                            handleValidationError();
                        });
                    } else {
                        validateCampaignNormally(campaignName, message, sender, phoneNumbers, hasShortUrl, longUrl).then(data => {
                            handleValidationSuccess(data, campaignName);
                        }).catch(error => {
                            handleValidationError();
                        });
                    }
                }).catch(error => {
                    console.error('Error checking column type:', error);
                    showNotification('Error checking column type. Please try again.', "Error");
                    isCampaignLaunching = false;
                    hideLoading(); // Hide loading indicator
                });
            }).catch(error => {
                console.error('Error getting short URL:', error);
                showNotification('Error getting short URL. Please try again.', "Error");
                isCampaignLaunching = false;
                hideLoading(); // Hide loading indicator
            });
        } else {
            handleColumnType().then(isVariable => {
                if (isVariable) {
                    validateCampaignWithFile(campaignName, message, sender, hasShortUrl, longUrl).then(data => {
                        handleValidationSuccess(data, campaignName);
                    }).catch(error => {
                        handleValidationError();
                    });
                } else {
                    validateCampaignNormally(campaignName, message, sender, phoneNumbers, hasShortUrl, longUrl).then(data => {
                        handleValidationSuccess(data, campaignName);
                    }).catch(error => {
                        handleValidationError();
                    });
                }
            }).catch(error => {
                console.error('Error checking column type:', error);
                showNotification('Error checking column type. Please try again.', "Error");
                isCampaignLaunching = false;
                hideLoading(); // Hide loading indicator
            });
        }
    }).catch(error => {
        console.error('Error collecting phone numbers:', error);
        showNotification('Error collecting phone numbers. Please try again.', "Error");
        isCampaignLaunching = false;
        hideLoading(); // Hide loading indicator
    });
}



//function handleValidationError() {
//    isCampaignLaunching = false;
//}
//function handleValidationSuccess(response, campaignName) {
//    const loadingIndicator = document.getElementById('loadingIndicator');
//    loadingIndicator.style.display = 'block';
//    const data = response.data;

//    var validationData = {
//        campaignName: campaignName,
//        campaignId: data.campaignId,
//        validUrl: data.validUrl || '', // Handle null values
//        inValidUrl: data.inValidUrl || '', // Handle null values
//        totalValidCount: data.totalValidCount || 0, // Handle null values
//        totalInValidCount: data.totalInValidCount || 0, // Handle null values
//        totalCost: data.totalValidRate || 0, // Handle null values
//        reason: data.reason || ''
//    };

//    if (validationData.reason === "do not have enough balance") {
//        showNotification("You do not have enough balance.");
//        loadingIndicator.style.display = 'none';
//        return; // Prevent navigation to the next HTML page
//    }

//    localStorage.setItem('validationData', JSON.stringify(validationData));
//    saveFormData();
//    window.location.href = 'SendCampaign.html';
//}

//async function validateCampaignNormally(campaignName, campaignContent, senderId, phoneNumbers, hasShortUrl, longUrl) {

 
//    const apiValidate = process.env.API_Validate;
//    const placeholders = extractPlaceholders(campaignContent);

//    const requestBody = {
//        Campaign: {
//            ChannelId: process.env.SMS_Channel,
//            Name: campaignName,
//            Content: campaignContent,
//            SenderId: senderId,
//            HasShortUrl: hasShortUrl,
//            LongUrl: longUrl,
//            ClientAccountId: localStorage.getItem('clientId'),
//            Variables: placeholders,
//            HasBlacklistShortUrl: false
//        },
//        PhoneNumbers: phoneNumbers.map(String)
//    };

//    try {
//        const response = await fetchWithAuth(apiValidate, {
//            method: 'POST',
//            headers: {
//                'Content-Type': 'application/json'
//            },
//            body: JSON.stringify(requestBody)
//        });

//        if (!response.ok) {
//            throw new Error(`Network response was not ok: ${response.statusText}`);
//        }

//        const data = await response.json();
    
//        return data;
//    } catch (error) {
//        console.error('Error validating campaign:', error);
//        throw error;
//    }
//}
//async function validateCampaignWithFile(campaignName, campaignContent, senderId, hasShortUrl, longUrl) {
//    const apiValidateFile = process.env.API_Validate_File;
//    const tenantKey = process.env.Key_Tenant;
//    const SMSCHannel = process.env.SMS_Channel;
//    const placeholders = extractPlaceholders(campaignContent);

//    try {
//        await Excel.run(async (context) => {
//            const workbook = context.workbook;
//            const worksheet = workbook.worksheets.getActiveWorksheet();

//            const usedRange = worksheet.getUsedRange();
//            usedRange.load("values");

//            await context.sync();

//            const workbookBlob = await getWorkbookBlob(usedRange.values);

//            const formData = new FormData();
//            formData.append('file', workbookBlob, "SampleDestinationsWithVariablesAndLongUrl.xlsx");
//            formData.append('countryCode', '');
//            formData.append('Campaign', JSON.stringify({
//                channelId: SMSCHannel,
//                Name: campaignName,
//                Content: campaignContent,
//                SenderId: senderId,
//                HasShortUrl: hasShortUrl,
//                LongUrl: longUrl,
//                ClientAccountId: localStorage.getItem('clientId'),
//                Variables: placeholders,
//                HasBlacklistShortUrl: false
//            }));
//            formData.append('LongUrlFromFile', "false");

//            const response = await fetchWithAuth(apiValidateFile, {
//                method: 'POST',
//                headers: {
//                    'Accept': 'application/json, text/plain, */*',
//                    'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8',
//                    'Cache-Control': 'no-cache',
//                    'Connection': 'keep-alive',
//                    'Origin': 'https://app.montymobile.com',
//                    'Pragma': 'no-cache',
//                    'Referer': 'https://app.montymobile.com/',
//                    'Sec-Fetch-Dest': 'empty',
//                    'Sec-Fetch-Mode': 'cors',
//                    'Sec-Fetch-Site': 'same-site',
//                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
//                    'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
//                    'sec-ch-ua-mobile': '?0',
//                    'sec-ch-ua-platform': '"Windows"',
//                },
//                body: formData
//            });

//            if (!response.ok) {
//                throw new Error(`Network response was not ok: ${response.statusText}`);
//            }

//            const data = await response.json();


//            handleValidationSuccess(data, campaignName);

//        });
//    } catch (error) {
//        console.error("Error validating campaign with file: ", error);
//        showNotification('Error validating campaign. Please try again.', "Error");
//    }
//}
//function launchCampaign() {


//    if (isCampaignLaunching) {
//        showNotification('Campaign launch already in progress...', "Valid");
      
      
//        return;
//    }
//    isCampaignLaunching = true;
//    localStorage.removeItem('formData');
//    const campaignName = document.getElementById('campaignName').value;
//    const sender = document.getElementById('sender').value;
//    let message = document.getElementById('message').value;
//    const longUrlInput = document.getElementById('longUrl').value;

//    getNonEmptyMobileNumbers().then(phoneNumbers => {
//        if (!campaignName || !sender || !message || phoneNumbers.length <= 1) {
//            showNotification('Please enter all mandatory fields: campaign name, sender, mobile number, and message.', "Error");
//            isCampaignLaunching = false;
//            return;
//        }

//        let hasShortUrl = false;
//        let longUrl = null;

//        if (longUrlInput) {
//            hasShortUrl = true;
//            longUrl = longUrlInput;
//            getShortUrl(longUrlInput).then(shortUrl => {


//                handleColumnType().then(isVariable => {
//                    if (isVariable) {
//                        validateCampaignWithFile(campaignName, message, sender, hasShortUrl, longUrl).then(data => {
//                            handleValidationSuccess(data, campaignName);
                          
//                        }).catch(error => {
//                            handleValidationError();
//                        });
//                    } else {

//                        validateCampaignNormally(campaignName, message, sender, phoneNumbers, hasShortUrl, longUrl).then(data => {
//                            handleValidationSuccess(data, campaignName);
//                        }).catch(error => {
//                            handleValidationError();
//                        });
//                    }
//                }).catch(error => {
//                    console.error('Error checking column type:', error);
//                    showNotification('Error checking column type. Please try again.', "Error");
//                    isCampaignLaunching = false;
//                });
//            }).catch(error => {
//                console.error('Error getting short URL:', error);
//                showNotification('Error getting short URL. Please try again.', "Error");
//                isCampaignLaunching = false;
//            });
//        } else {
//            handleColumnType().then(isVariable => {
//                if (isVariable) {
//                    validateCampaignWithFile(campaignName, message, sender, hasShortUrl, longUrl).then(data => {
//                        handleValidationSuccess(data, campaignName);
//                    }).catch(error => {
//                        handleValidationError();
//                    });
//                } else {
//                    validateCampaignNormally(campaignName, message, sender, phoneNumbers, hasShortUrl, longUrl).then(data => {
//                        handleValidationSuccess(data, campaignName);
//                    }).catch(error => {
//                        handleValidationError();
//                    });
//                }
//            }).catch(error => {
//                console.error('Error checking column type:', error);
//                showNotification('Error checking column type. Please try again.', "Error");
//                isCampaignLaunching = false;
//            });
//        }
//    }).catch(error => {
//        console.error('Error collecting phone numbers:', error);
//        showNotification('Error collecting phone numbers. Please try again.', "Error");
//        isCampaignLaunching = false;
//    });
//}

function saveFormData() {
    const formData = {
        campaignName: document.getElementById('campaignName').value,
        sender: document.getElementById('sender').value,
        message: document.getElementById('message').value,
        selectedGroups: Array.from(document.querySelectorAll('#groupDropdownContent input[type=checkbox]:checked')).map(checkbox => ({
            groupId: checkbox.value,
            contacts: groupContactsMap[checkbox.value] || []
        })),
        selectedContacts: Array.from(document.querySelectorAll('#contactDropdownContent input[type=checkbox]:checked')).map(checkbox => checkbox.value),
        templateId: document.getElementById('template').value,
        type: document.getElementById('columnTypeDropdown').value,
        manualContacts: JSON.stringify(Array.from(manualContacts))
    };
    localStorage.setItem('formData', JSON.stringify(formData));

    // Save Excel data
    Excel.run(async (context) => {
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        const usedRange = sheet.getUsedRange();
        usedRange.load('values');
        await context.sync();

        const excelData = usedRange.values;
        localStorage.setItem('excelData', JSON.stringify(excelData));
    }).catch(function (error) {
        console.error('Error saving Excel data:', error);
    });
}
function restoreFormData() {
    const formData = JSON.parse(localStorage.getItem('formData'));
    if (formData) {
        document.getElementById('campaignName').value = formData.campaignName;
        document.getElementById('sender').value = formData.sender;
        document.getElementById('message').value = formData.message;
        document.getElementById('columnTypeDropdown').value = formData.type;

        // Restore template selection
        if (formData.templateId) {
  
            document.getElementById('template').value = formData.templateId;
            document.getElementById('shortenUrlButton').style.display = 'none';
            document.getElementById('message').readOnly = true;
            document.getElementById('dropdownButton').style.display = 'none';

        }

        // Restore selected groups and their contacts
        formData.selectedGroups.forEach(group => {
            const checkbox = document.querySelector(`#groupDropdownContent input[value="${group.groupId}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
            groupContactsMap[group.groupId] = group.contacts;
            group.contacts.forEach(contact => groupContactNumbers.add(contact));
        });

        // Restore selected contacts
        formData.selectedContacts.forEach(contact => {
            const checkbox = document.querySelector(`#contactDropdownContent input[value="${contact}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });

        // Restore manual contacts
        manualContacts.clear();
        const restoredManualContacts = new Set(JSON.parse(formData.manualContacts));
        for (const contact of restoredManualContacts) {
            manualContacts.add(contact);
        }

        // Handle column type restoration
        if (formData.type === 'Variable') {
            AddAllColumns();
        } else {
            AddMobileNumberColumn();
        }

        // Restore Excel data
        const excelData = JSON.parse(localStorage.getItem('excelData'));
        if (excelData) {
            Excel.run(async (context) => {
                const sheet = context.workbook.worksheets.getActiveWorksheet();
                const range = sheet.getRange(`A1:${String.fromCharCode(64 + excelData[0].length)}${excelData.length}`);
                range.values = excelData;
                await context.sync();
            }).catch(function (error) {
                console.error('Error restoring Excel data:', error);
            });
        }
    }
}

function handleColumnType() {

    return new Promise((resolve) => {
        const columnType = document.getElementById('columnTypeDropdown').value;
        resolve(columnType === 'Variable');
    });
}
function handleColumnTypeChange() {
    const columnType = document.getElementById('columnTypeDropdown').value;
    if (columnType === 'Header') {
        AddMobileNumberColumn();
    } else if (columnType === 'Variable') {
        AddAllColumns();
    }

}
function updateMessage(fieldName, isChecked) {
    const messageField = document.getElementById('message');
    const currentMessage = messageField.value;

    // Extract placeholders from the current message
    const placeholders = extractPlaceholders(currentMessage);

    // Add or remove the selected field placeholder
    if (isChecked) {
        if (!placeholders.includes(fieldName.toLowerCase())) {
            messageField.value += ` {${fieldName.toLowerCase()}}`;
        }
    } else {
        messageField.value = currentMessage.replace(` {${fieldName.toLowerCase()}}`, '');
    }

    updateMessageCounter();
}
function toggleDropdown() {
    const dropdownContent = document.getElementById('dropdownContent');
    dropdownContent.classList.toggle('show');
}
function updateMessageCounter() {
    const message = document.getElementById('message').value;
    const messageCounter = document.getElementById('messageCounter');


    const unicodeRegex = /[^\u0000-\u007F]/;


    const isUnicode = unicodeRegex.test(message);


    const charLimit = isUnicode ? 70 : 160;

    const charCount = message.length;
    const messageCount = Math.ceil(charCount / charLimit);
    const charsLeft = charLimit - (charCount % charLimit);

    messageCounter.innerHTML = `${charCount}/${charLimit} characters | ${charsLeft} characters left | ${messageCount} message${messageCount > 1 ? 's' : ''}`;
}
function getNonEmptyMobileNumbers() {
    return Excel.run(function (context) {
        const sheet = context.workbook.worksheets.getActiveWorksheet();

        const usedRange = sheet.getUsedRange();
        usedRange.load("rowCount");

        return context.sync().then(() => {
            const mobileNumberColumn = sheet.getRange("A2:A" + usedRange.rowCount);
            mobileNumberColumn.load("values");

            return context.sync().then(() => {
                const phoneNumbers = mobileNumberColumn.values
                    .filter(row => {
                        const value = row[0];
                        return value !== null && value !== undefined && String(value).trim() !== '';
                    })
                    .map(row => String(row[0]).trim());

              
                return phoneNumbers;
            });
        });
    }).catch(function (error) {
        console.error('Error collecting non-empty mobile numbers:', error);
    });
}
function AddAllColumns() {
    Excel.run(function (context) {
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        const fixedOrder = [
            "Mobile Number", "LongUrl", "Title", "FirstName", "LastName",
            "Country", "Email", "Address", "City", "Gender"
        ];
        const usedRange = sheet.getUsedRange();
        usedRange.load('rowCount, columnCount');

        return context.sync().then(() => {
            // Clear all rows except for the Mobile Number column
            if (usedRange.rowCount > 1) {
                const dataRange = sheet.getRangeByIndexes(1, 1, usedRange.rowCount - 1, usedRange.columnCount - 1);
                dataRange.clear();
            }

            fixedOrder.forEach((header, index) => {
                const cell = sheet.getCell(0, index);
                cell.values = [[header]];
                cell.format.fill.color = "#ed204c"; // Set header cell color to #ed204c
                cell.format.font.color = "#FFFFFF"; // White text color
                cell.format.font.bold = true; // Bold text
                cell.format.font.size = 12; // Font size
                cell.format.horizontalAlignment = "Center"; // Center alignment
            });

            return context.sync().then(() => {
                // Auto fit columns
                sheet.getUsedRange().getEntireColumn().format.autofitColumns();
              /*  validateAndFillMobileNumbers(); // Ensure validation is called after setting headers*/
                console.log('All columns added and fitted successfully');
            });
        });
    }).catch(function (error) {
        console.error('Error adding all columns:', error);
    });
}
function AddMobileNumberColumn() {
    Excel.run(function (context) {
        const sheet = context.workbook.worksheets.getActiveWorksheet();

        // Check if sheet is valid
        if (!sheet) {
            console.error("Error: Active worksheet not found.");
            return;
        }

        const headers = ["Mobile Number"];
        headers.forEach((header, index) => {
            const cell = sheet.getCell(0, index);
            cell.values = [[header]];
            cell.format.fill.color = "#ed204c"; // Set header cell color to #ed204c
            cell.format.font.color = "#FFFFFF"; // White text color
            cell.format.font.bold = true; // Bold text
            cell.format.horizontalAlignment = "Center"; // Center alignment
        });

        // Autofit the columns
        sheet.getUsedRange().getEntireColumn().format.autofitColumns();

        // Clear other columns
        const usedRange = sheet.getUsedRange();
        usedRange.load('rowCount, columnCount');

        return context.sync().then(() => {
            // Check if usedRange is valid
            if (usedRange.rowCount > 0 && usedRange.columnCount > headers.length) {
                const columnRange = sheet.getRangeByIndexes(0, headers.length, usedRange.rowCount, usedRange.columnCount - headers.length);
                columnRange.clear();
                return context.sync();
            }
        }).then(() => {
            // Validate and fill mobile numbers
         /*   validateAndFillMobileNumbers();*/
        });
    }).catch(function (error) {
        console.error("Error in AddMobileNumberColumn: " + error);
    });
}
async function getWorkbookBlob(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    worksheet.addRows(data);

    const uint8Array = await workbook.xlsx.writeBuffer();
    return new Blob([uint8Array], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}
window.onclick = function (event) {
    if (!event.target.matches('.dropdown-button')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
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
