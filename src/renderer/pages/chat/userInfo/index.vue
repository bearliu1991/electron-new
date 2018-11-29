<template>
    <transition name="slide">
      <div id="user_info" v-show="visible" >
        <div class='wrap'>
          <div class="info_card">
            <div class="card_bg" :style="{ backgroundImage: 'url(http://thirdwx.qlogo.cn/mmopen/ufVMVgCvafIzhKAyBx2br80STSMRTlF8k8ibgfevdaPhX53uibHAfF1y5Jmsbo2HmnUIW0niba2KIJnpMXjF2U3fg/132)'}"></div>
            <div class="card_info">
              <div class="avatar" @click="$avatarImage('http://thirdwx.qlogo.cn/mmopen/ufVMVgCvafIzhKAyBx2br80STSMRTlF8k8ibgfevdaPhX53uibHAfF1y5Jmsbo2HmnUIW0niba2KIJnpMXjF2U3fg/132')">
              <img src="http://thirdwx.qlogo.cn/mmopen/ufVMVgCvafIzhKAyBx2br80STSMRTlF8k8ibgfevdaPhX53uibHAfF1y5Jmsbo2HmnUIW0niba2KIJnpMXjF2U3fg/132" alt="头像">
              </div>
              <p class="name">
                <span>YokoYokoYok</span>
                <i class="sex">&#xe6b4;</i>
              </p>
              <p class="wechat">
                <span>公众号：正点财经正点</span>
                <i class="status">已取消</i>
              </p>
              <p class="origin">来源：渠道二维码</p>
              <tab-bar v-model="value" :data="tabList" />
            </div>
          </div>
          <div id="tabs">
            <tab-panels v-model="value">
              <tab-panel value="1">
                <ScrollBar ref="scrollBar" :isAuto="false">
                  <div id="basicInfo">
                    <ul class="info_detail">
                      <li>
                        <span>姓名</span>
                        <editor type="name" propInfo="张三李四"></editor>
                      </li>
                      <li>
                        <span>联系电话</span>
                        <editor type="mobile" propInfo="13500000571"></editor>
                      </li>
                      <li>
                        <span>所在地区</span>
                        <div>浙江杭州</div>
                      </li>
                      <li>
                        <span>微信号</span>
                        <editor type="wxMobile" propInfo="skhfkbn"></editor>
                      </li>
                      <li>
                        <span>QQ</span>
                        <editor type="qq" propInfo="96587453"></editor>
                      </li>
                      <li>
                        <span>年龄</span>
                        <editor type="age" propInfo="26"></editor>
                      </li>
                      <li>
                        <span>所属客服</span>
                        <div>
                          郭俊
                          <p class="action">
                            <Button @click="setBelong(1, 'Yoko', false)" class="active">取消专属</Button>
                          </p>
                        </div>
                        <!-- <PopChoose type="service" :id="info.serviceId"></PopChoose> -->
                      </li>
                      <li>
                        <span>所属分组</span>
                        <div @click="toggleGroupModal(true)">优质潜力客户</div>
                        <!-- <PopChoose type="group" :id="info.groupId"></PopChoose> -->
                      </li>
                      <li class="tips">
                        <span>备注</span>
                        <editor type="tips" propInfo="优质潜力客户资金充足优
                        质潜力客户优质潜力客户"></editor>
                      </li>
                    </ul>
                    <ul class="label">
                      <li v-for="(item, idx) in choosedMarks" :key="idx">{{item.name}}</li>
                      <li class="define" @click="toggleTagModal(true)">
                        编辑标签
                      </li>
                    </ul>
                  </div>
                </ScrollBar>
              </tab-panel>
              <tab-panel value="2">
                <div id="interaction">
                  <div class="num_list">
                    <div>
                      <p class="num">5</p>
                      <p class="name">来访次数</p>
                    </div>
                    <div>
                      <p class="num">3 <i>(2次有效)</i></p>
                      <p class="name">强制发送次数</p>
                    </div>
                    <div>
                      <p class="num">16</p>
                      <p class="name">粉丝说话次数</p>
                    </div>
                    <div>
                      <p class="num">25</p>
                      <p class="name">客服说话次数</p>
                    </div>
                  </div>
                  <ul class="time_list">
                    <li>首次关注时间 <span>2018-08-19 15：25</span></li>
                    <li>首次说话时间 <span>2018-08-19 16：57</span></li>
                    <li>最近来访时间 <span>2018-08-20 10：35</span> </li>
                    <li>最后说话时间 <span>2018-08-25 12：48</span></li>
                  </ul>
                </div>
              </tab-panel>
              <tab-panel value="3">
                <ScrollBar ref="scrollBar" :isAuto="false">
                  <div id="track">
                    <ul class="track_wrap">
                      <li>
                        <span class="dot"></span>
                        <div class="track_title">
                          <p>粉丝当前位置：</p>
                        </div>
                        <div class="track_cont">
                            <!-- 浙江省杭州市拱墅区德胜路195号海外… -->
                            <TMap :style="{width: '100%', margin: '0px'}" :styles="{width: '100%', height: '116px'}"></TMap>
                        </div>
                        <p class="track_time">
                          2017-12-20  10:25:23
                        </p>
                      </li>
                      <li>
                        <span class="dot"></span>
                      <div class="track_title">
                        <p>粉丝点击菜单【产品介绍】</p>
                      </div>
                      <p class="track_time">2017-12-20  10:25:23</p>
                      </li>
                      <li>
                        <span class="dot"></span>
                        <div class="track_title">
                          <p>粉丝点击菜单【产品介绍】</p>
                        </div>
                        <p class="track_time">2017-12-20  10:25:23</p>
                      </li>
                    </ul>
                  </div>
                </ScrollBar>
              </tab-panel>
            </tab-panels>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
import PopChoose from "../popChoose"
import editor from "../../public/editorInfo/editor"
import TabBar from '../../../components/Tabs/TabBar'
import TabPanels from '../../../components/Tabs/TabPanels'
import TabPanel from '../../../components/Tabs/TabPanel'
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  name: "user_info",
  data() {
    return {
      visible: true,
      value: '1',
      tabList: [
        {
          label: "基本信息",
          value: '1'
        },
        {
          label: "互动统计",
          value: '2'
        },
        {
          label: "粉丝轨迹",
          value: '3'
        }
      ]
    }
  },
  watch: {
    chatId() {
      this.ajaxChoosedMarks(this.chatId)
    }
  },
  computed: {
    ...mapGetters({
      allChoosedMarks: 'mark/getAllChoosedMarks',
      name: 'addInfo/getName',
      phone: 'addInfo/getPhone',
      remake: 'addInfo/getRemake'
    }),
    ...mapState({
      allChator: state => state.chat.allChator,
      chatId: state => state.chat.chatId
    }),
    info() {
      if (this.chatId < 0) {
        return {}
      } else {
        return this.allChator[this.chatId]
      }
    },
    choosedMarks() {
      return this.allChoosedMarks[this.chatId]
    }
  },
  created() {
    this.ajaxChoosedMarks(this.chatId)
  },
  methods: {
    ...mapActions({
      ajaxChoosedMarks: 'mark/ajaxChoosedMarks'
    }),
    toggleTagModal(status) {
      this.$root.Bus.$emit('toggleTagModal', status)
    },
    toggleGroupModal(status) {
      this.$root.Bus.$emit('toggleGroupModal', status)
    },
    setBelong(id, name, flag) {
      let options = {};
      if (flag) {
        options = {
          title: "设为专属粉丝",
          content: `您确定将粉丝"${name}"设为专属粉丝`
        }
      } else {
        options = {
          title: "取消专属",
          content: `您确定将粉丝"${name}"取消专属，设为普通粉丝吗`
        }
      }
      this.$confirm({
       ...options,
        onOk: () => {
          alert(11);
        }
      })
    }
  },
  components: {
    PopChoose,
    editor,
    TabBar,
    TabPanels,
    TabPanel
  }
};
</script>

<style lang="stylus">
@import '~@/assets/css/index.styl';
#user_info {
  position: relative;
  width:280px;
  .info_card {
    position: relative;
    height: 254px;
    .card_bg {
      position: absolute;
      width: 100%;
      height: 100%;
      background-position:center center;
      background-repeat:no-repeat;
      background-size:cover;
      -webkit-filter: blur(8px);
      -moz-filter: blur(8px);
      -o-filter: blur(8px);
      -ms-filter: blur(8px);
      filter:blur(8px);
    }
    .card_info {
      position: relative;
      z-index: 1;
      padding-top: 30px;
      font-size: 14px;
      .avatar {
        img {
          width: 66px;
          height: 66px;
          border: solid 1px #fff;
        }
      }
      .name {
        font-size: 20px;
        margin-top: 20px;
      }
      .wechat,.origin {
        margin-top: 12px;
      }
      .wechat .status {
        display: inline-block;
        font-size: 10px;
        padding: 3px;
        color: #fff;
        letter-spacing: 2px;
        background: #606366;
        border-radius: 3px;
        transform: scale(0.8);
        content: "未关注"
        &.active {
          background: #329800;
          content: "已关注"
        }
      }
    }
  }
  .tab-bar {
    margin-top: 16px;
    padding: 0;
    background: rgba(255,255,255, 0.5)
    .tab {
      padding-top: 18px;
      padding-bottom: 20px;
      font-size: 14px;
      color: #409fff;
    }
  }
  #tabs {
    .tab-panel {
      height: calc(100vh - 254px);
    }
  }
  #basicInfo {
    padding: 30px 20px;
    font-size: 14px;
    .info_detail {
      padding-right: 10px;
      li {
        margin-bottom: 16px;
        line-height: 28px;
        text-align: left;
        setStart();
        & > span {
          display: inline-block;
          float: left;
          width: 56px;
          color: #979899;
          text-align: right;
        }
        & > div {
          margin-left: 18px;
          color: #000;
          input {
            border: 1px solid #46b6ef;
            width: 100px;
          }

          input[disabled] {
            border: none;
          }

          i {
            text-align: left;
          }
        }
        .action {
          .ivu-btn {
            height: 28px;
            background-color: #e3e4e5;
            border-radius: 3px;
            border: solid 1px #e3e4e5;
            color: #606366;
            &.active {
              background-color: #409fff;
              color: #fff;
            }
          }
        }
      }
    }
    .label {
      border-top: 1px solid #e3e4e6;
      padding: 15px 0;
      margin: 0 -5px;
      clear: both;

      li {
        float: left;
        padding: 0 9px;
        vertical(28px);
        border-radius: 14px;
        margin: 5px;
        color();
        bgColor(skyblue);
      }
      .define {
        background: #fff !important;
        border: solid 1px #e3e4e5;
        color: #606366;
      }
    }
  }

  #interaction {
    font-size: 14px;
    color: #979899;
    line-height: 16px;
    text-align: left;
    padding: 0 20px;

    .num_list {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 40px;
      border-bottom: solid 1px #e3e4e6;
      margin-bottom: 30px;
      &>div {
        margin-top: 40px;
        width: 50%;
        text-align: center;

        .num {
          margin-bottom: 8px;
          font-size: 30px;
          color: #409fff;

          i {
            line-height: 0;
            font-size: 12px;
          }
        }
      }
    }

    .time_list {
      line-height: 28px;

      span {
        margin-left: 20px;
      }
    }
  }

  #track {
    font-size: 14px;
    color: #979899;
    line-height: 16px;
    text-align: left;
    padding: 40px 20px 40px 18px;

    .track_wrap {
      padding-left: 30px;

      li {
        &:before {
          position: absolute;
          top: 1px;
          left: -23px;
          content: '';
          width: 1px;
          height: 100%;
          background: #e3e4e6;
        }

        position: relative;
        padding-bottom: 40px;

        .track_cont, .track_time {
          margin-top: 8px;
        }

        .dot {
          position: absolute;
          left: -26px;
          content: '';
          width: 8px;
          height: 8px;
          background: #cacbcc;
          border-radius: 50%;
        }
      }

      li:first-of-type {
        .track_title {
          color: #303133;
        }

        .track_cont {
          font-size: 12px;
          color: #303133;
        }

        .dot {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          left: -29px;
          width: 14px;
          height: 14px;
          background: #b2d9ff;
          border-radius: 50%;

          &:before {
            content: '';
            width: 7px;
            height: 7px;
            background: #409fff;
            border-radius: 50%;
          }
        }
      }

      li:last-of-type {
        &:before {
          height: 0;
        }
      }
    }
  }
  &.slide-enter, &.slide-leave-to {
    // transform: translate3d(100%, 0, 0);
  }
  &.slide-enter-active, &.slide-leave-active {
    transition : all 0.1s ease;
  }
}
// 全局确认框样式
.ivu-modal-confirm {
  .ivu-modal-confirm-body {
    padding-left: 0;
  }
  .ivu-modal-confirm-body-icon {
    display: none;
  }
}
</style>
