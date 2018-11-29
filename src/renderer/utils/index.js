import request from '../api/request'
import components from './components'
import socket from '../api/socket'
import * as common from './public'
import Config from '@/config'
import avatarFn from '../components/AvatarImage'
import basicModal from '../components/Modal'

export default {
  install(Vue, options) {
    // 引入请求内容
    request()
    Vue.prototype.$avatarImage = avatarFn
    Vue.prototype.$confirm = basicModal
    Vue.prototype.$socket = socket
    Vue.prototype.deepCopy = function (data) {
      return JSON.parse(JSON.stringify(data));
    }
    // 全局监听click事件，用于全局点击的时候隐藏内容
    Vue.prototype.globalClick = function (callback) {
      document.getElementById('app').onclick = function () {
        callback()
      }
    }

    Vue.prototype._BUS = new Vue()
    Vue.prototype.Config = Config

    // 将public下面所有的公共方法注册为公用方法
    for (let key in common.default) {
      Vue.prototype.key = common.default[key]
    }

    // 将plugins下面所有的vue组件注册为全局组件
    for (let key in components) {
      Vue.component(key, components[key])
    }
    Vue.prototype.targetPosition = function(_event) {
      let clientRect = _event.target.getBoundingClientRect()
      let position = {
          x: Math.round(clientRect.left),
          y: Math.round(clientRect.top),
          w: Math.round(clientRect.width),
          h: Math.round(clientRect.height)
      }
      return position
    }
    Vue.prototype.getViewPort = function() {
        if (document.compatMode === "BackCompat") {
          // 浏览器嗅探，混杂模式
            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            };
        } else {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            };
        }
    }
  }
}
