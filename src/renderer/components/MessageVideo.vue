<template>
  <div class="mes_VideoContainer">
      <span class="play_icon">
        <span class="icon">&#xe64a;</span>
      </span>
      <span class="video_time">00:10</span>
      <video class="video" :src="data.info.src"></video>
      <!-- <div class="discription">
          <p>视频</p>
          <span>1.3M</span>
      </div> -->
  </div>
</template>

<script>
export default {
  name: 'VideoContainer',
  data() {
    return {}
  },
  props: ['data'],
  methods: {}
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/index.styl'
.mes_VideoContainer
  cursor()
  relative()
  setStart()
  .play_icon
    absolute()
    width 50px
    height 50px
    background-color rgba(0, 0, 0, 0.5)
    border-radius 50%
    border solid 1px #fff
    left 50%
    top 50%
    text-align center
    transform translate(-50%, -50%)
    .icon
      line-height 50px
      color()
      font-size 30px
  .video_time
    absolute()
    bottom 7px
    right 10px
    color #fff    
  .video
    min-width 100px
    max-width 300px
  .discription
    p
      mb(0px)
</style>
