const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
  // 按需导入
  fixBabelImports('import', {
    // 组件库名
    libraryName: 'antd-mobile',
    style: 'css',
  }),
);