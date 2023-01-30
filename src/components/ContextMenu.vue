<template lang="pug">
div.context-menu-view(ref="container")
    hw-context-menu( :open="isShowDialog", :context-type="contextType", :context-pos="contextPos", :contents-data="dialogData", :menu-list="menuList", :trigger="trigger", :target="target", :parent-pos="parent",
        :pos-type="positioning", @close="closeDialog", :round="true", :width="`200`" @select="selectedItem")
        //template(slot="menu")
            .context-menu
                .context-group(v-for="group in menuList" :key="group.id")
                    .context-item(v-for="item in group.list" :key="item.option")
                        .item-wrapper
                            .item-title
                                template(v-if="item.icon")
                                    i(:class="item.icon")
                                span {{item.option}}
    .contents-detail-view
        hw-tab(:tab-list="tabList", v-slot="{tab}", :tab-class="`tab-item`")
            span(@click="setContents(tab.key)") {{tab.name}}
        .contents-section
            template(v-if="showInfo")
                components(:is="infoComp", :usage="usage", :props-data="propsData", :event-data="eventData")
            template(v-else)
                .section-title Types
                .type-wrapper
                    .type-title 기본 컨텍스트 메뉴
                    .type-desc 우클릭 시 메뉴 표출. 기본 우클릭 메뉴 잠금.
                    .type-preview
                        .list-wrapper
                            .hw-list.selection
                                .hw-item(v-for="(item, index) in [1, 2, 3, 4, 5]", :key="index",@click="alertRightClick", @contextmenu.prevent="showContextDialog(index, '', 'menu2')",)
                                    .hw-item-title {{item}}
                .type-wrapper(v-for="(type, index) in contentsList", :key="`calendar_${index}`", :id="`type_${index}`")
                    .type-title {{type.title}}
                    .type-desc {{type.description}}
                    .type-preview(:style="previewSize")
                        .hw-button.icon.circle.hover(@click.stop="showDialog(index, type.placement, 'menu1')", )
                            i.gis.gi-cog
                        .hw-button.icon.circle.hover(@click.stop="showDialog(index, type.placement, 'menu2')", )
                            i.gis.gi-user
                    .type-btn(@click="toggleCode")
                        i.gis.gi-short-arrow-left-alt
                        i.gis.gi-short-arrow-right-alt
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                                code.code(v-text="type.source")
                    .type-msg.panel(v-if="type.message", :class="`panel-${type.message.type}`")
                        .panel-body {{type.message.text}}
    //.context-wrapper(ref="testWrap")

    //.test-position(:style="{ width: `${testStyle.width}px`,  height: `${testStyle.height}px`}")






</template>

<script>
    import InformationView from "./InformationView";
    import HwDropdown from "../packages/HwDropdownSys/HwDropdown";
    export default {
        name: 'hw-contextmenu-view',
        components: {HwDropdown, InformationView},
        data () {
            return {
                testStyle: {},
                usage: "<hw-dropdown type='selection'>\n" +
                    "   <div class='dropdown-menu' slot='menu'>\n" +
                    "      <dropdown-item data='data' option='option1'>Item1</dropdown-item>\n" +
                    "      <dropdown-item data='data' option='option2'>Item2</dropdown-item>\n" +
                    "                         ...                    \n" +
                    "   </div>\n" +
                    "</hw-dropdown>",
                eventData: [
                    {name: '@update', type: 'Object', desc: ''},
                    {name: '@find', type: 'Object', desc: ''},
                    {name: '@select', type: 'Object', desc: 'Dropdown-item event'},
                ],
                isShowDialog: false,
                dialogData: {
                    id: ''
                },
                positioning: 'bottom-start',
                dialogStyle: {},
                dialog: '',
                searchedList: [],
                target: {},
                trigger: null,
                parent: {x:0, y:0},
                menuList: [],
                contentsList: [
                    {
                        title: '기본 컨텍스트 메뉴',
                        description: '기본 컨텍스트 메뉴. 기본 생성 위치: BOTTOM-START',
                        option: {type: 'selection'},
                        source: "<hw-dropdown>\n" +
                            "   <div class='dropdown-menu' slot='menu'>\n" +
                            "      <dropdown-item data='data' option='option1'>Item1</dropdown-item>\n" +
                            "      <dropdown-item data='data' option='option2'>Item2</dropdown-item>\n" +
                            "                         ...                    \n" +
                            "   </div>\n" +
                            "</hw-dropdown>",
                        placement: 'bottom-start'
                    },
                    {
                        title: '사용자 위치',
                        description: 'RIGHT_START 적용',
                        option: {type: 'selection'},
                        source: "<hw-dropdown>\n" +
                            "   <div class='dropdown-menu' slot='menu'>\n" +
                            "      <dropdown-item data='data' option='option1'>Item1</dropdown-item>\n" +
                            "      <dropdown-item data='data' option='option2'>Item2</dropdown-item>\n" +
                            "                         ...                    \n" +
                            "   </div>\n" +
                            "</hw-dropdown>",
                        placement: 'right-start'
                    },
                    {
                        title: 'Standard',
                        description: 'A Standard Context Menu. 기본 컨텍스트 메뉴',
                        option: {type: 'selection'},
                        source: "<hw-dropdown>\n" +
                            "   <div class='dropdown-menu' slot='menu'>\n" +
                            "      <dropdown-item data='data' option='option1'>Item1</dropdown-item>\n" +
                            "      <dropdown-item data='data' option='option2'>Item2</dropdown-item>\n" +
                            "                         ...                    \n" +
                            "   </div>\n" +
                            "</hw-dropdown>",
                        placement: 'left-start'
                    },
                    {
                        title: 'Standard',
                        description: 'A Standard Context Menu. 기본 컨텍스트 메뉴',
                        option: {type: 'selection'},
                        source: "<hw-dropdown>\n" +
                            "   <div class='dropdown-menu' slot='menu'>\n" +
                            "      <dropdown-item data='data' option='option1'>Item1</dropdown-item>\n" +
                            "      <dropdown-item data='data' option='option2'>Item2</dropdown-item>\n" +
                            "                         ...                    \n" +
                            "   </div>\n" +
                            "</hw-dropdown>",
                        placement: 'top-start'
                    },

                ],
                propsData: [
                    {name: 'type', type:'String', default:'selection', desc: '' },
                    {name: 'menu', type:'Array', default:'', desc: '' },
                    {name: 'selectItem', type:'String || Object', default:'', desc: '' },
                    {name: 'placeHolder', type:'String', default:'Select Option', desc: '' },
                    {name: 'multiple', type:'Boolean', default:'', desc: '' },
                    {name: 'fluid', type:'Boolean', default:'false', desc: '' },
                    {name: 'icon', type:'String', default:'', desc: '' },
                    {name: 'input', type:'Boolean', default:'false', desc: '' },
                    {name: 'align', type:'String', default:'left', desc: '' },
                    {name: 'direction', type:'String', default:'down', desc: '' },
                ],
                previewSize: {
                    width: '100%'
                },
                selectedValue: '',
                menuArr: [
                    {
                        id: 0,
                        title: 'group 1',
                        list: [
                            {option:'item1', commend: 'option1', icon:'gis gi-user'},
                            {option:'item2', commend: 'option2', icon:'gis gi-manager', children: [ {option:'child-item1', commend: 'option3', icon:'gis gi-user'}, {option:'child-item2', commend: 'option4', icon:'gis gi-user'}]},
                        ]
                    },
                    {
                        id: 1,
                        title: 'group 2',
                        list: [
                            {option:'item1', commend: 'option1'},
                            {option:'item2', commend: 'option2'},
                        ]
                    },
                    {
                        id: 2,
                        title: 'group 3',
                        list: [
                            {option:'item1', commend: 'option1'},
                            {option:'item2', commend: 'option2'},
                        ]
                    },
                ],
                menuArr2: [
                    {
                        id: 0,
                        title: '',
                        list: [
                            {option:'item1', commend: 'option1', icon:'gis gi-user'},
                            {option:'item2', commend: 'option2', icon:'gis gi-search'},
                            {option:'item3', commend: 'option3', icon:'gis gi-server'},
                            {option:'item4', commend: 'option4', icon:'gis gi-undo', children: [
                                {option:'child-item1', commend: 'option5', icon:'gi gi-archive'},
                                {option:'child-item2', commend: 'option6', icon:'gi gi-bug', children: [
                                        {option:'child2-item1', commend: 'option7', icon:'gi gi-clock'},
                                        {option:'child2-item2', commend: 'option8', icon:'gi gi-cog'},
                                    ]},
                                {option:'child-item3', commend: 'option5', icon:'gi gi-calendar'}
                                ]
                            },
                            {option:'item6', commend: 'option6', icon:'gis gi-cancel'},
                        ]
                    }
                ],
                contextType: '',
                contextPos: {top:0, left:0, width: 0, height:0},
                showInfo: false,
                infoComp: '',
                tabList: [
                    {name:'Types', key: 'type'},
                    {name:'Information', key: 'info'}
                ],
            }
        },
        created() {
            this.searchedList = this.optionList;
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
            selectedItem(value) {
                console.log(value)
            },
            closeDialog () {
                this.dialog = '';
                this.dialogData.id = '';
                this.isShowDialog = false;
            },
            showDialog (id, position, menu) {
                if(this.isShowDialog && this.dialogData.id === id) {
                    this.isShowDialog = false;
                    return;
                }
                this.dialogData.id = id;
                if(position) {
                    this.positioning = position;
                }

                let pos = event.target.getBoundingClientRect();
                console.log(event)
                this.testStyle.height = pos.top;
                this.testStyle.width = pos.left;

                this.contextType = 'dropdown'
                this.target = event;
                this.isShowDialog = true;
                this.trigger = true;
                this.menuList = menu === 'menu1' ? this.menuArr : this.menuArr2;
            },
            showContextDialog (id, position, menu) {
                if(this.isShowDialog && this.dialogData.id === id) {
                    this.isShowDialog = false;
                    return;
                }
                this.dialogData.id = id;
                if(position) {
                    this.positioning = position;
                }
                let pos ={};
                pos.top = event.pageY;
                pos.left = event.pageX;
                this.testStyle.height = pos.top;
                this.testStyle.width = pos.left;

                this.contextType = 'context';
                this.contextPos={
                    top: pos.top,
                    left: pos.left,
                    width: 0,
                    height: 0
                };
                this.target = event;
                this.isShowDialog = true;
                this.trigger = true;
                this.menuList = menu === 'menu1' ? this.menuArr : this.menuArr2;
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
            alertRightClick() {
                alert('우클릭 메뉴 활성')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .context-menu-view {
        position: relative;
    }
    .context-wrapper {
        position: absolute;
        top:0;
        left:0;

    }
    .test-position {
        position: fixed;
        top:0;
        left: 0;
        background-color: rgba(255, 0, 0, 0.5);
    }
    .list-wrapper {
        width: 400px;
        border: 1px solid #ebebeb;
    }

</style>