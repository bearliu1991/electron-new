<template>
  <div id="chatList">
    <ul>
      <li v-for="(item, index) in partList" :key="index" @contextmenu.prevent.stop="showMenu($event, item)"
          @click="showMsg(item.id)" :class="[(chatId === item.id ? 'active' : ''), item.isTop && 'isTop']" class="chat_li" v-show="!item.isPop">
        <div class="portrait" @click.stop="showPop($event, item.id, index)" :ref="'portrait' + index">
          <img :src="item.avatar" alt="">
          <i class="num" v-if="item.len > 99">99+</i>
          <i class="num" v-else>{{item.len}}</i>
        </div>
        <div class="cont">
          <div class="name">
            {{item.name}}
            <span :class="tagClass[item.tag]"></span>
          </div>
          <div class="msg">[{{item.info}}]</div>
        </div>
        <div class="time">
          <div class="last-time gray">{{item.time}}112312</div>
          <span class="icon close-btn" @click.stop="closeChat(item.id, item.index)">&#xe611;</span>
        </div>
      </li>
    </ul>
    <transition name="fade1">
      <PortraitDetail class="contactDetail" :position="detailPosition" :id='portraitIdx' v-if="showDetail"></PortraitDetail>
    </transition>
    <div class="show_all" @click="showAll = !showAll" v-if="isSearch || searchActive.name">
      <span v-show="!showAll">显示全部 ( {{resLen}} )</span>
      <span v-show="showAll">收起</span>
    </div>
    <contextmenu v-model="isShow" :position="menuPosition" :menuList="menuList" :msgData="menuItem"></contextmenu>
    <ModalMove v-for="(item, index) in modalList" v-show="modalList.length" :key="index"
               :class="[activeModal == item.id ? 'bigVal' : '']" @setZindex="showFront" :activeIdx="item.id">
      <ChatFrame :dataId="item.id"></ChatFrame>
    </ModalMove>
  </div>
</template>

<script>
  import PortraitDetail from './portraitDetail'
  import ChatDetail from './chatDetail'
  import InputFrame from './inputFrame'
  import ChatFrame from './chatFrame'
  import {mapState} from 'vuex'
  export default {
    name: "chatList",
    data() {
      return {
        showAll:false,
        detailPosition: {}, // 聊天者个人信息内容位置（点击头像展示内容）
        menuPosition: {}, // 右键列表内容位置
        resLen: null,
        showDetail: false, // 是否展示个人信息
        isShow : false, // 是否展示右键内容
        portraitIdx : -1, // 是否展示右键内容
        activeModal: -1, // 以弹框形式展示的对话内容，可存在多个，该属性为被激活为最顶上的那个
        menuList: ['goTop', 'delChat'], // 右键站现出的内容
        menuItem: {}, // 传递给右键选项的数据
        tagClass: {
          1: "xiezuo",
          2: "xin",
          3: "laifang",
          4: "huoyue"
        }
      }
    },
    props: ['list', 'isSearch'],
    components: {PortraitDetail, ChatDetail, InputFrame, ChatFrame},
    computed: {
      partList () {
        if (this.list.length) {
          if (this.isSearch || this.searchActive.name) {
            let obj = {}
            if (this.showAll) {
              obj = this.list
            } else {
              obj = this.list.slice(0, 3)
            }
            this.$set(this, 'resLen', this.list.length);
            return obj
          }
          return this.list
        }

        return []
      },
      ...mapState({
        chatId : state => state.chat.chatId,
        searchActive : state => state.chat.searchActive,
        modalList: state => state.chat.newWinRecord
      })
    },
    updated() {
      this.$emit('complete', true);
    },
    created() {
      document.body.addEventListener('click', () => {
        this.showDetail = false
      })
    },
    methods: {
      showFront(idx) {
        this.$store.commit('chat/CHAT_ID', idx)
        this.activeModal = idx
      },
      showPop(_event, id, index) {
        this.portraitIdx = id
        // this.showDetail = false
        let parent = this.$refs['portrait' + index][0]
        this.$store.dispatch('chat/ajaxUserPortrait', id)
        this.$store.dispatch('mark/ajaxChoosedMarks', id)
        let parentOffset = parent.getBoundingClientRect()
        let scroll = document.getElementById('scroll_part').scrollTop
        this.detailPosition = {x: parentOffset.left + 45, y: parentOffset.top - scroll}
        let timer = setTimeout(() => {
          this.showDetail = true
          clearTimeout(timer)
        }, 50)
      },
      hidePop() {
        this.showDetail = false
      },
      showMsg (n) {
        if (this.modalList.length > 0) {
          return false
        }
        this.$store.commit('grabPool/SHOW_POOL', false)
        this.$store.dispatch('customerService/ajaxServices', n)
        this.$store.dispatch('customerService/ajaxGroups', n)
        this.$store.dispatch('chat/ajaxUserDetail', n)
        if (this.chatId !== n) {
          this.$store.commit('chat/CHAT_ID', n)
        }
      },
      showMenu (e, item) {
        this.menuPosition = {x: e.clientX, y: e.clientY}
        this.isShow = true
        this.menuItem = item
      },
      closeChat(id, index) {
        this.$store.commit('chat/CHAT_ID', '')
      }
    },
    watch: {
      showAll() {
        this.$emit('update');
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #chatList
    overflow-x:visible
    .show_all
      color(rgb(0, 234, 156))
      fn(14px)
      padding:10px
      cursor()
    li
      display: block
      relative()
      height:66px
      box-sizing:border-box
      padding:5px
      cursor()
      &.active
        bgColor(color6)
      &.isTop
        bgColor(color1)
      &:hover
        bgColor(color6)
        .last-time
          display none
        .close-btn
          display block
      .portrait
        position: absolute
        top: 15px
        left: 10px
        height 40px
        width 40px
        fn(12px)
        center()
        radius(3px)
        color(#5d8cdb)
        bgColor(#e1edff)
        mr(15px)
        img
          max-width 100%
          max-height 100%
        i
          absolute()
          top: -3px
          left: 21px
          min-width: 16px
          padding:0 2px
          vertical(16px)
          radius(8px)
          bgColor(#ff3b30)
          color()
        .contactDetail
          absolute()
          top:18px
          left:48px
      .cont
        width:138px
        position: absolute
        left: 55px
        top: 17px
        .name
          margin-bottom:10px
          color(#000)
        .msg
          ellipsis()
      .time
        position: absolute
        right: 10px
        top: 17px
        width:50px
        text-align:right
        ellipsis()
        color color4

      .icon
        display: inline-block
        margin-top: 6px
      .close-btn
        display none
        color color4
        &:hover
          color color8

    .bigVal
      z-index: 900
  .fade1-enter-active, .fade1-leave-active
    transition: opacity .2s;
  .fade1-enter, .fade1-leave-to
    opacity: 0
</style>
