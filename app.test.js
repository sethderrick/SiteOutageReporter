"use strict";
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
var axios_1 = require("axios");
var app_1 = require("./app");
jest.mock('axios'); // Mock the axios module for testing
describe("tryRequest function", function () {
    it("should retry the request on 500 error", function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockRequest, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockRequest = jest.fn().mockRejectedValueOnce({ response: { status: 500 } })
                        .mockResolvedValueOnce({ data: "success" });
                    return [4 /*yield*/, (0, app_1.tryRequest)(mockRequest)];
                case 1:
                    response = _a.sent();
                    expect(response).toBe("success");
                    expect(mockRequest).toHaveBeenCalledTimes(2);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should throw an error on 403", function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockRequest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockRequest = jest.fn().mockRejectedValue({ response: { status: 403 } });
                    return [4 /*yield*/, expect((0, app_1.tryRequest)(mockRequest)).rejects.toThrow()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should throw an error on 404", function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockRequest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockRequest = jest.fn().mockRejectedValue({ response: { status: 404 } });
                    return [4 /*yield*/, expect((0, app_1.tryRequest)(mockRequest)).rejects.toThrow()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should throw an error on 429", function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockRequest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockRequest = jest.fn().mockRejectedValue({ response: { status: 429 } });
                    return [4 /*yield*/, expect((0, app_1.tryRequest)(mockRequest)).rejects.toThrow()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should throw an unknown error", function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockRequest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockRequest = jest.fn().mockRejectedValue({});
                    return [4 /*yield*/, expect((0, app_1.tryRequest)(mockRequest)).rejects.toThrow("An unknown error has occurred.")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("API request functions", function () {
    it("should make a GET request with the correct endpoint and headers", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    axios_1.default.get.mockResolvedValue({ data: "success" });
                    return [4 /*yield*/, (0, app_1.get)("test-endpoint")];
                case 1:
                    response = _a.sent();
                    expect(axios_1.default.get).toHaveBeenCalledWith("https://api.krakenflex.systems/interview-tests-mock-api/v1/test-endpoint", { headers: { 'x-api-key': process.env.API_KEY } });
                    expect(response).toBe("success");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should make a POST request with the correct endpoint, data, and headers", function () { return __awaiter(void 0, void 0, void 0, function () {
        var testData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testData = { key: "value" };
                    axios_1.default.post.mockResolvedValue({ data: "success" });
                    return [4 /*yield*/, (0, app_1.post)("test-endpoint", testData)];
                case 1:
                    response = _a.sent();
                    expect(axios_1.default.post).toHaveBeenCalledWith("https://api.krakenflex.systems/interview-tests-mock-api/v1/test-endpoint", testData, { headers: { 'x-api-key': process.env.API_KEY } });
                    expect(response).toBe("success");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("main function", function () {
    it("should filter outages by date correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    axios_1.default.get.mockResolvedValueOnce({ data: [{ begin: "2022-01-01T00:00:00.000Z" }, { begin: "2021-12-31T23:59:59.999Z" }] })
                        .mockResolvedValueOnce({ data: { devices: [] } });
                    return [4 /*yield*/, (0, app_1.main)()];
                case 1:
                    _a.sent();
                    expect(axios_1.default.post).toHaveBeenCalledWith(expect.anything(), [{ begin: "2022-01-01T00:00:00.000Z" }]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should report only outages related to specific site devices", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    axios_1.default.get.mockResolvedValueOnce({ data: [{ id: 1 }, { id: 2 }] })
                        .mockResolvedValueOnce({ data: { devices: [{ id: 1 }] } });
                    return [4 /*yield*/, (0, app_1.main)()];
                case 1:
                    _a.sent();
                    expect(axios_1.default.post).toHaveBeenCalledWith(expect.anything(), [{ id: 1 }]);
                    return [2 /*return*/];
            }
        });
    }); });
    // ... (additional tests for main function's logic)
});
