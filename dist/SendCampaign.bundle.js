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

/***/ "./JS/SendCampaign.js":
/*!****************************!*\
  !*** ./JS/SendCampaign.js ***!
  \****************************/
/***/ (() => {

eval("function _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }\nfunction _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }\nfunction _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nfunction _regeneratorRuntime() { \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = \"function\" == typeof Symbol ? Symbol : {}, a = i.iterator || \"@@iterator\", c = i.asyncIterator || \"@@asyncIterator\", u = i.toStringTag || \"@@toStringTag\"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, \"\"); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, \"_invoke\", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: \"normal\", arg: t.call(e, r) }; } catch (t) { return { type: \"throw\", arg: t }; } } e.wrap = wrap; var h = \"suspendedStart\", l = \"suspendedYield\", f = \"executing\", s = \"completed\", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { [\"next\", \"throw\", \"return\"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if (\"throw\" !== c.type) { var u = c.arg, h = u.value; return h && \"object\" == _typeof(h) && n.call(h, \"__await\") ? e.resolve(h.__await).then(function (t) { invoke(\"next\", t, i, a); }, function (t) { invoke(\"throw\", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke(\"throw\", t, i, a); }); } a(c.arg); } var r; o(this, \"_invoke\", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error(\"Generator is already running\"); if (o === s) { if (\"throw\" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if (\"next\" === n.method) n.sent = n._sent = n.arg;else if (\"throw\" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else \"return\" === n.method && n.abrupt(\"return\", n.arg); o = f; var p = tryCatch(e, r, n); if (\"normal\" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } \"throw\" === p.type && (o = s, n.method = \"throw\", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, \"throw\" === n && e.iterator[\"return\"] && (r.method = \"return\", r.arg = t, maybeInvokeDelegate(e, r), \"throw\" === r.method) || \"return\" !== n && (r.method = \"throw\", r.arg = new TypeError(\"The iterator does not provide a '\" + n + \"' method\")), y; var i = tryCatch(o, e.iterator, r.arg); if (\"throw\" === i.type) return r.method = \"throw\", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, \"return\" !== r.method && (r.method = \"next\", r.arg = t), r.delegate = null, y) : a : (r.method = \"throw\", r.arg = new TypeError(\"iterator result is not an object\"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = \"normal\", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: \"root\" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || \"\" === e) { var r = e[a]; if (r) return r.call(e); if (\"function\" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + \" is not iterable\"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, \"constructor\", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, \"constructor\", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, \"GeneratorFunction\"), e.isGeneratorFunction = function (t) { var e = \"function\" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || \"GeneratorFunction\" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, \"GeneratorFunction\")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, \"Generator\"), define(g, a, function () { return this; }), define(g, \"toString\", function () { return \"[object Generator]\"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) \"t\" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if (\"throw\" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = \"throw\", a.arg = e, r.next = n, o && (r.method = \"next\", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if (\"root\" === i.tryLoc) return handle(\"end\"); if (i.tryLoc <= this.prev) { var c = n.call(i, \"catchLoc\"), u = n.call(i, \"finallyLoc\"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error(\"try statement without catch or finally\"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, \"finallyLoc\") && this.prev < o.finallyLoc) { var i = o; break; } } i && (\"break\" === t || \"continue\" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = \"next\", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if (\"throw\" === t.type) throw t.arg; return \"break\" === t.type || \"continue\" === t.type ? this.next = t.arg : \"return\" === t.type ? (this.rval = this.arg = t.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, \"catch\": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if (\"throw\" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error(\"illegal catch attempt\"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, \"next\" === this.method && (this.arg = t), y; } }, e; }\nfunction asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }\nfunction _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"next\", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"throw\", n); } _next(void 0); }); }; }\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  var validationData = JSON.parse(localStorage.getItem('validationData'));\n  if (validationData) {\n    displayValidationData(validationData);\n    setupEventListeners(validationData.campaignId);\n    showLoadingIndicator(false);\n  }\n});\n\n// Display validation data in the UI\nfunction displayValidationData(validationData) {\n  if (validationData.campaignName) {\n    document.querySelector('#campaignName span').textContent = validationData.campaignName;\n  }\n  if (validationData.totalCost !== undefined) {\n    document.querySelector('#totalCost span').textContent = validationData.totalCost;\n  }\n  if (validationData.inValidUrl && validationData.inValidUrl.trim() !== \"\") {\n    var invalidUrlElem = document.querySelector('#invalidUrl a');\n    invalidUrlElem.href = validationData.inValidUrl;\n  } else {\n    document.getElementById('invalidUrl').style.display = 'none';\n  }\n  if (validationData.totalValidCount !== undefined) {\n    document.querySelector('#totalValidCount span').textContent = validationData.totalValidCount;\n  }\n  if (validationData.totalInValidCount !== undefined && validationData.totalInValidCount > 0) {\n    document.querySelector('#totalInValidCount span').textContent = validationData.totalInValidCount;\n  } else {\n    document.getElementById('totalInValidCount').style.display = 'none';\n  }\n  renderValidationChart(validationData.totalValidCount, validationData.totalInValidCount);\n}\n\n// Set up event listeners for buttons\nfunction setupEventListeners(campaignId) {\n  document.getElementById('sendButton').addEventListener('click', function () {\n    sendCampaign(campaignId);\n  });\n  document.getElementById('backButton').addEventListener('click', function () {\n    localStorage.setItem('backNavigation', 'true');\n    window.location.href = 'SMSCampaign.html';\n  });\n}\n\n// Render validation chart using Chart.js\nfunction renderValidationChart(validCount, invalidCount) {\n  var ctx = document.getElementById('validationChart').getContext('2d');\n  new Chart(ctx, {\n    type: 'bar',\n    data: {\n      labels: ['Valid', 'Invalid'],\n      datasets: [{\n        label: 'Numbers',\n        data: [validCount, invalidCount],\n        backgroundColor: ['#4caf50',\n        // Green for valid\n        '#f44336' // Red for invalid\n        ],\n        borderColor: ['#4caf50', '#f44336'],\n        borderWidth: 1\n      }]\n    },\n    options: {\n      scales: {\n        y: {\n          beginAtZero: true\n        }\n      },\n      responsive: true,\n      plugins: {\n        legend: {\n          display: false\n        }\n      }\n    }\n  });\n}\n\n// Send campaign request to the server\nfunction sendCampaign(_x) {\n  return _sendCampaign.apply(this, arguments);\n} // Fetch data with authentication\nfunction _sendCampaign() {\n  _sendCampaign = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(campaignId) {\n    var apiSendCampaign, sendButton, data, requestBody, response;\n    return _regeneratorRuntime().wrap(function _callee$(_context) {\n      while (1) switch (_context.prev = _context.next) {\n        case 0:\n          apiSendCampaign = \"https://omni-apis.montymobile.com/notification/api/v1/SMSCampaign/campaign-launch\";\n          sendButton = document.getElementById('sendButton');\n          data = null; // Declare data variable outside the try block\n          requestBody = {\n            CampaignId: campaignId\n          };\n          _context.prev = 4;\n          showLoadingIndicator(true);\n          sendButton.style.display = 'none'; // Hide the button\n          _context.next = 9;\n          return fetchWithAuth(apiSendCampaign, {\n            method: 'PUT',\n            headers: {\n              'Content-Type': 'application/json'\n            },\n            body: JSON.stringify(requestBody)\n          });\n        case 9:\n          response = _context.sent;\n          if (response.ok) {\n            _context.next = 12;\n            break;\n          }\n          throw new Error(\"Network response was not ok: \".concat(response.statusText));\n        case 12:\n          _context.next = 14;\n          return response.json();\n        case 14:\n          data = _context.sent;\n          if (!data.success) {\n            _context.next = 19;\n            break;\n          }\n          showNotification('Campaign sent successfully!', 'success');\n          _context.next = 20;\n          break;\n        case 19:\n          throw new Error(data.message);\n        case 20:\n          _context.next = 27;\n          break;\n        case 22:\n          _context.prev = 22;\n          _context.t0 = _context[\"catch\"](4);\n          console.error('Error sending campaign:', _context.t0);\n          showNotification('Failed to send campaign: ' + _context.t0.message, 'error');\n          sendButton.style.display = 'block'; // Show the button again if there's an error\n        case 27:\n          _context.prev = 27;\n          showLoadingIndicator(false);\n          // Ensure button remains hidden after successful send\n          if (data && data.success) {\n            sendButton.style.display = 'none';\n          }\n          return _context.finish(27);\n        case 31:\n        case \"end\":\n          return _context.stop();\n      }\n    }, _callee, null, [[4, 22, 27, 31]]);\n  }));\n  return _sendCampaign.apply(this, arguments);\n}\nfunction fetchWithAuth(_x2, _x3) {\n  return _fetchWithAuth.apply(this, arguments);\n} // Refresh authentication token\nfunction _fetchWithAuth() {\n  _fetchWithAuth = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(url, options) {\n    var retry,\n      accessToken,\n      TenantKey,\n      response,\n      newAccessToken,\n      _args2 = arguments;\n    return _regeneratorRuntime().wrap(function _callee2$(_context2) {\n      while (1) switch (_context2.prev = _context2.next) {\n        case 0:\n          retry = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : true;\n          accessToken = localStorage.getItem('accessToken');\n          TenantKey = \"98df9ffe-fa84-41ee-9293-33614722d952\";\n          options.headers = _objectSpread(_objectSpread({}, options.headers), {}, {\n            'Authorization': \"Bearer \".concat(accessToken),\n            'Tenant': TenantKey\n          });\n          _context2.prev = 4;\n          _context2.next = 7;\n          return fetch(url, options);\n        case 7:\n          response = _context2.sent;\n          if (!(response.status === 401 && retry)) {\n            _context2.next = 14;\n            break;\n          }\n          _context2.next = 11;\n          return refreshToken();\n        case 11:\n          newAccessToken = _context2.sent;\n          options.headers['Authorization'] = \"Bearer \".concat(newAccessToken);\n          return _context2.abrupt(\"return\", fetchWithAuth(url, options, false));\n        case 14:\n          return _context2.abrupt(\"return\", response);\n        case 17:\n          _context2.prev = 17;\n          _context2.t0 = _context2[\"catch\"](4);\n          console.error(\"Error fetching \".concat(url, \":\"), _context2.t0);\n          throw _context2.t0;\n        case 21:\n        case \"end\":\n          return _context2.stop();\n      }\n    }, _callee2, null, [[4, 17]]);\n  }));\n  return _fetchWithAuth.apply(this, arguments);\n}\nfunction refreshToken() {\n  return _refreshToken.apply(this, arguments);\n} // Show or hide the loading indicator\nfunction _refreshToken() {\n  _refreshToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {\n    var refreshToken, accessToken, apiRefreshToken, TenantKey, response, data;\n    return _regeneratorRuntime().wrap(function _callee3$(_context3) {\n      while (1) switch (_context3.prev = _context3.next) {\n        case 0:\n          refreshToken = localStorage.getItem('refreshToken');\n          accessToken = localStorage.getItem('accessToken');\n          apiRefreshToken = \"https://omni-apis.montymobile.com/member/api/v1/auth/refresh-token\";\n          TenantKey = \"98df9ffe-fa84-41ee-9293-33614722d952\";\n          _context3.prev = 4;\n          _context3.next = 7;\n          return fetch(apiRefreshToken, {\n            method: 'POST',\n            headers: {\n              'Content-Type': 'application/json',\n              'Authorization': \"Bearer \".concat(accessToken),\n              'Tenant': TenantKey\n            },\n            body: JSON.stringify({\n              RefreshToken: refreshToken\n            })\n          });\n        case 7:\n          response = _context3.sent;\n          if (response.ok) {\n            _context3.next = 10;\n            break;\n          }\n          throw new Error(\"Failed to refresh token: \".concat(response.statusText));\n        case 10:\n          _context3.next = 12;\n          return response.json();\n        case 12:\n          data = _context3.sent;\n          localStorage.setItem('accessToken', data.data.accessToken);\n          localStorage.setItem('refreshToken', data.data.refreshToken);\n          return _context3.abrupt(\"return\", data.data.accessToken);\n        case 18:\n          _context3.prev = 18;\n          _context3.t0 = _context3[\"catch\"](4);\n          console.error('Error refreshing token:', _context3.t0);\n          throw _context3.t0;\n        case 22:\n        case \"end\":\n          return _context3.stop();\n      }\n    }, _callee3, null, [[4, 18]]);\n  }));\n  return _refreshToken.apply(this, arguments);\n}\nfunction showLoadingIndicator(show) {\n  var loadingIndicator = document.getElementById('loadingIndicator');\n  loadingIndicator.style.display = show ? 'block' : 'none';\n}\n\n// Show a notification message\nfunction showNotification(message, type) {\n  var notification = document.getElementById('notification');\n  if (notification) {\n    notification.textContent = message;\n    notification.className = 'notification';\n    notification.classList.add(type === \"error\" ? 'error' : 'success');\n    notification.classList.add('show');\n    setTimeout(function () {\n      notification.classList.remove('show');\n    }, 3000);\n  } else {\n    console.error('Notification element not found');\n  }\n}\n\n//# sourceURL=webpack://montysmsweb/./JS/SendCampaign.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./JS/SendCampaign.js"]();
/******/ 	
/******/ })()
;