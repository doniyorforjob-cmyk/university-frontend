const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const Critters = require('critters-webpack-plugin');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    plugins: [
      ...(process.env.ANALYZE === 'true' ? [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: 'bundle-report.html',
          openAnalyzer: true,
          generateStatsFile: true,
          statsFilename: 'bundle-stats.json',
        }),
      ] : []),
      // Production build'da Critical CSS'ni inline qilish
      ...(process.env.NODE_ENV === 'production' ? [
        new Critters({
          preload: 'swap',
          prepend: true,
          pruneSource: true,
        }),
      ] : []),
    ],
  },
};

