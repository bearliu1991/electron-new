<template>
    <div id="notice">
      <i class="icon fans" v-if="infoType === 1">&#xe6b4;</i>
      <i class="icon system" v-if="infoType === 2">&#xe669;</i>
      <i class="icon customer" v-if="infoType === 3">&#xe616;</i>
      <span><slot></slot></span>
    </div>
</template>

<script>
  export default {
    name: "notice",
    data() {
      return {}
    },
    props: ['infoType', 'msgType'],
    methods: {}
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #notice
    max-width:80%
    white-space:pre
    /*word-break:nowrap*/
    clear()
    square(19px)
    padding:0 10px
    radius(3px)
    margin:0 auto
    bgColor(#f5f6f7)
    color #979899
    i
      margin-right:5px
    .fans
      color(skyblue)
    .system
      color(red)
    .customer
      color(yellow)
</style>
