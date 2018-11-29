<template>
  <div class="juhua_loading">
    <div class="wrapper">
      <div class="line1"></div>
      <div class="line2"></div>
      <div class="line3"></div>
      <div class="line4"></div>
      <div class="line5"></div>
      <div class="line6"></div>
      <div class="line7"></div>
      <div class="line8"></div>
      <div class="line9"></div>
      <div class="line10"></div>
      <div class="line11"></div>
      <div class="line12"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    zoom: {
      default: 0.33,
      type: Number
    }
  }
}
</script>
<style lang="stylus">
.juhua_loading
  display inline-block
  width 30px
  height 30px
  @keyframes loading
    from
      opacity 1
      width 8px
      height 25px
      background #fff
    to
      opacity 0.25
      width 8px
      height 25px
      background #a4a2a4
  .wrapper
    position relative
    width 100%
    height 100%
    display inline-block
    zoom 0.33 /* 通过修改这个值(值的区间为0-1)的大小来设置菊花的大小 */
  .wrapper div
    border-radius 2px
    width 8px
    height 25px
    background #fff
    position absolute
    left 40px
    top 37px
    opacity 0
    -webkit-animation loading 1.2s linear infinite
  .wrapper .line1
    -webkit-transform rotate(0deg) translate(0, -34px)
    -webkit-animation-delay 0s
  .wrapper .line2
    -webkit-transform rotate(30deg) translate(0, -34px)
    -webkit-animation-delay 0.1s
  .wrapper .line3
    -webkit-transform rotate(60deg) translate(0, -34px)
    -webkit-animation-delay 0.2s
  .wrapper .line4
    -webkit-transform rotate(90deg) translate(0, -34px)
    -webkit-animation-delay 0.3s
  .wrapper .line5
    -webkit-transform rotate(120deg) translate(0, -34px)
    -webkit-animation-delay 0.4s
  .wrapper .line6
    -webkit-transform rotate(150deg) translate(0, -34px)
    -webkit-animation-delay 0.5s
  .wrapper .line7
    -webkit-transform rotate(180deg) translate(0, -34px)
    -webkit-animation-delay 0.6s
  .wrapper .line8
    -webkit-transform rotate(210deg) translate(0, -34px)
    -webkit-animation-delay 0.7s
  .wrapper .line9
    -webkit-transform rotate(240deg) translate(0, -34px)
    -webkit-animation-delay 0.8s
  .wrapper .line10
    -webkit-transform rotate(270deg) translate(0, -34px)
    -webkit-animation-delay 0.9s
  .wrapper .line11
    -webkit-transform rotate(300deg) translate(0, -34px)
    -webkit-animation-delay 1s
  .wrapper .line12
    -webkit-transform rotate(330deg) translate(0, -34px)
    -webkit-animation-delay 1.1s
</style>
