<template>
    <div class="message_audio_player" :style="styles.text">
      <div :style="styles.padding" class="wrap icon play" @click.stop="pause" v-show="isPlaying">&#xe714;</div>
      <div :style="styles.padding" class="wrap icon pause" @click.stop="play" v-show="isPause">&#xe714;</div>
      <div :style="styles.padding" class="wrap icon end" @click.stop="play" v-show="isEnd">&#xe714;</div>
      <audio ref="audio" :src="url"></audio>
      <!-- <div class="discription">
        <p>音频</p>
        <span>1.3M</span>
      </div> -->
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
  props: ['url', 'direct'],
  mounted() {
    let self = this
    this.audioDom = this.$refs.audio
    this.audioDom.addEventListener('ended', () => {
      self.isEnd = true
      self.isPlaying = false
      self.isPause = false
    })
  },
  computed: {
    styles() {
      let obj = {};
      if (this.direct === "left") {
      } else {
        obj.text = {textAlign: 'right'}
        obj.padding = {paddingRight: '25px', paddingLeft: '0'}
      }
      return obj;
    }
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
.message_audio_player
  cursor()
  relative()
  setStart()
  width 200px
  height 34px
  audio
    display none
  .wrap
    padding-left 25px
    line-height 34px
    width 100%
    height 100%
    color(green)
    cursor()
</style>
