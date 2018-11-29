<template>
  <div id="chatCont" :style="styles.lay">
    <div class="portrait">
      <img class="user-img" src="/static/imgs/userHeader.png" alt="">
    </div>
    <div class="content" :style="styles.cont">
      <div class="nickname" :style="styles.text">
        <span class="name">{{data.name}}</span>
        <span class="time" :style="styles.split">{{data.time}}</span>
      </div>
      <div class="msg_cont" :style="styles.text">
        <div class="con_ret" :style="styles.icon"></div>
        <div class="con" :style="styles.con" @contextmenu.prevent.stop="showMenu($event, data)">
          <!-- <LoadingModal></LoadingModal> -->
          <!-- <img class="img cursor" :src='data.info' v-if="data.msgType === 1" @click="showDetailPop(data)"> -->
          <MessageFile v-if="data.msgType === 1"></MessageFile>
          <div v-if="data.msgType === 4" @click.prevent="showDetailPop(data)">
            <MessageVideo :data="data"></MessageVideo>
            <!-- <video class="video" width="200px" :src='data.info'></video> -->
          </div>
          <div class="audio" v-if="data.msgType === 3">
            <MessageAudio :direct="direct" :url='data.info'>{{data.info}}</MessageAudio>
            <div v-if='data.transText || data.transText' class="split_line"></div>
            <span v-if='data.transText' v-html='data.transText'></span>
          </div>
          <a class="href_blank" :href='data.info' v-if="data.msgType === 5" target='_blank'>{{data.info}}</a>
          <div v-if="data.msgType === 2" class="img_text cursor">
            <TextPic :data="data"></TextPic>
          </div>
          <div v-if="data.msgType === 6" class="">
            <PicText :data="data"></PicText>
          </div>
          <div class="text_wrap" v-if="data.msgType === 0">
            <span v-html='data.info'></span>
            <div v-if='data.translate || data.transText' class="split_line"></div>
            <span v-if='data.translate' v-html='data.translate'></span>
          </div>
          <div class="sendState" :style="styles.errDir" v-show="false">
            <span v-if="direct === 'right'" class="send_again">重新发送</span>
            <span class="icon fail" v-if="!data.fail">&#xe6b3;</span>
            <span class="icon loading" v-if="data.sending">&#xe620;</span>
            <span v-if="direct === 'left'" class="send_again">重新发送</span>
          </div>
        </div>
        <div class="msg_decorate" v-if="data.msgType === 3">
          <div class="is_hear">
            <div class="small_circle"></div>
          </div>
          <div class="audio_date">
            60”
          </div>
        </div>
      </div>
      <SelfDefinePop v-model="showPop" v-if='showPop'>
        <DetailPop :sourceObj="sourceObj" :msgDatas="msgDatas"></DetailPop>
      </SelfDefinePop>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "chatCont",
  data() {
    return {
      isShow: false,
      showPop: false,
      sourceObj: {}
    }
  },
  props: ["direct", "data", 'idx'],
  methods: {
    showDetailPop(data) {
      this.sourceObj = Object.assign(data)
      this.sourceObj.hostId = this.idx
      this.showPop = true
    },
    showMenu(e, item) {
      let menuPosition = { x: e.clientX, y: e.clientY };
      let isShow = true
      let menuItem = item
      this.$store.commit('chat/CONTEXTMENU_INFO', item)
      this.$emit("showMenu", menuPosition, isShow, menuItem, this.idx)
    }
  },
  computed: {
    ...mapState({
      allMsg: state => state.chat.allMsg
    }),
    msgDatas() {
      return this.allMsg[this.idx] && this.allMsg[this.idx].msgs
    },
    styles() {
      let obj = {};
      if (this.direct === "left") {
        obj.lay = { float: "left", justifyContent: "flex-start", paddingLeft: '30px' }
        obj.cont = { justifyContent: "flex-start", marginLeft: "3px" }
        obj.text = { textAlign: "left" }
        obj.icon = { borderRightColor: "#f5f5f5" }
        obj.con = { background: "#f5f5f5", color: "#303133" }
        obj.split = { marginLeft: "14px" }
        obj.errDir = { right: "-100px" }
      } else {
        obj.lay = {
          float: "right",
          justifyContent: "flex-end",
          flexDirection: "row-reverse",
          paddingRight: '30px'
        };
        obj.cont = {
          justifyContent: "flex-end",
          flexDirection: "row-reverse",
          marginRight: "3px"
        };
        obj.text = { textAlign: "right", flexDirection: "row-reverse" }
        obj.icon = { borderLeftColor: "#409fff" }
        obj.con = { background: "#409fff", color: "#fff" }
        obj.split = { marginRight: "14px" }
        obj.errDir = { left: "-100px" }
      }
      if (this.data.msgType !== 3 && this.data.msgType !== 5 && this.data.msgType !== 0 && this.data.msgType !== 1) {
        obj.icon = { borderColor: "#fff" }
        obj.con = { background: "#fff" }
      }
      return obj;
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/index.styl'
.split_line
  margin:2px 5px
  border-top:1px solid #aaa

#chatCont
  clear()
  display flex
  align-items flex-start
  margin 7.5px 0
  width 60%
  .portrait
    width 37px
    height 37px
    // bgAll('./portrait.png')
    .user-img
      width 100%
      height 100%
  .content
    flex 1
    fn(12px)
    .nickname
      display flex
      margin-left 8px
      mb(5px)
      .time
        margin 0 10px
        color #b1b2b3
    .msg_cont
      setStart()
      margin 0 -4px
      margin-left -1px
      align-items flex-start
      .con
        relative()
        font-size 14px
        word-break break-all
        line-height 20px
        text-align left
        border-radius 3px
        min-height 16px
        letter-spacing 1px
        .text_wrap, .href_blank
          padding 7px 10px
          display block
        .img
          min-width 100px
          max-width 300px
          border-radius 3px  
      .con_ret
        mt(4px)
        border 4px solid transparent
      .msg_decorate
        margin-left 10px
        margin-right 10px
        position relative
        .is_hear
          height 8px
          line-height 1px
          .small_circle
            display inline-block
            width 8px
            height 8px
            background-color #fe3b30
            border-radius 50%
        .audio_date
          padding-top 12px
          color #979899
      .sendState
        position absolute
        top 0
        line-height 34px
        .icon
          fn(20px)
          &.fail
            color(red) 
        .fail, .loading, .send_again
          float left
        .send_again
          color #409fff
          cursor pointer
          margin 0 5px
</style>
