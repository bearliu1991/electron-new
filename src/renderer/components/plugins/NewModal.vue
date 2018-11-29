<template>
  <Modal class-name="customModal" v-model="showModal" :mask-closable="maskClosable" :closable="closable" @on-cancel="close" :styles="{top: '45%', marginTop: '-8%'}">
    <p slot="header">
      <span>{{header}}</span>
    </p>
    <div>
      <div class="isContentSlot">
        <slot></slot>
      </div>
    </div>
    <div slot="footer" v-show="showFooter">
      <Button type="primary" @click.stop="ok">{{confrim}}</Button>
      <Button type="ghost" v-show="cancelBtn" @click.stop="cancel">{{cancelText}}</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: 'newModal',
  model: {
    prop: 'modal',
    event: 'close'
  },
  props: {
    modal: {
      default: false,
      type: Boolean
    },
    confrim: {
      type: String,
      default: '确定'
    },
    cancelBtn: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    content: {
      type: String,
      default: '确定要删除么？'
    },
    header: {
      type: String,
      default: '解绑企业'
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    showModal: {
      get() {
        return this.modal
      },
      set() {
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('close', false)
      this.$emit('cancel')
    },
    ok() {
      this.$emit('close', false)
      this.$emit('ok')
    },
    close() {
      this.$emit('close', false)
    }
  },
  watch: {
  }
}
</script>

<style lang="stylus">
  .ivu-modal-mask
    background-color transparent
  .customModal
    font-size 14px  
    .ivu-modal-content
      padding-left 20px
      padding-right 20px
      border-radius 3px
      box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.2)
      border solid 1px #cacbcc
      .ivu-modal-close .ivu-icon-ios-close-empty:hover
        color #409eff
      .ivu-modal-header
        padding-left 0
        padding-top 20px
        span
          color #303133
          font-size 18px
      .ivu-modal-body
        font-size 14px
        padding-left 0
        padding-right 0
      .ivu-modal-footer
        border-top none
        padding 20px 0
        .ivu-btn
          padding-left 17px
          padding-right 17px
          padding-top 4.5px
          padding-bottom 4.5px
          margin-left 20px
          font-size 14px
</style>