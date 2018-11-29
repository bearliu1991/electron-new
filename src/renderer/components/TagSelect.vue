<template>
  <div class="tagGroup">
    <p class="tagHeader">{{title}}
      <span class="selectAll" v-if="showSelectAll" :class="{isAll: isEqual }" @click="selectAll(isEqual)">{{isEqual ? '取消全选': '全选'}}</span>
    </p>
    <div class="tagList">
      <div class="tag" :class="{'tag-default': !(selectedList.includes(item.id)), 'tag-checked': selectedList.includes(item.id), 'tag-remove': closable }" v-for="item in tagList" :key="item.id" @click.stop="ToggleSelect(item.id)">
        <span>{{item.name}}</span>
        <Icon type="close-circled" @click.stop="deleteTag(item.id)"></Icon>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tag-select',
    model: {
      prop: 'selectedList',
      event: 'input'
    },
    props: {
      title: String,
      showSelectAll: {
        type: Boolean,
        default: true
      },
      closable: {
        type: Boolean,
        default: false
      },
      tagList: { // 标签列表
        type: Array,
        default: () => {
          return [
            {id: 1, name: '标签1'},
            {id: 2, name: '标签2'}
          ]
        }
      },
      selectedList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    computed: {
      tagId() {
        return this.tagList.map(item => item.id)
      },
      isEqual() {
        return this.selectedList.toString() == this.tagId.toString()
      }
    },
    watch: {
      selectedList(val) { // 添加额外的事件
        this.$emit('change', val);
      }
    },
    methods: {
      ToggleSelect(id) {
        const selectValue = this.selectedList.slice();
        if (!selectValue.includes(id)) {
              selectValue.push(id);
        } else {
          const index = selectValue.indexOf(id);
          if (index !== -1) {
            selectValue.splice(index, 1);
          }
        }
        this.$emit('input', selectValue);
      },
      deleteTag(id) {
        alert(id);
        const selectValue = this.selectedList.slice();
        const index = selectValue.indexOf(id);
          if (index !== -1) {
            selectValue.splice(index, 1);
          }
        this.$emit('input', selectValue);
      },
      selectAll(flag) {
        if (flag) {
          this.$emit('input', [])
        } else {
          this.$emit('input', this.tagId)
        }
      }
    }
  }
</script>

<style lang="stylus">

</style>
