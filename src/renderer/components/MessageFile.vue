<template>
  <div class="mess_file">
    <div class="file_flex">
      <div class="flex_one">
        <div class="text_name">
          <span class="file_name">讲师介绍讲师介绍...</span>
          <span class="file_type">psd</span>
        </div>
        <div class="file_size">12.6k</div>
      </div>
      <div class="flex_two">
        <img src="/static/imgs/userHeader.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="stylus">
.mess_file
  width 260px
  height 86px
  .file_flex
    display flex
    justify-content space-between
    padding 20px 30px 20px 15px
    .flex_one
      width 180px
      .text_name
        .file_type
          font-size 14px
      .file_size
        color #979899
    .flex_two
      align-self center
      img
        width 37px
        height 44px  
</style>
