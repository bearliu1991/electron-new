<template>
  <div id="left">
    <div class="left_portrait">
      <div class="innner_portrait" @mouseover="getData" @click="visible = !visible">
        <img :src="userInfo.avatar" alt="">
        <span class="online-status">
          <span v-if="userInfo.status" >
            <i class="icon green">&#xe615;</i>
          </span>
          <span v-else>
            <i class="icon gray">&#xe6d3;</i>
          </span>
        </span>
      </div>
        <BulletBox :position="{x: 61, y: 0}" v-if="visible">
          <div slot="bullet-box-content" @mouseleave="visible = false">
            <PortraitCont></PortraitCont>
          </div>
        </BulletBox>
    </div>
    <div class="routes">
      <router-link class="icon" v-for="(val, key, index) in pathObj" :to="key" :key="index" v-html="val"></router-link>
    </div>
    <div class="settings icon">&#xe60b;</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import PortraitCont from './leftPortrait'

  export default {
    name: "hello",
    data() {
      return {
        data: {
          status: 1
        },
        visible: false,
        idx: 0,
        pathObj : {'/manager': '&#xe7a8;', '/manager/second': '&#xe67c;'}
      }
    },
    created() {
      this.getData()
    },
    watch : {
      '$route' (to, from) {}
    },
    computed: {
      ...mapState({
        userInfo : state => state.public.portraitData
      })
    },
    components : {PortraitCont},
    methods: {
      async submit () {
        await this.logout()
        this.$router.push('/login')
      },
      getData() {
        this.$store.dispatch('public/getUserPortrait')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/css/index.styl'
  #left
    display:flex
    height: 100%
    relative()
    flex-direction:column
    bgColor(color10)
    .left_portrait
      margin-top: 25px
      height: 40px
      width:40px
      radius(50%)
      margin:10px auto
      .innner_portrait
        square(40px)
        cursor()
        img
          width 100%
          height 100%
        .online-status
          position absolute
          top 28px
          left 30px
    .username
      color()
    .go_out
      display:inline-block
      bgColor(#fff)
      margin:10px auto
      padding:5px 10px
      radius(5px)
    .routes
      column()
      a
        margin:20px auto
        padding:5px
        fn(24px)
        color(color4)
        display: block
        &.router-link-active
          color(color2)
        &:nth-child(2)
          fn(33px)
    .settings
      width: 100%;
      left: 0;
      absolute()
      bottom:20px
      color(color4)
      fn(22px)
    .slideRight-enter, .slideRight-leave-to {
      transform: translateX(-100%);
      opacity: 0
    }
    .slideRight-enter-active,.slideRight-leave-active {
      transition : all 0.3s ease
    }

</style>
