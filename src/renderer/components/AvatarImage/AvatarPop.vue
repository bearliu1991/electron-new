<template>
  <Modal
    v-model="isVisible"
    :footer-hide="true"
    class-name="avatarPic"
    width="400"
    >
    <div slot="header" class="avatarHeader"></div>
    <div class="imageCont">
      <img :src="url" alt="头像">
    </div>
    <template slot="footer">
    </template>
  </Modal>
</template>
<script>
export default {
  name: 'avatar',
  props: {
    url: String,
    onClose: {
      type: Function,
      default() {
        return () => {}
      }
    }
  },
  data() {
    return {
      isVisible: false
    }
  },
  watch: {
    isVisible(val, oldVal) {
      !val && this.onClose && this.onClose()
    }
  }
}
</script>
<style lang="stylus">
.avatarPic {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
  }
  .ivu-modal-content {
    box-shadow: 0px 1px 6px 0px
      rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  .ivu-modal-header {
    padding: 0;
    border-bottom: none;
    .avatarHeader {
      height: 36px;
    }
  }
  .ivu-modal-body {
    padding: 0;
    .imageCont {
      font-size: 0;
      img {
        width: 100%;
        border-radius: 0 0 3px 3px;
      }
    }
  }
}
</style>
