// 此处放置公用配置内容
let isDesktop = true // 桌面端设为true, 网页端为false,

export default {
  isDesktop: isDesktop,
  isWeb: false, // 要打包为web页面时，一定要改为true,否则报electron不存在  http://apitest.xingke100.com/api
  url: process.env.NODE_ENV !== "development" ? 'http://localhost:8091/api' : 'http://localhost:8091/api',
  absUrl: isDesktop ? `${__dirname}` : ''
}
