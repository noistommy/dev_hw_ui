<template lang="pug">
div.buttons-view
  .contents-detail-view
    .contents-section
      .section-title Types
      .type-wrapper
        .type-title Standard
        .type-desc A Standard Button Types
        .type-preview
          div.hw-button 기본 버튼
          //div.hw-button.round.hover 기본 둥근 버튼
        .type-btn(@click.self="toggleCode")
          i.fas.fa-code
        .type-code.panel
          .panel-header code
          .panel-body
            pre.language-css
              code.code(v-text='codes["standard"]')
      .type-wrapper
        .type-title equal
        .type-desc Buttons with Brand Type
        .type-preview
          .btn-group
            div.hw-button.primary.equal
              i.icon.fas.fa-g
              | 저장
            div.hw-button.secondary.equal 취소
            div.hw-button.primary.equal.outline
              i.icon.fa.fa-chart-bar
              | 보기
            div.hw-button.secondary.equal 가비아 솔루션 UI 시스템
          .btn-group
            div.hw-button.primary.equal.large
              i.icon.fas.fa-hamburger
              | 저장
            div.hw-button.secondary.equal.large 취소
            div.hw-button.primary.equal.outline.large
              i.icon.fa.fa-chart-bar
              | 보기
            div.hw-button.secondary.equal.large 가비아 솔루션 UI 시스템
      .type-wrapper
        .type-title 각진 모서리 버튼
        .type-desc Buttons with Brand Type
        .type-preview
          .btn-group
            div.hw-button.angled(v-for="btn in brands", :key="btn.name", :class="btn.name", @click="userSelect")
              | {{btn.text}}
          .btn-group
        .type-btn(@click="toggleCode")
          i.fas.fa-code
        .type-code.panel
          .panel-header code
          .panel-body
            pre.language-css
              code.code(v-text='codes["brands"]')
      .type-wrapper
        .type-title Brand
        .type-desc Buttons with Brand Type
        .type-preview
          .btn-group
            div.hw-button(v-for="btn in brands", :key="btn.name", :class="btn.name")
              | {{btn.text}}
          .btn-group
        .type-btn(@click="toggleCode")
          i.fas.fa-code
        .type-code.panel
          .panel-header code
          .panel-body
            pre.language-css
              code.code(v-text='codes["brands"]')
      .type-wrapper
        .type-title Disabled
        .type-desc Prevent User Events
        .type-preview
          div.hw-button(v-for="btn in brands", :key="btn.name", :class="btn.name", :disabled="disabled")
            | {{btn.text}}
        .type-btn(@click="toggleCode")
          i.fas.fa-code
        .type-code.panel
          .panel-header code
          .panel-body
            pre.language-css
              code.code(v-text='codes["disabled"]')
      .type-wrapper
        .type-title Compact
        .type-desc Buttons with Brand Type
        .type-preview
          .btn-group
            div.hw-button.compact(v-for="btn in brands", :key="btn.name", :class="btn.name")
              | {{btn.text}}
            div.hw-button.compact.secondary
              i.icon.fa.fa-chevron-left
              | LEFT
          .btn-group
        .type-btn(@click="toggleCode")
          i.fas.fa-code
        .type-code.panel
          .panel-header code
          .panel-body
            pre.language-css
              code.code(v-text='codes["brands"]')
      .type-wrapper
        .type-title OutLined
        .type-desc  Button with outline
        .type-preview
          .line-type
            .t-title brand outline
            div.hw-button.outline(v-for="btn in brands", :key="btn.name", :class="btn.name")
              | {{btn.text}}
          .line-type
            .t-title colors outline
            div.hw-button.background.border.outline(v-for="color in colorPalette", :key="color", :class="color")
              | {{color}}
        .type-btn(@click="toggleCode")
          i.fas.fa-code
        .type-code.panel
          .panel-header code
          .panel-body
            pre.language-css
              code.code(v-text='codes["selected"]')
      .type-wrapper
        .type-title Icon
        .type-desc Icon Button
        .type-preview
          .solid-type
            .div.hw-button.icon(v-for="icon in icons", :key="icon.type")
              i.fas(:class="`fa-${icon.icon}`")
          .line-type
            .div.hw-button.icon(v-for="icon in icons", :key="icon.type")
              i.fal(:class="`fa-${icon.icon}`")
        .type-btn(@click="toggleCode")
          i.fas.fa-code
        .type-code.panel
          .panel-header code
          .panel-body
            pre.language-css
              code.code(v-text='codes["icon"]')
      .type-wrapper
        .type-title FontAwesome Icon
        .type-desc Fontawesome Icon Button
        .type-preview
          .solid-type
            .div.hw-button.icon FAS
            .div.hw-button.icon(v-for="icon in icons", :key="icon.type")
              i.fa(:class="`fa-${icon.icon}`")
            .div.hw-button.icon Solid
          .solid-type
            .div.hw-button.icon FAR
            .div.hw-button.icon(v-for="icon in icons", :key="icon.type")
              i.far(:class="`fa-${icon.icon}`")
            .div.hw-button.icon Regular
          .solid-type
            .div.hw-button.icon FAL
            .div.hw-button.icon(v-for="icon in icons", :key="icon.type")
              i.fal(:class="`fa-${icon.icon}`")
            .div.hw-button.icon Light
          .solid-type
            .div.hw-button.icon FAT
            .div.hw-button.icon(v-for="icon in icons", :key="icon.type")
              i.fat(:class="`fa-${icon.icon}`")
            .div.hw-button.icon Thin
          .solid-type
            .div.hw-button.icon FAD
            .div.hw-button.icon(v-for="icon in icons", :key="icon.type")
              i.fad(:class="`fa-${icon.icon}`")
            .div.hw-button.icon Duotone
      .type-wrapper
        .type-title Icon Circle
        .type-desc Icon Button on Circle
        .type-preview
          .solid-type
            div.hw-button.icon.circle(v-for="icon in icons", :key="icon.type")
              i.fas(:class="`fa-${icon.icon}`")
          .line-type
            div.hw-button.icon.circle(v-for="icon in icons", :key="icon.type")
              i.fal(:class="`fa-${icon.icon}`")
        .type-btn(@click="toggleCode")
          i.fas.fa-code
        .type-code.panel
          .panel-header code
          .panel-body
            pre.language-css
              code.code(v-text='codes["circle"]')
      .type-wrapper
        .type-title Icon Selected
        .type-desc Selected Icon Button
        .type-preview
          .solid-type
            div.hw-button.icon.selected(v-for="icon in icons", :key="icon.type")
              i.fas(:class="`fa-${icon.icon}`")
          .line-type
            div.hw-button.icon.selected(v-for="icon in icons", :key="icon.type")
              i.fal(:class="`fa-${icon.icon}`")
        .type-btn(@click="toggleCode")
          i.fas.fa-code
        .type-code.panel
          .panel-header code
          .panel-body
            pre.language-css
              code.code(v-text='codes["selected"]')
      .type-wrapper
        .type-title Icon hovered
        .type-desc hovered Icon Button
        .type-preview
          .solid-type
            .t-title hovered
            div.hw-button.icon.hover(v-for="icon in icons", :key="icon.type")
              i.fas(:class="`fa-${icon.icon}`")
          .line-type
            div.hw-button.icon.hover(v-for="icon in icons", :key="icon.type")
              i.fal(:class="`fa-${icon.icon}`")
          .line-type
            .t-title hovered + circle
            div.hw-button.icon.hover.circle(v-for="icon in icons", :key="icon.type")
              i.fal(:class="`fa-${icon.icon}`")

        .type-btn(@click="toggleCode")
          i.fas.fa-code
        .type-code.panel
          .panel-header code
          .panel-body
            pre.language-css
              code.code(v-text='codes["selected"]')
      .type-wrapper
        .type-title OutLined Icon
        .type-desc  Button Icon with outline
        .type-preview
          .line-type
            .t-title outline
            div.hw-button.icon.hover.outline(v-for="icon in icons", :key="icon.type")
              i.fal(:class="`fa-${icon.icon}`")
          .line-type
            .t-title outline + circle
            div.hw-button.icon.hover.outline.circle(v-for="icon in icons", :key="icon.type")
              i.fal(:class="`fa-${icon.icon}`")
        .type-btn(@click="toggleCode")
          i.fas.fa-code
        .type-code.panel
          .panel-header code
          .panel-body
            pre.language-css
              code.code(v-text='codes["selected"]')
      .type-wrapper
        .type-title Base Size
        .type-desc Icon Button
        .type-preview
          .insert-value
            span 만약 기본 폰트 크기가
            .hw-input.inline
              input.hw-input.underline(:placeholder="`0`", :class="`standard`", v-model="fontSize", :style="{width: '40px', textAlign: 'center', fontWeight: 600}")
            span px이 라면...
          .solid-type
            .div.hw-button.icon(v-for="icon in icons", :key="icon.type", :style="{fontSize: `${fontSize}px`}")
              i.fas(:class="`fa-${icon.icon}`")
          .solid-type
            div.hw-button(v-for="btn in brands", :key="btn.name", :class="btn.name", :style="{fontSize: `${fontSize}px`}")
              | {{btn.text}}
        .type-btn(@click="toggleCode")
          i.fas.fa-code
        .type-code.panel
          .panel-header code
          .panel-body
            pre.language-css
              code.code(v-text='codes["icon"]')
      .type-wrapper
        .type-title Button with Icon
        .type-desc Button with Icon
        .type-preview
          div.hw-button.secondary
            i.icon.fa.fa-chevron-left
            | LEFT
          div.hw-button.secondary
            | RIGHT
            i.icon.right.fa.fa-chevron-right
        .type-btn(@click="toggleCode")
          i.fas.fa-code
        .type-code.panel
          .panel-header code
          .panel-body
            pre.language-css
              code.code(v-text='codes["iconWith"]')
      .type-wrapper
        .type-title Button with Badge
        .type-desc Button with Badge
        .type-preview
          div.hw-button.primary.badge.left
            | With Badge 1
            span.hw-badge.primary.invert 11
          div.hw-button.secondary.badge.left
            | With Badge 1
            span.hw-badge.secondary.invert 12
          div.hw-button.info.badge.right
            | With Badge 2
            span.hw-badge.info.invert 13
        .type-btn(@click="toggleCode")
          i.fas.fa-code
        .type-code.panel
          .panel-header code
          .panel-body
            pre.language-css
              code.code(v-text='codes["iconWith"]')
      .type-wrapper
        .type-title Size
        .type-desc Button Size
        .type-preview
          div.hw-button.secondary(v-for="size in sizeList", :key="size", :class="size")
            | {{size}}
        .type-btn(@click="toggleCode")
          i.fas.fa-code
        .type-code.panel
          .panel-header code
          .panel-body
            pre.language-css
              code.code(v-text='codes["size"]')
      .type-wrapper
        .type-title Fluid
        .type-desc Full Size Button
        .type-preview
          div.hw-button.primary.fluid
            | Full Size Button
        .type-btn(@click="toggleCode")
          i.fas.fa-code
        .type-code.panel
          .panel-header code
          .panel-body
            pre.language-css
              code.code(v-text='codes["fluid"]')
      //- .type-wrapper
      //-   .type-title Type Icons
      //-   .type-desc Hiworks Type Icons
      //-   .type-preview
      //-     .type-preview-contents
      //-       .type-icon-wrap(v-for="icon in typeIcons", :key="icon.type")
      //-         div.icon
      //-           div.hw-button.icon.type-icon.colors
      //-             i.fas(:class="`fa-${icon}`")
      //-         div.name {{icon}}
      //-   .type-btn(@click="toggleCode")
      //-     i.fas.fa-code
      //-   .type-code.panel
      //-     .panel-header code
      //-     .panel-body
      //-       pre.language-css
      //-         code.code(v-text='codes["typeIcons"]')
      .type-wrapper
        .type-title Button Group
        .type-desc Colorful Button
        .type-preview
          h3.type-preview-title.h3 Buttons Primary
          .type-preview-contents
            .hw-button-group
              div.hw-button(v-for="(item, index) in buttonGroup", :key="item.name", :class="{active: item.active}", @click="setActive(index)")
                | {{item.name}}
          h3.type-preview-title.h3 Buttons Outline
          .type-preview-contents
            .hw-button-group.outline
              div.hw-button(v-for="(item, index) in buttonGroup", :key="item.name", :class="{active: item.active}", @click="setActive(index)")
                | {{item.name}}
          h3.type-preview-title.h3 Buttons example
          .type-preview-contents
            .hw-button-group
              div.hw-button.icon
                i.fa.fa-play
              div.hw-button.icon
                i.fa.fa-pause
              div.hw-button.icon
                i.fa.fa-stop
              div.hw-button.icon
                i.fa.fa-arrow-rotate-right
              div.hw-button.icon
                i.fa.fa-power-off
        .type-btn(@click="toggleCode")
          i.fas.fa-code
        .type-code.panel
          .panel-header code
          .panel-body
            pre.language-css
              code.code(v-text='codes["typeIcons"]')
      .type-wrapper
        .type-title Colors
        .type-desc Colorful Button
        .type-preview
          .type-preview-contents
            div.hw-button.background.border(v-for="color in colorPalette", :key="color", :class="color")
              | {{color}}
        .type-btn(@click="toggleCode")
          i.fas.fa-code
        .type-code.panel
          .panel-header code
          .panel-body
            pre.language-css
              code.code(v-text='codes["typeIcons"]')
      .type-wrapper
        .type-title Text
        .type-desc Colorful Button
        .type-preview
          .type-preview
            .line-type
              .t-title text + brand
              div.hw-button.text(v-for="color in brands", :key="color.name", :class="color.name")
                | {{color.text}}
            .line-type
              .t-title text + colors
              div.hw-button.text(v-for="color in colorPalette", :key="color", :class="color")
                | {{color}}
        .type-btn(@click="toggleCode")
          i.fas.fa-code
        .type-code.panel
          .panel-header code
          .panel-body
            pre.language-css
              code.code(v-text='codes["typeIcons"]')
</template>

<script>
export default {
  name: 'buttons',
  data () {
    return {
      codes: {
        standard: '<div class="hw-button">TEXT</div>',
        brands: '<div class="hw-button primary">Button</div>\n<div class="hw-button secondary">Button</div>\n<div class="hw-button info">Button</div>\n<div class="hw-button danger">Button</div>',
        disabled: '<div class="hw-button disabled">TEXT</div> 또는 \n<div class="hw-button" disabled=true>TEXT</div>',
        icon: '<div class="hw-button icon">\n   <i class="fa fa-{icon-name}"></i>\n</div>',
        circle: '<div class="hw-button icon circle">\n   <i class="fa fa-{icon-name}"></i>\n</div>',
        selected: '<div class="hw-button icon selected">\n   <i class="fa fa-{icon-name}"></i>\n</div>',
        iconWith: '<div class="hw-button withIcon {left || right}">\n   <i class="fa fa-{icon}"></i>\n   <span class="label">TEXT</span>\n</div>',
        size: '<div class="hw-button {tiny || small || normal || large || huge}">TEXT</div>',
        fluid: '<div class="hw-button fluid">TEXT</div>',
        typeIcons: '<div class="hw-button type-icon colors">\n   <i class="fas fa-{type-icon}"></i>\n</div>'

      },
      icons: [
        {name: '만든 사람',type: 'creator', icon: 'user-check'},
        {name: '만든 날짜',type: 'cdatetime', icon: 'calendar-check'},
        // {name: '수정한 사람',type: 'modifier', icon: 'user-modify'},
        {name: '카메라',type: 'media', icon: 'camera'},
        {name: '설정',type: 'status', icon: 'cog'},
        {name: '멤버',type: 'member', icon: 'user-group'},
        {name: '날짜',type: 'datetime', icon: 'calendar'},
        {name: '라벨',type: 'label', icon: 'tag'},
        {name: '유형',type: 'type', icon: 'check-circle'},
        {name: '코멘트',type: 'number', icon: 'comment'},
        {name: '텍스트',type: 'text', icon: 'text'},
        {name: '시계',type: 'related', icon: 'clock'},
        {name: '첨부된 파일',type: 'file', icon: 'paperclip'},
        {name: '별',type: 'note', icon: 'car'},
        {name: '체크',type: 'checkbox', icon: 'check-square'},
        {name: '링크',type: 'link', icon: 'link'},
        {name: '잠김',type: 'arrow', icon: 'lock'},
      ],
      typeIcons: ['issue', 'wrench', 'browser', 'new', 'cs', 'lock', 'star', 'chart-bar', 'archive', 'security', 'bug', 'exclam-circle', 'plus-square', 'edit-square', 'window-close', 'question-alt', 'important'],
      sizeList: ['tiny', 'small', 'normal', 'large', 'huge'],
      disabled: true,
      icon: true,
      circle: true,
      brands: [
        {name:'primary', text: '저장'},
        {name:'secondary', text: '취소'},
        {name:'info', text: '삭제'},
        {name:'danger', text: '영구 삭제'}
      ],
      colorPalette: [
        'red', 'orange', 'yellow', 'lightgreen', 'green', 'lightblue', 'blue', 'deepblue', 'deeppurple'
      ], //'purple', 'brown', 'gray'
      buttonGroup: [
        {name: 'first', active: true},
        {name: 'second', active: false},
        {name: 'third', active: false},
      ],
      fontSize: 14,
      currentType: '0'
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
    },
    setActive(target) {
      this.buttonGroup.forEach((item, i) => {
        item.active = (i === target) ;
      })
    },
    setGoto(payload) {
      const parent = this.$el
      this.currentType = payload.i;
      parent.scrollTop = payload.target.offset
    },
    userSelect(e) {
      console.log(e.target)
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
.type-preview-contents {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .type-icon-wrap {
    display: flex;
    flex-direction: column;
    border:1px solid #D6D6D6;
    margin:5px;
    border-radius: 5px;
    .icon {
      text-align: center;
      padding: 10px;
    }
    .name {
      text-align: center;
      width: 100px;
      padding: 5px;
    }
  }
}
.type-icon {
  border: 1px solid #ebebeb;
  border-radius: 2px;

}
.btn-group {
  margin-bottom: 10px;
}
div[class*='-type'] {
  margin-bottom: 15px;
  .t-title {
    font-weight: 600;
    font-size: 1.2em;
    margin-bottom: 3px;
  }
}

.insert-value {
  padding: 10px;
  border:1px solid #d6d6d6;
  margin-bottom: 10px;
}

</style>