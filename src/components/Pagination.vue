<template lang="pug">
  div.pagination-view
    .contents-detail-view
      hw-tab(:tab-list="tabList", v-slot="{tab}", :tab-class="`tab-item`")
        span(@click="setContents(tab.key)") {{tab.name}}
      .contents-section
        template(v-if="showInfo")
          components(
            :is="infoComp",
            :usage="usage",
            :props-data="propsData",
            :event-data="eventData"
          )
        template(v-else)
          .section-title Types
          .type-wrapper(v-for="(type, index) in contentList", :key="index")
            .type-title {{type.title}}
            .type-desc {{type.description}}
            .type-preview(:style="previewSize", @click="selectIndex(index)")
              hw-pagination(v-bind="type.option", @page-change="onPageChange")
          .type-wrapper
            .type-title Hide Single
            .type-desc 페이지가 1개 일때 자동으로 숨기는 기능을 설정합니다.
            .type-option
              hw-switch(v-model="hide", on-value="Hide", off-value="Show", @switch="toggleHide")
              span.result {{hideResult}}
            .type-preview(:style="previewSize")
              hw-pagination(:langth="5", :last-page="1", :hide-single-page="hide", @page-change="onPageChange")

</template>
<script>

import InformationView from './InformationView'
export default {
  name: 'hw-pagination-view',
  data () {
    return {
      usage: "<hw-pagination :length='10' :currentPage='data.currentPage' :lastPage='data.lastPage' @page-change='onPageChange'></hw-pagination>",
      contentList: [
        {
          title: 'Standard',
          description: '기본 페이지네이션',
          source: "<hw-pagination :length='10' :currentPage='data.currentPage' :lastPage='data.lastPage' @page-change='onPageChange'></hw-pagination>",
          option: {
            length: 10,
            currentPage: 1,
            lastPage: 40,
            itemClass: 'user-pagination-item'
          }
        },
        {
          title: 'Length',
          description: '한번에 나열되는 페이지 번호의 갯수를 설정합니다.',
          option: {
            length: 5,
            currentPage: 1,
            lastPage: 40
          }
        },
        {
          title: 'CurrentPage',
          description: '페이지네이션 시작번호를 설정합니다.',
          option: {
            length: 5,
            currentPage: 5,
            lastPage: 40
          }
        },
        {
          title: 'LastPage',
          description: '페이지네이션 마지막 번호를 설정합니다.',
          option: {
            length: 5,
            currentPage: 1,
            lastPage: 10
          }
        },
        {
          title: 'Shape - circle',
          description: '페이지네이션 버튼 모양를 설정합니다.',
          option: {
            length: 5,
            currentPage: 1,
            lastPage: 100000,
            circle: true
          }
        },
        {
          title: 'Type - page',
          description: '전체 페이지 및 현재 페이지 정보',
          option: {
            type: 'page',
            length: 5,
            currentPage: 1,
            lastPage: 10,
            circle: true
          }
        },
        {
          title: 'Compact',
          description: '',
          option: {
            length: 5,
            currentPage: 1,
            lastPage: 10,
            circle: true,
            compact: true,
            itemClass: 'user-pagination-item'
          }
        },
      ],
      propsData: [
        {name: 'length', type:'Number', default:'10', desc: '한번에 나열하는 페이지 번호의 개수' },
        {name: 'currentPage', type:'Number', default:'1', desc: '현재 페이지 번호' },
        {name: 'lastPage', type:'Number', default:'1', desc: '마지막 페이지 번호' },
        {name: 'justify', type:'String', default:'center', desc: '페이지네이션 수평 정렬 방향' },
      ],
      eventData: [
        {name: 'page-change', type: 'Number', desc: '페이지 번호 변동시 클릭한 번호를 반환.'}
      ],
      previewSize: {
        width: '725px',
        height: 'auto'
      },
      currentPage: 1,
      currentIndex: -1,
      tabList: [
        {name:'Types', key: 'type'},
        {name:'Information', key: 'info'}
      ],
      showInfo: false,
      setContents(type) {
        if (type === 'info') {
          this.showInfo = true;
          this.infoComp = InformationView
        } else {
          this.showInfo = false;
          this.infoComp = null;
        }
      },
      hide: false,
      hideResult: 'Show'
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
    selectIndex(i) {
      this.currentIndex = i;
    },
    onPageChange(page){
      if(this.currentIndex < 0) {
        this.currentIndex = -1
        this.currentPage = page;
      } else {
        this.contentList[this.currentIndex].option.currentPage = page
      }

    },
    toggleHide(state, id) {
      this.hide = state === 'Hide'
      this.hideResult = state
      console.log(id)
    }
  }
}
</script>

<style lang="scss">
.range-wrapper {
  display: flex;
}
.result {
  display: inline-block;
  font-weight: 600;
  padding: 4px;
}
.user-pagination-item {
  min-width: 30px;
  padding: 0 5px;

}
</style>