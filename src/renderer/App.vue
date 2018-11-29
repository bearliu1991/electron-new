<template>
    <div id="app" v-cloak>
        <transition name="fade">
            <router-view/>
        </transition>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Config from './config.js'
const ipc = Config.isWeb ?  null : require('electron')
export default {
    name: 'App',
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            chatId: state => state.chat.chatId,
            allChator: state => state.chat.allChator,
            allMsg: state => state.chat.allMsg
        })
    },
    watch: {
        '$route' (to, from) {
            let self = this
        }
    },
    created() {
        this._BUS.$on('renderMsg', (type, data) => {
          // render msg
            // console.error(type, data)
          // render msg
          this.handleRenderMsg(type, data)
        })
       
        ipc && ipc.ipcRenderer.on('mainMsg', (e, {type, data}) => {
          // console.error(e)
          console.error(type)
          console.error(data)
          this.emitFun(type, data)
        })
    },
    mounted() {
        let self = this;
        this.$socket.on("send_msg", data => {
            let res = JSON.parse(data);
            if (res.id === self.chatId) {
                let datas = {}
                datas.id = self.chatId
                datas.item = {
                    name: "张三",
                    infoType: 0,
                    msgType:  0,
                    id: res.msgId,
                    chatTime: 1533260010,
                    info: res.msg,
                    type: 0
                }
                self.$store.commit('chat/INSERT_MSGS', datas)
            }
        })
    },
    methods: {
        handleRenderMsg(type, data) {
          switch (type) {
            case 'loginSuccess': 
              ipc && ipc.ipcRenderer.send('enlarge')
              break
            case 'checkVersion': 
              ipc && ipc.ipcRenderer.send('checkVersion')
              break
            default: 
              break
          }
        },
        emitFun(type, data) {
          switch (type) {
            case 'updateProgress': 
              this._BUS.$emit('loadingPercent', data)
              break
            default: 
              break
          }
        }
    }
}
</script>

<style lang="stylus">
  @import '~@/assets/css/index.styl'

  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
    height:100%
    [v-cloak]
      display none
</style>
