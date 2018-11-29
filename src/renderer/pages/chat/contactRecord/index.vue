<template>
    <div id="contact_record">
      <div class="search pad8">
        <SearchInput></SearchInput>
        <div class="switch-list">
          <div class="chating" :class='{active: activeIndex}' @click="selectList(1)">正在会话中</div>
          <div class="recent" :class='{active: !activeIndex}' @click="selectList(0)">
            <select-type></select-type>
          </div>
        </div>
      </div>
      <!-- 当搜索框部位空时top 为 50px -->
      <div id="scroll_part" :style="{top: showSearch ? '50px' : ''}">
        <ScrollBar ref="scrollBar" :isAuto="false">
          <!-- 抢单池 -->
          <GrabPool></GrabPool>
          <!-- 聊天列表为空 -->
          <div class="empty-list" v-if="lists.length <= 0">
            <span><i class="icon">&#xe613;</i></span>
            <span>暂无粉丝消息</span>
          </div>
          <!-- 搜索显示 -->
          <div class="searchChat" v-show="showSearch">
            <ChatList @update="$refs.scrollBar.updated()" @complete="updateScroll" class="searchList" :list="searchRes" isSearch="true"></ChatList>
          </div>
          <!-- 聊天列表 -->
          <div class="chat_part" v-show="!showSearch || searchActive.name">
            <!-- <div class="tips" v-show="searchActive.name">
              <span>{{searchActive.name}}</span>
            </div> -->
            <ChatList @update="$refs.scrollBar.updated()" @complete="updateScroll" :list="lists" :keyId="'latest'" class="chatList"></ChatList>
          </div>
        </ScrollBar>
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import selectType from "./selectType";
import SearchInput from "../../public/searchInput";
import ChatList from "../chatList";
import GrabPool from "./grabPool";

export default {
  name: "contact_record",
  data() {
    return {
      activeIndex: 1,
      timer: null,
      type: "",
      length: 0
    };
  },

  computed: {
    ...mapState({
      chatList: state => state.chat.allChator,
      allChatList: state => state.chat.allChatList,
      userInfo: state => state.public.userInfo,
      showSearch: state => state.chat.showSearchRes,
      searchRes: state => state.chat.searchRes,
      searchActive: state => state.chat.searchActive
    }),
    lists() {
      console.log('this.allChatList', 11)
      let chatorList = Object.values(this.chatList)
      let list = []
      if (this.searchActive.name) {
        chatorList.forEach(item => {
          item.searchType === this.searchActive.type && list.push(item)
        })
      } else {
        let tops = []
        let noTops = []
        chatorList.forEach(item => {
          item.isTop ? tops.push(item) : noTops.push(item)
        })
        tops.sort((a, b) => a.setTopTime > b.setTopTime)
        list = [...tops, ...noTops]
      }
      return list
    }
  },
  created() {
    this.$store.dispatch("chat/getRecords");
    // this.$store.commit("chat/SEARCH_ACTIVE", { type: 0 });
    this.$store.dispatch("public/getUserInfo");
  },
  components: { selectType, SearchInput, ChatList, GrabPool },
  methods: {
    updateScroll() {
      if (Object.keys(this.chatList).length === this.length) {
        return false;
      }
      this.length = Object.keys(this.chatList).length;
      this.$refs.scrollBar.updated();
    },
    hideContextmenu() {
      this.isShow = false;
    },
    selectList(index) {
      this.activeIndex = index
      if (index === 1) {
        this.$store.commit("chat/SEARCH_ACTIVE", { type: 0 });
      }
    }
  },
  watch: {
    showSearch() {
      this.$refs.scrollBar.updated();
    },
    'searchActive.name'() {
      this.$refs.scrollBar.updated();
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/index.styl';
height1 = 90px
#contact_record
  relative()
  height: 100%
  width: 260px
  text-align: left
  color(#616161)
  bgColor(color255)
  border-right: 1px solid #eee
  height: 100%
  float: left
  .search
    height height1
    .switch-list
      setMiddle()
      .chating, .recent
        cursor()
        relative()
        height 40px
        line-height 40px
        flex 0 0 50%
        text-align center
        font-size 14px
      .active
        color color2
        border-bottom 2px solid color2
    .add
      square(25px)
      bgColor(#dbd9d8)
  #scroll_part
    absolute()
    top: height1
    left:0
    right:0
    bottom:0
    overflow-y: auto
    resetScrollBar()
    bgColor(color1)
    .tips, .res_title
      bgColor(#dbd9d8)
      font-size: 12px
      font-weight: 700
      color: #333
      padding: 7px 15px
    .no_data
      text-align: center
      font-size: 20px
      padding: 10px
    .chat_part
      height: 100%
    .chatList
      height: 100%
    .empty-list
      display flex
      height 400px
      flex-direction column
      justify-content center
      align-items center
      opacity 0.8
      span
        margin 15px
      .icon
        fn(56px)
</style>
