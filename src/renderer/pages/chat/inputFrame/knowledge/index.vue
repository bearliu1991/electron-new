<template>
  <div id="knowledge" @click.stop>
    <div class="title_wrap">
      <p>知识库</p>
      <Icon type="close-round" class="know_icon" @click="close"></Icon>
    </div>
    <div class="title_pro">
      <ul class="collet_title">
        <li v-for="(btn, index) in btns" :key="index" :class="{'li_active': titleIdx === index}"
         @click="switchBtn(index)">{{btn}}</li>
      </ul>
      <div class="input_button" >
        <Input v-model="inputVal" placeholder="搜索文章标题" style="width: 200px">
          <span slot="prepend"><Icon type="ios-search"></Icon></span>
        </Input>
        <Button v-if="titleIdx === 0" type="primary" class="quick_button" @click="addReply">添加快捷回复</Button>
      </div>
    </div>
    <div class="content_wrap">
      <div class="left-wrapper">
        <div class="scroll-wrapper">
          <ScrollBar>
            <div class="item" v-for="(item, idx) in groupList" :key="idx" :class="{active:idx === groupIndex}"
              @click.stop="groupSwitch(idx)">
              <span class="inblock">{{item.name}}</span>
            </div>
          </ScrollBar>
        </div>
        <Button v-if="titleIdx === 0" class="new_group" @click="newGroup">+新建分组</Button>
      </div>
      <div class="right-wrapper">
        <div class="main_cont">
          <ul>
            <li class="li_head">
              <span v-if="titleIdx === 0">回复内容</span>
              <span v-if="titleIdx === 1">标题</span>
              <div class="process">操作</div>
            </li>
          </ul>
          <ul class="cont_ul">
            <li class="li_cont" v-for="(item, index) in replyList" :key="index" :class="{'knownledge_li': titleIdx === 1}">
              <a @click="showDetail">{{item.content}}</a>
              <div class="process">
                <Button type="primary" class="send">发送</Button>
                <Button v-if="titleIdx === 0" class="choose">选择</Button>
              </div>
            </li>
          </ul>
        </div>
        <Pages class="page_vue"></Pages>
        <Modal v-model="modalShow" width="400" class-name="center_modal"
          :title="modalTitle">
          <div style="text-align:center">
            <Group :type="proType"></Group>
          </div>
          <div slot="footer">
            <Button type="primary" class="save_btn modal_btn">保存</Button>
            <Button class="cancel_btn modal_btn" @click="modalShow = false">取消</Button>
          </div>
        </Modal>
        <Modal v-model="isKnowledge" width="740" class-name="knowledge_detail" style="height:659px">
          <div style="text-align:center" v-html="knowledgeDetail"></div>
          <div slot="footer">
            <Button type="primary" class="save_btn modal_btn">发送</Button>
            <Button class="cancel_btn modal_btn" @click="isKnowledge = false">取消</Button>
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
import Group from './group'
import { mapGetters, mapActions } from "vuex"
export default {
  data() {
    return {
      titleIdx: 0,
      groupIndex: 0,
      groupInput: "",
      showInput: false,
      inputVal: '',
      modalTitle: '',
      isKnowledge: false,
      modalShow: false,
      knowledgeDetail: '<h3>302805</h3><p>jklsdlf</p><p>jklsdlf</p><p>jklsdlf</p><p>jklsdlf</p><p>jklsdlf</p>',
      proType: 0, // 0新建分组， 1添加快捷回复
      btns: ['快捷回复', '知识库'],
      replyList: 
      [
        {id: 2, content: '安徽都少见啊怕大家小女测量距离为了减肥立刻集散地分厘卡即使了解更多六十九公里破IP全屏取景安稳平静安抚啊大家斯拉夫卡丢了就看得更加动感'},
        {id: 2, content: '安徽都少见啊怕大家小女测量距离为了减肥立刻集散地分厘卡即使了解更多六十九公里破IP全屏取景安稳平静安抚'},
        {id: 2, content: '安徽都少见啊怕大家小女测量距离为了减肥立刻集散地分厘卡即使了解更多六十九公里破IP全屏取景安稳平静安抚'},
        {id: 2, content: '安徽都少见啊怕大家小女测量距离为了减肥立刻集散地分厘卡即使了解更多六十九公里破IP全屏取景安稳平静安抚'},
        {id: 2, content: '安徽都少见啊怕'},
        {id: 2, content: '安徽都少见啊怕'},
        {id: 2, content: '安徽都少见啊怕'},
        {id: 2, content: '安徽都少见啊怕'},
        {id: 2, content: '安徽都少见啊怕'},
        {id: 2, content: '安徽都少见啊怕'},
        {id: 2, content: '安徽都少见啊怕'}
      ],
      groupList: [
        {name: '全部', val: 0},
        {name: '祝福', val: 1},
        {name: '问候', val: 2},
        {name: '有事', val: 3},
        {name: '未分组', val: 4}
      ]
    };
  },
  computed: {
    ...mapGetters({ getCollectList: "collect/getCollectList" }),
    collectData() {
      return this.getCollectList.length ? this.getCollectList[this.groupIndex] : []
    }
  },
  methods: {
    showDetail() {
      this.titleIdx === 1 && (this.isKnowledge = true)
    },
    addReply() {
      this.modalTitle = '添加快捷回复'
      this.proType = 1
      this.modalShow = true
    },
    // 顶部btn切换
    switchBtn(idx) {
      this.titleIdx = idx
    },
    newGroup() {
      this.modalTitle = '新建分组'
      this.proType = 0
      this.modalShow = true
    },
    // 组切换
    groupSwitch(idx) {
      this.groupIndex = idx
    },
    close() {
      this.$emit("close", false);
    },
    ...mapActions({
      addStoreGroup: "collect/addStoreGroup",
      delStoreGroup: "collect/delStoreGroup",
      getStore:'collect/getStore'
    })
  },
  watch: {
    groupInput(val) {
      this.groupInput = val.substring(0, 10);
    }
  },
  components: { Group }
};
</script>
<style lang="stylus" scoped>
@import '~@/assets/css/index.styl'
#knowledge
  fn(14px)
  setColumn()
  height:100%
  .title_wrap
    setBetween()
    mb(25px)
    >p
      alignL()
      fn(18px)
    .know_icon
      cursor()
  .title_pro
    setBetween()
    mb(15px)
    .input_button
      setEnd()
      .ivu-input-group
        .ivu-input-group-prepend
          radius(16px)
          border:none
        .ivu-input
          border:none
          bgColor(#eee)
          radiusRight(16px)
      .quick_button
        width:100px
        ml(20px)
        radius(5px)
    .collet_title
      setStart()
      li
        border:1px solid transparent
        padding: 0 12px
        height 28px
        line-height:26px
        radiusLeft(14px)
        radiusRight(14px)
        cursor()
        &.li_active
          color(text_color)
          border: 1px solid text_color
  .content_wrap
    flex: 1
    flex_()
    .left-wrapper
      width 153px
      bgColor(#f8f9fb)
      setBetween()
      flex-direction column
      .new_group
        border_()
        bgColor()
        radius(3px)
        mb(40px)
      .scroll-wrapper
        height 400px
        width: 100%
        overflow auto
        .item
          cursor pointer
          text-align center
          position relative
          &.active
            color(text_color)
          &:hover
            bgColor(#dedede)
            .delete
              display block
          .inblock
            display inline-block
            padding:15px 0
    .right-wrapper
      width: calc(100% - 153px)
      setStart()
      flex-direction: column
      .main_cont
        width:100%
        padding:20px
        ul
          li
            setBetween()
            padding:15px 20px
            >a
              flex:1
              ellipsis()
              alignL()
              padr(20px)
              color(inherit)
            .process
              setStart()
              width:155px
              >button
                radius(5px)
              .choose
                ml(10px)
                bgColor()
                border_()
          .li_head
            borb()
            padt(0)
        .cont_ul
          height 400px
          overflow-y: auto
          .knownledge_li
            a
              &:hover
                cursor()
                color(text_color)
  .page_vue
    mt(10px)
</style>
