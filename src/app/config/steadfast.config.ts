export const steadfastConfig = {
  baseURL: "https://portal.packzy.com/api/v1",
  apiKey: process.env.STEADFAST_API_KEY as string,
  secretKey: process.env.STEADFAST_SECRET_KEY as string,
};

// Validate config on load
if (!steadfastConfig.apiKey || !steadfastConfig.secretKey) {
  console.error('❌ Steadfast API credentials not found in environment variables!');
  console.error('STEADFAST_API_KEY:', steadfastConfig.apiKey ? 'SET' : 'MISSING');
  console.error('STEADFAST_SECRET_KEY:', steadfastConfig.secretKey ? 'SET' : 'MISSING');
} else {
  console.log('✅ Steadfast API credentials loaded successfully');
}
