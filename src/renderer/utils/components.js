// 加载所有plugins下所有的vue组件
const files = require.context('@/components', false, /\.vue$/)
const publics = require.context('@/components/public', false, /\.vue$/)
const plugins = require.context('@/components/plugins', false, /\.vue$/)
const resource = require.context('@/components/resource', false, /\.vue$/)
const contextMenu = require.context('@/components/contextMenu', false, /\.vue$/)
const modules = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
})
publics.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.vue)/g, '')] = publics(key).default
})
plugins.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.vue)/g, '')] = plugins(key).default
})
resource.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.vue)/g, '')] = resource(key).default
})
contextMenu.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.vue)/g, '')] = contextMenu(key).default
})

export default modules
