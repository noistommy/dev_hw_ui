<template>
  <div class="hw-table-row" :class="[tableRowClass, {'cursor-pointer' : selectType !== 'none'},{'item-selected': (isSelected && !isShowCheckBox)}]"
       @click.stop="toggleSelected($event, 'select')" :style="{height: `${rowHeight}px`}">

    <div class="item-rendered-wrap">
      <div v-if="isShowCheckBox" class="hw-table-header-item item-check" :class="{checked: isSelected}">
        <div class="hw-checkbox">
          <span class="hw-checkbox-input"></span>
        </div>
      </div>
      <template v-for="column in columns">
        <div v-if="column.rowKey === 'name'" class="hw-table-row-main item-rendered"  :key="column.name"
             :class="[tableRowItemClass,{main:mainColumn === column.rowKey}, (column.align || 'center')]" :style="{flexBasis:`${column.width}px`, minWidth:`${column.width}px`}">
          <!--                :style="setItemStyle(column)"-->
          <span class="row-item-text ellipsis" :class="[{'hover-underline': column.rowKey === clickKey}]"
                @click="(column.rowKey === clickKey) ? toggleSelected($event, 'click') : null">
                      {{rowData[column.rowKey]}}
                    </span>
        </div>
        <div v-else class="hw-table-row-item item-rendered"  :key="column.name"
             :class="[tableRowItemClass,{main:mainColumn === column.rowKey}, (column.align || 'center')]" :style="{flexBasis:`${column.width}px`, maxWidth:`${column.width}px`}">
          <!--                :style="setItemStyle(column)"-->
          <span class="row-item-text ellipsis" :class="[{'hover-underline': column.rowKey === clickKey}]"
                @click="(column.rowKey === clickKey) ? toggleSelected($event, 'click') : null">
                      {{rowData[column.rowKey]}}
                    </span>
        </div>
      </template>

    </div>
  </div>
</template>
<script>
export default {
  name: 'hw-data-table-row',
  data(){
    return {
      isSelected: false
    }
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    clickKey: {
      type: String,
      //required: true
    },
    rowData: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    selectType: {
      type: String,
      required: true
    },
    isShowCheckBox: {
      type: Boolean,
      required: true
    },
    isSelectedAll: {
      type: Boolean,
      required: true
    },
    tableRowClass: {
      type: String,
      //required: true
    },
    tableRowItemClass: {
      type: String,
      //required: true
    },
    setItemStyle: {
      type: Function,
      //required: true
    },
    mainColumn: {
      type: String,
      default: ''
    },
    rowHeight: {
      type: Number,
      required: true
    }
  },
  watch:{
    isSelectedAll(newVal, oldVal){
      if(oldVal !== newVal) this.isSelected = newVal
    }
  },
  methods:{
    toggleSelected(event,eventType){
      this.selectedItem(event)
      event.stopPropagation()
      if(this.selectType === 'none') return
      if(eventType === 'select') this.isSelected = !this.isSelected
      this.$emit('row-selected', {
        row: this,
        eventType
      })
    },
    selectedItem(e) {
      const options = {
        isAlt: e.altKey,
        isCtrl: e.ctrlKey,
        isShift: e.shiftKey,
        isMeta: e.metaKey,
      };
      this.$emit('select-item', this.rowData, this.idx, this.isSelect, options)
    },

  }
}
</script>