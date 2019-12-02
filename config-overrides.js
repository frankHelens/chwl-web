const { override, fixBabelImports, addWebpackAlias } = require('customize-cra');
const path = require('path');

process.env.GENERATE_SOURCEMAP = "false";

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),// 配置别名
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    'components': path.resolve(__dirname, 'src/components'),
    'pages': path.resolve(__dirname, 'src/pages')
  })
);
