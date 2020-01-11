(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
        /***/ "./$$_lazy_route_resource lazy recursive": 
        /*!******************************************************!*\
          !*** ./$$_lazy_route_resource lazy namespace object ***!
          \******************************************************/
        /*! no static exports found */
        /***/ (function (module, exports) {
            function webpackEmptyAsyncContext(req) {
                // Here Promise.resolve().then() is used instead of new Promise() to prevent
                // uncaught exception popping up in devtools
                return Promise.resolve().then(function () {
                    var e = new Error("Cannot find module '" + req + "'");
                    e.code = 'MODULE_NOT_FOUND';
                    throw e;
                });
            }
            webpackEmptyAsyncContext.keys = function () { return []; };
            webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
            module.exports = webpackEmptyAsyncContext;
            webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";
            /***/ 
        }),
        /***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html": 
        /*!**************************************************************************!*\
          !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
          \**************************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("<header>\n  <h4>{{ quizName }}</h4>\n</header>\n\n<nav>\n  <button type=\"default\" class=\"btn btn-light\" (click)=\"onTest()\">\n    Log storage\n  </button>\n\n  <button type=\"default\" class=\"btn btn-light\" (click)=\"onTest2()\">\n    Set storage\n  </button>\n\n  <button type=\"default\" class=\"btn btn-light\" (click)=\"onTest3()\">\n    Reload page\n  </button>\n\n  <button type=\"default\" class=\"btn btn-danger\" (click)=\"onNewGame()\">\n    Начать заново\n  </button>\n</nav>\n\n<div class=\"content-task\" *ngIf=\"!isSuccess\">\n  <div class=\"card\" style=\"margin:auto;width:90%;\">\n    <div class=\"card-body\">\n      <h5 class=\"question\">Задание \"{{ currentTask.id }}\" : {{ currentTask.question }}</h5>\n      <ul>\n        <li *ngFor=\"let image of currentTask.images\">\n          <a\n            target=\"_blank\"\n            href=\"../../../assets/images/tasks/{{ image.fileName }}\"\n            title=\"{{ image.descr }}\"\n          >\n            <img\n              src=\"../../../assets/images/tasks/{{ image.fileName }}\"\n              alt=\"{{ image.descr }}\"\n          /></a>\n          <p class=\"imageInfo\">{{ image.descr }}</p>\n        </li>\n      </ul>\n\n      <div class=\"form-group\">\n        <input\n          type=\"text\"\n          class=\"form-control\"\n          id=\"answer\"\n          placeholder=\"Ваш ответ...\"\n          [(ngModel)]=\"answer\"\n          (keyup.enter)=\"onSubmit()\"\n        />\n      </div>\n      <button type=\"submit\" class=\"btn btn-primary\" (click)=\"onSubmit()\">\n        Подтвердить\n      </button>\n      <p class=\"result\">{{ resStr }}</p>\n    </div>\n  </div>\n</div>\n\n<div class=\"content-success\" *ngIf=\"isSuccess\">\n  <img src=\"../../../assets/images/{{ successInfo.imageFileName }}\" alt=\"Yes\" />\n  <h4>{{ successInfo.info }}</h4>\n</div>\n\n<!-- <router-outlet></router-outlet> -->\n");
            /***/ 
        }),
        /***/ "./node_modules/tslib/tslib.es6.js": 
        /*!*****************************************!*\
          !*** ./node_modules/tslib/tslib.es6.js ***!
          \*****************************************/
        /*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function () { return __extends; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function () { return __assign; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function () { return __rest; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function () { return __decorate; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function () { return __param; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function () { return __metadata; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function () { return __awaiter; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function () { return __generator; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function () { return __exportStar; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function () { return __values; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function () { return __read; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function () { return __spread; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function () { return __spreadArrays; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function () { return __await; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function () { return __asyncGenerator; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function () { return __asyncDelegator; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function () { return __asyncValues; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function () { return __makeTemplateObject; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function () { return __importStar; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function () { return __importDefault; });
            /*! *****************************************************************************
            Copyright (c) Microsoft Corporation. All rights reserved.
            Licensed under the Apache License, Version 2.0 (the "License"); you may not use
            this file except in compliance with the License. You may obtain a copy of the
            License at http://www.apache.org/licenses/LICENSE-2.0
            
            THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
            KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
            WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
            MERCHANTABLITY OR NON-INFRINGEMENT.
            
            See the Apache Version 2.0 License for specific language governing permissions
            and limitations under the License.
            ***************************************************************************** */
            /* global Reflect, Promise */
            var extendStatics = function (d, b) {
                extendStatics = Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                    function (d, b) { for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p]; };
                return extendStatics(d, b);
            };
            function __extends(d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            }
            var __assign = function () {
                __assign = Object.assign || function __assign(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                        s = arguments[i];
                        for (var p in s)
                            if (Object.prototype.hasOwnProperty.call(s, p))
                                t[p] = s[p];
                    }
                    return t;
                };
                return __assign.apply(this, arguments);
            };
            function __rest(s, e) {
                var t = {};
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                        t[p] = s[p];
                if (s != null && typeof Object.getOwnPropertySymbols === "function")
                    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                            t[p[i]] = s[p[i]];
                    }
                return t;
            }
            function __decorate(decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                    r = Reflect.decorate(decorators, target, key, desc);
                else
                    for (var i = decorators.length - 1; i >= 0; i--)
                        if (d = decorators[i])
                            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            }
            function __param(paramIndex, decorator) {
                return function (target, key) { decorator(target, key, paramIndex); };
            }
            function __metadata(metadataKey, metadataValue) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
                    return Reflect.metadata(metadataKey, metadataValue);
            }
            function __awaiter(thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) { try {
                        step(generator.next(value));
                    }
                    catch (e) {
                        reject(e);
                    } }
                    function rejected(value) { try {
                        step(generator["throw"](value));
                    }
                    catch (e) {
                        reject(e);
                    } }
                    function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            }
            function __generator(thisArg, body) {
                var _ = { label: 0, sent: function () { if (t[0] & 1)
                        throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
                return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
                function verb(n) { return function (v) { return step([n, v]); }; }
                function step(op) {
                    if (f)
                        throw new TypeError("Generator is already executing.");
                    while (_)
                        try {
                            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                                return t;
                            if (y = 0, t)
                                op = [op[0] & 2, t.value];
                            switch (op[0]) {
                                case 0:
                                case 1:
                                    t = op;
                                    break;
                                case 4:
                                    _.label++;
                                    return { value: op[1], done: false };
                                case 5:
                                    _.label++;
                                    y = op[1];
                                    op = [0];
                                    continue;
                                case 7:
                                    op = _.ops.pop();
                                    _.trys.pop();
                                    continue;
                                default:
                                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                        _ = 0;
                                        continue;
                                    }
                                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                        _.label = op[1];
                                        break;
                                    }
                                    if (op[0] === 6 && _.label < t[1]) {
                                        _.label = t[1];
                                        t = op;
                                        break;
                                    }
                                    if (t && _.label < t[2]) {
                                        _.label = t[2];
                                        _.ops.push(op);
                                        break;
                                    }
                                    if (t[2])
                                        _.ops.pop();
                                    _.trys.pop();
                                    continue;
                            }
                            op = body.call(thisArg, _);
                        }
                        catch (e) {
                            op = [6, e];
                            y = 0;
                        }
                        finally {
                            f = t = 0;
                        }
                    if (op[0] & 5)
                        throw op[1];
                    return { value: op[0] ? op[1] : void 0, done: true };
                }
            }
            function __exportStar(m, exports) {
                for (var p in m)
                    if (!exports.hasOwnProperty(p))
                        exports[p] = m[p];
            }
            function __values(o) {
                var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
                if (m)
                    return m.call(o);
                return {
                    next: function () {
                        if (o && i >= o.length)
                            o = void 0;
                        return { value: o && o[i++], done: !o };
                    }
                };
            }
            function __read(o, n) {
                var m = typeof Symbol === "function" && o[Symbol.iterator];
                if (!m)
                    return o;
                var i = m.call(o), r, ar = [], e;
                try {
                    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                        ar.push(r.value);
                }
                catch (error) {
                    e = { error: error };
                }
                finally {
                    try {
                        if (r && !r.done && (m = i["return"]))
                            m.call(i);
                    }
                    finally {
                        if (e)
                            throw e.error;
                    }
                }
                return ar;
            }
            function __spread() {
                for (var ar = [], i = 0; i < arguments.length; i++)
                    ar = ar.concat(__read(arguments[i]));
                return ar;
            }
            function __spreadArrays() {
                for (var s = 0, i = 0, il = arguments.length; i < il; i++)
                    s += arguments[i].length;
                for (var r = Array(s), k = 0, i = 0; i < il; i++)
                    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                        r[k] = a[j];
                return r;
            }
            ;
            function __await(v) {
                return this instanceof __await ? (this.v = v, this) : new __await(v);
            }
            function __asyncGenerator(thisArg, _arguments, generator) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var g = generator.apply(thisArg, _arguments || []), i, q = [];
                return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
                function verb(n) { if (g[n])
                    i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
                function resume(n, v) { try {
                    step(g[n](v));
                }
                catch (e) {
                    settle(q[0][3], e);
                } }
                function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
                function fulfill(value) { resume("next", value); }
                function reject(value) { resume("throw", value); }
                function settle(f, v) { if (f(v), q.shift(), q.length)
                    resume(q[0][0], q[0][1]); }
            }
            function __asyncDelegator(o) {
                var i, p;
                return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
                function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
            }
            function __asyncValues(o) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var m = o[Symbol.asyncIterator], i;
                return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
                function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
                function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
            }
            function __makeTemplateObject(cooked, raw) {
                if (Object.defineProperty) {
                    Object.defineProperty(cooked, "raw", { value: raw });
                }
                else {
                    cooked.raw = raw;
                }
                return cooked;
            }
            ;
            function __importStar(mod) {
                if (mod && mod.__esModule)
                    return mod;
                var result = {};
                if (mod != null)
                    for (var k in mod)
                        if (Object.hasOwnProperty.call(mod, k))
                            result[k] = mod[k];
                result.default = mod;
                return result;
            }
            function __importDefault(mod) {
                return (mod && mod.__esModule) ? mod : { default: mod };
            }
            /***/ 
        }),
        /***/ "./src/app/app-routing.module.ts": 
        /*!***************************************!*\
          !*** ./src/app/app-routing.module.ts ***!
          \***************************************/
        /*! exports provided: AppRoutingModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () { return AppRoutingModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
            // import { SuccessComponent } from "./pages/success/success.component";
            // import { TaskComponent } from "./components/task/task.component";
            var routes = [
            // { path: "", component: TaskComponent },
            // { path: "success", component: SuccessComponent }
            ];
            var AppRoutingModule = /** @class */ (function () {
                function AppRoutingModule() {
                }
                return AppRoutingModule;
            }());
            AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
                    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
                })
            ], AppRoutingModule);
            /***/ 
        }),
        /***/ "./src/app/app.component.scss": 
        /*!************************************!*\
          !*** ./src/app/app.component.scss ***!
          \************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("header {\n  display: flex;\n  justify-content: center;\n  padding-top: 5px;\n}\n\nnav {\n  display: flex;\n  justify-content: flex-end;\n  padding: 0 40px 20px 0;\n}\n\nnav button {\n  margin-left: 10px;\n}\n\n.result {\n  margin: 10px 0 0 0;\n}\n\n.content-task {\n  margin-bottom: 30px;\n}\n\n.content-task .question {\n  margin-bottom: 10px;\n}\n\n.content-task ul {\n  list-style-type: none;\n  display: flex;\n  flex-direction: column;\n}\n\n.content-task ul li img {\n  border: 1px solid gray;\n  max-width: 100%;\n}\n\n.content-task ul li .imageInfo {\n  color: gray;\n  font-size: 0.8em;\n  font-style: italic;\n}\n\n.content-success {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n}\n\n.content-success img {\n  max-width: 90%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hY2h5c3R5L1dlYi9hbmd1bGFyL3F1aXovc3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0FDQ0Y7O0FERUE7RUFDRSxhQUFBO0VBQ0EseUJBQUE7RUFFQSxzQkFBQTtBQ0FGOztBREVFO0VBQ0UsaUJBQUE7QUNBSjs7QURJQTtFQUNFLGtCQUFBO0FDREY7O0FESUE7RUFDRSxtQkFBQTtBQ0RGOztBREdFO0VBQ0UsbUJBQUE7QUNESjs7QURJRTtFQUNFLHFCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FDRko7O0FES007RUFDRSxzQkFBQTtFQUNBLGVBQUE7QUNIUjs7QURNTTtFQUNFLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FDSlI7O0FEVUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtBQ1BGOztBRFNFO0VBRUUsY0FBQTtBQ1JKIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHBhZGRpbmctdG9wOiA1cHg7XG59XG5cbm5hdiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG5cbiAgcGFkZGluZzogMCA0MHB4IDIwcHggMDtcblxuICBidXR0b24ge1xuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICB9XG59XG5cbi5yZXN1bHQge1xuICBtYXJnaW46IDEwcHggMCAwIDA7XG59XG5cbi5jb250ZW50LXRhc2sge1xuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xuXG4gIC5xdWVzdGlvbiB7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgfVxuXG4gIHVsIHtcbiAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXG4gICAgbGkge1xuICAgICAgaW1nIHtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlOyAvL2NhbGMoODB2dyk7XG4gICAgICB9XG5cbiAgICAgIC5pbWFnZUluZm8ge1xuICAgICAgICBjb2xvcjogZ3JheTtcbiAgICAgICAgZm9udC1zaXplOiAwLjhlbTtcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4uY29udGVudC1zdWNjZXNzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblxuICBpbWcge1xuICAgIC8vIG1hcmdpbjogMjBweCAwO1xuICAgIG1heC13aWR0aDogOTAlOyAvL2NhbGMoODB2dyk7XG4gIH1cbn1cbiIsImhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBwYWRkaW5nLXRvcDogNXB4O1xufVxuXG5uYXYge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICBwYWRkaW5nOiAwIDQwcHggMjBweCAwO1xufVxubmF2IGJ1dHRvbiB7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xufVxuXG4ucmVzdWx0IHtcbiAgbWFyZ2luOiAxMHB4IDAgMCAwO1xufVxuXG4uY29udGVudC10YXNrIHtcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcbn1cbi5jb250ZW50LXRhc2sgLnF1ZXN0aW9uIHtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cbi5jb250ZW50LXRhc2sgdWwge1xuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG4uY29udGVudC10YXNrIHVsIGxpIGltZyB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XG4gIG1heC13aWR0aDogMTAwJTtcbn1cbi5jb250ZW50LXRhc2sgdWwgbGkgLmltYWdlSW5mbyB7XG4gIGNvbG9yOiBncmF5O1xuICBmb250LXNpemU6IDAuOGVtO1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG59XG5cbi5jb250ZW50LXN1Y2Nlc3Mge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuLmNvbnRlbnQtc3VjY2VzcyBpbWcge1xuICBtYXgtd2lkdGg6IDkwJTtcbn0iXX0= */");
            /***/ 
        }),
        /***/ "./src/app/app.component.ts": 
        /*!**********************************!*\
          !*** ./src/app/app.component.ts ***!
          \**********************************/
        /*! exports provided: AppComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function () { return AppComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _services_app_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/app.service */ "./src/app/services/app.service.ts");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
            var AppComponent = /** @class */ (function () {
                function AppComponent(appSrv, router) {
                    this.appSrv = appSrv;
                    this.router = router;
                    this.title = 'quiz';
                    this.quizName = '';
                    this.data = {};
                    this.currentTask = {};
                    this.resStr = '';
                    this.answer = '';
                    this.taskId = '';
                    this.isSuccess = false;
                    this.successInfo = {};
                }
                AppComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    // this.appSrv.setStorageData('2');
                    this.data = this.appSrv.getData();
                    this.quizName = this.data.settings.name;
                    this.appSrv.setNextTask();
                    // this.appSrv.getJSON().subscribe(data => {
                    //   this.data = data;
                    //   this.appSrv.setData(data);
                    //   this.appSrv.setNextTask();
                    //   this.quizName = this.data.settings.name;
                    // });
                    this.appSrv.setSuccessResultEvt.subscribe(function (obj) {
                        //console.log("success");
                        //console.log(obj);
                        if (obj.info) {
                            _this.successInfo = _this.appSrv.getSuccessInfo();
                            _this.isSuccess = true;
                            // this.router.navigate(["/success"]);
                        }
                    });
                    this.appSrv.updCurrentTaskEvt.subscribe(function (task) {
                        _this.currentTask = task;
                    });
                };
                AppComponent.prototype.onSubmit = function () {
                    if (this.answer) {
                        this.resStr = "\u0412\u0430\u0448 \u043E\u0442\u0432\u0435\u0442 [" + this.answer + "] \u043D\u0435\u0432\u0435\u0440\u043D\u044B\u0439.";
                        if (this.checkAnswer()) {
                            this.resStr = "\u0412\u0430\u0448 \u043E\u0442\u0432\u0435\u0442 [" + this.answer + "] \u0432\u0435\u0440\u043D\u044B\u0439!";
                            this.answer = '';
                            this.appSrv.setNextTask(true);
                        }
                    }
                };
                AppComponent.prototype.checkAnswer = function () {
                    var _this = this;
                    if (typeof this.currentTask.answer === 'object') {
                        var ind = this.currentTask.answer.findIndex(function (element) {
                            return element.toLowerCase() === _this.answer.toLowerCase();
                        });
                        if (ind >= 0)
                            return true;
                    }
                    else if (this.answer.toLowerCase() === this.currentTask.answer.toLowerCase()) {
                        return true;
                    }
                    return false;
                };
                AppComponent.prototype.onTest = function () {
                    console.log('Loacl data: ', this.appSrv.getStorageData());
                };
                AppComponent.prototype.onTest2 = function () {
                    this.appSrv.setStorageData('2');
                };
                AppComponent.prototype.onTest3 = function () {
                    window.location.reload();
                };
                AppComponent.prototype.onNewGame = function () {
                    this.appSrv.setStorageData('');
                    // this.appSrv.setNextTask();
                    window.location.reload();
                };
                return AppComponent;
            }());
            AppComponent.ctorParameters = function () { return [
                { type: _services_app_service__WEBPACK_IMPORTED_MODULE_1__["AppService"] },
                { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
            ]; };
            AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
                    selector: 'app-root',
                    template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
                    styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")).default]
                })
            ], AppComponent);
            /***/ 
        }),
        /***/ "./src/app/app.module.ts": 
        /*!*******************************!*\
          !*** ./src/app/app.module.ts ***!
          \*******************************/
        /*! exports provided: AppModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function () { return AppModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
            /* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
            /* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
            /* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
            /* harmony import */ var ngx_webstorage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-webstorage-service */ "./node_modules/ngx-webstorage-service/fesm2015/ngx-webstorage-service.js");
            //import { SuccessComponent } from "./pages/success/success.component";
            //import { TaskComponent } from "./components/task/task.component";
            var AppModule = /** @class */ (function () {
                function AppModule() {
                }
                return AppModule;
            }());
            AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
                    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]],
                    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"], ngx_webstorage_service__WEBPACK_IMPORTED_MODULE_7__["StorageServiceModule"]],
                    providers: [],
                    bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
                })
            ], AppModule);
            /***/ 
        }),
        /***/ "./src/app/services/app.service.ts": 
        /*!*****************************************!*\
          !*** ./src/app/services/app.service.ts ***!
          \*****************************************/
        /*! exports provided: AppService */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppService", function () { return AppService; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
            /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
            /* harmony import */ var ngx_webstorage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-webstorage-service */ "./node_modules/ngx-webstorage-service/fesm2015/ngx-webstorage-service.js");
            var STORAGE_KEY = "quiz_storage";
            var AppService = /** @class */ (function () {
                function AppService(http, storage) {
                    this.http = http;
                    this.storage = storage;
                    this.currentTask = {};
                    this.successInfo = {};
                    this.savedTaskId = '';
                    this.data = {
                        settings: {
                            name: 'Тестовая игра'
                        },
                        tasks: [
                            {
                                id: "1",
                                question: "Как тебя зовут?",
                                answer: ["Daniil", "Daniel", "Даниил"]
                            },
                            {
                                id: '2',
                                question: '2 + 2 = ',
                                answer: '4',
                                images: [
                                    { fileName: '04_01.jpg', descr: 'Остров' },
                                    { fileName: '04_02.jpeg', descr: 'Красота' }
                                ]
                            },
                        ],
                        success: {
                            imageFileName: "success.jpg",
                            info: 'Ура, победа!!!'
                        }
                    };
                    this.currentTaskBS = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]({});
                    this.updCurrentTaskEvt = this.currentTaskBS.asObservable();
                    this.successResultBS = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]({});
                    this.setSuccessResultEvt = this.successResultBS.asObservable();
                }
                // public getJSON(): Observable<any> {
                //   return this.http.get('../../assets/model/quiz.json');
                // }
                AppService.prototype.submitAnswer = function () { };
                // setData(data) {
                //   this.data = data;
                // }
                AppService.prototype.getData = function () {
                    return this.data;
                };
                AppService.prototype.setSuccessResult = function () {
                    this.successInfo = this.getData().success;
                    this.successResultBS.next(this.successInfo);
                };
                AppService.prototype.getSuccessInfo = function () {
                    return this.successInfo;
                };
                AppService.prototype.getQuizName = function () {
                    return this.data.settings.name;
                };
                AppService.prototype.setNextTask = function (next) {
                    var _this = this;
                    if (next === void 0) { next = false; }
                    this.savedTaskId = this.getStorageData();
                    if (this.savedTaskId === 'success') {
                        this.setSuccessResult();
                        return;
                    }
                    if (this.savedTaskId === '') {
                        this.currentTask = this.data.tasks[0];
                        this.setStorageData(this.currentTask.id);
                        // this.savedTaskId = this.currentTask.id;
                    }
                    else {
                        if (next) {
                            var ind = this.data.tasks.findIndex(function (item) { return item.id === _this.savedTaskId; });
                            ind++;
                            if (ind === this.data.tasks.length) {
                                this.setStorageData('success');
                                this.setSuccessResult();
                                return;
                            }
                            this.currentTask = this.data.tasks[ind];
                        }
                        else {
                            this.currentTask = this.data.tasks.find(function (item) { return item.id === _this.savedTaskId; });
                        }
                        this.setStorageData(this.currentTask.id);
                        // this.savedTaskId = this.currentTask.id;
                    }
                    this.currentTaskBS.next(this.currentTask);
                };
                AppService.prototype.setStorageData = function (data) {
                    this.storage.set(STORAGE_KEY, data);
                };
                AppService.prototype.getStorageData = function () {
                    return this.storage.get(STORAGE_KEY);
                };
                return AppService;
            }());
            AppService.ctorParameters = function () { return [
                { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
                { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [ngx_webstorage_service__WEBPACK_IMPORTED_MODULE_4__["LOCAL_STORAGE"],] }] }
            ]; };
            AppService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
                    providedIn: 'root'
                }),
                tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(ngx_webstorage_service__WEBPACK_IMPORTED_MODULE_4__["LOCAL_STORAGE"]))
            ], AppService);
            /***/ 
        }),
        /***/ "./src/environments/environment.ts": 
        /*!*****************************************!*\
          !*** ./src/environments/environment.ts ***!
          \*****************************************/
        /*! exports provided: environment */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function () { return environment; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            // This file can be replaced during build by using the `fileReplacements` array.
            // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
            // The list of file replacements can be found in `angular.json`.
            var environment = {
                production: false
            };
            /*
             * For easier debugging in development mode, you can import the following file
             * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
             *
             * This import should be commented out in production mode because it will have a negative impact
             * on performance if an error is thrown.
             */
            // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
            /***/ 
        }),
        /***/ "./src/main.ts": 
        /*!*********************!*\
          !*** ./src/main.ts ***!
          \*********************/
        /*! no exports provided */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
            /* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
            /* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
            if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
            }
            Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
                .catch(function (err) { return console.error(err); });
            /***/ 
        }),
        /***/ 0: 
        /*!***************************!*\
          !*** multi ./src/main.ts ***!
          \***************************/
        /*! no static exports found */
        /***/ (function (module, exports, __webpack_require__) {
            module.exports = __webpack_require__(/*! /Users/achysty/Web/angular/quiz/src/main.ts */ "./src/main.ts");
            /***/ 
        })
    }, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main-es2015.js.map
//# sourceMappingURL=main-es5.js.map
//# sourceMappingURL=main-es5.js.map