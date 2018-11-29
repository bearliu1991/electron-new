<template>
  <div id="select_type" >
    <!-- <Poptip placement="bottom" v-model="visible">
      <div class="icon"></div>
      <div slot="content" class="content">
        <div class="item" @click="select(false)">全部联系人</div>
        <div class="item" v-for="(item, index) in searchTypes" :key="index" @click="select(item)">{{item.name}}
        </div>
      </div>
    </Poptip> -->
    <div @click="getSearchTypes">
      {{activeLabel}}
      <span v-if="!visible" @click.stop="visible = true" class="icon fn12" >&#xe7d6;</span>
      <span v-else @click.stop="visible = false" class="icon fn12" >&#xe7d5;</span>
    </div>
    <BulletBox :position="position" v-if="visible">
        <ul slot="bullet-box-content" @mouseleave="visible = false">
            <li class="item" :class='{active: activeIndex === index}' v-for="(item, index) in searchTypes"
            :key="index" @click.stop="select(item, index)">{{item.name}}
            </li>
        </ul>
    </BulletBox>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "select_type",
    data() {
      return {
        activeIndex: 0,
        activeLabel: '最近联系人',
        visible: false,
        position:{x: 0, y: 41},
        first: false
      }
    },
    computed: {
      ...mapState({
        searchTypes: state => state.chat.searchTypes
      })
    },
    methods: {
      select(item, index) {
        this.activeIndex = index
        this.activeLabel = item.name
        if (item) {
          this.$store.commit('chat/SEARCH_ACTIVE', item)
          this.visible = false
        } else {
          this.$store.commit('chat/SHOW_SEARCH_RES', false)
          this.$store.commit('chat/SEARCH_ACTIVE')
        }
      },
      async getSearchTypes() {
        await this.$store.dispatch('chat/getSearchTypes')
        // 进入时搜索当前状态
        this.select(this.searchTypes[this.activeIndex], this.activeIndex)
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'

  #select_type
    relative()
    #bullet-box
      position absolute !important
      width 100%
      .item
        font-size 12px
        &:hover
          bgColor(color1)
      .active
        color color2
        bgColor(color1)
    .ivu-poptip
      .ivu-poptip-rel

      .content
        .item
          ing 5px 0
          text-align center
          cursor pointer
          &:hover
            hover_bgclolr()
</style>
