<template>
  <div class="hw-table" :class="[tableClass, type]" :style="{width:'100%'}">
    <div class="hw-table-header" :class="[tableHeadClass]" :style="headerStyle">
      <div class="item-rendered-wrap">
        <template v-if="isShowCheckBox">
          <div class="hw-table-header-item item-check" :class="[{checked: isSelectedAll}]">
            <div class="hw-checkbox" v-if="isMultiple">
              <span class="hw-checkbox-input" @click.stop="toggleAllSelected"></span>
            </div>
          </div>
        </template>
        <template v-for="column in columns">
          <div v-if="column.rowKey === 'name'" class="hw-table-header-main item-rendered" :class="[tableHeadItemClass, column.align || 'center']"
               :style="{flexBasis:`${column.width}px`, minWidth:`${column.width}px`}"
               :key="column.name"
               @mouseover.stop="overColumn(column)" @mouseleave.stop="leaveColumn" @click="sortByColumn(column,sortState.direction)">
            <div class="header-item-text">{{column.name || ""}}</div>
            <div class="sort-icon" v-if="column.sortable" v-show="isShowSortBox(column)">
              <div class="hw-icon circle tiny">
                <i :class="`fa fa-chevron-${sortState.direction === 'asc' ? 'up' : 'down'}`" />
              </div>
            </div>
          </div>
          <div v-else class="hw-table-header-item item-rendered" :class="[tableHeadItemClass, (column.align || 'center')]"
               :style="{flexBasis:`${column.width}px`, maxWidth:`${column.width}px`}"
               :key="column.name"
               @mouseover.stop="overColumn(column)" @mouseleave.stop="leaveColumn" @click="sortByColumn(column,sortState.direction)">
            <div class="header-item-text">{{column.name || ""}}</div>
            <div class="sort-icon" v-if="column.sortable" v-show="isShowSortBox(column)">
              <div class="hw-icon circle tiny">
                <i :class="`fa fa-chevron-${sortState.direction === 'asc' ? 'up' : 'down'}`" />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <slot name="tBody">
      <div class="hw-table-body" :class="[tableBodyClass]">
        <hw-data-table-row v-for="(row, index) in rows" :key="row.id" :columns="columns" ref="hw-data-table-row"
                           :clickKey="clickKey" :rowData="row" :index="index" :selectType="selectType"
                           :isShowCheckBox="isShowCheckBox" :isSelectedAll="isSelectedAll" :tableRowClass="tableRowClass" :main-column="mainColumn"
                           :tableRowItemClass="tableRowItemClass" :setItemStyle="setItemStyle" :row-height="rowHeight"
                           @row-selected="onSelect" @select-item="setKeyFunc"/>
      </div>
    </slot>
  </div>
</template>
<script>
import HwDataTableRow from './HwDataTableRow.vue'
export default {
  name: 'hw-data-table',
  data(){
    return {
      headerTop: 0,
      isSelectedAll: false,
      lastSelectedRow: null,
      sortState: {
        isSorting: false,
        rowKey: null,
        overKey: null,
        direction: null
      },
      alignConvertMap: {
        'left': 'flex-start',
        'center': 'center',
        "right": 'flex-end'
      },
      totalWidth: ''
    }
  },
  components: {
    HwDataTableRow
  },
  props: {
    type: {
      type: String,
      default: 'list' // list || table
    },
    columns: {
      type: Array,
      default: () => []
    },
    fluidKey: {
      type: String,
      default: ''
    },
    clickKey: {
      type: String,
      default: ''
    },
    rows: {
      type: Array,
      default: () => []
    },
    selectType: {
      type: String,
      default: 'none'
    },
    useCheckBox: {
      type: Boolean,
      default: false
    },
    tableClass: {
      type: String,
      default: ''
    },
    tableHeadClass: {
      type: String,
      default: ''
    },
    tableHeadItemClass: {
      type: String,
      default: ''
    },
    tableBodyClass: {
      type: String,
      default: ''
    },
    tableRowClass: {
      type: String,
      default: ''
    },
    tableRowItemClass: {
      type: String,
      default: ''
    },
    selectedItemClass: {
      type: String,
      default: 'item-selected'
    },
    mainColumn: {
      type: String,
      default: 'name'
    },
    rowHeight: {
      type: Number,
      default: 46
    }
  },
  computed: {
    headerStyle(){
      return {
        top: 0
        // top: this.headerTop + 'px'
      }
    },
    isShowCheckBox(){
      return this.selectType !== 'none' && this.useCheckBox
    },
    isMultiple(){
      return this.selectType === 'multiple'
    },
    tableContainerWidth() {
      let total = this.type === 'table' ? 2 : 0;
      let checkbox = this.isShowCheckBox ? 24 : 0;
      this.columns.forEach(item => {
        total += item.width
      });
      return total+checkbox
    }
  },
  watch: {
    columns(newVal, oldVal){
      if(newVal !== oldVal) this.resetSortState()
    }
  },
  mounted() {
    this.totalWidth = this.$el.clientWidth;

  },
  methods: {
    isShowSortBox(column){
      return (column.rowKey === this.sortState.rowKey || column.rowKey === this.sortState.overKey)
    },
    eventScroll(e){
      this.headerTop = e.target.scrollTop
    },
    toggleAllSelected(){
      this.isSelectedAll = !this.isSelectedAll;
    },
    onSelect(payload){
      if(this.selectType === 'none') return;
      const {row, eventType} = payload;
      if(
          this.selectType === 'single' &&
          this.lastSelectedRow &&
          this.lastSelectedRow !== row &&
          row.isSelected
      ) { this.lastSelectedRow.isSelected = false }
      this.lastSelectedRow = row;
      if(eventType === 'click') this.$emit('row-selected', row.rowData)
    },
    overColumn(column){
      this.sortState.overKey = column.rowKey
    },
    leaveColumn(){
      this.sortState.overKey = null
    },
    setItemStyle(column){
      return {
        "max-width": column.width,
        //"flex-grow": Number(column.rowKey === this.fluidKey),
        "justify-content": this.alignConvertMap[column.align || "left"]
      }
    },
    getSelectedRows(){
      if(this.rows.length === 0) return [];
      switch(this.selectType){
        case 'none' :
          return this.$emit('not-selectable')
        case 'single' :
          if(!this.lastSelectedRow) return this.$emit('not-selected')
          return [this.lastSelectedRow.rowData]
        case 'multiple' :
          return this.$refs['hw-data-table-row'].reduce((rowList, row) => {
            if(row.isSelected) rowList.push(row.rowData)
            return rowList
          },[])
      }
    },
    setSelection(bool){
      this.isSelectedAll = bool;
    },
    sortByColumn(column, direction){
      if(this.rows.length === 0) return this.$emit('not-exist')
      this.sortState.isSorting = true;
      this.sortState.rowKey = column.rowKey;
      this.sortState.direction = direction === 'asc' ? 'desc' : 'asc';
      this.sortRows();
    },
    sortRows(){
      const { sortState } = this
      if(!sortState.rowKey || !sortState.direction) return
      this.rows.sort((a,b) => {
        switch(sortState.direction){
          case 'asc': return a[sortState.rowKey] > b[sortState.rowKey] ? 1: -1;
          case 'desc': return a[sortState.rowKey] > b[sortState.rowKey] ? -1: 1;
        }
      })
    },
    resetSortState(){
      this.sortState.isSorting = false;
      this.sortState.rowKey = null;
      this.sortState.overKey = null;
      this.sortState.direction = null;
    },
    setKeyFunc(payload) {
      console.log(payload)
    }
  }
}
</script>
<style lang="scss">

$color-table-border: #d6d6d6;
$color-header-item-text: #333333;
$color-header-background: #FFFFFF;
$color-sort-icon: #909090;
$color-sort-icon-focused: #7B7B7B;
$color-sort-icon-background-focused: #BCBCBC;
$color-row-item-text: #676767;
$color-row-hover: #EFF4FC;
$color-row-background: #FFFFFF;
$color-checkbox-border: #707070;
$sort-icon-size: 6px;
$primary-color: #2985db;

%d-flex-align-center{
  display: flex;
  align-items: center;
}
%d-flex-row-nowrap{
  display: flex;
  flex-flow: row nowrap;
}
%ellipsis{
  max-width: 100%;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

div.hw-table{
  width: 100%;
  min-height: 100%;
  height: auto;
  position: relative;
  /*overflow: hidden;*/
  overflow-x: auto;
  .cursor-pointer{
    cursor: pointer;
  }
  .hw-table-body {
    position: absolute;
    width: 100%;
    height: calc(100% - 45px);
    /*overflow-x: auto;*/
    overflow-y: auto;
    margin-top: 45px;
  }
  .hw-table-header,
  .hw-table-row{
    /*padding: 0 23px;*/
    @extend %d-flex-row-nowrap;
    .hw-table-header-main,
    .hw-table-row-main {
      flex-grow:1;
      display: flex;
      align-items: center;
      .header-item-text,
      .row-item-text {
        padding: 4px 12px;
      }
    }
    .hw-table-header-item,
    .hw-table-row-item{
      @extend %d-flex-align-center;
      //flex: 0 0 auto;
      //width: auto;
      min-width: 45px;
      .row-item-text {
        padding: 4px 12px;
      }
    }
    .item-rendered-wrap{
      @extend %d-flex-row-nowrap;
      width: 100%;
      .item-rendered{
        flex-shrink: 0;
        flex-basis: auto;
        justify-content: flex-start;
        &.left { justify-content: flex-start;
          text-align: left; }
        &.center { justify-content: center;
          text-align: center;}
        &.right { justify-content: flex-end;
          text-align: right;}
      }
    }
    .item-check{
      //width: 16px;
      //margin-right: 23px;
      padding: 4px 12px;
    }
    .hw-checkbox {
      display: inline-block;
      font-size: 14px;
      cursor: pointer;
      user-select: none;
      .hw-checkbox-input {
        display: block;
        width: 16px;
        height: 16px;
        border: 1px solid $color-checkbox-border;
        background-color: #fff;
      }
    }
    .checked .hw-checkbox{
      .hw-checkbox-input {
        background-color: #2985db;
        border-color: #2985db;
        &:after {
          border: 2px solid #fff;
          border-left: 0;
          border-top: 0;
          width: 4px;
          height: 9px;
          left: 4px;
          top: 0;
          box-sizing: content-box;
          -webkit-box-sizing: content-box;
          display: inline-block;
          transition: all 250ms ease-in-out;
          transform: rotate(45deg) scale(1);
        }
      }
    }
  }

  .hw-table-header{
    position: absolute;
    z-index: 1;
    min-width: 100%;
    left: 0;
    height: 45px;
    background-color: $color-header-background;
    border-bottom: 2px solid $color-table-border;
    .hw-table-header-item{
      .header-item-text{
        @extend %ellipsis;
        font-size: 15px;
        color: #333333;
        white-space: nowrap;
        padding: 4px 12px;
      }
    }
    .sort-icon-group{
      margin-left: 6px;
      .sort-icon{
        width: 0;
        height: 0;
        border-left: $sort-icon-size solid transparent;
        border-right: $sort-icon-size solid transparent;
        border-bottom: $sort-icon-size solid $color-sort-icon;
        cursor: pointer;
        &:hover{
          border-bottom: $sort-icon-size solid $primary-color;
        }
        &.selected{
          border-bottom-color: $primary-color;
        }
      }
      .sort-icon-focused{
        color: $color-sort-icon-focused;
        background-color: $color-sort-icon-background-focused;
      }
      .sort-icon-divider{
        margin: 3px 0;
      }
      .sort-descending{
        transform: rotate(180deg);
      }
    }
  }

  .hw-table-body{
    display: inline-block;
    min-width: 100%;
    min-height: 40px;
    max-height: 100%;
    .hw-table-row{
      height: 40px;
      border-bottom: 1px solid $color-table-border;
      background-color: $color-row-background;
      &:hover{
        background-color: $color-row-hover;
      }
      .hw-table-row-item{
        .row-item-text{
          color: $color-row-item-text;
          font-size: 14px;
          @extend %ellipsis;
          &.hover-underline{
            &:hover{
              text-decoration: underline;
            }
          }
        }
      }
    }
    .item-selected{
      background-color: $color-row-hover;
    }
  }
  &.table {
    border:1px solid $color-table-border;
    .item-rendered-wrap > div:not(:last-child) {
      border-right: 1px solid $color-table-border;
    }
  }
}
</style>