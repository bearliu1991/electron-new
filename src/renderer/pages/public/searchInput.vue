<template>
  <div id="search_input">
    <span class="icon seach_icon">&#xe7d4;</span>
    <input :class="isFocus ? 'focus' : ''" type="text" placeholder="搜索"
           @focus="focus" @blur="blur" v-model="inputVal" @keyup="getArr">
    <i class="icon clear" @click="clear" v-show="inputVal">&#xe617;</i>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "index",
    data() {
      return {
        isFocus: false,
        inputVal: ''
      }
    },
    computed: {
      ...mapState({
        records: state => state.chat.contactRecord
      })
    },
    methods: {
      focus() {
        this.isFocus = true
      },
      blur() {
        this.isFocus = false
        if (this.inputVal) {

        }
      },
      clear() {
        this.inputVal = ''
        this.$store.commit('chat/SHOW_SEARCH_RES', false)
        this.$store.commit("chat/SEARCH_ACTIVE")
      },
      async getArr() {
        let val = this.inputVal.trim()
        if (val) {
          let res = await this.searchUser()
          let data = res
          if (data.code === 1) {
            // 调用接口搜索，没有搜索本地
            this.$store.commit('chat/CHAT_RES', data.data)
            this.$store.commit('chat/SHOW_SEARCH_RES', true)
          }
        } else {
          this.$store.commit('chat/SHOW_SEARCH_RES', false)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #search_input
    padding 10px 15px
    relative()
    .seach_icon
      absolute()
      font-size: 17px;
      left: 21px;
      top: 17px;
    placeholder(#cacbcc)
    input
      width: 230px
      height: 30px
      line-height 30px
      font-size 16px
      bgColor(color1)
      padding-left: 37px
      radius(13px)
    .clear
      absolute()
      right: 20px;
      top: 17px;
      cursor: pointer;
      color color4
</style>
