const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/api', createProxyMiddleware({target: 'http://demo.local', changeOrigin: true,}));
    app.use('/themes', createProxyMiddleware({target: 'http://demo.local', changeOrigin: true,}));
    app.use('/geoserver', createProxyMiddleware({target: 'http://localhost:8080', changeOrigin: false}));
};