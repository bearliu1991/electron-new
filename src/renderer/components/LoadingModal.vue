<template>
  <div class="loading_modal">
    <div class="loading_wrapper">
      <JuhuaLoading class="left"></JuhuaLoading>
      <span class="right">3%</span>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="stylus">
  .loading_modal
    position absolute
    left 0
    top 0 
    width 100%
    height 100%
    background-color rgba(0, 0, 0, 0.4)
    z-index 10
    .loading_wrapper
      color #fff
      position absolute
      display inline-block
      top 50%
      left 50%
      transform  translate(-50%, -50%)
      .left, .right
        float left
      .right
        margin-top 2px
        line-height 30px
        margin-left 10px
        font-size 21px
</style>
