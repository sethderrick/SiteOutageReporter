"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.post = exports.get = exports.tryRequest = void 0;
var axios_1 = require("axios");
require('dotenv').config();
var BASE_URL = "https://api.krakenflex.systems/interview-tests-mock-api/v1/";
var API_KEY = process.env.API_KEY; // Pull API key from environment variables
// Function to implement retry mechanism
// NOTE: If necessary to meet more explicit requirements, this function could be replaced with a more 
//  elegant exponential backoff algorithm or a circuit breaker algorithm. 
function tryRequest(requestFunc, retries) {
    if (retries === void 0) { retries = 3; }
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1, axiosError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(retries > 0)) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, requestFunc()];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
                case 3:
                    error_1 = _a.sent();
                    axiosError = error_1;
                    if (axiosError.response && axiosError.response.status === 500) {
                        retries -= 1;
                        if (retries === 0)
                            throw error_1;
                    }
                    else if (axiosError.response && axiosError.response.status === 403) {
                        console.log("You do not have the required permissions to make this request.");
                        throw error_1;
                    }
                    else if (axiosError.response && axiosError.response.status === 404) {
                        console.log("You have requested a resource that does not exist.");
                        throw error_1;
                    }
                    else if (axiosError.response && axiosError.response.status === 429) {
                        console.log("You've exceeded your limit for your API key.");
                        throw error_1;
                    }
                    else {
                        console.log("An unknown error has occurred.");
                        throw error_1;
                    }
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 0];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.tryRequest = tryRequest;
function get(endpoint) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, tryRequest(function () { return axios_1.default.get("".concat(BASE_URL).concat(endpoint), {
                    headers: {
                        'x-api-key': API_KEY,
                    },
                }); })];
        });
    });
}
exports.get = get;
function post(endpoint, data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, tryRequest(function () { return axios_1.default.post("".concat(BASE_URL).concat(endpoint), data, {
                    headers: {
                        'x-api-key': API_KEY,
                    },
                }); })];
        });
    });
}
exports.post = post;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var outages, siteInfo_1, filteredOutages, outagesToReport, postResult, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, get("outages")];
                case 1:
                    outages = _a.sent();
                    return [4 /*yield*/, get("site-info/norwich-pear-tree")];
                case 2:
                    siteInfo_1 = _a.sent();
                    filteredOutages = outages
                        .filter(function (o) { return new Date(o.begin) >= new Date("2022-01-01T00:00:00.000Z"); });
                    outagesToReport = filteredOutages.filter(function (outage) {
                        return siteInfo_1.devices.some(function (device) { return device.id === outage.id; });
                    }).map(function (outage) {
                        var matchingDevice = siteInfo_1.devices.find(function (device) { return device.id === outage.id; });
                        return __assign(__assign({}, outage), { name: matchingDevice === null || matchingDevice === void 0 ? void 0 : matchingDevice.name });
                    });
                    return [4 /*yield*/, post("site-outages/norwich-pear-tree", outagesToReport)];
                case 3:
                    postResult = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
main();
