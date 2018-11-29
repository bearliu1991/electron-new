<template>
    <div id="portrait_cont">
          <div class="item nick-name">{{data.nickName}}</div>
          <div class="item">{{data.company}}</div>
          <div class="item text-gray">姓名：{{data.name}}</div>
          <div class="item text-gray space">坐席编号：{{data.seatNo}}</div>

          <div class="item">{{data.version}}</div>
          <div class="item space">{{data.expireTime}}到期</div>

          <div class="item pointer" @click="visible = !visible">
            <span v-if="data.status" >
              <i class="icon green">&#xe615;</i>
              在线
            </span>
            <span v-else>
              <i class="icon gray">&#xe6d3;</i>
              离开
            </span>
            <BulletBox :position="{x: 195, y:-17}" v-if="visible" >
              <div class="bullet-content" slot="bullet-box-content" @mouseleave="visible = false">
                <div @click="changeStatus(1)"><i class="icon green pointer">&#xe615;</i>在线</div>
                <div @click="changeStatus(0)"><i class="icon gray pointer">&#xe6d3;</i>离开</div>
              </div>
            </BulletBox>
          </div>
          <div class="item pointer" @click="changeCompany">切换公司</div>
          <div class="item pointer" @click="exit">退出账号</div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "index",
    data() {
      return {
        visible: false
      }
    },
    computed: {
      ...mapState({data: state => state.public.portraitData})
    },
    created() {
    },
    methods: {
      changeStatus(status) {
        this.data.status = status
      },
      changeCompany() {

      },
      async exit () {
        await this.logout()
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  portraitWidth = 200px
  portraitHeight = 286px
  #portrait_cont
    width portraitWidth
    height portraitHeight
    color color5
    display flex
    flex-direction column
    justify-content space-between
    .item
      relative()
      padding 0 16px
      margin-bottom 10px
      text-align left
    .nick-name
      font-size: 24px
    .text-gray
      color color4
    #bullet-box
      position absolute !important
    .mask
      padding-left 10px
      .bullet-content
        height: 64px
        width: 130px
        div
          padding 0 16px
          linecenter(32px)
    .space
      padding-bottom 10px
      border-bottom 2px solid color1
    .icon
      margin-right 10px
    .green
      color color3
    .gray
      color color4
    .pointer
      cursor pointer
</style>
