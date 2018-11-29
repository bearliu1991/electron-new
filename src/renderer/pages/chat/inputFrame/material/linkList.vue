<template>
  <div id="linkList">
    <ul class="link_ul">
      <li class="link_li" v-for="(item, index) in 5" :key="index"
       @click="chooseIdx(index)" :class="{'active': activeIdx === index}">
        <div class="li_wrap">
          <div class="deep_wrap">
            <PicText :linksArr="links.info"></PicText>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'linkList',
    data() {
      return {
        activeIdx: 0,
        links: {
          name: '我',
          type: 1,
          infoType: 0,
          msgType: 6,
          id: 51,
          chatTime: 1533260730,
          info: [
            {
              info: '/static/imgs/2.jpg',
              title: '进垃圾堆了',
              content: '今山东分局哦我就饿哦极乐世界的富婆视频和教师辅导辅导和',
              msgType: 6,
              infoType: 0,
              id: 511
            }
            // {
            //   info: '/static/imgs/3.jpg',
            //   title: '进垃圾堆了',
            //   content: '是公司鬼斧神工三个都是更好地发挥的好的人同样',
            //   msgType: 6,
            //   infoType: 0,
            //   id: 512
            // },
            // {
            //   info: '/static/imgs/4.jpg',
            //   title: '进垃圾堆了',
            //   content: '是公司鬼斧神工三个都是更好地发挥的好的人同样',
            //   msgType: 6,
            //   infoType: 0,
            //   id: 513
            // }
          ]
        }
      }
    },
    props: {
      sourceArr: {
        type: Array,
        default: () => { return [] }
      },
      type: {
        type: [Number, String],
        default: 0
      }
    },
    created() {

    },
    components: {},
    methods: {
      chooseIdx(idx) {
        this.activeIdx = idx
      }
    }
  }
</script>
<style lang="stylus" scoped>
@import '~@/assets/css/index'
  #linkList
    .link_ul
      padding:10px
      overflow hidden
      alignL()
      .link_li
        inline()
        width: calc((1 / 3) * 100%)
        padding:12px
        radius(5px)
        boxSizing()
        .li_wrap
          boxSizing()
          .deep_wrap
            flex_()
            boxSizing()
            transform-origin:center center
            transition: 0.3s all cubic-bezier(.46, 1, .23, 1.52);
            radius(5px)
        &:hover, &.active
          padb(0px)
          .li_wrap
            .deep_wrap
              margin-top:-10px
              margin-left: -10px
              width: calc(100% + 20px)
              height: calc(100% + 20px)
              padding:10px
              bgColor()
              boxShadow(-1px 2px 12px 3px #ccc)
        &.active
          .deep_wrap
            border_(text_color)
</style>
