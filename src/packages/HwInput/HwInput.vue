<template>
<!--  <div class="hw-input" :class="[{editMode}, {icon: icon != undefined},{counter: counter > 0}, {button}, {circle}, iconPos, {inline}, {fluid}, color]">-->
<!--    <label class="label" v-if="labelText !== ''">{{labelText}}</label>-->
<!--    <template v-if="type === 'input'">-->
<!--      <div class="input-wrap">-->
<!--        <i :class="[iconType, `gi-${icon}`]" v-if="icon != undefined" @click="onButtonClick" @keypress.enter.prevent="onEnterUp"></i>-->
<!--        <input class="hw-input" :type="inputType" :readOnly="readOnly" name="hwInput"-->
<!--               :class="[color, {disabled}, {underline}, {transparent}, size,{editable:editState}]"-->
<!--               :placeHolder="placeHolder" :value="inputValue" @keydown.enter.prevent="onEnterUp" @input="onInput" @focus="onFocus">-->
<!--      </div>-->
<!--    </template>-->
<!--    <template v-else>-->
<!--            <textarea class="hw-textarea"-->
<!--                      :readOnly="readOnly" :placeHolder="placeHolder"-->
<!--                      :class="[color, {disabled}, size]" :value="inputValue" @keydown.enter.prevent="onEnterUp" @input="onInput"></textarea>-->
<!--    </template>-->
<!--    <div class="count" v-if="counter > 0">-->
<!--      <span v-if="counter - count >= 0">{{counter - count}}</span>-->
<!--      <span class="error danger-color" v-else>{{(counter - count) * -1}}자 초과 </span>-->
<!--    </div>-->
<!--    <template v-if="isError">-->
<!--      <slot name="error_message"></slot>-->
<!--    </template>-->
<!--  </div>-->
  <div class="hw-input" :class="[{inline}, {button}, {fluid}, iconPos]">
    <template v-if="type === 'input'">
      <input type="text" :placeholder="placeHolder" :disabled="disabled" :readonly="readOnly" :class="[{disabled}, {underline}, {transparent}]">
      <i v-if="icon !== undefined && !button" :class="`icon fa fa-${icon}`"></i>
      <div v-if="button" class="hw-button icon">
        <i :class="`fa fa-${icon}`"></i>
      </div>
    </template>
    <template v-else>
      <textarea :placeholder="placeHolder" :disabled="disabled" :readonly="readOnly" :class="[{disabled}, {underline}, {transparent}]" cols="30" rows="10"></textarea>
    </template>
  </div>
</template>

<script>
export default {
  name: 'hw-g-input',
  data() {
    return {
      inputValue: '',
      count: 0,
    }
  },
  props: {
    type: {
      type: String,
      default: 'input'
    },
    inline: {
      type: Boolean,
      default: false
    },
    labelText: {
      type: String,
      default: ''
    },
    inputType: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    underline: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    iconType: {
      type: String,
      default: 'gi'
    },
    icon: String,
    circle: {
      type: Boolean,
      default: false
    },
    button: {
      type: Boolean,
      default: false
    },
    iconPos: String, // left, right
    size: String,
    fluid: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    color: String,
    transparent: {
      type: Boolean,
      default: false
    },
    placeHolder: {
      type: String,
      default: 'Insert Data'
    },
    editMode:{
      type: Boolean,
      default: false
    },
    editState: Boolean,
    value: [String, Number],
    textValue: { type:String, default: ''},
    counter: { type:Number, default: 0 },
    isError: Boolean
  },
  watch: {
    textValue() {
      this.inputValue = this.textValue;
    }
  },
  created() {
    this.inputValue = this.textValue;
    if(this.inputValue !== '') {
      // console.log(this.inputValue)
      this.count = this.countString(this.inputValue)
    }

  },
  methods: {
    onInput (e) {
      if(this.inputValue === e.target.value) return;
      if(this.counter > 0) {
        this.count = this.countString(e.target.value)
      }
      this.$emit('onInput', this.inputValue)
    },
    onButtonClick() {
      if(!this.button) return;
      this.$emit('submit', this.inputValue)
    },
    onEnterUp(e) {
      if(this.inputValue === '' || e.isComposing) return;
      //this.inputValue = e.target.value;
      this.$emit('enterup', this.inputValue);
      // this.inputValue = ''
    },
    onFocus() {
      this.$emit('onFocus', this.inputValue);
    },
    countString(str) {
      let len = 0;
      for (let i = 0; i < str.length; i++) {
        len++;
      }
      return len;
    }
  }
}
</script>

<style lang="scss">
.hw-input{
  &.editMode {
    .hw-input {
      pointer-events: none;
      border-color: transparent;
      &.editable {
        pointer-events: auto;
        border-color: #2985DB;
      }
    }
  }
  &.counter .count{
    display: inline-block;
    position: absolute;
    bottom: 0;
    right: 0;

    padding: 0 6px;

    span {
      font-size: 1.3em;
      color: #2985DB;
    }
    .error {
      font-size: 1rem;
    }
  }
  .hw-textarea {
    min-height: 10em;
  }
  label.label {
    padding: 8px;
  }
  &.button.right .input-wrap{
    flex-direction: row-reverse;
  }
}
.hw-input .input-wrap{
  display: flex;
  &.row {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  &.column {
    flex-direction: column;
  }
}
</style>