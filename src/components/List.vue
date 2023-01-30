<template lang="pug">
div.list-view
    .contents-detail-view
        hw-tab(:tab-list="tabList", v-slot="{tab}", :tab-class="`tab-item`")
            span(@click="setContents(tab.key)") {{tab.name}}
        .contents-section
            template(v-if="showInfo")
                components(:is="infoComp", :usage="usage", :props-data="propsData", :event-data="eventData")
            template(v-else)
                .section-title Types
                .type-wrapper(v-for="(type, index) in contentsList", :key="`calendar_${index}`", :id="`type_${index}`")
                    .type-title {{type.title}}
                    .type-desc {{type.description}}
                    .type-preview
                        .hw-list-wrapper
                            template(v-if="type.title === 'Slot'")
                                hw-list(:list-data="contentData", v-bind="type.option", :max-height="250")
                                    template(v-slot="slotProps")
                                        .main-title {{slotProps.contentText.title}}
                                        .sub-title {{slotProps.contentText.text}}
                                hw-list(:list-data="contentData", v-bind="type.option")
                                    template(v-slot="slotProps")
                                        .logo-title ADOBE
                                        .main-title {{slotProps.contentText.title}}
                                        .sub-title {{slotProps.contentText.text}}
                            template(v-else-if="type.title === 'With Buttons'")
                                hw-list(:type="`buttonList`", :list-data="contentData", v-bind="type.option")
                                    template(slot="buttonSet")
                                        .hw-button.icon.circle
                                            i.gis.gi-check

                                        .hw-button.icon.circle
                                            i.gis.gi-cancel
                            template(v-else-if="type.title === 'Extend List'")
                                hw-list(:type="`extend`", :list-data="extendData", v-bind="type.option")
                                    template(v-slot="slotProps")
                                        hw-expand-list(:data="slotProps.contentText",  :contents-type="`list`", :contents-with-icon="true")
                                            .list-child-wrapper(slot="content")
                                                hw-list(:list-data="slotProps.contentText.content",  :with-buttons="true", class="child-list")
                                                    template(v-slot="slotProps")
                                                        .icon-title
                                                            span.icon
                                                                i.gis.gi-chart-bar
                                                            span {{slotProps.contentText.title}}
                            template(v-else-if="type.title === 'Extend Tree List'")
                                hw-list(:type="`extend`", :list-data="extendTreeData", v-bind="type.option")
                                    template(v-slot="slotProps")
                                        hw-expand-list(:data="slotProps.contentText")
                                            .list-child-wrapper(slot="content")
                                                hw-tree-list(v-for="(child, i) in slotProps.contentText.content" :key="`A${i}`", :tree-data="child", :level="0")
                                                    template(v-slot="slotProps")
                                                        .icon-title
                                                            span.icon
                                                                i.gis.gi-chart-bar
                                                            span {{slotProps.contentText.title}}
                            template(v-else-if="type.title==='Timeline'")
                                hw-list(:list-data="contentData", v-bind="type.option")
                                    template(v-slot="slotProps")
                                        .main-title
                                            span.time {{slotProps.contentText.time}}
                                            span.m-title {{slotProps.contentText.title}}
                                        .sub-title {{slotProps.contentText.text}}
                            template(v-else)
                                hw-list(:list-data="contentData", v-bind="type.option")
                            //.hw-list
                                .hw-item(v-for="item in contentData", :key="item.title")
                                    span {{item.title}}


                    .type-btn(@click="toggleCode")
                        i.gis.gi-short-arrow-left-alt
                        i.gis.gi-short-arrow-right-alt
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                                code(v-text="type.source")





</template>

<script>
    import InformationView from './InformationView';
    import HwExpandList from "../packages/HwExpandList/HwExpandList";
    export default {
        name: 'hw-list-view',
        components: {HwExpandList, InformationView},
        data () {
            return {
                tabList: [
                    {name:'Types', key: 'type'},
                    {name:'Information', key: 'info'}
                ],
                showInfo: false,
                usage: "<hw-list></hw-list>",
                contentsList: [
                    {
                        title: '기본 리스트',
                        description: '기본 리스트',
                        option: {},
                        source: "<hw-calendar type='standard'></hw-calendar>",
                    },
                    {
                        title: '선택된 아이템',
                        description: '',
                        option: {isSelectedIcon: true},
                        source: "<hw-calendar type='standard'></hw-calendar>",
                    },
                    {
                        title: 'UnderLine',
                        description: '',
                        option: {underLine: true},
                        source: "<hw-calendar type='standard'></hw-calendar>",
                    },
                    {
                        title: 'Compact',
                        description: '',
                        option: {compact: true},
                        source: "<hw-calendar type='standard'></hw-calendar>",
                    },
                    {
                        title: 'Slot',
                        description: '',
                        option: {},
                        source: "<hw-calendar type='standard'></hw-calendar>",
                    },
                    {
                        title: 'Scroll',
                        description: '',
                        option: {maxHeight: '150px'},
                        source: "<hw-calendar type='standard'></hw-calendar>",
                    },
                    {
                        title: 'With Buttons',
                        description: '',
                        option: {withButtons: true},
                        source: "<hw-calendar type='standard'></hw-calendar>",
                    },
                    {
                        title: 'Extend List',
                        description: '',
                        option: {},
                        source: "<hw-calendar type='standard'></hw-calendar>",
                    },
                    {
                        title: 'Extend Tree List',
                        description: '',
                        option: {},
                        source: "<hw-calendar type='standard'></hw-calendar>",
                    },
                    {
                        title: 'Draggable List',
                        description: '',
                        option: {draggable: true},
                        source: "<hw-calendar type='standard'></hw-calendar>",
                    },
                    {
                        title: 'Timeline',
                        description: '',
                        option: {timeline: true},
                        source: "<hw-calendar type='standard'></hw-calendar>",
                    },

                ],
                propsData: [
                    {name: 'v-model', type:'String || Date', default:'YYYY-MM-DD', desc: 'Date 객체 또는 date string(YYYY-MM-DD)' },
                    {name: 'type', type:'String', default:'simple', desc: '[simple, standard, range, plan]' },
                    {name: 'today', type:'Boolean', default:'false', desc: '"오늘" 버튼 활성 유무' },
                    {name: 'select', type:'Boolean', default:'false', desc: '선택된 날 표시 유무 ' },
                    {name: 'edit', type:'Boolean', default:'false', desc: '캘린더 년 월 변경 기능 활성 유무' },
                    {name: 'location', type:'String', default:'ko', desc: '[ko, en]  // ko:한글, en: 영어' },
                    {name: 'weekType', type:'String', default:'', desc: '[f, s]  // ex) f: 월요일 , s: 월 ' },
                    {name: 'pickerSize', type:'Number || String', default:'300', desc: '최소값 300.' },
                    {name: 'borderWrap', type:'Boolean', default:'false', desc: 'DatePicker 외부 테두리 적용' },
                    {name: 'gridLine', type:'Boolean', default:'false', desc: 'calender 내부 격자 레이아웃 적용' },
                    {name: 'selectedType', type:'String', default:'start', desc: 'range 타입일때 선택 기준 지정' },
                    {name: 'planner', type:'Boolean', default:'false', desc: '일정 데이터 표시' },
                    {name: 'planInfo', type:'Array', default:'null', desc: '일정 데이터 목록' },
                    {name: 'controlAlign', type:'String', default:'center', desc: '컨트롤 버튼 위치 설정' },
                    {name: 'setName', type:'String', default:'hw-calendar', desc: '사용자 지정 클레스명 설정' },
                ],
                contentData : [
                    {id: '001', title: '디자인실', text: '생성일 2021년 03월 01일', content: '', time: '종일'},
                    {id: '002',title: '하이웍스 사업부', text: '생성일 2021년 03월 01일', content: '', time: '08:30'},
                    {id: '003',title: 'UI 개발팀', text: '생성일 2021년 03월 01일', content: '', time: '09:00'},
                    {id: '004',title: '이러쿵', text: '생성일 2021년 03월 01일', time: '12:30'},
                    {id: '005',title: '하이웍스 TF', text: '생성일 2021년 03월 01일', content: '', time: '14:30'},
                ],
                oneData: [{title: '디자인실', text: '생성일 2021년 03월 01일', content: '', time: '종일'},],
                extendData: [
                    {
                        title: "중요 주소록",
                        content: [],
                        optionIcon: 'gis gi-star',

                    },
                    {
                        title: "개인 주소록",
                        isExpanded: false,
                        content: [{title: '전체', iconClass: 'gis gi-ellipsis-h'}, {title: '하이웍스 TF', iconClass: 'gis gi-ellipsis-h'}]
                    },
                    {
                        title: "공유 주소록",
                        isExpanded: false,
                        content: [
                            {title: '전체', iconClass: 'gis gi-ellipsis-h'},
                            {title: '도메인 사업부', iconClass: 'gis gi-ellipsis-h'},
                            {title: '하이웍스 사업부', iconClass: 'gis gi-ellipsis-h'},
                            {title: '호스팅/IDC 사업부', iconClass: 'gis gi-ellipsis-h'}
                            ]
                    },
                ],
                extendTreeData: [
                    {
                        title: "개인 주소록",
                        content: [{
                            id: 0,
                            title: 'Node1',
                            isExpanded: false,
                            children: [
                                {id:'1', title: 'node1-1',isExpanded: false, children:[] },
                                {id:'2', title: 'node1-2',isExpanded: false, children:[] }
                            ]
                        }],
                    }
                ]
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
                //console.log(evt.target.nextSibling.classList)
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

        }
    }
</script>

<style lang="scss">
    .hw-list-wrapper {
        width: 350px;
        padding:25px;
        border:1px solid #d6d6d6;
    }
    .logo-title {
        font-weight: 900;
    }
    .main-title {
        margin-bottom: 4px;
        .time {font-weight: 700}
        .m-title {
            padding-left: 5px;
        }
    }
    .icon-title {
        display: flex;
        .icon {
            margin-right: 10px;
        }
    }
    .list-child-wrapper .hw-item{
        padding-left: 30px;
    }
    .selected {
        .time {
            color: #2985DB;
        }
    }
</style>

