<template>
  <div id="pic_text" @mouseenter.stop="allEnter">
    <div class="big" @mouseenter.stop="bigEnter">
      <img :src="bigList.info">
      <p class="img_detail">{{bigList.title}}</p>
      <PreScan v-show="bigScan" class="scan" @click="bigScan = false"></PreScan>
    </div>
    <div class="small_wrap">
      <ul class="small" v-if="smallList.length">
        <li v-for="(item, idx) in smallList" :key="idx">
          <a target="_blank" class="small_a">
            <!-- <div class="title">{{item.title}}</div> -->
            <div class="content">
              <span>{{item.content}}</span>
              <img :src="item.info">
            </div>
          </a>
          <PreScan v-show="smallScan" class="scan"></PreScan>
        </li>
      </ul>
      <div class="side_part" v-show="linksArr.length === 1">
        <p class="img_descript">{{bigList.content}}</p>
      </div>
      <div class="detail_btn" v-if="linksArr.length === 1">
        <span>详情</span>
        <i>></i>
      </div>
      <div class="bottom_detail">
        <div class="user_info">
          <span>郭军(ZX001)</span>
          <i>13:50</i>
        </div>
      </div>
    </div>
    <PreScan v-show="allScan" class="scan"></PreScan>
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: "pic_text",
    data() {
      return {
        allScan: false,
        smallScan: false,
        bigScan: false
      }
    },
    props: {
      linksArr: {
        type: Array,
        default: () => { return [] }
      },
      type: {
        type: String,
        default: 'sucai'
      }
    },
    computed: {
      bigList() {
        return this.linksArr.length ? this.linksArr[0] : {}
      },
      smallList() {
        return this.linksArr.length > 1 ? this.linksArr.slice(1) : []
      }
    },
    methods: {
      allenter() {
        if (this.type === 'sucai') {
          this.allScan = true
        } else if (this.type === 'shoucang') {

        }
      },
      bigenter() {
        if (this.type === 'sucai') {
          this.allScan = true
        } else if (this.type === 'shoucang') {

        }
      }
    }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/index.styl'
  .split_line
    relative()
    z-index:1
    bort()

  #pic_text
    fn(0)
    .big
      relative()
      inline()
      ellipsis()
      height:100px
      fn(14px)
      &:hover
        .scan
          visibility visible
      .scan
        visibility hidden
      img
        radiusTop(5px)
        width: 100%
        height:100%
      p
        absolute()
        width: 100%
        ellipsis()
        vertical(32px)
        color()
        bottom: 0
        alignL()
        padl(15px)
        bgColor(rgba(0, 0, 0 , 0.3))
    .small_wrap
      bgColor()
      padb(10px)
      .side_part
        padding:0 15px
        &:before
          display:table
          content: ''
        .img_descript
          white-space: pre-wrap
          alignL()
          margin: 5px 0
          height:42px
          fn(12px)
          line-height: 20px
          overflow:hidden
          color(#606366)
          borb()
      .detail_btn
        padding:0 15px
        fn(14px)
        margin: 8px 0
        setBetween()
        color(deep_color)
        i
          color(#979899)
      .bottom_detail
        fn(14px)
        padding:0 15px
        .user_info
          setStart()
          fn(12px)
          color(#979899)
          span
            mr(10px)
      .small
        color(#333)
        fn(14px)
        li
          relative()
          padding:0 15px
          &:first-child
            mt(5px)
          &:hover
            .scan
              visibility visible
          .scan
            visibility hidden
          .small_a
            display:block
            color:inherit
            .content
              height:60px
              setBetween()
              img
                width: 40px
                height: 40px
              span
                ellipsis()
                width:120px
</style>
