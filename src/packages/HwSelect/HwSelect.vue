<template>
  <div class="hw-select-box" :class="[{open:isOpen}, type, {fluid}, {spinner}, spinnerPos]" :style="{minWidth: minWidth}">
<!--    <span class="select-icon"><i class="select-icon" :class="`gi gi-short-arrow-${isOpen ? 'up' : 'down'}-alt`"></i></span>-->
    <div class="selected-item" ref="result" @click="toggleOpen">
      <i class="item-icon" v-if="itemIcon" :class="selectedOption.icon"></i>
      {{selectedOption.option || defaultText}}
<!--      <i class="select-icon" :class="`gi gi-short-arrow-${isOpen ? 'up' : 'down'}-alt`"></i>-->
      <i class="select-icon" :class="`fas fa-chevron-${isOpen ? 'up' : 'down'}`"></i>
    </div>
    <template v-if="spinner">
      <div class="spinner-control left" @click.stop="selectPrev">
        <i class="fas fa-minus"></i>
      </div>
      <div class="spinner-control right" @click.stop="selectNext">
        <i class="fas fa-plus"></i>
      </div>
    </template>
    <transition name="slide-fade">
      <!--            <div class="select-menu" v-if="isOpen" :style="{top: setSelectPos+'px'}">-->
      <!--                <div class="option-item" :class="{selected: currentIndex === index}" v-for="(option, index) in optionList" :key="option[keyName]" @click="onClick(option, index)">{{ option[optionName] }}</div>-->
      <!--            </div>-->
      <div class="hw-list selection select-menu" v-if="isOpen" :style="setSelectPos">
        <!--                <div v-if="noSelect" class="hw-item no-select" @click="onClick(null)">선택 안함</div>-->
        <div class="hw-item option-item" :class="[{selected: currentIndex === index}, {icon: itemIcon}]"
             v-for="(option, index) in optionList" :key="index"
             @click="onClick(option, index)">
          <div class="item-icon" v-if="itemIcon && option.icon">
            <i :class="option.icon"></i>
          </div>
          {{ option[optionName] }}
          <span class="check-icon" v-if="isSelectedIcon && currentIndex === index">
                        <i class="gis gi-check"></i>
                    </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'hw-select',
  data() {
    return {
      isOpen: false,
      current: {},
      currentIndex: 0,
      direction: 'down'
    }
  },
  props: {
    defaultText: {
      type: String,
      default: 'Select Item'
    },
    optionList: Array,
    currentValue: [Number, String],
    keyName: String,
    optionName: {
      type: String,
      default: 'option'
    },
    valueName: {
      type: String,
      default: 'value'
    },
    extraOption: [String,Object],
    type: {
      type: String,
      default: 'dropdown'
    },
    itemIcon: {
      type: Boolean,
      default: false
    },
    minWidth: {
      type: String,
      default: '14em'
    },
    itemHeight: {
      type: Number,
      default: 37
    },
    isSelectedIcon: {
      type: Boolean,
      default: false
    },
    noSelect: Boolean,
    fluid: {
      type: Boolean,
      default: false
    },
    spinner: {
      type: Boolean,
      default: false
    },
    spinnerPos: {
      type: String,
      default: '' // '' || right
    },
    value: [String, Object]
  },
  computed: {
    selectedOption() {
      let option = '';
      let icon = '';
      this.optionList.forEach((op, i) => {
        if(op[this.valueName] === this.current[this.valueName]) {
          option = op[this.optionName]
          icon = op.icon
          this.currentIndex = i;
        }
      });
      return {option, icon};
    },
    setSelectPos() {
      let pos = this.type === 'dropdown' ? this.itemHeight : this.currentIndex * this.itemHeight * -1;
      if(this.type === 'dropdown') {
        pos = this.direction === 'down' ? {top: '100%'} : {bottom: '100%'}
      } else {
        pos = {top : this.currentIndex * this.itemHeight * -1 + 'px'}
      }
      return pos
    }
  },
  created() {
    this.current = this.currentValue;
    this.current = this.value

  },
  mounted() {
    document.addEventListener('click', () => this.showMenu(false))
  },
  destroyed() {
    document.removeEventListener('click', () => this.showMenu(false))
  },
  methods: {
    onClick(target, i) {
      this.current = target;
      this.currentIndex = i;
      this.$emit('update', target, this.extraOption)
      this.isOpen = false;
    },
    toggleOpen(e) {
      this.setDropdownDirection(e)
      this.isOpen = !this.isOpen;
    },
    showMenu(value = true) {
      if(this.$el.contains(event.target)) return;
      if(this.isOpen) value = false;
      this.isOpen = value;
    },
    setDropdownDirection(e) {
      let posInfo = e.target.getBoundingClientRect();

      if(window.innerHeight - posInfo.bottom < 37*(this.optionList.length + 1)) {
        this.direction = 'up'
      } else {
        this.direction = 'down'
      }
    },
    selectPrev() {
      const prev = this.currentIndex === 0 ? this.optionList.length - 1 : this.currentIndex - 1;
      const prevValue = this.optionList[prev]
      this.onClick(prevValue, prev)
    },
    selectNext() {
      const next = this.currentIndex === this.optionList.length - 1 ? 0 : this.currentIndex + 1;
      const nextValue = this.optionList[next]
      this.onClick(nextValue, next)
    }
  }
}
</script>

<style lang="scss">
$itemHeight: 37px;
$horizontalInputPadding: 1em;
$verticalInputPadding: (11 / 14)+em;

.hw-select-box {
  position: relative;
  min-width: 14em;
  background: #fff;
  color: #333;
  border: 1px solid #d6d6d6;
  line-height: 1em;
  //box-sizing: content-box;
  border-radius: 2px;
  display: flex;
  .selected-item {
    position: relative;
    display: flex;

    padding: $verticalInputPadding $horizontalInputPadding;
    vertical-align: baseline;
    flex-grow: 1;
    .item-icon {
      margin-right: 10px;
    }
    .select-icon {
      position: absolute;
      top: 0;
      right: 0;
      padding: $verticalInputPadding;
      color: #D4D4D4;
    }
  }
  .select-menu {
    position: absolute;
    background-color: #fff;
    z-index: 999;
    border: 1px solid #d6d6d6;
    .option-item.selected {
      //background-color: #eff4fc;
    }
    .option-item.icon {
      display: flex;
      align-items: center;
      i {
        font-size: .95em;
        margin-right: 10px;
      }
    }
  }
  &.spinner {
    min-width: 12em;
    .spinner-control {
      padding: $verticalInputPadding;
      &.left {
        order: -1;
        border-right: 1px solid #d6d6d6;
      }
      &.right {
        border-left: 1px solid #d6d6d6;
      }
    }
    &.right {
      .spinner-control.left {
        order: 0;
        border: 0;
        border-left: 1px solid #d6d6d6;
      }
    }
  }
  &.dropdown {
    .select-menu {
      left: 0;
      width: 100%;
      padding: 12px 0;
      margin: 0 -1px;
      box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.16);
      margin: 8px 0;
      .option-item {
        max-height: $itemHeight;
        cursor: pointer;
      }
    }
    &.open {
      box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.16);
    }
  }
  &.float {
    .select-menu {
      top: 0;
      left: 0;
      width: 100%;
      .option-item {
        cursor: pointer;
      }
    }
    &.open .select-menu{
      box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.16);
    }
  }
  &.fluid {
    width: 100%;
  }
  select {
    width: 100%;
    background: #fff;
    color: #333;
    border: 1px solid #d6d6d6;
    box-sizing: border-box;
    margin-bottom: 5px;
    border-radius: 2px;
    padding: 4px 22px 4px 12px;
    appearance: none;
    outline: 0;
    option {
      position: absolute;
      appearance: none;
    }
  }

}
</style>