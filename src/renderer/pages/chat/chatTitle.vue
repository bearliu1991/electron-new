<template>
    <div id="chatTitle">
      <div class="left_info">
        <div class="line1">
          <span class="name">{{info.name}}在线</span><i class="icon">&#xe6b4;</i>
          <span :class="tagClass[info.tag]"></span>
        </div>
        <div class="line2">{{info.publicCode}}/{{info.source}}</div>
      </div>
      <ul class="right_icons">
        <li class="icon" @click='toggleGroupModal(true)'>&#xe63a;</li>
        <li class="icon" @click='toggleTagModal(true)'>&#xe63a;</li>
        <li class="icon" @click="openCooperation">&#xe63a;</li>
        <li class="filter">
          <Poptip content="content" placement="bottom">
            <span class="icon">&#xe60c;</span>
            <div slot="content">
              <MsgFilter :id='dataId'></MsgFilter>
            </div>
          </Poptip>
        </li>
      </ul>
      <NewModal header="协作" v-model="showCooperation">
        <Cooperation></Cooperation>
      </NewModal>
    </div>
</template>

<script>
import MsgFilter from "./msgFilter"
import PopChoose from "./popChoose"
import Cooperation from "./cooperation"
import {mapState} from 'vuex'
export default {
  name: "chatTitle",
  components: { MsgFilter, PopChoose, Cooperation },
  data() {
    return {
      openIcon: true,
      hideServer: false,
      showCooperation: false,
      tagClass: {
        1: "xiezuo",
        2: "laifang",
        3: "xin",
        4: "huoyue"
      }
    };
  },
  props: ['dataId'],
  computed: {
    ...mapState({allChator: state => state.chat.allChator}),
    info() {
      if (this.dataId < 0) {
        return {}
      } else {
        return this.allChator[this.dataId]
      }
    }
  },
  watch: {
    info(val) {
      console.log(val)
    }
  },
  methods: {
    hidePoptip(val) {
      this.hideServer = val
    },
    toggleTagModal(status) {
      this.$root.Bus.$emit('toggleTagModal', status)
    },
    toggleGroupModal(status) {
      this.$root.Bus.$emit('toggleGroupModal', status)
    },
    openCooperation() {
      this.showCooperation = true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/index.styl'

#chatTitle
  setBetween()
  text-align left
  padding 0 30px 0 20px
  height:60px
  background-color #fff
  border-bottom:1px solid #eee
  .left_info
    .line1
      setStart()
      .name
        color(#303133)
        font-size 18px
      .icon
        color(#46b6ef)
    .line2
      font-size 12px
      margin-top 6px
      color(#979899)
  .right_icons
    setEnd()
    .icon
      cursor()
      color(#979899)
      font-size 18px
      margin-left 20px
</style>
