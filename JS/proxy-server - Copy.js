const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

// Add a preflight OPTIONS request handler
app.options('*', cors());

app.use('/api', createProxyMiddleware({
    target: 'https://omni-apis.montymobile.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/notification/api/v1/SMSCampaign/campaign-file' 
    },
    onProxyReq: (proxyReq, req, res) => {
        // Add CORS headers to the proxy request
        proxyReq.setHeader('Access-Control-Allow-Origin', '*');
        proxyReq.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        proxyReq.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    }
}));

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
