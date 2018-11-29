<template>
  <div class="cooperation">
    <div class="coo_item">
      <div class="coo_title">选择协作客服（请选择您需要协作的客服）</div>
      <div class="coo_server">
        <ScrollBar>
          <div class="server_wrapper">
            <div class="my_server"></div>
            <div class="other_server"></div>
          </div>
        </ScrollBar>
      </div>
    </div>
    <div class="coo_item">
      <div class="coo_title">填写协作原因</div>
      <div>
        <Input class="textarea" type="textarea" :rows="3" placeholder="Enter something..."></Input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'cooperation',
  data() {
    return {

    }
  }
}
</script>
<style lang="stylus">
@import '~@/assets/css/index.styl'
  .textarea
    .ivu-input
      resize none
</style>