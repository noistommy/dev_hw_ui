<template>
  <div class="hw-chip" :class="[{deletable:isDelete},{disabled}, colorName]" @click="onClick">
    <template v-if="iconClass !== ''">
      <i class="chip-icon" :class="iconClass"></i>
    </template>
    {{chipsText}}
    <template v-if="isDelete">
      <i class="close-btn fa fa-xmark-large" @click="cancelChips"></i>
    </template>
  </div>
</template>

<script>
export default {
  name: 'hw-chips',
  data () {
    return {

    }
  },
  props: {
    idx: {
      type: [Number, String],
      default: 0,
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    iconClass: {
      type: String,
      default: ''
    },
    chipsText: {
      type: String,
      default: 'CHIPS'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    colorName: {
      type: String,
      default:'primary'
    }
  },
  created() {

  },
  methods: {
    onClick() {
      let chip ={
        id: this.idx,
        title: this.chipsText
      };
      this.$emit('onclick', chip)
    },
    cancelChips() {
      this.$emit('delete', this.idx)
    }
  }
}
</script>

<style lang="scss">
$chipsColor: #2985db;
$chipsHoverColor: #056ac9;
$chipsBgColor: #d1e3f7;
$chipsHoverBgColor: #d1e3f7;

$chipsColor2: #909090;
$chipsHoverColor2: #056ac9;
$chipsBgColor2: #ebebeb;
$chipsHoverBgColor2: #d1e3f7;


.hw-chip {
  cursor: pointer;
  display: inline-flex;
  font-size: 13px;
  padding: 3px 8px;
  border-radius: 2px;
  align-items: center;
  position: relative;
  line-height: 1.4;
  margin: 5px;
  &.primary {
    color: $chipsColor;
    background-color: $chipsBgColor;
    border: 1px solid $chipsColor;
    &:hover {
      color: $chipsHoverColor;
      background-color: $chipsHoverBgColor;
      border: 1px solid $chipsHoverColor;
      opacity: 1;
    }
  }
  & + .hw-chip {
    margin-left: 10px;
  }
  &.deletable {
    padding-right: 24px;
  }
  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
  span {
    display: inline-block;
    /*padding: 0 4px;*/
  }
  i.chip-icon {
    margin-right: 5px;
    font-size: 0.5em;
  }
  i.close-btn {
    position: absolute;
    width: 18px;
    height: 18px;
    top: 3px;
    right: 3px;
    border-radius: 50%;
    text-align: center;
    /*padding: 3px;*/
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    margin-top:1px;
    margin-left: 1px;
    &:hover {
      background-color: rgba(159, 166, 173, 0.2);
    }
  }
}
</style>