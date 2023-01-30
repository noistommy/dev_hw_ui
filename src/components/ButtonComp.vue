<template lang="pug">
  div.button-view
    ScrollSpy(container-key=".button-view", section-key=".type-wrapper", title-key=".type-title", title="Types", @select="setGoto")
    .contents-detail-view
      hw-tab(:tab-list="tabList", v-slot="{tab}", :tab-class="`tab-item`")
        span(@click="setContents(tab.key)") {{tab.name}}
      .contents-section
        template(v-if="showInfo")
          components(:is="infoComp", :usage="usage", :props-data="propsData", :event-data="eventData")
        template(v-else)
          .section-title Types
          .type-wrapper
            .type-title Standard
            .type-desc A Standard Button Types
            .type-preview
              hw-button(button-text="기본")
              //hw-button(button-text="기본 둥근 버튼", :round="true")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
            .type-code.panel
              .panel-header code
              .panel-body
                pre.language-css
                  code.code(v-text='codes["standard"]')
          .type-wrapper
            .type-title 각진 모서리 버튼
            .type-desc Buttons with Brand Type
            .type-preview
              hw-button.angled(v-for="btn in brands", :key="`C${btn.name}`", :brand="btn.name" :button-text="`${btn.text}`")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
            .type-code.panel
              .panel-header code
              .panel-body
                pre.language-css
                  code.code(v-text='codes["brands"]')
                  br
                  code.code(v-text='codes["brands"]')
          .type-wrapper
            .type-title Brand
            .type-desc Buttons with Brand Type
            .type-preview
              hw-button(v-for="btn in brands", :key="`C1${btn.name}`", :brand="btn.name" :button-text="`${btn.text}`")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
            .type-code.panel
              .panel-header code
              .panel-body
                pre.language-css
                  code.code(v-text='codes["brands"]')
          .type-wrapper
            .type-title Disabled
            .type-desc Prevent User Events
            .type-preview
              hw-button(v-for="btn in brands", :key="`C2${btn.name}`", :brand="btn.name", disabled, :button-text="`${btn.text}`")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
            .type-code.panel
              .panel-header code
              .panel-body
                pre.language-css
                  code.code(v-text='codes["disabled"]')
          .type-wrapper
            .type-title Compact
            .type-desc Prevent User Events
            .type-preview
              hw-button(v-for="btn in brands", :key="`C3${btn.name}`", :brand="btn.name", :compact="true", :button-text="`${btn.text}`")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
            .type-code.panel
              .panel-header code
              .panel-body
                pre.language-css
                  code.code(v-text='codes["compact"]')
          .type-wrapper
            .type-title OutLine
            .type-desc Prevent User Events
            .type-preview
              .solid-type
                hw-button(v-for="btn in brands", :key="`C4${btn.name}`", :brand="btn.name", :outline="true", :button-text="`${btn.text}`")
              .line-type
                hw-button(v-for="color in colorPalette", :key="`C${color}`", :button-text="color" , :outline="true", :color="color")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
            .type-code.panel
              .panel-header code
              .panel-body
                pre.language-css
                  code.code(v-text='codes["outline"]')
          .type-wrapper
            .type-title Icon
            .type-desc Icon Button
            .type-preview
              .solid-type
                hw-button(v-for="icon in icons", :key="`I${icon.type}`", :icon="icon.icon", icon-type="gis")
              .line-type
                hw-button(v-for="icon in icons", :key="`I1${icon.type}`", :icon="icon.icon", icon-type="gi")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
            .type-code.panel
              .panel-header code
              .panel-body
                pre.language-css
                  code.code(v-text='codes["icon"]')
          .type-wrapper
            .type-title Icon Circle
            .type-desc Icon Button on Circle
            .type-preview
              .solid-type
                hw-button(v-for="icon in icons", :key="`I2${icon.type}`", :icon="icon.icon", icon-type="gis", circle)
              .line-type
                hw-button(v-for="icon in icons", :key="`I3${icon.type}`", :icon="icon.icon", icon-type="gi", circle)
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
            .type-code.panel
              .panel-header code
              .panel-body
                pre.language-css
                  code.code(v-text='codes["circle"]')
          .type-wrapper
            .type-title Icon Selected 1
            .type-desc Selected Icon Button
            .type-preview
              .solid-type
                hw-button(v-for="icon in icons", :key="`I4${icon.type}`", :icon="icon.icon", icon-type="gis", circle, selected)
              .line-type
                hw-button(v-for="icon in icons", :key="`I5${icon.type}`", :icon="icon.icon", icon-type="gi", circle, selected)
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
            .type-code.panel
              .panel-header code
              .panel-body
                pre.language-css
                  code.code(v-text='codes["selected"]')
          .type-wrapper
            .type-title Icon Selected 2
            .type-desc Selected Icon Button
            .type-preview
              .solid-type
                hw-button(v-for="icon in icons", :key="`I6${icon.type}`", :icon="icon.icon", icon-type="gis", hover)
              .line-type
                hw-button(v-for="icon in icons", :key="`I7${icon.type}`", :icon="icon.icon", icon-type="gi", hover)
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
            .type-code.panel
              .panel-header code
              .panel-body
                pre.language-css
                  code.code(v-text='codes["selected"]')
          .type-wrapper
            .type-title Hovered Icons
            .type-desc Selected Icon Button
            .type-preview
              .line-type
                hw-button(v-for="icon in icons", :key="`I8${icon.type}`", :icon="icon.icon", icon-type="gi", hover, :circle="true")
              .line-type
                hw-button(v-for="icon in icons", :key="`I9${icon.type}`", :icon="icon.icon", icon-type="gi", hover)
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
            .type-code.panel
              .panel-header code
              .panel-body
                pre.language-css
                  code.code(v-text='codes["selected"]')
          .type-wrapper
            .type-title Outlined Icons
            .type-desc Selected Icon Button
            .type-preview
              .line-type
                hw-button(v-for="icon in icons", :key="`I10${icon.type}`", :icon="icon.icon", icon-type="gi", hover, :circle="true", :outline="true")
              .line-type
                hw-button(v-for="icon in icons", :key="`I11${icon.type}`", :icon="icon.icon", icon-type="gi", hover, :outline="true")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
            .type-code.panel
              .panel-header code
              .panel-body
                pre.language-css
                  code.code(v-text='codes["selected"]')
          .type-wrapper
            .type-title Button with Icon
            .type-desc Button with Icon
            .type-preview
              hw-button(button-text="LEFT", brand="secondary", with-icon="short-arrow-left-alt", icon-pos="left")
              hw-button(button-text="RIGHT", brand="secondary", with-icon="short-arrow-right-alt", icon-pos="right")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
            .type-code.panel
              .panel-header code
              .panel-body
                pre.language-css
                  code.code(v-text='codes["iconWith"]')
          .type-wrapper
            .type-title Button with Badge
            .type-desc Button with Icon
            .type-preview
              hw-button(button-text="Badge", brand="primary", :with-badge="{count: 10}")
              hw-button(button-text="Badge", brand="secondary", :with-badge="{count: 30}")
              hw-button(button-text="Badge", brand="info", :with-badge="{count: 'New'}")
          .type-wrapper
            .type-title Size
            .type-desc Button Size
            .type-preview
              hw-button(v-for="size in sizeList", :key="size", :button-text="size", brand="secondary", :size="size")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
            .type-code.panel
              .panel-header code
              .panel-body
                pre.language-css
                  code.code(v-text='codes["size"]')
          .type-wrapper
            .type-title Fluid
            .type-desc Full Size Button
            .type-preview
              hw-button(button-text="Full Size Button", brand="primary", fluid)
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
            .type-code.panel
              .panel-header code
              .panel-body
                pre.language-css
                  code.code(v-text='codes["fluid"]')
          .type-wrapper
            .type-title Dropdown
            .type-desc Button Dropdown
            .type-preview
              hw-button(:button-text="`Dropdown`", :dropdown="true" , :drop-data="dropMenu", :outline="true", @select="setButtonText")
              hw-button(:button-text="dropdownText", :dropdown="true" , :drop-data="dropMenu", :outline="true", @select="setButtonText")
              hw-button(:button-text="dropdownText", :round='true', :dropdown="true" , :drop-data="dropMenu", :outline="true", @select="setButtonText")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
            .type-code.panel
              .panel-header code
              .panel-body
                pre.language-css
                  code.code(v-text='codes["fluid"]')
          .type-wrapper
            .type-title Event
            .type-desc $emit events
            .type-preview
              hw-button(button-text="Click", brand="primary", @onclick="buttonClick")
              hw-button(button-text="MouseEnter", brand="primary", @onenter="buttonClick")
              hw-button(button-text="MouseLeave", brand="primary", @onleave="buttonClick")
              hw-button(button-text="MouseOver", brand="primary", @onover="buttonClick")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
            .type-code.panel
              .panel-header code
              .panel-body
                pre.language-css
                  code.code(v-text='codes["events"]')
          .type-wrapper
            .type-title Colors
            .type-desc Colorful Button
            .type-preview
              hw-button(v-for="color in colorPalette", :key="`A${color}`", :button-text="color", :color="color")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
            .type-code.panel
              .panel-header code
              .panel-body
                pre.language-css
                  code.code(v-text='codes["colors"]')
          .type-wrapper
            .type-title Text Button
            .type-desc Text Button
            .type-preview
              .line-type
                hw-button(v-for="btn in brands", :key="`C${btn.name}`", :brand="btn.name" :button-text="`${btn.text}`", :text="true")
              .line-type
                hw-button(v-for="color in colorPalette", :key="`B${color}`", :button-text="color", :color="color", :text="true")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
            .type-code.panel
              .panel-header code
              .panel-body
                pre.language-css
                  code.code(v-text='codes["colors"]')


</template>

<script>
import InformationView from './InformationView';
import ScrollSpy from "../packages/ScrollSpy/ScrollSpy";

export default {
  name: 'hw-calendar-view',
  components: {ScrollSpy, InformationView},
  data () {
    return {
      usage: "<hw-button button-text='text' />",
      propsData: [
        {name: 'brand', type:'String', default:'', desc: '[primary, secondary, info, danger]' },
        {name: 'disabled', type:'Boolean', default:'false', desc: '버튼 비활성 유무 ' },
        {name: 'iconType', type:'String', default:'gi', desc: 'GTRIS ICON 타입 [gi, gis]' },
        {name: 'icon', type:'String', default:'', desc: ' 아이콘 버튼 표출 유무 및 표출 아이콘. GTRIS ICON ' },
        {name: 'circle', type:'Boolean', default:'false', desc: '아이콘 버튼 원형 표출 유무' },
        {name: 'selected', type:'Boolean', default:'false', desc: '선택된 버튼 표시 유무  ' },
        {name: 'withIcon', type:'String', default:'', desc: '아이콘 포함된 버튼 유무 및 표출 아이콘. GTRIS ICON' },
        {name: 'iconPos', type:'String', default:'', desc: '아이콘 표출 위치 [left | right]' },
        {name: 'size', type:'String', default:'', desc: '버튼 사이즈 [tiny, small, normal, large, huge]' },
        {name: 'fluid', type:'Boolean', default:'false', desc: '꽉 찬 버튼 ' },
        {name: 'buttonText', type:'String', default:'', desc: '버튼 표출 텍스트' },
        {name: 'hover', type:'Boolean', default:'false', desc: '' },
        {name: 'color', type:'String', default:'', desc: '버튼 색상 적용' },
      ],
      eventData: [
        {name: '@onclick', type: 'eventElement', desc: '클릭 이벤트'},
        {name: '@onenter', type: 'eventElement', desc: '마우스가 버튼 진입  이벤트'},
        {name: '@onleave', type: 'eventElement', desc: '마우스가 버튼을 벗어날 시 이벤트'},
        {name: '@onover', type: 'eventElement', desc: '마우스가 버튼을 오버 할 시 이벤트'}
      ],
      codes: {
        standard: '<hw-button button-text="Button" />',
        brands: '<hw-button brand="{primary | secondary | info | danger}" button-text="Button" />',
        disabled: '<hw-button disabled button-text="Button" />',
        icon: '<hw-button icon="{icon-name}" icon-type="{gi | gis}" button-text="Button" />',
        circle: '<hw-button circle icon="{icon-name}" icon-type="{gi | gis}" button-text="Button" />',
        selected: '<hw-button selected button-text="Button" />',
        iconWith: '<hw-button with-icon="{icon-name}" icon-pos="{left | right}" button-text="Button" />',
        size: '<hw-button size="{tiny || small || normal || large || huge}" button-text="Button" />',
        fluid: '<hw-button fluid button-text="Button"/>',
        events: '<hw-button @onclick @onenter @onleave @onover button-text="Button" />',
        colors: '<hw-button color="{color-name}" button-text="Button" />'

      },
      icons: [
        {name: '만든 사람',type: 'creator', icon: 'user-check'},
        {name: '만든 날짜',type: 'cdatetime', icon: 'calendar-check'},
        {name: '수정한 사람',type: 'modifier', icon: 'user-modify'},
        {name: '수정한 날짜',type: 'mdatetime', icon: 'date-modify'},
        {name: '상태',type: 'status', icon: 'status'},
        {name: '멤버',type: 'member', icon: 'user-group'},
        {name: '날짜',type: 'datetime', icon: 'calendar'},
        {name: '라벨',type: 'label', icon: 'tag'},
        {name: '유형',type: 'type', icon: 'check-circle'},
        {name: '숫자',type: 'number', icon: 'marker-number'},
        {name: '텍스트',type: 'text', icon: 'text'},
        {name: '첨부된 연결',type: 'related', icon: 'connected'},
        {name: '첨부된 파일',type: 'file', icon: 'paperclip'},
        {name: '노트',type: 'note', icon: 'text-editor'},
        {name: '체크',type: 'checkbox', icon: 'check-square'},
        {name: '링크',type: 'link', icon: 'link'}
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
        'red', 'orange', 'yellow', 'lightgreen', 'green', 'lightblue', 'blue', 'deepblue', 'deeppurple', 'purple', 'brown', 'gray'
      ],
      showInfo: false,
      infoComp: '',
      tabList: [
        {name:'Types', key: 'type'},
        {name:'Information', key: 'info'}
      ],
      dropdownText: '업로드',
      dropMenu: [
        {option: '파일업로드', id: 0, value: 'file'},
        {option: '폴더업로드', id: 1, value: 'folder'},
        {option: '폴더업로드폴더업로드폴더업로드', id: 2, value: 'folder'}
      ],
      typeNav: [],
      currentType: '0',
      currentTop: 0,
    }
  },
  mounted() {
    // const typeList = document.querySelectorAll('.type-wrapper')
    // let initOffset = 0;
    // typeList.forEach(type => {
    //
    //   let typeItem = {}
    //   typeItem.title = type.querySelector('.type-title').textContent;
    //   if(initOffset === 0) initOffset = type.offsetTop - 120
    //   typeItem.offset = type.offsetTop - initOffset;
    //   this.typeNav.push(typeItem);
    // })


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
    buttonClick(el) {
      alert(`${el.type} on ${el.target.textContent} button`)
    },
    setContents(type) {
      if (type === 'info') {
        this.showInfo = true;
        this.infoComp = InformationView
      } else {
        this.showInfo = false;
        this.infoComp = null;
      }
    },
    setButtonText(value) {
      this.dropdownText = value.option
    },
    setGoto(payload) {
      const parent = this.$el;
      parent.scrollTop = payload.target.offset
    }
  }
}
</script>

<style lang="scss" scoped>

.scrollspy::v-deep {
  position: fixed;
  top: 140px;
  right: 0;
  margin-top: 30px;
  padding: 10px 20px;
  width: 15%;
  min-width: 300px;
  border-left: 2px solid #ddd;
  ul.nav-list {
    .type-nav {
      cursor: pointer;
      padding: 5px;
      &:hover {
        font-weight: 700;
      }
      &.active, &.current {
        font-weight: 700;
      }
    }
  }
  .nav-title {
    font-size: 2em;
    font-weight: 900;
    margin-bottom: 10px;
  }
}


</style>
