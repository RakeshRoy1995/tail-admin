import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://149.28.135.157:5000',
      changeOrigin: true,
    })
  );
};