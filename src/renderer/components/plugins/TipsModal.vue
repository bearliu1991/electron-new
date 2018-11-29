<template>
  <transition :name="tipsStyles.position">
    <div class="padding_scroll_tips" :style="tipsStyles.paddingPosition" v-if="showTips">
      <div class="pool_tips" :style="tipsStyles.background" @click="closeTips(0)">
        <div class="tex" :style="tipsStyles.textColor">
          {{textTips}}
        </div>
        <div class="pool_close">
          <Icon type="close-round" color="#979899" @click.stop="closeTips(1)"></Icon>
        </div>
      </div>
    </div> 
  </transition>
</template>
<script>
export default {
  name: 'scroll_tips',
  model: {
    prop: 'showTips',
    event: 'close'
  },
  props: {
    showTips: {
      default: false,
      type: Boolean
    },
    textTips: {
      default: '您有3个新待抢单',
      type: String
    },
    styles: {
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      tipsStyles: {
        paddingPosition: {
          paddingLeft: '0',
          paddingRight: '0'
        },
        background: {
          background: '#fffaf2'
        },
        textColor: {
          color: '#ffa319'
        },
        position: 'tips-top'
      }
    }
  },
  mounted() {
    this.tipsStyles = Object.assign({}, this.tipsStyles, this.styles)
  },
  methods: {
    closeTips(idx) {
      this.$emit('close', false)
      this.$emit('changeScroll', idx)
    }
  }
}
</script>
<style lang="stylus">
.padding_scroll_tips
  z-index 10
  height 50px
  line-height 50px
  position absolute
  width 100%
  &.padding_scroll
    padding-left 40px
    padding-right 40px
  .pool_tips
    position relative
    background-color: #fffaf2
    .tex
      color #ffa319
      text-align center
    .pool_close
      cursor pointer
      position absolute
      right 20px
      top 40%
      line-height 1
.tips-top-enter-active, .tips-top-leave-active {
  transition all .3s
}
.tips-top-enter, .tips-top-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform translateY(-100%)
}
.tips-bottom-enter-active, .tips-bottom-leave-active {
  transition all .3s
}
.tips-bottom-enter, .tips-bottom-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform translateY(100%)
} 
</style>