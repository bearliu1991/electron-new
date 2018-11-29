<template>
    <div id="percent">
        <div class="percent_wrap">
          <p :style="{width: width}"></p>
        </div>
        <div class="num">
          正在下载({{width}})
        </div>
    </div>
</template>

<script>
  export default {
    name: "percent",
    data() {
      return {
        width: '0'
      }
    },
    created() {
      this._BUS.$on('loadingPercent', (param) => {
        console.error(11111)
        console.error(param)
        let num = isNaN(parseInt(param - 0)) ? 0 : parseInt(param - 0)
        console.error(num)
        this.width = num + '%';
      })
      // ipcRenderer.on('hello', (e, state, no) => {
      //   let num = isNaN(parseInt(no - 0)) ? 0 : parseInt(no - 0)
      //   this.width = num + '%';
      // })
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/css/index.styl'
    #percent
      .percent_wrap
        relative()
        width: 160px
        height:10px
        bgColor(#999)
        margin: 30px auto
        margin-bottom:10px
        p
          absolute()
          left:0
          top:0
          bottom:0
          height:100%
          bgColor(blue)
      .num
        text-align:center
</style>