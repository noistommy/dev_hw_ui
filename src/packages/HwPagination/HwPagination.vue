<template>
  <div class="hw-pagination" tabindex="0"
       :class="[`hw-flex-${justify}`, {hide:hidePagination}, {circle}, type, {compact}]"
       @keydown="setKey">
    <div class=" pagination-nav" :disabled="disabledPrev"  :class="[itemClass, {'disabled': disabledPrev}]" @click="setPagePrev"><i class="fa fa-chevron-left"></i></div>
    <div class="pagination-page-wrapper">
      <template v-if="type === 'number'">
        <div class="pagination-num" @click="setPageFirst" :class="[itemClass, {'active':1 === currentPage}]">1</div>
        <template v-if="isPrevPoint">
          <div class="pagination-num block-preview" :class="[itemClass]" @click="setPrevBlock"><i class="fa fa-ellipsis"></i></div>
        </template>
        <template v-if="!isSingle">
          <div class="pagination-num" v-for="(p, index) in paginate" :key="index" :class="[itemClass, {'active':p === currentPage}]" @click="setPage(p)">
            {{ p }}
          </div>
        </template>
        <template v-if="isNextPoint">
          <div class="pagination-num block-next" :class="[itemClass]" @click="setNextBlock"><i class="fa fa-ellipsis"></i></div>
        </template>
        <div v-if="!isSingle" class="pagination-num" @click="setPageEnd" :class="[itemClass, {'active':lastPage === currentPage}]">{{lastPage}}</div>
      </template>
      <template v-else>
        <div class="pagination-info">
          {{currentPage}}/{{lastPage}}
        </div>
      </template>
    </div>
    <div class="pagination-nav" :disabled="disabledNext" :class="[itemClass,{'disabled': disabledNext}]"  @click="setPageNext"><i class="fa fa-chevron-right"></i></div>
  </div>
</template>

<script>
export default {
  name: 'hw-pagination',
  props: {
    type: {
      type: String,
      default: 'number' // 'number' || 'page'
    },
    length : {
      type: Number,
      default: 5
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
    },
    hideSinglePage: {
      type: Boolean,
      default: true
    },
    circle: {
      type: Boolean,
      default: false
    },
    compact: {
      type: Boolean,
      default: false
    },
    itemClass: {
      type: String,
      default: 'pagination-item'
    }
  },
  computed: {
    paginate() {
      if(this.isSingle) return
      let middle = Math.floor((this.length-2)/2);
      let start = 2;

      if(this.isPrevPoint) {
        start = this.currentPage - middle;
      }
      if(!this.isNextPoint && this.isPrevPoint) {
        start = this.lastPage - (this.length - 2)
      }
      let numList = new Array(Math.min(this.length, this.lastPage)-2).fill(0);
      numList.forEach((n,i) => {
        numList[i] = start + i
      })
      return numList
    },
    isSingle() {
      return this.lastPage === 1
    },
    hidePagination() {
      if(this.type === 'page') return
      return this.hideSinglePage && this.isSingle
    },
    isPrevPoint() {
      return this.currentPage >= this.length-2 && this.length < this.lastPage
    },
    isNextPoint() {
      return this.currentPage <= this.lastPage - (this.length - 2) && this.length < this.lastPage
    },
    disabledNext() {
      return (this.currentPage + 1) > this.lastPage
    },
    disabledPrev() {
      return (this.currentPage - 1) <= 0
    }
  },
  mounted() {
    this.$el.focus()
  },
  methods : {
    setPage(num) {
      if (num > this.lastPage || num < 0) return console.error('접근할 수 없는 페이지 번호입니다.');
      this.$emit('page-change', num)
    },
    setPageFirst() {
      this.setPage(1);
    },
    setPagePrev() {
      if(!this.disabledPrev) this.setPage(this.currentPage - 1);
    },
    setPageNext() {
      if(!this.disabledNext) this.setPage(this.currentPage + 1);
    },
    setPageEnd() {
      this.setPage(this.lastPage);
    },
    setPrevBlock() {
      let preNum = this.currentPage - this.length <= 0 ? 1 : this.currentPage - this.length
      this.setPage(preNum);
    },
    setNextBlock() {
      let nextNum = this.currentPage + this.length > this.lastPage ? this.lastPage : this.currentPage + this.length
      this.setPage(nextNum);
    },
    setKey(e) {
      console.log(e)
      let key = e.keyCode;
      switch(key) {
        case 37:
          this.setPagePrev();
          break;
        case 38:
          this.setPageFirst();
          break;
        case 39:
          this.setPageNext();
          break;
        case 40:
          this.setPageEnd();
          break;
        default:
          console.log('undefined action')
      }
    }
  }
}
</script>

<style lang="scss" scoped>/* Pagination */

.hw-pagination {
  display: flex;
  outline: 0;
  &.hide {
    display: none;
  }
  &.circle {
    .pagination-item {
      border-radius: 17px;
    }
  }
  .pagination {
    &-item {
      font-size: 14px;
      border:1px solid;
      background-color: #fff;
      border-color: #d5d5d5;
    }
    &-page-wrapper {
      display: flex;
    }
    &-nav, &-num {
      display: inline-block;
      font-size: 1rem;
      min-width: 2em;
      line-height: 1em;
      text-align: center;
      font-weight: 500;
      vertical-align: baseline;
      margin: 0 4px;
      padding: 0.5em;
      user-select: none;
      color:#909090;
      transition-duration: .1s;
      transition: all 250ms ease;
      &:hover {
        background-color: #ccc;
        border-color: #F8F8F8;
        color:#fff;
      }
      &.active {
        background-color: #737373;
        border-color: #737373;
        color:#fff;
        pointer-events: none
      }
      &.disabled {
        pointer-events: none;
        opacity: .5;
      }
    }
  }
  &.hw-flex {
    &-left {justify-content: flex-start;}
    &-center {justify-content: center;}
    &-right {justify-content: flex-end;}
  }
  &.page {
    .pagination {
      &-info {
        font-size: 14px;
        background-color: #fff;
        line-height: 1em;
        text-align: center;
        font-weight: 500;
        padding: 0.5em 1em;
        user-select: none;
        color: #909090;
      }

      &-nav {
        margin: 0;
        border-radius: 0;
        z-index: 10;
        &:first-child {
          margin-right: -1px;
        }

        &:last-child {
          margin-left: -1px;
        }
      }
    }
    //&.circle {
    //  .pagination-nav {
    //    &:first-child {
    //      border-bottom-left-radius: 17px;
    //      border-top-left-radius: 17px;
    //    }
    //
    //    &:last-child {
    //      border-bottom-right-radius: 17px;
    //      border-top-right-radius: 17px;
    //    }
    //  }
    //}
  }
  &.compact {
    .pagination {
      &-page-wrapper {
        //padding: 6px 8px;
        //border: 1px solid #d6d6d6;
      }
      &-num, &-nav {
        min-width: 1.75em;
        line-height: 0.75em;
        padding: 0.375em;
        margin: 0 3px;
      }
    }
  }
}

</style>