/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./JS/Home.js":
/*!********************!*\
  !*** ./JS/Home.js ***!
  \********************/
/***/ (() => {

eval("var apiUrl = \"https://mm-omni-api-software-qa.montylocal.net/member/api/v1/auth/login\";\nvar apiKey = \"3d936a5d-1d56-450b-a04c-f1a7b5c2d5d4\";\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  var loginForm = document.getElementById('loginForm');\n  if (loginForm) {\n    loginForm.addEventListener('submit', function (event) {\n      event.preventDefault();\n      handleFormSubmit(event);\n    });\n  }\n});\nfunction handleFormSubmit(event) {\n  event.preventDefault();\n  var username = document.getElementById('username').value;\n  var password = document.getElementById('password').value;\n  if (!username || !password) {\n    showNotification(\"Username and password cannot be empty.\", \"error\");\n    return;\n  }\n  showSpinner();\n  login(username, password);\n}\nfunction login(username, password) {\n  var payload = {\n    \"Username\": username,\n    \"Password\": password\n  };\n  fetch(apiUrl, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json',\n      'Tenant': apiKey\n    },\n    body: JSON.stringify(payload)\n  }).then(function (response) {\n    hideSpinner();\n    if (response.ok) {\n      return response.json();\n    } else {\n      showNotification(\"Login failed. Please check your username and password.\", \"error\");\n      throw new Error('Login failed');\n    }\n  }).then(function (data) {\n    window.location.href = \"Selection.html\";\n  })[\"catch\"](function (error) {\n    hideSpinner();\n    showNotification(\"Login failed. Please check your username and password.\", \"error\");\n  });\n}\nfunction showSpinner() {\n  document.getElementById('spinner').style.display = 'flex';\n}\nfunction hideSpinner() {\n  document.getElementById('spinner').style.display = 'none';\n}\nfunction showNotification(message, type) {\n  var notification = document.getElementById('notification');\n  notification.textContent = message;\n  notification.className = 'notification';\n  notification.classList.add(type === \"error\" ? 'error' : 'success');\n  notification.classList.add('show');\n  setTimeout(function () {\n    notification.classList.remove('show');\n  }, 3000);\n}\n\n//# sourceURL=webpack:///./JS/Home.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./JS/Home.js"]();
/******/ 	
/******/ })()
;