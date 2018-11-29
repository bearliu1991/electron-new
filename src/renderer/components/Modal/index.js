import Vue from 'vue'
import BasicModal from './BasicModal'

const defaultOptions = {
  title: '',
  content: '',
  width: 416,
  okText: '确定',
  cancelText: '取消',
  onOk: () => {},
  onCancel: () => {},
  render: undefined
}

let queue = []

// 创建组件实例并且挂载
function createInstance () {
  if (!queue.length) {
    const BasicModalConstructor = Vue.extend(BasicModal)
    // 创建组件
    const basicModalInstance = new BasicModalConstructor({
      el: document.createElement('div')
    })
    document.body.appendChild(basicModalInstance.$el)
    queue.push(basicModalInstance)
  }
  return queue[queue.length - 1]
}

// 入口方法对象
function confirmFn (options) {
  // 创建实例对象
  const basicModalInstance = createInstance();
  // 新的参数
  options = {
    ...defaultOptions,
    ...options,
    modal: true
  }
  // 对数据传递参数和方法
  Object.assign(basicModalInstance, options)
  return basicModalInstance;
}

export default confirmFn
