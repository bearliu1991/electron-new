import Path from '@/api/grabPool'
import Service from '@/api/service'

const state = {
  showPool: false, // 打开抢单池
  orderList: [] // 抢单池列表
}

const getters = {
  getShowPool: state => state.showPool,
  getOrderList: state => state.orderList
}

const mutations = {
  SHOW_POOL(state, boolean) {
    state.showPool = boolean
    console.log(boolean)
  },
  ORDER_LIST(state, data) {
    state.orderList = data
  }
}

const actions = {
  ajaxOrderList({commit, state}, idx) {
    Service.httpPost(Path.orderList, {id: idx}).then((res) => {
        if (res.code === 1) {
          commit('ORDER_LIST', res.data)
        }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
