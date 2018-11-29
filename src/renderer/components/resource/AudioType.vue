<template>
    <div id="audioType">
      <div class="audio_wrap">
        <div class="wrap icon play" @click.stop="pause" v-show="isPlaying">&#xe714;</div>
        <div class="wrap icon pause" @click.stop="play" v-show="isPause">&#xe60f;</div>
        <div class="wrap icon end" @click.stop="play" v-show="isEnd">&#xe6f0;</div>
        <audio ref="audio" :src="url"></audio>
        <div class="discription">
          <p>音频</p>
          <span>1.3M</span>
        </div>
      </div>
      <div class="user_detail">
        <span>赵四(ZX0001)</span>
        <i>15:28</i>
      </div>
    </div>
</template>
<script>
export default {
  data() {
      return {
          audioDom: null,
          isPlaying: false,
          isPause: false,
          isEnd: true
      }
  },
  props: ['url'],
  mounted() {
      let self = this
      this.audioDom = this.$refs.audio
      this.audioDom.addEventListener('ended', () => {
        self.isEnd = true
        self.isPlaying = false
        self.isPause = false
      })
  },
  methods: {
    endPlay() {
      this.isEnd = true
      this.isPause = false
      this.isPlaying = false
    },
    play() {
      this.isPlaying = true
      this.isPause = false
      this.isEnd = false
      this.audioDom.play()
    },
    pause() {
      this.isPause = true
      this.isPlaying = false
      this.isEnd = false
      this.audioDom.pause()
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~@/assets/css/index'
    #audioType
      cursor()
      relative()
      setBetween()
      height 80px
      width: 100%
      .audio_wrap
        setStart()
        &.active
          border:1px solid text_color
        audio
          display:none
        .wrap
          margin:0 10px
          radius(50%)
          fn(20px)
          color(text_color)
          mr(10px)
          cursor()
      .user_detail
        mt(-20px)
</style>
