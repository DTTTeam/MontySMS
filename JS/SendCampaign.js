
const countryFlagUrls = {
    'AF': 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Afghanistan.svg',
    'AL': 'https://upload.wikimedia.org/wikipedia/commons/3/36/Flag_of_Albania.svg',
    'DZ': 'https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Algeria.svg',
    'AD': 'https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Andorra.svg',
    'AO': 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg',
    'AG': 'https://upload.wikimedia.org/wikipedia/commons/8/89/Flag_of_Antigua_and_Barbuda.svg',
    'AR': 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg',
    'AM': 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_Armenia.svg',
    'AU': 'https://upload.wikimedia.org/wikipedia/en/b/b9/Flag_of_Australia.svg',
    'AT': 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg',
    'AZ': 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Azerbaijan.svg',
    'BS': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Flag_of_the_Bahamas.svg',
    'BH': 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Bahrain.svg',
    'BD': 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg',
    'BB': 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Flag_of_Barbados.svg',
    'BY': 'https://upload.wikimedia.org/wikipedia/commons/8/85/Flag_of_Belarus.svg',
    'BE': 'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg',
    'BZ': 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Flag_of_Belize.svg',
    'BJ': 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Flag_of_Benin.svg',
    'BT': 'https://upload.wikimedia.org/wikipedia/commons/9/91/Flag_of_Bhutan.svg',
    'BO': 'https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Bolivia.svg',
    'BA': 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Flag_of_Bosnia_and_Herzegovina.svg',
    'BW': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_Botswana.svg',
    'BR': 'https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg',
    'BN': 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Brunei.svg',
    'BG': 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Bulgaria.svg',
    'BF': 'https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Burkina_Faso.svg',
    'BI': 'https://upload.wikimedia.org/wikipedia/commons/5/50/Flag_of_Burundi.svg',
    'CV': 'https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Cape_Verde.svg',
    'KH': 'https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_Cambodia.svg',
    'CM': 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Flag_of_Cameroon.svg',
    'CA': 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg',
    'CF': 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Central_African_Republic.svg',
    'TD': 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Flag_of_Chad.svg',
    'CL': 'https://upload.wikimedia.org/wikipedia/commons/7/78/Flag_of_Chile.svg',
    'CN': 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Flag_of_China.svg',
    'CO': 'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg',
    'KM': 'https://upload.wikimedia.org/wikipedia/commons/9/94/Flag_of_the_Comoros.svg',
    'CG': 'https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_the_Republic_of_the_Congo.svg',
    'CD': 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg',
    'CR': 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Flag_of_Costa_Rica.svg',
    'HR': 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Croatia.svg',
    'CU': 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Flag_of_Cuba.svg',
    'CY': 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Cyprus.svg',
    'CZ': 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg',
    'DK': 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg',
    'DJ': 'https://upload.wikimedia.org/wikipedia/commons/3/34/Flag_of_Djibouti.svg',
    'DM': 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Flag_of_Dominica.svg',
    'DO': 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_the_Dominican_Republic.svg',
    'EC': 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg',
    'EG': 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg',
    'SV': 'https://upload.wikimedia.org/wikipedia/commons/3/34/Flag_of_El_Salvador.svg',
    'GQ': 'https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Equatorial_Guinea.svg',
    'ER': 'https://upload.wikimedia.org/wikipedia/commons/2/29/Flag_of_Eritrea.svg',
    'EE': 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Flag_of_Estonia.svg',
    'SZ': 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Flag_of_Eswatini.svg',
    'ET': 'https://upload.wikimedia.org/wikipedia/commons/7/71/Flag_of_Ethiopia.svg',
    'FJ': 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Fiji.svg',
    'FI': 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg',
    'FR': 'https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg',
    'GA': 'https://upload.wikimedia.org/wikipedia/commons/0/04/Flag_of_Gabon.svg',
    'GM': 'https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_The_Gambia.svg',
    'GE': 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_Georgia.svg',
    'DE': 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg',
    'GH': 'https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Ghana.svg',
    'GR': 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg',
    'GD': 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Grenada.svg',
    'GT': 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Flag_of_Guatemala.svg',
    'GN': 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Flag_of_Guinea.svg',
    'GW': 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Guinea-Bissau.svg',
    'GY': 'https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_Guyana.svg',
    'HT': 'https://upload.wikimedia.org/wikipedia/commons/5/56/Flag_of_Haiti.svg',
    'HN': 'https://upload.wikimedia.org/wikipedia/commons/8/82/Flag_of_Honduras.svg',
    'HU': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg',
    'IS': 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Iceland.svg',
    'IN': 'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg',
    'ID': 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg',
    'IR': 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg',
    'IQ': 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Flag_of_Iraq.svg',
    'IE': 'https://upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg',
    'IT': 'https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg',
    'JM': 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Flag_of_Jamaica.svg',
    'JP': 'https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg',
    'JO': 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Flag_of_Jordan.svg',
    'KZ': 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Kazakhstan.svg',
    'KE': 'https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Kenya.svg',
    'KI': 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Kiribati.svg',
    'KP': 'https://upload.wikimedia.org/wikipedia/commons/5/51/Flag_of_North_Korea.svg',
    'KR': 'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg',
    'KW': 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Flag_of_Kuwait.svg',
    'KG': 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Flag_of_Kyrgyzstan.svg',
    'LA': 'https://upload.wikimedia.org/wikipedia/commons/5/56/Flag_of_Laos.svg',
    'LV': 'https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Latvia.svg',
    'LB': 'https://upload.wikimedia.org/wikipedia/commons/5/59/Flag_of_Lebanon.svg',
    'LS': 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Flag_of_Lesotho.svg',
    'LR': 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Flag_of_Liberia.svg',
    'LY': 'https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Libya.svg',
    'LI': 'https://upload.wikimedia.org/wikipedia/commons/4/47/Flag_of_Liechtenstein.svg',
    'LT': 'https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Lithuania.svg',
    'LU': 'https://upload.wikimedia.org/wikipedia/commons/d/da/Flag_of_Luxembourg.svg',
    'MG': 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Madagascar.svg',
    'MW': 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Flag_of_Malawi.svg',
    'MY': 'https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg',
    'MV': 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_Maldives.svg',
    'ML': 'https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_Mali.svg',
    'MT': 'https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Malta.svg',
    'MH': 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Flag_of_the_Marshall_Islands.svg',
    'MR': 'https://upload.wikimedia.org/wikipedia/commons/4/43/Flag_of_Mauritania.svg',
    'MU': 'https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Mauritius.svg',
    'MX': 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg',
    'FM': 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Flag_of_the_Federated_States_of_Micronesia.svg',
    'MD': 'https://upload.wikimedia.org/wikipedia/commons/2/27/Flag_of_Moldova.svg',
    'MC': 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Flag_of_Monaco.svg',
    'MN': 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Mongolia.svg',
    'ME': 'https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg',
    'MA': 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg',
    'MZ': 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Flag_of_Mozambique.svg',
    'MM': 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Flag_of_Myanmar.svg',
    'NA': 'https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Namibia.svg',
    'NR': 'https://upload.wikimedia.org/wikipedia/commons/3/30/Flag_of_Nauru.svg',
    'NP': 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg',
    'NL': 'https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg',
    'NZ': 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg',
    'NI': 'https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Nicaragua.svg',
    'NE': 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Flag_of_Niger.svg',
    'NG': 'https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg',
    'MK': 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Flag_of_North_Macedonia.svg',
    'NO': 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg',
    'OM': 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Oman.svg',
    'PK': 'https://upload.wikimedia.org/wikipedia/commons/3/32/Flag_of_Pakistan.svg',
    'PW': 'https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Palau.svg',
    'PA': 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Flag_of_Panama.svg',
    'PG': 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Flag_of_Papua_New_Guinea.svg',
    'PY': 'https://upload.wikimedia.org/wikipedia/commons/2/27/Flag_of_Paraguay.svg',
    'PE': 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg',
    'PH': 'https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg',
    'PL': 'https://upload.wikimedia.org/wikipedia/en/1/12/Flag_of_Poland.svg',
    'PT': 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg',
    'QA': 'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Qatar.svg',
    'RO': 'https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Romania.svg',
    'RU': 'https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg',
    'RW': 'https://upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Rwanda.svg',
    'KN': 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Flag_of_Saint_Kitts_and_Nevis.svg',
    'LC': 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Saint_Lucia.svg',
    'VC': 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Flag_of_Saint_Vincent_and_the_Grenadines.svg',
    'WS': 'https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Samoa.svg',
    'SM': 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Flag_of_San_Marino.svg',
    'ST': 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Flag_of_São_Tomé_and_Príncipe.svg',
    'SA': 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg',
    'SN': 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Flag_of_Senegal.svg',
    'RS': 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Flag_of_Serbia.svg',
    'SC': 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Seychelles.svg',
    'SL': 'https://upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Sierra_Leone.svg',
    'SG': 'https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg',
    'SK': 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Flag_of_Slovakia.svg',
    'SI': 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Flag_of_Slovenia.svg',
    'SB': 'https://upload.wikimedia.org/wikipedia/commons/7/74/Flag_of_the_Solomon_Islands.svg',
    'SO': 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Somalia.svg',
    'ZA': 'https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg',
    'SS': 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Flag_of_South_Sudan.svg',
    'ES': 'https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg',
    'LK': 'https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Sri_Lanka.svg',
    'SD': 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Sudan.svg',
    'SR': 'https://upload.wikimedia.org/wikipedia/commons/6/60/Flag_of_Suriname.svg',
    'SE': 'https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg',
    'CH': 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg',
    'SY': 'https://upload.wikimedia.org/wikipedia/commons/5/53/Flag_of_Syria.svg',
    'TW': 'https://upload.wikimedia.org/wikipedia/commons/7/72/Flag_of_the_Republic_of_China.svg',
    'TJ': 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Flag_of_Tajikistan.svg',
    'TZ': 'https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Tanzania.svg',
    'TH': 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg',
    'TL': 'https://upload.wikimedia.org/wikipedia/commons/2/26/Flag_of_East_Timor.svg',
    'TG': 'https://upload.wikimedia.org/wikipedia/commons/6/68/Flag_of_Togo.svg',
    'TO': 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Tonga.svg',
    'TT': 'https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Trinidad_and_Tobago.svg',
    'TN': 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Tunisia.svg',
    'TR': 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg',
    'TM': 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Turkmenistan.svg',
    'TV': 'https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Tuvalu.svg',
    'UG': 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Flag_of_Uganda.svg',
    'UA': 'https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg',
    'AE': 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg',
    'GB': 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg',
    'US': 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    'UY': 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Uruguay.svg',
    'UZ': 'https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg',
    'VU': 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Vanuatu.svg',
    'VA': 'https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_the_Vatican_City.svg',
    'VE': 'https://upload.wikimedia.org/wikipedia/commons/0/06/Flag_of_Venezuela.svg',
    'VN': 'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg',
    'YE': 'https://upload.wikimedia.org/wikipedia/commons/8/89/Flag_of_Yemen.svg',
    'ZM': 'https://upload.wikimedia.org/wikipedia/commons/0/06/Flag_of_Zambia.svg',
    'ZW': 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Flag_of_Zimbabwe.svg'
};
document.addEventListener("DOMContentLoaded", () => {
    const validationData = JSON.parse(localStorage.getItem('validationData'));

    if (validationData) {
        displayValidationData(validationData);
        setupEventListeners(validationData.campaignId);
        showLoadingIndicator(false);
    }
});

// Display validation data in the UI
function displayValidationInfo(validationData) { // Renamed function
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
    renderCountryCodeChart(validationData.countryCodes); // Add this line
}
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
                x: {
                    grid: {
                        display: false // Remove vertical grid lines
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false // Remove horizontal grid lines
                    }
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
function renderCountryCodeChart(countryCodes) {
    const ctx = document.getElementById('countryCodeChart').getContext('2d');

    // Prepare country code data for the chart
    const countryLabels = Object.keys(countryCodes);
    const countryData = Object.values(countryCodes);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: countryLabels,
            datasets: [{
                label: 'Numbers by Country Code',
                data: countryData,
                backgroundColor: '#2196f3', // Uniform blue color for all bars
                borderColor: '#1976d2', // Uniform darker blue color for all borders
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    grid: {
                        display: false // Remove vertical grid lines
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false // Remove horizontal grid lines
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                annotation: {
                    annotations: countryLabels.map((countryCode, index) => ({
                        type: 'label',
                        drawTime: 'afterDatasetsDraw',
                        content: function (context) {
                            const img = new Image();
                            img.src = countryFlagUrls[countryCode];
                            return img;
                        },
                        xValue: index,
                        yValue: countryData[index] * 0.1, // Adjust this value to move the flag up
                        width: 20,
                        height: 12,
                        position: 'outside'
                    }))
                }
            }
        }
    });
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
