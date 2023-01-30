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
          .add-test
            .hw-button.icon(v-for="color in colorPalette", :key="color", :class="`${color}`", @click="addTags(color)")
              i.gis.gi-plus
          .type-wrapper
            .type-title Line Tags
            .type-desc
            .type-preview(:style="previewSize")
              .hw-tags-wrapper
                hw-tags(:tags="tagList")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
          .type-wrapper
            .type-title Dot Tags
            .type-desc
            .type-preview(:style="previewSize", )
              .hw-tags-wrapper
                hw-tags(:tags="tagList", type="dot")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
          .type-wrapper
            .type-title Static Label Tags
            .type-desc
            .type-preview(:style="previewSize", )
              .hw-tags-wrapper
                hw-tag(tag-text="성공", color="green", type="label")
              .hw-tags-wrapper
                hw-tags( type="label")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
          .type-wrapper
            .type-title  Label Tags
            .type-desc
            .type-preview(:style="previewSize", )
              .hw-tags-wrapper
                hw-tags(:tags="tagList", type="label")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
          .type-wrapper
            .type-title  Event
            .type-desc
            .type-preview(:style="previewSize", )
              .hw-tags-wrapper
                hw-tags(:tags="tagList", type="label", @select="selectTag")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt
          .type-wrapper
            .type-title  Hover Effect - [One of A Kind]
            .type-desc
            .type-preview(:style="previewSize", )
              .hw-tags-wrapper
                hw-tags(:tags="tagList", type="label", :hover-effect="`one-of-a-kind`")
            .type-btn(@click="toggleCode")
              i.gis.gi-short-arrow-left-alt
              i.gis.gi-short-arrow-right-alt






</template>

<script>
import InformationView from "./InformationView";
import HwTag from "../packages/HwTags/HwTag";
export default {
  name: 'hw-tags-view',
  components: {HwTag, InformationView},
  data () {
    return {
      colorPalette: [
        'red', 'orange', 'yellow', 'lightgreen', 'green', 'lightblue', 'blue', 'deepblue', 'deeppurple', 'purple', 'brown', 'gray'
      ],
      tagList: [
        {id:0, color: 'green', tagText:'Green'},
        {id:1, color: 'red', tagText:'Red'},
        {id:2, color: 'blue', tagText:'Blue'},
        {id:3, color: 'orange', tagText:'Orange'},
      ],
      usage: "// tagList: {id: 0, color: '', tagText: ''}" +
          "<hw-tags :tags='tagList' type='{line|dot|text}'>" +
          "</hw-tags>",
      eventData: [],
      contentsList: [
        {
          title: 'Standard',
          description: 'A Standard Tags Menu. 기본 태그 ',
          option: {type: 'line'},
          source: "<hw-tags :tags='tagList'></hw-tags>"
        },
        {
          title: 'Dot Tags',
          description: '',
          option: {type: 'dot'},
          source: "<hw-tags :tags='tagList' type='dot'></hw-tags>"
        },
        {
          title: 'Static Label Tags',
          description: 'Standard Status Label',
          option: {type: 'selection'},
          source: "<hw-tags type='label'></hw-tags>"
        },
        {
          title: 'Label Tags',
          description: 'Standard Status Label',
          option: {type: 'selection'},
          source: "<hw-tags :tags='tagList' type='label'></hw-tags>"
        },

      ],
      propsData: [
        {name: 'type', type:'String', default:'line', desc: '[line, dot, label]' },
        {name: 'tags', type:'Array', default:'', desc: '사용자 지정 추가  태그 리스트' },
      ],
      previewSize: {
        width: '100%'
      },
      showInfo: false,
      infoComp: '',
      tabList: [
        {name:'Types', key: 'type'},
        {name:'Information', key: 'info'}
      ],
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
    addTags (colorName) {
      let id = this.tagList.length + 1;
      this.tagList.push({id: id, color: colorName, tagText: colorName});
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
    selectTag(value) {
      alert(value.tagText)
    }
  }
}
</script>

<style lang="scss">

.context-menu-view {
  position: relative;
}
.context-menu-view {
  position: relative;
}
.context-wrapper {
  position: absolute;
  top:0;
  left:0;
}

</style>