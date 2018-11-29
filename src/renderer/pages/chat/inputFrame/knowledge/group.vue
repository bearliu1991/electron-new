<template>
  <div id="group">
    <Input v-if="type === 0" class="group_input" placeholder="请输入组名"/>
    <div v-if="type === 1" class="group_wrap group_input">
      <div class="group_choose">
        <p>选择分组</p>
        <i-select></i-select>
      </div>
      <div class="group_choose">
        <p class="width_star"><span>*</span><i>回复内容</i></p>
        <div class="textarea_wrap">
          <textarea placeholder="请输入快捷回复内容"></textarea>
          <i class="num_tip">0/100</i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'group',
    data() {
        return {

        }
    },
    props: ['type'],
    components: {},
    methods: {

    }
  }
</script>
<style lang="stylus" scoped>
@import '~@/assets/css/index'
  #group
    .group_input
      margin: 30px 0 36px 0
    .group_wrap
      .group_choose
        mb(20px)
        p
          mb(8px)
          setStart()
          color(#313333)
        .width_star
          span
            color(err_color)
        .textarea_wrap
          height 120px
          relative()
          textarea
            width:100%
            height:100%
            border_()
            radius(5px)
            padding:10px
          .num_tip
            absolute()
            bottom:0
            right:10px
            color(light_color)
</style>
