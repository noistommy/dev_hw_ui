<template lang="pug">
div.tabs-view
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
                    .type-desc A Standard Tabs
                    .type-preview
                        hw-tab(:tab-list="tabsList", v-slot="{tab}", :tab-class="`tab-item`")
                            span {{tab.name}}
                            span(v-if="tab.count > 0")  ({{tab.count}})
                    .type-btn(@click="toggleCode")
                        i.fas.fa-code
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                                code.code(v-text='codes["standard"]')
                .type-wrapper
                    .type-title Box Tab
                    .type-desc 사용자 클레스를 이용한 스타일 적용
                    .type-preview
                        hw-tab(:tab-list="boxTabList", :tab-line="false", v-slot="{tab}", v-model="selectedTab",
                            :tab-class="`box-tab-item`", :tab-active-class="`box-active-item`", @tab-click="setContents")
                            span {{tab.name}}
                            span(v-if="tab.count > 0")  ({{tab.count}})
                        .tab-contents
                            .result-contents {{resultContent}}
                    .type-btn(@click="toggleCode")
                        i.fas.fa-code
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                                code.code(v-text='codes["standard"]')





</template>

<script>
    import InformationView from './InformationView';
    export default {
        name: 'hw-tabs-view',
        components: {InformationView},
        data () {
            return {
                tabList: [
                    {name:'Types', key: 'type'},
                    {name:'Information', key: 'info'}
                ],
                showInfo: false,
                usage: "<hw-tab :tab-list='{listData[Array]}'></hw-tab>",
                propsData: [
                    {name: 'brand', type:'String', default:'', desc: '[primary, secondary, info, danger]' },
                ],
                codes: {
                    standard: '<hw-tab :tab-list=\'{listData[Array]}\'></hw-tab>',

                },
                tabsList: [
                    {name: '전체', key: 'all', val: 'total', count:10},
                    {name: '보드', key: 'boards', val: 'board', count:1},
                    {name: '섹션', key: 'tables', val: 'table', count:2},
                    {name: '필드', key: 'columns', val: 'column', count:3},
                    {name: '이슈', key: 'issues', val: 'issue', count:4},
                    {name: '파일', key: 'attach_files', val: 'attachFile', count:0}
                ],
                boxTabList: [
                    {name: '의견', key: 'opinion', val: 'opinion'},
                    {name: '이력', key: 'history', val: 'history'},
                ],
                resultContent: {},
                selectedTab: 0
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
            buttonClick(el) {
                alert(`${el.type} on ${el.target.textContent} button`)
            },
            setContents(payload) {
                this.resultContent = payload;
            }
        }
    }
</script>

<style lang="scss">
    .tab-item {
        font-size: 15px;
        color: #909090;
        min-width: 100px;
        text-align: center;
        padding: 10px 20px;
    }
    .box-tab-item {
        width: 100px;
        padding: 10px 24px;
        background-color: #EbEbEb;
        color: #999999;
        text-align: center;
    }
    .box-active-item {
        background-color: #F8F8F8;
        color: #333333;
        font-weight: 700;
    }
    .tab-contents {
        width: 100%;
        height: 250px;
        background-color: #F8F8F8;
        padding: 10px;
    }
</style>
