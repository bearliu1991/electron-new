<template>
  <div id="grab" @click="openGrobPool">
    <div class="portrait">
      <img :src="order.logo" alt="">
    </div>
    <div class="cont">
      <div class="name">
        {{order.label}}
      </div>
      <div class="msg">
        <span class="red">[{{order.order}}个待抢单]</span>
      </div>
    </div>
    <div class="time">
      <div class="last-time gray">{{order.time}}</div>
      <span class="icon close-btn" @click.stop="closeChat(order.id, order.index)">&#xe611;</span>
    </div>
  </div>
</template>

<script>

export default {
  name: "grabpool",
  data() {
    return {
      order: {
        logo: "http://xingke100.com/logo.png",
        label: "抢单池",
        time: "11:37",
        order: 5
      }
    }
  },
  methods: {
    openGrobPool() {
      this.$store.commit('grabPool/SHOW_POOL', true)
      // 需要传参
      this.$store.dispatch('grabPool/ajaxOrderList', 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/index.styl';
#grab
      display: block
      relative()
      height:66px
      box-sizing:border-box
      padding:5px
      cursor()
      &.active
        bgColor(color6)
      &.isTop
        bgColor(color1)
      &:hover
        bgColor(color6)
        .last-time
          display none
        .close-btn
          display block
      .portrait
        position: absolute
        top: 15px
        left: 10px
        height 40px
        width 40px
        fn(12px)
        center()
        radius(50%)
        color(#5d8cdb)
        bgColor(#e1edff)
        mr(15px)
        img
          max-width 100%
          max-height 100%
      .cont
        width:138px
        position: absolute
        left: 55px
        top: 17px
        .name
          margin-bottom:10px
          color(#000)
        .msg
          ellipsis()
      .time
        position: absolute
        right: 10px
        top: 17px
        width:50px
        text-align:right
        ellipsis()
        color color4
      .icon
        display: inline-block
        margin-top: 6px
      .close-btn
        display none
        color color4
        &:hover
          color color8
</style>
