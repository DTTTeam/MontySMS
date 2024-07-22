const groupContactsMap = {};
const groupContactNumbers = new Set();
const manualContacts = new Set();

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded event triggered");

    Office.onReady(function (info) {
        console.log("Office.onReady event triggered");

        if (info.host === Office.HostType.Excel) {
            Initialize().then(() => {
                fetchData().then(() => {
                    console.log(localStorage.getItem("login"));
                    if (localStorage.getItem("login") === "true") {
                        clearSavedData();
                    } else {
                        restoreFormData();
                    }
                });
            });
        } else {
            console.error("This script only runs in Excel.");
        }
    });
});
async function Initialize() {
    AddMobileNumberColumn();
    loadPlaceholders();
    updateMessageCounter();
    window.filters();

    const container = document.querySelector('.campaign-container');
    if (container) {
        container.style.backgroundColor = '#fff';
        container.style.width = '150%';
        container.style.height = '100%';
    }

    try {
      
        const templateDropdown = document.getElementById('template');
        templateDropdown.addEventListener('change', handleTemplateChange);
        document.getElementById('backButton').addEventListener('click', backButton);
        document.getElementById('group-list').addEventListener('change', fetchContactsFromGroup);
        document.getElementById('contact-list').addEventListener('change', manageContactInExcel);
        document.getElementById('placeholderButton').addEventListener('click', togglePlaceholderList);
        document.getElementById('message').addEventListener('input', updateMessageCounter);
        document.getElementById('variable-dropdown').addEventListener('change', handleDropdownChange);
        document.getElementById('urlButton').addEventListener('click', openUrlDialog);
        document.getElementById('addUrlButton').addEventListener('click', handleAddUrl);
        document.getElementById('closeUrlButton').addEventListener('click', closeUrlDialog);
        document.getElementById('launchButton').addEventListener('click', validateForm);
        document.getElementById('sender').addEventListener('change', handleSenderChange);
    } catch (error) {
        console.error("Error initializing event listeners:", error);
    }
}

//Data 
function saveFormData() {
    try {
        const campaignNameElem = document.getElementById('campaign-name');
        const senderElem = document.getElementById('sender');
        const messageElem = document.getElementById('message');
        const templateElem = document.getElementById('template');
        const variableDropdownElem = document.getElementById('variable-dropdown');

        if (!campaignNameElem || !senderElem || !messageElem || !templateElem || !variableDropdownElem) {
            throw new Error('One or more form elements are missing');
        }

        const formData = {
            campaignName: campaignNameElem.value,
            sender: senderElem.value,
            message: messageElem.value,
            selectedGroups: Array.from(document.querySelectorAll('#group-list input[type=checkbox]:checked')).map(checkbox => checkbox.value),
            selectedContacts: Array.from(document.querySelectorAll('#contact-list input[type=checkbox]:checked')).map(checkbox => checkbox.value),
            contactDropdownContacts: Array.from(document.querySelectorAll('#contactDropdownContent input[type=checkbox]:checked')).map(checkbox => checkbox.value),
            templateId: templateElem.value,
            type: variableDropdownElem.value,
       
        };

        console.log('Saving formData:', formData);
        localStorage.setItem('formData', JSON.stringify(formData));

        // Save Excel data
        Excel.run(async (context) => {
            const sheet = context.workbook.worksheets.getActiveWorksheet();
            const usedRange = sheet.getUsedRange();
            usedRange.load('values');
            await context.sync();

            const excelData = usedRange.values;
            console.log('Saving excelData:', excelData);
            localStorage.setItem('excelData', JSON.stringify(excelData));
        }).catch(function (error) {
            console.error('Error saving Excel data:', error);
        });
    } catch (error) {
        console.error('Error in saveFormData:', error);
    }
}
function restoreFormData() {
    try {
        let formData = localStorage.getItem('formData');
        let excelData = localStorage.getItem('excelData');

        // Check if formData is a valid JSON string
        try {
            formData = JSON.parse(formData);
        } catch (e) {
            console.error('Error parsing formData:', e);
            formData = null;
        }

        // Check if excelData is a valid JSON string
        try {
            excelData = JSON.parse(excelData);
        } catch (e) {
            console.error('Error parsing excelData:', e);
            excelData = null;
        }

        console.log('Restoring formData:', formData);
        console.log('Restoring excelData:', excelData);

        if (formData) {
            // Populate the select elements after the options are available
            setTimeout(() => {
                if (document.getElementById('campaign-name')) {
                    document.getElementById('campaign-name').value = formData.campaignName;
                }
                if (document.getElementById('sender')) {
                    document.getElementById('sender').value = formData.sender;
                }
                if (document.getElementById('template')) {
                    document.getElementById('template').value = formData.templateId;
                }
                if (document.getElementById('variable-dropdown')) {
                    document.getElementById('variable-dropdown').value = formData.type;
                }
                if (document.getElementById('message')) {
                    document.getElementById('message').value = formData.message;
                }
            

                // Restore selected groups
                const selectedGroups = formData.selectedGroups || [];
                selectedGroups.forEach(group => {
                    const checkbox = document.querySelector(`#group-list input[type=checkbox][value="${group}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });

                // Restore selected contacts
                const selectedContacts = formData.selectedContacts || [];
                selectedContacts.forEach(contact => {
                    const checkbox = document.querySelector(`#contact-list input[type=checkbox][value="${contact}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });

                const contactDropdownContacts = formData.contactDropdownContacts || [];
                contactDropdownContacts.forEach(contact => {
                    const checkbox = document.querySelector(`#contactDropdownContent input[type=checkbox][value="${contact}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }, 1000); 
        }

        if (excelData) {
            Excel.run(async (context) => {
                const sheet = context.workbook.worksheets.getActiveWorksheet();
                const range = sheet.getRangeByIndexes(0, 0, excelData.length, excelData[0].length);
                range.values = excelData;
                await context.sync();
            }).catch(function (error) {
                console.error('Error restoring Excel data:', error);
            });
        }
    } catch (error) {
        console.error('Error in restoreFormData:', error);
    }
}
async function fetchData() {
    await fetchClient();
    await fetchBalance();
    await fetchGroups();
    await fetchContacts();
    await fetchSenders();
    await fetchTemplates();
}
async function refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');
    const apiRefreshToken = process.env.API_RefreshToken;
    const tenantKey = process.env.Key_Tenant;

    try {
        const response = await fetch(apiRefreshToken, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Tenant': tenantKey
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
    const tenantKey = process.env.Key_Tenant;
    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
        'Tenant': tenantKey
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


//Fetch
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
                const balanceData = data.data[0];
                document.getElementById('balance').textContent = `${balanceData.currentBalance} ${balanceData.currencyCode}`;
            } else {
                console.error('Unexpected response format:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching balance:', error);
        });
}
function fetchClient() {
    return new Promise((resolve, reject) => {
        const clientId = localStorage.getItem('clientId');
        const apiGetClient = `${process.env.API_GetClient}${clientId}`;

        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'flex';
        }

        fetchWithAuth(apiGetClient, {
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
                if (data && data.data && data.data.client) {
                    const client = data.data.client;
                    const fullName = `${client.firstName} ${client.lastName}`;
                    document.getElementById('profile-name').innerHTML = `<i class="fas fa-user"></i> ${fullName}`;
                    resolve(client);
                } else {
                    console.error('Unexpected response format:', data);
                    reject('Unexpected response format');
                }
            })
            .catch(error => {
                console.error(`Error fetching client with ID ${clientId}:`, error);
                reject(error);
            })
            .finally(() => {
                if (loadingIndicator) {
                    loadingIndicator.style.display = 'none';
                }
            });
    });
}
function fetchGroups() {
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
        });
}
function fetchContacts() {
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
        });
}
function fetchSenders() {


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
function fetchTemplateById(templateId) {
    return new Promise((resolve, reject) => {
        const loadingIndicator = document.getElementById('loadingIndicator');
        loadingIndicator.style.display = 'block';

        const apiGetTemplateById = `${process.env.API_GetTemplateById}${templateId}`;

        fetchWithAuth(apiGetTemplateById, {
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
                if (data && data.data && data.data.smsTemplate) {
                    const template = data.data.smsTemplate;
                    displayTemplate(template);
                    //const placeholders = extractPlaceholders(template.text);
                    //updateMessageCounter();
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
function fetchContactsFromGroup() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';

    const selectedGroups = Array.from(document.querySelectorAll('#group-list input[type=checkbox]:checked')).map(checkbox => checkbox.value);
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



//Populate
function populateTemplates(templates) {
    const templateSelect = document.getElementById('template');
  

    templates.forEach(template => {
        const option = document.createElement('option');
        option.value = template.recordGuid;
        option.text = template.name;
        templateSelect.appendChild(option);
    });
}
function populateSenders(senders) {
    const senderSelect = document.getElementById('sender');


    senders.forEach(sender => {
        const option = document.createElement('option');
        option.value = sender.recordGuid;
        option.text = sender.name;
        senderSelect.appendChild(option);
    });
}
function populateGroups(groups) {
    const groupList = document.getElementById('group-list');
    groupList.innerHTML = '';

    groups.forEach(group => {
        const label = document.createElement('label');
        label.textContent = group.name;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = group.recordGuid;
        checkbox.addEventListener('change', fetchContactsFromGroup);
        label.prepend(checkbox);
        groupList.appendChild(label);
    });
}
function populateContacts(contacts) {
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';

    contacts.forEach(contact => {
        const label = document.createElement('label');
        const mobileNumber = contact.mobileNumber ? contact.mobileNumber : "N/A";
        label.textContent = `${contact.firstName} ${contact.lastName} (${mobileNumber})`;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = contact.mobileNumber;
        checkbox.addEventListener('change', manageContactInExcel);
        label.prepend(checkbox);
        contactList.appendChild(label);
    });
}


//Excel

function AddAllColumns() {
    Excel.run(function (context) {
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        const fixedOrder = [
            "Mobile Number", "LongUrl", "Title", "FirstName", "LastName",
            "Country", "Email", "Address", "City", "Gender"
        ];

        const headerRange = sheet.getRangeByIndexes(0, 0, 1, fixedOrder.length);
        headerRange.values = [fixedOrder];
        headerRange.format.fill.color = "#ed204c"; // Set header cell color to #ed204c
        headerRange.format.font.color = "#FFFFFF"; // White text color
        headerRange.format.font.bold = true; // Bold text
        headerRange.format.horizontalAlignment = "Center"; // Center alignment

        const usedRange = sheet.getUsedRange();
        usedRange.load('rowCount, columnCount');

        let mobileNumberData;

        return context.sync()
            .then(() => {
                // Store Mobile Number data
                if (usedRange.rowCount > 1) {
                    const mobileNumberRange = sheet.getRangeByIndexes(1, 0, usedRange.rowCount - 1, 1);
                    mobileNumberRange.load('values');
                    return context.sync().then(() => {
                        mobileNumberData = mobileNumberRange.values;
                    });
                }
            })
            .then(() => {
                // Clear all rows except for the header
                if (usedRange.rowCount > 1) {
                    const dataRange = sheet.getRangeByIndexes(1, 0, usedRange.rowCount - 1, usedRange.columnCount);
                    dataRange.clear();
                }

                // Auto fit columns
                sheet.getUsedRange().getEntireColumn().format.autofitColumns();

                // Restore Mobile Number data
                if (mobileNumberData) {
                    const mobileNumberRange = sheet.getRangeByIndexes(1, 0, mobileNumberData.length, 1);
                    mobileNumberRange.values = mobileNumberData;
                }

                console.log('All columns added and fitted successfully');
            });
    }).catch(function (error) {
        console.error('Error adding all columns:', error);
    });
}

function AddMobileNumberColumn() {
    Excel.run(function (context) {
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        sheet.load('name');

        return context.sync().then(() => {
            if (!sheet.name) {
                console.error("Error: Active worksheet not found.");
                return;
            }

            const headers = ["Mobile Number"];
            headers.forEach((header, index) => {
                const cell = sheet.getCell(0, index);
                cell.values = [[header]];
                cell.format.fill.color = "#ed204c"; // Assuming the desired color
                cell.format.font.color = "#FFFFFF";
                cell.format.font.bold = true;
                cell.format.horizontalAlignment = "Center";
            });

            sheet.getUsedRange().getEntireColumn().format.autofitColumns();

            const usedRange = sheet.getUsedRange();
            usedRange.load('rowCount, columnCount');

            return context.sync().then(() => {
                if (usedRange.rowCount > 0 && usedRange.columnCount > headers.length) {
                    const columnRange = sheet.getRangeByIndexes(0, headers.length, usedRange.rowCount, usedRange.columnCount - headers.length);
                    columnRange.clear();
                }
                return context.sync();
            });
        });
    }).catch(function (error) {
        console.error("Error in AddMobileNumberColumn: " + error);
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
function updateExcel() {
    Excel.run(function (context) {
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        const usedRange = sheet.getUsedRange();
        usedRange.load('values');

        return context.sync().then(function () {
            const currentValues = usedRange.values.map(row => row[0]).filter(value => value);

            const groupContacts = [];
            Object.values(groupContactsMap).forEach(contacts => {
                groupContacts.push(...contacts);
            });

            const manualContactsArray = Array.from(manualContacts);
            const newValues = [...new Set([...manualContactsArray, ...groupContacts])];

            const updatedValues = newValues.map(value => [value]);

            if (updatedValues.length === 0) {
                updatedValues.push([""]);
            }

            const rangeToUpdate = sheet.getRange(`A2:A${updatedValues.length + 1}`);
            rangeToUpdate.values = updatedValues;

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
function removeSpacesFromMobileNumbers() {
    Excel.run(function (context) {
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        const usedRange = sheet.getUsedRange();
        usedRange.load("rowCount");

        return context.sync().then(function () {
            const range = sheet.getRange("A2:A" + usedRange.rowCount);
            range.load("values");

            return context.sync().then(function () {
                const cleanedNumbers = range.values.map(row => {
                    return [String(row[0]).replace(/\s+/g, '')]; // Remove all spaces
                });

                // Write cleaned numbers back to the same range
                range.values = cleanedNumbers;

                return context.sync().then(function () {
                    console.log("Spaces removed from mobile numbers.");
                });
            });
        });
    }).catch(function (error) {
        console.error("Error removing spaces from mobile numbers:", error);
    });
}

async function getWorkbookBlob(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    worksheet.addRows(data);

    const uint8Array = await workbook.xlsx.writeBuffer();
    return new Blob([uint8Array], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}


//Functions 
function Getphonenumbers() {
    removeSpacesFromMobileNumbers();
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
function handleColumnType() {

    return new Promise((resolve) => {
        const columnType = document.getElementById('variable-dropdown').value;
        resolve(columnType === 'Variable');
    });
}
function updateMessageCounter() {
    const message = document.getElementById('message').value;
    const charCount = message.length;
    const unicodeRegex = /[^\u0000-\u007F]/;
    const isUnicode = unicodeRegex.test(message);
    const charLimit = isUnicode ? 60 : 160;
    const messageCount = Math.ceil(charCount / charLimit);
    const charsLeft = charLimit - (charCount % charLimit || charLimit); // Handle zero remainder case

    document.getElementById('char-count').textContent = `${charCount}/${charLimit} characters`;
    document.getElementById('char-left').textContent = `${charsLeft} characters left`;
    document.getElementById('message-count').textContent = `${messageCount} message${messageCount > 1 ? 's' : ''}`;
}
function displayTemplate(template) {
    const messageField = document.getElementById('message');
    messageField.value = template.text;
}
function handleTemplateChange() {
    const templateId = document.getElementById('template').value;
    const shortUrlButton = document.getElementById('urlButton');
    const placeholderButton = document.getElementById('placeholderButton');
    const messageField = document.getElementById('message');


    if (!shortUrlButton || !placeholderButton || !messageField) {
        return;
    }

    if (templateId) {
        messageField.readOnly = true;
        fetchTemplateById(templateId)
            .then(template => {
                if (template && template.text) {
                    messageField.value = template.text;
                    shortUrlButton.style.display = 'none';
                    placeholderButton.style.display = 'none';
                    updateMessageCounter();
                } else {
                    console.error('Template text is undefined or template is null');
                }
            })
            .catch(error => {
                console.error(`Error fetching template: ${error}`);
            });
    } else {
        messageField.readOnly = false;
        messageField.value = ''; // Clear the message field
        shortUrlButton.style.display = 'block';
        placeholderButton.style.display = 'block';
        updateMessageCounter();
    }
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
function backButton()
{
    window.location.href = "Home.Html";
}

function handleDropdownChange() {
    const dropdownValue = document.getElementById('variable-dropdown').value;
    console.log("Dropdown value changed to:", dropdownValue); // Debugging

    if (dropdownValue === "variable") {
        AddAllColumns();
    } else {
        AddMobileNumberColumn();
    }
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.innerHTML = message; // Use innerHTML to support HTML tags
    notification.className = 'notification';
    notification.classList.add(type === "error" ? 'error' : 'success');
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}
function handleSenderChange(event) {
    const sender = document.getElementById('sender').value;
    selectedSender = event.target.value;
    console.log('Selected sender:', sender);
    // Perform any additional actions needed when the sender changes
}
window.filters = function () {
    const filterInputs = [
        /*  { searchId: 'sender-search', listId: 'sender-list' },*/
        { searchId: 'group-search', listId: 'group-list' },
        { searchId: 'contact-search', listId: 'contact-list' },
        /* { searchId: 'template-search', dropdownId: 'template' }*/
    ];

    filterInputs.forEach(filter => {
        const searchInput = document.getElementById(filter.searchId);
        const listElement = document.getElementById(filter.listId);
        const dropdownElement = document.getElementById(filter.dropdownId);

        if (!searchInput) {
            console.warn(`Element not found: searchId=${filter.searchId}`);
            return;
        }

        if (listElement) {
            searchInput.addEventListener('focus', function () {
                listElement.style.display = 'block';
            });

            searchInput.addEventListener('input', function () {
                const filterValue = searchInput.value.toLowerCase();
                const items = listElement.querySelectorAll('label');

                items.forEach(item => {
                    const itemText = item.textContent.toLowerCase();
                    item.style.display = itemText.includes(filterValue) ? '' : 'none';
                });

                listElement.style.display = items.length > 0 ? 'block' : 'none';
            });

            searchInput.addEventListener('blur', function () {
                setTimeout(() => {
                    if (searchInput.value === '') {
                        listElement.style.display = 'none';
                    }
                }, 200);
            });
        }

        if (dropdownElement) {
            searchInput.addEventListener('input', function () {
                const filterValue = searchInput.value.toLowerCase();
                const items = dropdownElement.querySelectorAll('option');

                items.forEach(item => {
                    const itemText = item.textContent.toLowerCase();
                    item.style.display = itemText.includes(filterValue) ? '' : 'none';
                });
            });

            searchInput.addEventListener('blur', function () {
                setTimeout(() => {
                    const items = dropdownElement.querySelectorAll('option');
                    items.forEach(item => {
                        item.style.display = '';
                    });
                }, 200);
            });
        }
    });
};

//Place Holders 
function loadPlaceholders() {
    const placeholderList = document.getElementById('placeholderList');
    const placeholderMap = JSON.parse(process.env.PLACEHOLDER_MAP);

    for (const [key, value] of Object.entries(placeholderMap)) {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = key;
        checkbox.addEventListener('change', handlePlaceholderChange);
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(key));
        placeholderList.appendChild(label);
    }
}
function togglePlaceholderList() {
    const placeholderList = document.getElementById('placeholderList');
    if (placeholderList.style.display === 'none' || placeholderList.style.display === '') {
        placeholderList.style.display = 'block';
    } else {
        placeholderList.style.display = 'none';
    }
}
function handlePlaceholderChange(event) {
    const messageField = document.getElementById('message');
    const placeholder = `{${event.target.value}}`;
    let message = messageField.value;

    if (event.target.checked) {
        if (!message.includes(placeholder)) {
            message += ` ${placeholder}`;
        }
    } else {
        message = message.replace(` ${placeholder}`, '').replace(`${placeholder} `, '').replace(placeholder, '');
    }

    messageField.value = message.trim();
    updateMessageCounter();

    // Hide the placeholder list after an item is selected
    const placeholderList = document.getElementById('placeholderList');
    placeholderList.style.display = 'none';
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


//URL

function openUrlDialog() {
    const urlDialog = document.getElementById('urlDialog');
    urlDialog.style.display = 'block';
}
async function handleAddUrl() {
    const longUrl = document.getElementById('longUrl').value;
    if (longUrl) {
        try {
            const shortUrl = await getShortUrl(longUrl);
            insertShortUrlIntoMessage(shortUrl);
            closeUrlDialog();
        } catch (error) {
            console.error('Error adding URL:', error);
        }
    }
}
function closeUrlDialog() {
    const urlDialog = document.getElementById('urlDialog');
    urlDialog.style.display = 'none';
}
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

//Campaign
function validateForm(event) {
    event.preventDefault(); // Prevent the form from submitting

    const campaignName = document.getElementById('campaign-name').value.trim();
    const message = document.getElementById('message').value.trim();
    const longUrlInput = document.getElementById('longUrl').value;
    const sender = document.getElementById('sender').value;
    const dropdownValue = document.getElementById('variable-dropdown').value;
    Excel.run(function (context) {
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        const usedRange = sheet.getUsedRange();
        usedRange.load('values');

        return context.sync().then(function () {
            const mobileNumbers = usedRange.values.map(row => row[0]).filter(value => value);
            const mobileNumberCount = mobileNumbers.length;

            let errorMessage = '';
            if (campaignName === '') {
                errorMessage += 'Campaign Name is required.<br>';
            }
            if (sender === '') {
                errorMessage += 'Sender is required.<br>';
            }
            if (message === '') {
                errorMessage += 'Message is required.<br>';
            }
            if (mobileNumberCount < 2) {
                errorMessage += 'At least 2 mobile numbers are required.<br>';
            }

            if (errorMessage) {
                showNotification(errorMessage, "error");
            } else {
                Getphonenumbers().then(phoneNumbers => {
                    launchCampaign(campaignName, sender, message, longUrlInput, phoneNumbers, dropdownValue);
                }).catch(error => {
                    console.error('Error getting phone numbers:', error);
                    showNotification('Error getting phone numbers. Please try again.', "Error");
                });
            }
        });
    }).catch(function (error) {
        console.error("Error validating form: ", error);
    });
}
function handleValidationError() {
    isCampaignLaunching = false;

}
function handleValidationSuccess(response, campaignName) {

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
function launchCampaign(campaignName, sender, message, longUrlInput, phoneNumbers, dropdownValue) {

  
    let hasShortUrl = false;
    let longUrl = null;

    if (longUrlInput) {
        hasShortUrl = true;
        longUrl = longUrlInput;
    }

   
    if (dropdownValue === 'variable') {
            validateCampaignWithFile(campaignName, message, sender, hasShortUrl, longUrl).then(data => {
                handleValidationSuccess(data, campaignName);
            }).catch(error => {
                handleValidationError();
            });
    } else if (dropdownValue === 'no-variable') {
            validateCampaignNormally(campaignName, message, sender, phoneNumbers, hasShortUrl, longUrl).then(data => {
                handleValidationSuccess(data, campaignName);
            }).catch(error => {
                handleValidationError();
            });
        }

   
}

async function validateCampaignNormally(campaignName, campaignContent, senderId, phoneNumbers, hasShortUrl, longUrl) {
 
    const apiValidate = process.env.API_Validate;
    const placeholders = extractPlaceholders(campaignContent);

    const requestBody = {
        Campaign: {
            ChannelId: process.env.SMS_Channel,
            Name: campaignName,
            Content: campaignContent,
            SenderId: senderId,
            HasShortUrl: hasShortUrl,
            serviceTag: "ONE_WAY_SMS",
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
        
    }
}
async function validateCampaignWithFile(campaignName, campaignContent, senderId, hasShortUrl, longUrl) {
  
    const apiValidateFile = process.env.API_Validate_File;
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
       
    }
}
