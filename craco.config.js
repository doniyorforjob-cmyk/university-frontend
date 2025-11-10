const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    plugins: process.env.ANALYZE === 'true' ? [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'bundle-report.html',
        openAnalyzer: true,
        generateStatsFile: true,
        statsFilename: 'bundle-stats.json',
      }),
    ] : [],
  },
};

