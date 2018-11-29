<template>
  <Modal
    title="编辑标签"
    v-model="isVisible"
    class-name="tagModal"
    width="700"
    @on-cancel="cancel"
    >
      <Tabs :animated="false">
        <TabPane label="全部标签">
          <div id="allTag">
            <ScrollBar>
              <TagSelect v-model="allTagValue" title="客户意向"></TagSelect>
            </ScrollBar>
          </div>
        </TabPane>
        <TabPane label="已有标签">
          <div id="myTag">
            <ScrollBar>
              <TagSelect v-model="myTagValue" title="客户意向" closable :showSelectAll="false"></TagSelect>
            </ScrollBar>
          </div>
        </TabPane>
    </Tabs>
    <div slot="footer" class="footer">
      <Button type="primary" @click="ok">确定</Button>
      <Button @click="cancel">取消</Button>
    </div>
  </Modal>
</template>

<script>
import TagSelect from './TagSelect'
  export default {
    props: {
      value: {
          type: Boolean,
          default: false
      }
    },
    data() {
      return {
        allTagValue: [],
        myTagValue: [1, 2],
        isVisible: this.value
      }
    },
    watch: {
      value (val) {
          this.isVisible = val;
      }
    },
    methods: {
      showModal() {
        this.isVisible = true
      },
      cancel() {
        this.isVisible = false
        this.$emit('input', false);
        this.$emit('onCancel')
      },
      ok() {
        this.isVisible = false
        this.$emit('input', false);
        this.$emit('onOk')
        alert(this.allTagValue)
      }
    },
    components: {
      TagSelect
    }
  }
</script>

<style lang="stylus">
  .tagModal {
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
      border: solid 1px #cacbcc;
    }
    .ivu-modal-footer {
      border-top: none;
    }
    .footer {
      border-top: 1px solid #e9eaec;
      padding: 20px 0 8px;
    }
    .ivu-modal-header {
      border: none;
      .ivu-modal-header-inner {
        font-size: 18px;
        font-weight: normal;
        color: #303133;
      }
    }
    .ivu-modal-header {
      padding: 20px 20px 0;
    }
    .ivu-modal-body {
      padding: 0 20px 20px
    }
    .ivu-tabs-tab {
      padding: 32px 22px 18px 10px;
    }
    .ivu-tabs-ink-bar {
      visibility: hidden;
      display: none;
    }
  }
  #allTag,#myTag {
    max-height: 420px;
    height: 240px;
    .wrapper-scroll {
      height: 100%;
    }
  }
  #allTag,#myTag {
    font-size: 14px;
    color: #303133;
    .tagHeader {
      margin-bottom: 16px;
      .selectAll {
        float: right;
        font-size: 12px;
        &.isAll {
          color: #409fff;
        }
      }
    }
    .tagList {
      font-size: 14px;
      line-height: 28px;
      .tag {
        position: relative;
        display: inline-block;
        margin-right: 16px;
        box-sizing: border-box;
        border: solid 1px #cacbcc;
        border-radius: 14px;
        padding: 0 14px;
        color: #606366;
        line-height: 26px;
        &-default:hover {
          border: solid 1px #59acff;
          background: #fff;
          color: #59acff;
        }
        &-checked {
          background: #59acff;
          border: none;
          color:#fff;
        }
        .ivu-icon {
          display: none;
          font-size: 16px;
          color : rgba(0,0,0,0.5);
          position: absolute;
          top: -6px;
          right: -4px;
        }
        &-remove:hover {
          .ivu-icon {
            display: block;
          }
        }
      }
    }
  }
</style>
