<template>
  <Modal
    v-model="modal"
    class-name="basicModal"
    :width="width"
    :mask-closable="maskClosable"
    :closable="closable"
    @on-cancel="cancel"
    >
    <div slot="header" class="header">
      <span>{{title}}</span>
    </div>
    <div class="body">
      <div v-if="!$slots.default" v-html="content"></div>
      <slot v-else ></slot>
    </div>
    <div slot="footer" v-if="!$slots.footer">
      <Button type="primary" @click.stop="ok">{{okText}}</Button>
      <Button type="ghost" @click.stop="cancel">{{cancelText}}</Button>
    </div>
    <div v-else class="footer" slot="footer"></div>
  </Modal>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      title: String,
      content: String,
      maskClosable: false,
      closable: true,
      width: {
        type: [Number, String],
        default: 400
      },
      okText: {
        type: String,
        default: "确认"
      },
      cancelText: {
        type: String,
        default: "取消"
      },
      onOk: {
        type: Function,
        default: () => {}
      },
      onCancel: {
        type: Function,
        default: () => {}
      }
    },
    data() {
      return {
        modal: this.value
      }
    },
    watch: {
      value (val) {
          this.modal = val;
      }
    },
    methods: {
      showModal() {
        this.modal = true
      },
      close() {
        this.modal = false
      },
      cancel() {
        this.modal = false
        this.$emit('input', false);
        this.$emit('onCancel')
      },
      ok() {
        this.modal = false
       this.$emit('input', false);
        this.$emit('onOk')
      }
    }
  }
</script>

<style lang="stylus">
.basicModal
  z-index 2000
  display flex
  align-items center
  justify-content center
  .ivu-modal
    top 0
  .ivu-modal-content
    padding-left 20px
    padding-right 20px
    box-shadow 0px 1px 6px 0px rgba(0, 0, 0, 0.2)
    border-radius 3px
    border solid 1px #cacbcc
    .ivu-modal-header
      border-bottom none
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
        padding-top 4.5px
        padding-bottom 4.5px
        margin-left 20px
</style>
