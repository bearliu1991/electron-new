<template>
  <Icon type="ios-checkmark" v-show="!isShow" id="icon_choose" :style="{right: rightVal, bottom: bottomVal}"></Icon>
  <!-- <i  v-show="isShow" class="icon">&#xe637;</i> -->
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    name: "index",
    props: {
      item: {
        default: () => { return {} }
      },
      rightVal: {
        default: 0
      },
      bottomVal: {
        default: 0
      }
    },
    computed: {
      ...mapState({
        fileUrls: state => state.chat.fileUrls
      }),
      isShow() {
        if (this.fileUrls.length && this.item) {
          return this.fileUrls.findIndex(n => n.id === this.item.id) > -1
        }
        return false
      }    
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #icon_choose
    absolute()
    square(20px)
    line-height:20px !important
    fn(20px)
    color(green)
</style>
