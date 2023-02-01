<template lang="pug">
div.input-view
  ScrollSpy(section-key=".type-wrapper", title-key=".type-title", title="Types", @select="setGoto")
  .contents-detail-view
    .contents-section
      .section-title Types
      .type-wrapper(v-for="(item, index) in inputData", :key="`input_${index}`")
        .type-title {{item.name}}
        .type-desc {{item.desc}}
        .type-preview
          template(v-if="item.name === 'Inline'")
            .hw-input.inline
              input(type="text", placeholder="PlaceHolder", :class="item.ex")
          template(v-else)
            .hw-input
              //label.label LABEL
              input(type="text", placeholder="PlaceHolder", :class="item.ex")
        .type-btn(@click="toggleCode")
          i.fas.fa-code
        .type-code.panel
          .panel-header code
          .panel-body
            pre.language-css
              code.code(v-text='item.code')

      .type-wrapper(v-for="(item, index) in inputExtendData", :key="`input_ex_${index}`")
        .type-title {{item.name}}
        .type-desc {{item.desc}}
        .type-preview
          template(v-if="item.type==='icon'")
            .hw-input.icon.left
              input(placeholder="PlaceHolder", :class="item.ex")
              i.icon.fa.fa-search
            .hw-input.icon.right
              input(placeholder="PlaceHolder", :class="item.ex")
              i.icon.fa.fa-search
            .hw-input.icon.right.link
              input(placeholder="PlaceHolder", :class="item.ex")
              i.icon.fa.fa-search
          template(v-if="item.type==='label'")
            .hw-input.labeled.left
              .hw-label Search
              input(placeholder="PlaceHolder", :class="item.ex")
            .hw-input.labeled.right
              input(placeholder="PlaceHolder", :class="item.ex")
              .hw-label Search
          template(v-if="item.type==='button'")
            .hw-input
              .hw-button.icon
                i.fa.fa-search(@click="clickTest(item.ex)")
              input(placeholder="PlaceHolder", :class="item.ex")
            .hw-input
              input(placeholder="PlaceHolder", :class="item.ex")
              .hw-button.icon.outline
                i.fa.fa-search(@click="clickTest(item.ex)")
            .hw-input
              input(placeholder="PlaceHolder", :class="item.ex")
              .hw-button.primary 저장
          template(v-if="item.type==='fluid'")
            .hw-input.fluid
              input(placeholder="PlaceHolder", :class="item.ex")
            .hw-input.fluid
              input(placeholder="PlaceHolder", :class="item.ex")
              .hw-button.icon
                i.fa.fa-search(@click="clickTest(item.ex)")
          template(v-if="item.type==='readOnly'")
            .hw-input
              input(placeholder="PlaceHolder", :class="item.ex" :readonly="true" value="ReadOnly")
          template(v-if="item.type==='textarea'")
            .hw-input
              textarea(placeholder="PlaceHolder", :class="item.ex")
          template(v-if="item.type==='size'")
            .hw-input.inline(v-for="size in sizeList", :key="size" :class="size")
              input(:placeholder="size")
          template(v-if="item.type==='transparent'")
            .hw-input.inline
              input(:placeholder="item.type", :class="item.ex")
            .hw-input.inline
              input(type="file", multiple, webkitdirectory, directory, @input="checkEvent")
        .type-btn(@click="toggleCode")
          i.fas.fa-code
        .type-code.panel
          .panel-header code
          .panel-body
            pre.language-css
              code.code(v-text='item.code')

</template>

<script>
export default {
  name: 'hw-colors',
  data () {
    return {
      inputData: [
        {name: 'Standard', type: 'standard', ex:'', desc: 'A Standard Input Box. 기본 텍스트 입력 창', code:'// nested by .hw-input \n <input class="hw-input" />',},
        {name: 'Inline', type: 'Inline Input Box', ex:'inline', desc: 'A Standard Input Box. 기본 텍스트 입력 창', code:'// nested by .hw-input \n <input class="hw-input" />',},
        {name: 'Disable', type: 'disabled', ex:'disabled', desc: 'Disabled Element Style. 포커스 비활성 스타일 ',code:'// nested by .hw-input \n <input class="hw-input disabled" disabled/>'},
        {name: 'UnderLine', type: 'underline', ex:'underline', desc: '',code: '// nested by .hw-input \n <input class="hw-input underline" />'},
      ],
      inputExtendData: [
        {name: 'Input with Icon', type: 'icon', ex:'', desc: '',code: '<div class="hw-input  icon {left || right}"> \n    <input class="hw-input" /> \n    <i class="icon-class"></i>\n</div>'},
        {name: 'Input with Label', type: 'label', ex:'icon label', desc: '',code: '<div class="hw-input icon button {left || right}"> \n    <i class="icon-class"></i> \n    <input class="hw-input" />\n</div>'},
        {name: 'Input with Button', type: 'button', ex:'', desc: '',code: '<div class="hw-input icon button {left || right}"> \n    <i class="icon-class"></i> \n    <input class="hw-input" />\n</div>'},
        {name: 'ReadOnly', type: 'readOnly', ex:'readonly', desc: '',code: '<div class="hw-input"> \n    <input class="hw-input readonly" readonly/>\n</div>'},
        {name: 'Fluid', type: 'fluid', ex:'', desc: 'Full Size Input Box',code: '<div class="hw-input fluid"> \n    <input class="hw-input" />\n</div>'},
        {name: 'Size', type: 'size', ex:'size', desc: 'Input Box Size',code: '// nested by .hw-input \n <input class="hw-input {tiny || small || normal || large || huge}" />'},
        {name: 'Textarea', type: 'textarea', ex:'', desc: 'A Standard Textarea. 기본 텍스트 입력 영역 ',code: '<div class="hw-input"> \n    <textarea class="hw-textarea"></textarea>\n</div>'},
        {name: 'Transparent', type: 'transparent', ex:'transparent', desc: ' ',code: '<div class="hw-input transparent"> \n    <input class="hw-input">\n</div>'}
      ],
      sizeList: ['tiny', 'small', 'normal', 'large', 'huge'],
      inputGroupName : [
        {label: '성', value: ''},
        {label: '이름', value: ''}
      ],
      inputGroupPhone : [],
    }

  },
  methods: {
    toggleCode (evt) {
      let classArr = evt.target.nextSibling.classList.value;
      if(classArr.indexOf('show') > -1) {
        evt.target.nextSibling.classList.remove('show')
      } else {
        evt.target.nextSibling.classList.add('show')
      }
      //console.log(evt.target.nextSibling.classList)
    },
    clickTest(value) {
      alert(value);
    },
    checkEvent(e) {
      console.log(e)
    },
    setGoto(payload) {
      const parent = this.$el
      this.currentType = payload.i;
      parent.scrollTop = payload.target.offset
    }
  }
}
</script>

<style lang="scss">
.color-title {
  padding: 10px 0 30px 0;
}
.color-list {
  /*display: flex;*/
  width: 100%;
  margin-bottom: 80px;
  .color-item{
    margin-right: 30px;
    &:last-child {
      margin: 0;
    }
    .color-box {
      display: inline-block;
      width: 120px;
      height: 120px;
      .box-info {
        height: 100%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &.Primary, &.Error, &.Attention {color: #FFFFFF;}
        &.Background1 {border:1px solid #DCDCDC;}
      }
    }
  }
  &.typo {
    .type-preview {
      color: #ffffff;
    }
    .box-info{
      &.On.Primary {color: #333333; border:1px solid #DCDCDC;}
    }

  }

}
.palette-wrap {
  display: flex;
  flex-wrap: wrap;
  .color-palette {
    text-align: center;
    padding: .8em 1.2em;
    min-width: 110px;
    margin: 10px;
    color: #ffffff;
    font-weight: 600;
    &.light {
      color: #909090;
    }
  }
}
</style>