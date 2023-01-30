<template>
    <div>
      <div class="g-level-box">
        <div
          class="g-item"
          v-for="level in maxLevel"
          :key="level"
          :style="calcItemStyle"
        >레벨 {{level}}</div>
      </div>
      <g-tree
        v-if="treeData"
        :treeData="treeData"
        :maxLevel="maxLevel"
        :defaultNodeName="defaultNodeName"
        :createIcon="createIcon"
        :deleteIcon="deleteIcon"
        :editIcon="editIcon"
        :updateIcon="updateIcon"
        :width="width"
        @g-create="onCreate"
        @g-update="onUpdate"
        @g-delete="onDelete"
        @g-drop="onDrop"
      />
    </div>
</template>
<script>
import GTree from './GTree'
export default {
  name: 'hw-tree-view',
  components: {
    GTree
  },
  data () {
    return {
      width: null
    }
  },
  props: {
    container: String,
    treeData: Object,
    defaultNodeName: {
      type: String,
      default: 'New Node'
    },
    createIcon: {
      type: String,
      default: 'gi gi-plus'
    },
    deleteIcon: {
      type: String,
      default: 'gi gi-trash'
    },
    editIcon: {
      type: String,
      default: 'gi gi-pencil'
    },
    updateIcon: {
      type: String,
      default: 'gi gi-check'
    },
    maxLevel: {
      type: Number,
      default: 4
    }
  },
  mounted () {
    this.width = this.getContentWidth(document.querySelector(this.container) || this.$el.parentNode) / this.maxLevel
  },
  computed: {
    calcItemStyle () {
      return {
        flex: `0 0 ${this.width}px`
      }
    }
  },
  methods: {
    onCreate ({ done, name, path }) {
      console.log('트리 뷰 : 노드생성')
      this.$emit('g-create', { done, name, path })
    },
    onUpdate ({ done, name, path }) {
      console.log('트리 뷰 : 노드수정')
      this.$emit('g-edit', { done, name, path })
    },
    onDelete ({ done, path }) {
      console.log('트리 뷰 : 노드삭제')
      this.$emit('g-delete', { done, path })
    },
    onDrop ({ done, path }) {
      console.log('트리 뷰 : 노드이동')
      this.$emit('g-drop', { done, path })
    },
    stoi (s) {
      return parseInt(s)
    },
    getContentWidth (el) {
      const {
        width,
        borderLeftWidth,
        borderRightWidth,
        paddingLeft,
        paddingRight
      } = getComputedStyle(el)
      return this.stoi(width) - (this.stoi(borderLeftWidth) + this.stoi(borderRightWidth) + this.stoi(paddingLeft) + this.stoi(paddingRight))
    }
  }
}
</script>
<style lang="scss" scoped>
  .g-level-box{
    display: flex;
    .g-item{
      box-sizing: border-box;
      padding: 10px 15px;
      text-align: center;
    }
  }
</style>
