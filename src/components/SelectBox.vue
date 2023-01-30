<template lang="pug">
  div.context-menu-view
    .contents-detail-view
      hw-tab(:tab-list="tabList", v-slot="{tab}", :tab-class="`tab-item`")
        span(@click="setContents(tab.key)") {{tab.name}}
      .contents-section
        template(v-if="showInfo")
          components(:is="infoComp", :usage="usage", :props-data="propsData", :event-data="eventData")
        template(v-else)
          .section-title Types
          .type-wrapper
            .type-title 기본 셀렉트 박스
            .type-desc 기본 셀렉트 박스
            .type-preview(:style="previewSize")
              .hw-contents-wrapper
                hw-select(v-model="selectedOption", :option-list="optionList", :default-text="`선택`"  @update="setSelected")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
          .type-wrapper
            .type-title 옵션 메뉴 타입
            .type-desc 옵션 메뉴 타입: dropdown(기본값) 또는 float
            .type-preview(:style="previewSize")
              .content-title.h3 Dropdown 타입 (Default)
              .hw-contents-wrapper
                hw-select(v-model="optionList[3]", :option-list="optionList")
              .content-title.h3 Float 타입
              .hw-contents-wrapper
                hw-select(v-model="optionList[3]", :option-list="optionList", :type="`float`")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
          .type-wrapper
            .type-title 슬롯 아이템 아이콘
            .type-desc 슬롯 아이템 아이콘
            .type-preview(:style="previewSize")
              .hw-contents-wrapper
                hw-select(v-model="optionList[3]", :option-list="optionList", :item-icon = "true")

            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
          .type-wrapper
            .type-title 선택됨 아이콘 표시
            .type-desc 아이콘 사용함 또는 사용안함(Default)
            .type-preview(:style="previewSize")
              .hw-contents-wrapper
                hw-select(v-model="optionList[3]", :option-list="optionList", :is-selected-icon="true")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
        .type-wrapper
          .type-title 스피너
          .type-desc 버튼을 이용한 아이템 선택
          .type-preview(:style="previewSize")
            .content-title.h3 기본 스피너
            .hw-contents-wrapper
              hw-select(v-model="optionList[3]", :option-list="optionList", :spinner="true")
            .content-title.h3 우측 스피너
            .hw-contents-wrapper
              hw-select(v-model="optionList[3]", :option-list="optionList", :spinner="true", spinner-pos="right")
          .type-btn(@click="toggleCode")
            i.gis.gi-short-arrow-left-alt
            i.gis.gi-short-arrow-right-alt
          .type-wrapper
            .type-title 사용자 리스트 사용
            .type-desc 사용자 임의의 데이터 키값 사용 (단, option 과 value 의 대체 키네임 필수)
            .type-preview(:style="previewSize")
              .hw-contents-wrapper
                hw-select(v-model="customOptionList[0]", :option-list="customOptionList", :value-name="`number`", :option-name="`title`")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
          .type-wrapper
            .type-title Fluid
            .type-desc
            .type-preview(:style="previewSize")
              .hw-contents-wrapper
                hw-select(v-model="optionList[3]", :option-list="optionList", :fluid="true")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt






</template>

<script>
import InformationView from "./InformationView";
export default {
  name: 'hw-select-box-view',
  components: {InformationView},
  data () {
    return {
      usage: "<hw-switch v-model='{switchData}'></hw-switch>",
      eventData: [
        {name: '@switch', type: 'String || Boolean', desc: '사용자가 선택한 값 반환'},
      ],
      contentsList: [
        {
          title: 'Standard',
          description: 'A Standard Switch Toggle Button. 기본 토글 버튼  ',
          option: {},
          source: "<hw-switch v-model='{switchData}'></hw-switch>"
        },
        {
          title: 'Custom Value Text',
          description: 'User use custom String value Data ex) [\'YES | NO\', \'TRUE | FALSE\', \'ON | OFF\'] ',
          option: {},
          source: "<hw-switch v-model='{switchData}' on-value='{true-value}', off-value='{false-value}'></hw-switch>"
        },

      ],
      propsData: [
        {name: 'v-model', type:'String || Boolean', default:'false', desc: '' },
        {name: 'onValue', type:'String', default:'', desc: '사용자 지정 True 텍스트' },
        {name: 'offValue', type:'String', default:'', desc: '사용자 지정 False 텍스트' },
      ],
      previewSize: {
        width: '100%'
      },
      optionList: [
        {id:0, option:'user', value: '0', icon:'gis gi-user'},
        {id:1, option:'text', value: '1', icon:'gis gi-text'},
        {id:2, option:'manager', value: '2', icon:'gis gi-manager'},
        {id:3, option:'feed', value: '3', icon:'gis gi-feed'},
        {id:4, option:'globe', value: '4', icon:'gis gi-globe'},
        {id:5, option:'gem', value: '5', icon:'gis gi-gem'},
        {id:6, option:'car', value: '6', icon:'gis gi-car'},
      ],
      customOptionList: [
        {title:'Option 1', number: '0'},
        {title:'Option 2', number: '1'},
        {title:'Option 3', number: '2'},
        {title:'Option 4', number: '3'},
        {title:'Option 5', number: '4'},
        {title:'Option A', number: '5'},
        {title:'Option a', number: '6'},
      ],
      showInfo: false,
      infoComp: '',
      tabList: [
        {name:'Types', key: 'type'},
        {name:'Information', key: 'info'}
      ],
      selectedOption:  {},
    }
  },
  created() {
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
    setContents(type) {
      if (type === 'info') {
        this.showInfo = true;
        this.infoComp = InformationView
      } else {
        this.showInfo = false;
        this.infoComp = null;
      }
    },
    setSelected(target, option) {
      console.log(target, option);
      this.selectedOption = target
    }
  }
}
</script>

<style lang="scss">

.content-title {
  font-size: 1.2em;
  font-weight: 700;
  color: #999;
  margin-top: 20px;
  margin-borrom: 10px;
}
.hw-contents-wrapper {
  display: flex;
  .result {
    padding: 0 10px;
    font-weight: 600;
  }

}



</style>