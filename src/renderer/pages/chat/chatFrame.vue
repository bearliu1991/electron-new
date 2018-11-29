<template>
  <div id="chat_frame" @mousewheel.stop="doNoting">
    <div class="chat_left" v-if="!showPool">
      <ChatTitle :dataId='dataId' @hideRightBar='hideRightBar'></ChatTitle>
      <ChatDetail :dataId='dataId'></ChatDetail>
      <InputFrame></InputFrame>
    </div>
    <div class="chat_left" v-if="showPool">
      <OsPool></OsPool>
    </div>
    <div class="chat_right" :class="{isHidden: !showUserInfo }">
      <div class="hiddle_user" @click="showUserInfo = !showUserInfo">
      </div>
      <UserInfo v-show='showUserInfo'></UserInfo>
    </div>
    <TagModal v-model="tagVisible"></TagModal>
    <GroupModal v-model="groupVisible"></GroupModal>
  </div>
</template>

<script>
  import ChatTitle from './chatTitle'
  import ChatDetail from './chatDetail'
  import InputFrame from './inputFrame'
  import UserInfo from './userInfo'
  import Ueditor from "../public/Ueditor"
  import OsPool from "./osPool"
  import BasicModal from "../../components/Modal/BasicModal"
  import {mapState} from 'vuex'

  export default {
    name: "chat_frame",
    data() {
      return {
        filter : false,
        showUserInfo: true,
        tagVisible: false,
        groupVisible: false
      }
    },
    computed: {
      ...mapState({
        showPool: state => state.grabPool.showPool
      })
    },
    mounted() {
      this.$root.Bus.$on('toggleTagModal', value => {
        this.tagVisible = value
      })
      this.$root.Bus.$on('toggleGroupModal', value => {
        this.groupVisible = value
      })
    },
    props: ['dataId'],
    components: {ChatTitle, InputFrame, ChatDetail, UserInfo, Ueditor, OsPool, BasicModal},
    watch: {
      showPool(val) {
        console.log(val)
      }
    },
    methods: {
      hideRightBar() {
        this.showUserInfo = !this.showUserInfo
      },
      doNoting() {}
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  .slide-fade-enter-active
    transition: all .8s ease
  .slide-fade-leave-active
    transition: all 0s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  .slide-fade-enter, .slide-fade-leave-to
    transform: translateX(10px)
    opacity: 0

  #chat_frame
    relative()
    width: 100%
    height: 100%
    flex:1
    flex_()
    bgColor(#f5f5f5)
    .chat_left
      font-size 14px
      relative()
      bgColor(#efefef)
      flex:1
      .top
        height:58px
      .middle
        absolute()
        right:0
        left:0
        top:58px
        bottom:200px
        // height: calc(100% - 258px)
        border-top: 1px solid #ddd
        border-bottom: 1px solid #ddd
        overflow-y:auto
        overflow-x: hidden
      .end
        absolute()
        bottom:0
        left:0
        right:0
        height: 200px
        bgColor(#fff)
    .chat_right
      position: relative
      bgColor(#fff)
      border-left:1px solid #eee
      box-shadow: -1px 0px 0px 0px #edeef0
      .hiddle_user
        position absolute
        top: 14px
        width: 15px
        height 30px
        background url('../../assets/images/close-icon.png') no-repeat center center
        background-size cover
        transform rotate(180deg) translateX(2px)
        transition all 0.4s ease
        z-index: 10
      &.isHidden > .hiddle_user
          left: -20px
          transform rotate(0deg) translateX(5px)
</style>
