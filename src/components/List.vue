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
                                            i.fa.fa-check

                                        .hw-button.icon.circle
                                            i.fa.fa-cancel
                            template(v-else-if="type.title === 'Extend List'")
                                hw-list(:type="`extend`", :list-data="extendData", v-bind="type.option")
                                    template(v-slot="slotProps")
                                        hw-expand-list(:data="slotProps.contentText",  :contents-type="`list`", :contents-with-icon="true")
                                            .list-child-wrapper(slot="content")
                                                hw-list(:list-data="slotProps.contentText.content",  :with-buttons="true", class="child-list")
                                                    template(v-slot="slotProps")
                                                        .icon-title
                                                            span.icon
                                                                i.fa.fa-chart-bar
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
                                                                i.fa.fa-chart-bar
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
                        i.fas.fa-code
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
                        title: '?????? ?????????',
                        description: '?????? ?????????',
                        option: {},
                        source: "<hw-calendar type='standard'></hw-calendar>",
                    },
                    {
                        title: '????????? ?????????',
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
                    {name: 'v-model', type:'String || Date', default:'YYYY-MM-DD', desc: 'Date ?????? ?????? date string(YYYY-MM-DD)' },
                    {name: 'type', type:'String', default:'simple', desc: '[simple, standard, range, plan]' },
                    {name: 'today', type:'Boolean', default:'false', desc: '"??????" ?????? ?????? ??????' },
                    {name: 'select', type:'Boolean', default:'false', desc: '????????? ??? ?????? ?????? ' },
                    {name: 'edit', type:'Boolean', default:'false', desc: '????????? ??? ??? ?????? ?????? ?????? ??????' },
                    {name: 'location', type:'String', default:'ko', desc: '[ko, en]  // ko:??????, en: ??????' },
                    {name: 'weekType', type:'String', default:'', desc: '[f, s]  // ex) f: ????????? , s: ??? ' },
                    {name: 'pickerSize', type:'Number || String', default:'300', desc: '????????? 300.' },
                    {name: 'borderWrap', type:'Boolean', default:'false', desc: 'DatePicker ?????? ????????? ??????' },
                    {name: 'gridLine', type:'Boolean', default:'false', desc: 'calender ?????? ?????? ???????????? ??????' },
                    {name: 'selectedType', type:'String', default:'start', desc: 'range ???????????? ?????? ?????? ??????' },
                    {name: 'planner', type:'Boolean', default:'false', desc: '?????? ????????? ??????' },
                    {name: 'planInfo', type:'Array', default:'null', desc: '?????? ????????? ??????' },
                    {name: 'controlAlign', type:'String', default:'center', desc: '????????? ?????? ?????? ??????' },
                    {name: 'setName', type:'String', default:'hw-calendar', desc: '????????? ?????? ???????????? ??????' },
                ],
                contentData : [
                    {id: '001', title: '????????????', text: '????????? 2021??? 03??? 01???', content: '', time: '??????'},
                    {id: '002',title: '???????????? ?????????', text: '????????? 2021??? 03??? 01???', content: '', time: '08:30'},
                    {id: '003',title: 'UI ?????????', text: '????????? 2021??? 03??? 01???', content: '', time: '09:00'},
                    {id: '004',title: '?????????', text: '????????? 2021??? 03??? 01???', time: '12:30'},
                    {id: '005',title: '???????????? TF', text: '????????? 2021??? 03??? 01???', content: '', time: '14:30'},
                ],
                oneData: [{title: '????????????', text: '????????? 2021??? 03??? 01???', content: '', time: '??????'},],
                extendData: [
                    {
                        title: "?????? ?????????",
                        content: [],
                        optionIcon: 'fa fa-star',

                    },
                    {
                        title: "?????? ?????????",
                        isExpanded: false,
                        content: [{title: '??????', iconClass: 'fa fa-ellipsis-h'}, {title: '???????????? TF', iconClass: 'fa fa-ellipsis-h'}]
                    },
                    {
                        title: "?????? ?????????",
                        isExpanded: false,
                        content: [
                            {title: '??????', iconClass: 'fa fa-ellipsis-h'},
                            {title: '????????? ?????????', iconClass: 'fa fa-ellipsis-h'},
                            {title: '???????????? ?????????', iconClass: 'fa fa-ellipsis-h'},
                            {title: '?????????/IDC ?????????', iconClass: 'fa fa-ellipsis-h'}
                            ]
                    },
                ],
                extendTreeData: [
                    {
                        title: "?????? ?????????",
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

