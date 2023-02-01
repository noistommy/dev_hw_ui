<!--<link rel="stylesheet" href="../../assets/scss/base/_colors.scss">-->
<template>
  <div class="hw-pagination" :class="[`hw-flex-${justify}`]">
    <button type="button" class="hw-pagination-nav" :disabled="disabledPrev" :class="{'hw-disabled': disabledPrev}"  @click="setPageFirst"><i class="fa fa-chevrons-left"></i></button>
    <button type="button" class="hw-pagination-nav" :disabled="disabledPrev"  :class="{'hw-disabled': disabledPrev}" @click="setPagePrev"><i class="fa fa-chevron-left"></i></button>
    <button type="button" class="hw-pagination-num" v-for="(p, index) in paginate" :key="index" :class="{'hw-active':p == currentPage}" @click="setPage(p)">
        {{ p }}
    </button>
    <button type="button" class="hw-pagination-nav" :disabled="disabledNext" :class="{'hw-disabled': disabledNext}"  @click="setPageNext"><i class="fa fa-chevron-right"></i></button>
    <button type="button" class="hw-pagination-nav" :disabled="disabledNext" :class="{'hw-disabled': disabledNext}" @click="setPageEnd"><i class="fa fa-chevrons-right" /></button>
  </div>
</template>

<script>
export default {
  name: 'hw-pagination',
  props: {
    length : {
      type: Number,
      default: 10
    },
    currentPage : {
      type: Number,
      default: 1,
    },
    lastPage : {
      type: Number,
      default: 1,
    },
    justify : {
      type: String,
      default: 'center'
    }
  },
  computed: {
    paginate() {
      // 현재 페이지 번호 동기화
      let start = Math.floor((this.currentPage - 1)/this.length)*this.length + 1;
      let end = start + this.length - 1;
      if(end > this.lastPage) end = this.lastPage;
      let pages = new Array(end - start + 1);
      for(let i = 0; i < pages.length; i++){
        pages[i] = start + i;
      }
      return pages;
    },
    disabledNext() {
      return (this.currentPage + 1) <= this.lastPage ? false : true
    },
    disabledPrev() {
      return (this.currentPage - 1) > 0 ? false : true
    }
  },
  methods : {    
    setPage(num) {     
      if (num > this.lastPage || num < 0) return console.error('접근할 수 없는 페이지 번호입니다.');
      this.$emit('page-change', num)
    },
    setPageFirst() {
      if(!this.disabledPrev) this.setPage(1);
    },
    setPagePrev() {
      if(!this.disabledPrev) this.setPage(this.currentPage - 1);
    },
    setPageNext() {
      if(!this.disabledNext) this.setPage(this.currentPage + 1);
    },
    setPageEnd() {
      if(!this.disabledNext) this.setPage(this.lastPage);
    }
  }
}
</script>

<style lang="scss" scoped>/* Pagination */

$pagination-font: #909090;
$pagination-border: #d6d6d6;
$pagination-bg: #fff;
$pagination-bg-hover: #ccc;
$pagination-border-hover: #f8f8f8;
$pagination-font-hover: #fff;
$pagination-bg-active: #2985db;
$pagination-border-active: #2985db;
$pagination-font-active: #fff;

.hw-pagination { display: flex; }
.hw-pagination .hw-pagination-nav,
.hw-pagination .hw-pagination-num {
  display: inline-block;
  min-width: 34px;
  max-height: 34px;
  line-height: 34px;
  margin: 0 4px;
  font-size: 13px;
  font-weight: 500;
  font-family: arial;
  color: $pagination-font;
  border: 1px solid $pagination-border;
  background: $pagination-bg;
  user-select: none;
  border-radius: 4px;
  transition-duration: .1s;
  outline: 0;
}
.hw-pagination .hw-pagination-nav:hover,
.hw-pagination .hw-pagination-num:hover {
  background: $pagination-bg-hover;
  border-color: $pagination-border-hover;
  color: $pagination-font-hover
}
.hw-pagination .hw-pagination-nav.hw-active,
.hw-pagination .hw-pagination-num.hw-active {
  background: $pagination-bg-active;
  border-color: $pagination-border-active;
  color: $pagination-font-active;
  pointer-events: none
}
.hw-pagination .hw-pagination-nav.hw-disabled,
.hw-pagination .hw-pagination-num.hw-disabled {
  pointer-events: none;
  opacity: .5;
}
.hw-flex-left {
  justify-content: flex-start;
}
.hw-flex-center {
  justify-content: center;
}
.hw-flex-right {
  justify-content: flex-end;
}

</style>