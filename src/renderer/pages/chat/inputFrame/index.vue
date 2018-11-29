<template>
    <div id="inputFrame">
      <div class="inputFrameIcon">
        <ul class="icons">
          <li class="icon emotion">
            <Poptip placement="top-start" width="740" v-model="emotionShow">
              <span class="icon cursor">&#xe60d;</span>
              <div slot="content">
                <Emotions @close="emotionShow = false"></Emotions>
              </div>
            </Poptip>
          </li>
          <li class="icon cut cursor"><Icon type="android-microphone"></Icon></li>
          <li class="icon cut cursor"><Icon type="folder"></Icon></li>
          <!-- <li class="icon cut cursor" @click='cutPic'>&#xe6bc;</li> -->
          <!-- <li class="imgs">
            <Poptip placement="top-start" width="740" v-model="materialShow">
              <Icon type="social-buffer" @click="getFiles"></Icon>
              <div slot="content" class="content">
                <Material @close="materialShow = false" title="imgs"></Material>
              </div>
            </Poptip>
          </li> -->
          <li>
            <Icon type="social-buffer" @click="showModal('material')"></Icon>
          </li>
          <!-- <li class="links">
            <Poptip placement="top-start" width="740" v-model="linksShow">
              <span class="icon cursor" @click='getFiles'>&#xe602;</span>
              <div slot="content" class="content">
                <Files @close="linksShow = false" title="links"></Files>
              </div>
            </Poptip>
          </li>
          <li class="audio">
            <Poptip placement="top-start" width="740" v-model="audioShow">
              <span class="icon cursor" @click='getFiles'>&#xe714;</span>
              <div slot="content" class="content">
                <Files @close="audioShow = false" title="audios"></Files>
              </div>
            </Poptip>
          </li>
          <li class="video">
            <Poptip placement="top-start" width="740" v-model="videoShow">
              <span class="icon cursor" @click='getFiles'>&#xe64a;</span>
              <div slot="content" class="content">
                <Files @close="videoShow = false" title="videos"></Files>
              </div>
            </Poptip>
          </li> -->
          <!-- <li class="imgs">
            <Poptip title="Title" content="content" placement="top">
              <span class="icon">&#xe600;</span>
              <div class="api" slot="content"></div>
            </Poptip>
          </li>
          <li class="video">
            <Poptip title="Title" content="content" placement="top">
              <span class="icon">&#xe610;</span>
              <div class="api" slot="content"></div>
            </Poptip>
          </li>
          <li class="icon computer">&#xe602;</li> -->
          <li class="icon store">
            <Icon type="ios-star" @click="showModal('store')"></Icon>
          </li>
          <li class="icon store">
            <Icon type="ios-film-outline" @click="showModal('knowledge')"></Icon>
          </li>
          <!-- <li class="icon more">
            <Poptip placement="top-start" :offset="-12" width="740"  v-model="hideBoard">
              <span class="icon cursor" @click="ajaxModels">&#xe62c;</span>
              <div class="content" slot="content">
                <Board @close="hideBoard = false"></Board>
              </div>
            </Poptip>
          </li> -->
          <!-- <li class="add_link">
            <Tooltip content="添加链接" placement="top">
              <span class="link cursor icon" @click="isLink = true">&#xe63f;</span>
            </Tooltip>
            <Tooltip content="取消链接" placement="top">
              <span class="link cursor icon" @click="unlink">&#xe641;</span>
            </Tooltip>
            <Modal
              v-model="isLink"
              title="增加超链接"
              @on-ok="ok" class-name="add_link">
              <div class="link_title link_relative">
                <label>标题</label>
                <input type="text" v-model="linkTitle">
              </div>
              <div class="link_href link_relative">
                <label>地址</label>
                <input type="text" v-model="linkHref">
              </div>
            </Modal>
          </li> -->
        </ul>
        <Modal v-model="modalShow" width="740" :closable="false" class-name="center_modal" type="text/css">
          <div style="text-align:center">
            <Material v-if="materialShow" @close="clear" title="imgs"></Material>
            <Store v-if="storeShow" @close="clear"></Store>
            <Knowledge v-if="knowledgeShow" @close="clear"></Knowledge>
          </div>
          <div slot="footer">
          </div>
        </Modal>
      </div>
      <div>
        <um-editor :linkObj="linkObj"></um-editor>
      </div>
    </div>
</template>

<script>
import Material from "./material"
import Board from "./stores/board"
import Emotions from "./stores/emotions"
import umEditor from "../../public/Ueditor"
import Store from "./stores"
import Knowledge from "./knowledge"
import {mapState, mapActions} from 'vuex'
export default {
  name: "inputFrame",
  data() {
    return {
      emotionShow: false,
      materialShow: false,
      linksShow: false,
      audioShow: false,
      videoShow: false,
      storeShow: false,
      hideBoard: false,
      knowledgeShow: false,
      modalShow: false,
      isLink: false,
      linkTitle: '',
      linkHref: '',
      linkObj: {
        isLink: false,
        linkTitle: '',
        linkHref: ''
      }
    };
  },
  computed: {
    ...mapState({
      chatId: state => state.chat.chatId
    })
  },
  components: { Material, Board, Store, umEditor, Emotions, Knowledge },
  methods: {
    showModal(type) {
      this.modalShow = true
      this.setFalse()
      switch (type) {
        case 'material': 
          this.materialShow = true
          break
        case 'store':
          this.storeShow = true
          break
        case 'knowledge':
          this.knowledgeShow = true
          break
      }
    },
    setFalse() {
      this.materialShow = false
      this.storeShow = false
      this.knowledgeShow = false
    },
    clear() {
      this.modalShow = false
      this.setFalse()
    },
    // 截图
    unlink() {
      let obj = this.deepCopy(this.linkObj)
      obj.isLink = false
      this.linkObj = obj
    },
    cutPic() {
      this.$Message.destroy()
      this.$Message.info('请使用QQ截图')
    },
    ok() {
      if (!this.linkTitle || !this.linkHref) {
        this.$Message.destroy()
        this.$Message.warning('输入框不能为空')
      } else {
        let obj = this.deepCopy(this.linkObj)
        obj.isLink = true
        obj.linkTitle = this.linkTitle
        obj.linkHref = this.linkHref
        this.linkObj = obj
      }
    },
    getFiles() {
      this.ajaxFiles(0)
    },
    ...mapActions({
      getStore: "collect/getStore",
      ajaxModels: 'files/ajaxModels',
      ajaxFiles: 'files/ajaxFiles'
    })
  }
};
</script>
<style type="text/css">
  .center_modal, .knowledge_detail{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .center_modal .ivu-modal, .knowledge_detail .ivu-modal{
    box-shadow: 0 0 1px 2px #ccc;
    top:0;
    border-radius:5px;
    background-color:#fff;
  }
  .knowledge_detail .ivu-modal{
    height:659px;
  }
  .knowledge_detail .ivu-modal-footer{
    width:100%;
    text-align:center;
    position: absolute;
    bottom:0;
  }
  .center_modal .ivu-modal-mask{
    background-color:transparent
  }
  .center_modal .ivu-modal-footer{
    padding:0;
    border-top:none
  }
  .knowledge_detail .ivu-modal-content{
    height: 100%;
  }
  .knowledge_detail .ivu-modal-content, .center_modal .ivu-modal-content{
    padding: 20px;
  }
  .center_modal .ivu-modal-body{
    padding: 0;
  }
  .knowledge_detail .modal_btn, .center_modal .modal_btn{
    border-radius: 3px
  }
  .center_modal .ivu-modal-header{
    border:none;
    padding:0;
  }
  .center_modal .cancel_btn{
    border:1px solid #e3e4e6
  }
  .center_modal .ivu-modal-header-inner{
    font-size:18px;
    font-weight: normal;
  }
</style>
<style lang="stylus" scoped>
@import '~@/assets/css/index.styl'
  #inputFrame
    .add_link
      setMiddle()
      .link_relative
        setMiddle()
        margin: 10px 0
        input
          width: 50%
          height 40px
          ml(10px)
          border: 1px solid #efefef
  #inputFrame
    position:absolute
    height:200px
    bottom:0
    right:0
    left:0
    bgColor()
    border-top:1px solid #ddd
    .inputFrameIcon
      &::after
        display: block
        content: ''
        clear: both
    .icons
      setStart()
      bgColor(#eee)
      >li
        display: inline-block
        float: left
        color(#606060);
        margin: 10px 10px
        font-size: 18px
        &:nth-child(1)
          font-size: 20px
      &::after
        content: ''
        display: block
        overflow: hidden
</style>
