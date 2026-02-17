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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoliceStations = exports.getPaymentById = exports.getPayments = exports.getReturnRequests = exports.getReturnRequest = exports.createReturnRequest = exports.getCurrentBalance = exports.getStatusByTrackingCode = exports.getStatusByInvoice = exports.getStatusByConsignmentId = exports.bulkCreateOrders = exports.createOrder = void 0;
const axios_1 = __importDefault(require("axios"));
const steadfast_config_1 = require("../../config/steadfast.config");
// Create dedicated Steadfast axios client
const steadfastClient = axios_1.default.create({
    baseURL: steadfast_config_1.steadfastConfig.baseURL,
    headers: {
        "Api-Key": steadfast_config_1.steadfastConfig.apiKey,
        "Secret-Key": steadfast_config_1.steadfastConfig.secretKey,
        "Content-Type": "application/json",
    },
});
// Log configuration on initialization
console.log('🚚 Steadfast Client Initialized:');
console.log('Base URL:', steadfast_config_1.steadfastConfig.baseURL);
console.log('API Key:', steadfast_config_1.steadfastConfig.apiKey ? '✅ SET' : '❌ MISSING');
console.log('Secret Key:', steadfast_config_1.steadfastConfig.secretKey ? '✅ SET' : '❌ MISSING');
// ✅ 1️⃣ Create single order
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    try {
        console.log('📦 Creating Steadfast order...');
        console.log('Request URL:', `${steadfast_config_1.steadfastConfig.baseURL}/create_order`);
        console.log('Order Data:', JSON.stringify(orderData, null, 2));
        const { data } = yield steadfastClient.post("/create_order", orderData);
        console.log('✅ Steadfast API Success:', JSON.stringify(data, null, 2));
        return data;
    }
    catch (error) {
        console.error('❌ Steadfast API Error:');
        console.error('Status:', (_a = error.response) === null || _a === void 0 ? void 0 : _a.status);
        console.error('Status Text:', (_b = error.response) === null || _b === void 0 ? void 0 : _b.statusText);
        console.error('Response Data:', JSON.stringify((_c = error.response) === null || _c === void 0 ? void 0 : _c.data, null, 2));
        console.error('Request Config:', {
            baseURL: (_d = error.config) === null || _d === void 0 ? void 0 : _d.baseURL,
            url: (_e = error.config) === null || _e === void 0 ? void 0 : _e.url,
            method: (_f = error.config) === null || _f === void 0 ? void 0 : _f.method,
            headers: (_g = error.config) === null || _g === void 0 ? void 0 : _g.headers,
        });
        // Handle specific error cases
        if (((_h = error.response) === null || _h === void 0 ? void 0 : _h.status) === 401) {
            throw new Error('Invalid Steadfast API credentials. Please verify API Key and Secret Key.');
        }
        if (((_j = error.response) === null || _j === void 0 ? void 0 : _j.status) === 422) {
            const validationErrors = ((_l = (_k = error.response) === null || _k === void 0 ? void 0 : _k.data) === null || _l === void 0 ? void 0 : _l.errors) || ((_m = error.response) === null || _m === void 0 ? void 0 : _m.data);
            throw new Error(`Validation Error: ${JSON.stringify(validationErrors)}`);
        }
        const errorMessage = ((_p = (_o = error.response) === null || _o === void 0 ? void 0 : _o.data) === null || _p === void 0 ? void 0 : _p.message) || error.message || 'Steadfast API request failed';
        throw new Error(errorMessage);
    }
});
exports.createOrder = createOrder;
// ✅ 2️⃣ Bulk order creation (max 500)
const bulkCreateOrders = (orders) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const payload = { data: orders };
        const { data } = yield steadfastClient.post("/create_order/bulk-order", payload);
        return data;
    }
    catch (error) {
        console.error('❌ Steadfast Bulk Order Error:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        throw new Error(((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || 'Failed to create bulk orders');
    }
});
exports.bulkCreateOrders = bulkCreateOrders;
// ✅ 3️⃣ Check delivery status (by consignment ID)
const getStatusByConsignmentId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { data } = yield steadfastClient.get(`/status_by_cid/${id}`);
        return data;
    }
    catch (error) {
        console.error('❌ Steadfast Status by Consignment ID Error:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        throw new Error(((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || 'Failed to fetch status by consignment ID');
    }
});
exports.getStatusByConsignmentId = getStatusByConsignmentId;
// ✅ 4️⃣ Check delivery status (by invoice)
const getStatusByInvoice = (invoice) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const { data } = yield steadfastClient.get(`/status_by_invoice/${invoice}`);
        return data;
    }
    catch (error) {
        console.error('❌ Steadfast Status by Invoice Error:', {
            status: (_a = error.response) === null || _a === void 0 ? void 0 : _a.status,
            data: (_b = error.response) === null || _b === void 0 ? void 0 : _b.data,
            message: error.message
        });
        throw ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data) || new Error(((_e = (_d = error.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.message) || error.message || 'Failed to fetch status by invoice');
    }
});
exports.getStatusByInvoice = getStatusByInvoice;
// ✅ 5️⃣ Check delivery status (by tracking code)
const getStatusByTrackingCode = (trackingCode) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { data } = yield steadfastClient.get(`/status_by_trackingcode/${trackingCode}`);
        return data;
    }
    catch (error) {
        console.error('❌ Steadfast Status by Tracking Code Error:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        throw new Error(((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || 'Failed to fetch status by tracking code');
    }
});
exports.getStatusByTrackingCode = getStatusByTrackingCode;
// ✅ 6️⃣ Get current balance
const getCurrentBalance = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { data } = yield steadfastClient.get("/get_balance");
        return data;
    }
    catch (error) {
        console.error('❌ Steadfast Get Balance Error:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        throw new Error(((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || 'Failed to fetch balance');
    }
});
exports.getCurrentBalance = getCurrentBalance;
// ✅ 7️⃣ Create return request
const createReturnRequest = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield steadfastClient.post("/create_return_request", payload);
    return data;
});
exports.createReturnRequest = createReturnRequest;
// ✅ 8️⃣ Get single return request
const getReturnRequest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield steadfastClient.get(`/get_return_request/${id}`);
    return data;
});
exports.getReturnRequest = getReturnRequest;
// ✅ 9️⃣ Get all return requests
const getReturnRequests = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield steadfastClient.get("/get_return_requests");
    return data;
});
exports.getReturnRequests = getReturnRequests;
// ✅ 🔟 Get payments
const getPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield steadfastClient.get("/payments");
    return data;
});
exports.getPayments = getPayments;
// ✅ 1️⃣1️⃣ Get single payment with consignments
const getPaymentById = (paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield steadfastClient.get(`/payments/${paymentId}`);
    return data;
});
exports.getPaymentById = getPaymentById;
// ✅ 1️⃣2️⃣ Get police stations
const getPoliceStations = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield steadfastClient.get("/police_stations");
    return data;
});
exports.getPoliceStations = getPoliceStations;
