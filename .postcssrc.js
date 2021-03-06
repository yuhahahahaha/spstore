// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-px-to-viewport":{
      viewportWidth: 360,//视图的宽度，对应的是我们设计稿的宽度
      viewportHeight:740,//视图的宽度，对应的是我们设计稿的高度
      unitPrecision: 5,//指定'px'转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw',//指定需要转成的视图单位，建议使用vw
      selectorBlackList: ['ignore'],//指定不需要转换的类
      minPixelValue: 1,//小于或等于‘1px’不转换为视图单位
      mediaQuery: false,//允许在媒体查询中转换‘px’
    },
  }
}
