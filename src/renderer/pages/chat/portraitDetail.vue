<template>
    <div id="portraitDetail" ref="portraitDetail" :style="{left: initposition.x + 'px', top: initposition.y + 'px'}">
      <div class="top">
        <div class="portrait">
          <img :src="info.portrait">
        </div>
        <div class="detail">
          <div class="text">
            <div class="name long-text">{{info.name}}qweqweqwez asfdas wer</div>
            <div class="sex">
              <span v-if="info.sex == 1">男</span>
              <span v-else>女</span>
            </div>
          </div>
          <div class="gray">来访 <span class="blue">{{info.times}}</span> 次</div>
          <div>
            <i class="zhuanshu" v-if="info.exclusive"></i>
            <i class="xiezuo" v-if="info.tag == 1"></i>
            <i class="xin" v-else></i>
          </div>
        </div>
      </div>
      <ul class="basis">
        <li>
          <span class="gray">公众号</span><i>{{info.publicCode}}</i>
        </li>
        <li>
          <span class="gray">来源</span><i>{{info.source}}</i>
        </li>
        <li>
          <span class="gray">上次来访</span><i>{{info.lastTime}}</i>
        </li>
      </ul>
      <ul class="label">
        <li v-for="(item, index) in choosedMarks" :key="index"
          :class="bgColors[Math.floor(Math.random() * 5)]">{{item.name}}</li>
      </ul>
    </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  export default {
    name: "contactDetail",
    data() {
      return {
        bgColors: {
          0: 'ran1',
          1: 'ran1',
          2: "ran2",
          3: "ran3",
          4: "ran4"
        },
        initposition: this.deepCopy(this.position)
      }
    },
    props: {
      position:{
        default: {x: 0, y: 0}
      },
      id: {
        default: 0
      }
    },
    computed: {
      ...mapState({allChator: state => state.chat.allChator}),
      ...mapGetters({getAllChoosedMarks: 'mark/getAllChoosedMarks'}),
      info() {
        if (this.id < 0) {
          return {}
        } else {
          return this.allChator[this.id]
        }
      },
      choosedMarks() {
        return this.getAllChoosedMarks[this.id]
      },
      ranNum() {
        return Math.floor(Math.random() * 4)
      }
    },
    watch: {
      position(nv) {
        this.initposition = this.deepCopy(nv)
        this.initPosition()
      }
    },
    mounted() {
      this.initPosition()
    },
    methods: {
      initPosition() {
        // 生成后， 判断该弹框底边是否超过桌面高度
        let bullet = this.$refs['portraitDetail']
        let windowHeight = this.getViewPort().height
        let positionHeight = bullet.getBoundingClientRect().height
        if (windowHeight < this.initposition.y + positionHeight) {
          this.$set(this.initposition, "y", windowHeight - positionHeight)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #portraitDetail
    transition left .2s, top .2s
    fixed()
    width:254px
    padding:15px
    color(#000)
    bgColor(#fff)
    z-index:5
    radius(5px)
    boxShadow(0px 2px 8px 0px color1)
    .gray
      color(color4)
    .top
      setStart()
      justify-content space-between
      .portrait
        width: 60px
        height 60px
        flex-shrink: 0;
        raduis(3px)
        border 1px solid color1
        img
          max-width 100%
          max-height 100%
      .detail
        width 154px
        height 60px
        flex-grow 0
        column()
        .text
          display flex
          .name
            fn(18px)
            flex-grow 1
          .sex
            flex-shrink 0
            flex-basis 20px
    .basis
      li
        setStart()
        align-items:flex-start
        margin: 15px 0
        span
          width:30%
        i
          width:70%
          alignL()
    .label
        padt(15px)
        border-top:1px solid #dddddd
        li
          inline()
          linecenter(30px)
          padding:0 10px
          radius(15px)
          margin:5px
          color()
          fn(14px)
          opacity 0.8
        .define
          >div
            width:70px
            setMiddle()
            border:1px solid #ff3b30
            color(#ff3b30)
        .ran1
          bgColor(color2)
        .ran2
          bgColor(color7)
        .ran3
          bgColor(color8)
        .ran4
          bgColor(color3)

</style>
