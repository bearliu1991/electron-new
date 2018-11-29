import Vue from 'vue'
import AvatarPop from './AvatarPop'

const defaultOptions = {
  isVisible: true,
  url: '', // 图片地址
  onClose: () => {}
}

let queue = []

// 创建组件实例并且挂载
function createInstance () {
  if (!queue.length) {
    const AvatarPopConstructor = Vue.extend(AvatarPop)
    // 创建组件
    const avatarPop = new AvatarPopConstructor({
      el: document.createElement('div')
    })

    // 对组件进行挂载
    document.body.appendChild(avatarPop.$el)
    queue.push(avatarPop)
  }
  return queue[queue.length - 1]
}

// 入口方法对象
function AvatarFn (url) {
  // 创建实例对象
  const avatarPop = createInstance()
  // 新的参数
  const options = {
    ...defaultOptions,
    url,
    clear: function () {
      avatarPop.isVisible = false
    }
  }

  // 对数据传递参数和方法
  Object.assign(avatarPop, options)
}

// Vue.prototype.$avatarImage = AvatarFn

export default AvatarFn
