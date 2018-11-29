<template>
  <div class="date-line">
    <div class="date-wrapper">
      <span class="date-text">2018年11月5日</span>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus">
.date-line
  .date-wrapper
    width 40%
    margin auto
    position relative
    text-align center
    &:before
      content ""
      display block
      width 100%
      height 1px
      background #e3e4e6
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
    .date-text
      position relative
      z-index 1
      font-size 12px
      background-color #fff
      display inline-block
      line-height 20px
      padding 0 10px
      color #b1b2b3
</style>
