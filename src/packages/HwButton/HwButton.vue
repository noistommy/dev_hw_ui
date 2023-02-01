<template>
  <div class="hw-button" :class="[brand, {disabled}, {dropdown},{expanded}, {icon}, {round}, {circle}, {compact}, {outline},{text}, {selected}, {withIcon}, iconPos, size, {fluid}, color, {hover}, {badge:withBadge.count}]"
       @click="onClick" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @mouseover="onMouseOver">
    <i v-if="icon || withIcon" :class="[iconType, `fa-${icon || withIcon}`, iconPos]" class="icon"></i>
    {{buttonText}}
    <template v-if="withBadge.count">
      <hw-badge :data="withBadge.count" :offset-x="0" :offset-y="0" :color="color || brand" :invert="true"></hw-badge>
      <!--            <span class="badgeTarget">-->
      <!--                <hw-badge :data="withBadge.count" :offset-x="0" :offset-y="0" :color="color || brand"></hw-badge>-->
      <!--            </span>-->
    </template>
    <template v-if="dropdown">
      <!--            <i class="dropdown-icon fa fa-chevron-down"></i>-->
      <transition name="slide-fade">
        <div class="btn-menu-list" v-if="expanded">
          <div class="btn-menu-item ellipsis" v-for="item in dropData" :key="item.id" @click.stop="selectItem(item)">{{item.option}}</div>
        </div>
      </transition>
    </template>
  </div>
</template>

<script>
export default {
  name: 'hw-button',
  data() {
    return {
      expanded: false
    }
  },
  props: {
    brand: String,
    disabled: {
      type: Boolean,
      default: false
    },
    iconType: {
      type: String,
      default: 'fa'
    },
    icon: String,
    circle: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    compact: {
      type :Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    withIcon: String,
    withBadge: {
      type: Object,
      default() {
        return {
          count: null
        }
      }
    },
    iconPos: String,
    size: String,
    fluid: {
      type: Boolean,
      default: false
    },
    buttonText: String,
    hover: {
      type: Boolean,
      default: false
    },
    color: String,
    dropdown: {
      type: Boolean,
      default: false
    },
    dropData: {
      type: Array
    },
    event: Array

  },
  mounted() {
    document.body.addEventListener('click', this.closeMenu)
  },
  destroyed() {
    document.body.removeEventListener('click', this.closeMenu)
  },
  methods: {
    onClick (e) {
      if(this.dropdown) {
        this.openMenu()
      }
      this.$emit('onclick', e)

    },
    openMenu(value=true) {
      if(this.expanded) value = false;
      this.expanded = value
    },
    closeMenu() {
      if(this.$el.contains(event.target)) return;
      this.expanded = false;
    },
    onMouseEnter (e) {
      this.$emit('onenter', e)
    },
    onMouseLeave (e) {
      this.$emit('onleave', e)
    },
    onMouseOver (e) {
      this.$emit('onover', e)
    },
    selectItem(value) {
      this.$emit('select', value);
      this.expanded = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.hw-button {
  &.round.dropdown .btn-menu-list{
    border-radius: 4px;
  }
  &.dropdown {
    position: relative;
    padding-right: 25px;
    .btn-menu-list {
      background-color: #fff;
      position: absolute;
      width: auto;
      top: 100%;
      left: 0;
      margin-top: 5px;
      border: 1px solid #d6d6d6;
      z-index: 100;
      font-size: 0.95em;
      padding: 10px;
      box-shadow: 2px 5px 4px rgba(0, 0, 0, 0.16);
      .btn-menu-item {
        display: block;
        padding: 10px;
        text-align: left;
        &:hover {
          background-color: #f2f2f2;
        }

      }
    }
    &:after {
      display: none;
      
      position: absolute;
      font-size: 0.5em;
      top: 50%;
      right: 5px;
      color: #909090;
      padding: 3px;
      line-height: 1;
      transform: translate(0, -50%) rotate(0deg);
      transition: transform 250ms ease;
    }
    &:hover {
      &:after {
        display: inline-block;
      }
    }
    &.expanded {
      &:after {
        transform: translate(0, -50%) rotate(180deg);
      }
    }
  }
}
</style>