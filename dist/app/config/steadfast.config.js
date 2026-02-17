"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.steadfastConfig = void 0;
exports.steadfastConfig = {
    baseURL: "https://portal.packzy.com/api/v1",
    apiKey: process.env.STEADFAST_API_KEY,
    secretKey: process.env.STEADFAST_SECRET_KEY,
};
// Validate config on load
if (!exports.steadfastConfig.apiKey || !exports.steadfastConfig.secretKey) {
    console.error('❌ Steadfast API credentials not found in environment variables!');
    console.error('STEADFAST_API_KEY:', exports.steadfastConfig.apiKey ? 'SET' : 'MISSING');
    console.error('STEADFAST_SECRET_KEY:', exports.steadfastConfig.secretKey ? 'SET' : 'MISSING');
}
else {
    console.log('✅ Steadfast API credentials loaded successfully');
}
