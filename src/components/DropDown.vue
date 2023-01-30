<template lang="pug">
div.dropdown-view
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
                    .type-preview(:style="previewSize")
                        template(v-if="type.option.type === 'filter'")
                            hw-dropdown(v-bind="type.option", :filter-list="filterList", @filter="filteringData")
                        template(v-else)
                            hw-dropdown(v-bind="type.option", :menu="optionList",
                                :menu-class="`option-list`",
                                :option-key="`option`",
                                :key-name="`id`",
                                :select-key="`isSelect`",
                                :max-height="200",
                                :display-item="4",
                                @find="findOption", @result="setResult")
                                template(v-if="type.title === 'Button Slot'")
                                    span(slot="button-link")
                                        .hw-button.icon.circle.primary
                                            i.gi.gi-plus
                                //.dropdown-menu(slot="menu")
                                    dropdown-item(v-for="(option,index) in searchedList",:key="`${type.title}_${option.value}`",:data="option",:option="option.option", :idx="index",:selected="selectedValue.value == index",@select="testSelect") {{option.option}}

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
                .type-wrapper
                    .type-title Set Initial Data
                    .type-desc case by multiple type
                    .type-preview(:style="previewSize")
                        hw-dropdown(v-bind="{type:'search', multiple: true, fluid: true}", :menu="optionList",
                        :current-data = "selectedList"
                            :menu-class="`option-list`",
                            :option-key="`option`",
                            :key-name="`id`",
                            :select-key="`isSelect`",
                            :max-height="200",
                            :display-item="4",
                            @find="findOption", @result="setResult")
</template>

<script>
    import InformationView from "./InformationView";
    import HwDropdown from "../packages/HwDropdownSys/HwDropdown";
    export default {
        name: 'hw-dropdown-view',
        components: {HwDropdown, InformationView},
        data () {
            return {
                usage: "<hw-dropdown type='selection'>\n" +
                    "   <div class='dropdown-menu' slot='menu'>\n" +
                    "      <dropdown-item data='data' option='option1'>Item1</dropdown-item>\n" +
                    "      <dropdown-item data='data' option='option2'>Item2</dropdown-item>\n" +
                    "                         ...                    \n" +
                    "   </div>\n" +
                    "</hw-dropdown>",
                optionList: [
                    {id:0, option:'Option 1', value: '0'},
                    {id:1, option:'Option 2', value: '1'},
                    {id:2, option:'Option 3', value: '2'},
                    {id:3, option:'Option 4', value: '3'},
                    {id:4, option:'Option 5', value: '4'},
                    {id:5, option:'Option A', value: '5'},
                    {id:6, option:'Option a', value: '6'},
                ],
                disabledMenu: [1,3],
                contextList: [
2
                ],
                filterList: [
                    {type: 'all', title: '전체', icon: 'globe', value:''},
                    {type: 'creator', title: '작성자', icon: 'user-modify', value:''},
                    {type: 'contents', title: '내용', icon: 'feed', value:''},
                    {type: 'comment', title: '댓글', icon: 'comment-dot' , value:''},
                    {type: 'commenter', title: '댓글작성자', icon: 'user' , value:''}
                ],
                eventData: [
                    {name: '@update', type: 'Object', desc: ''},
                    {name: '@find', type: 'Object', desc: ''},
                    {name: '@select', type: 'Object', desc: 'Dropdown-item event'},
                ],
                searchedList: [],
                contentsList: [
                    {
                        title: 'Standard',
                        description: 'A Standard Dropdown. 기본 드롭 다운',
                        option: {type: 'selection', currentData:{id: 3}},
                        source: "<hw-dropdown>\n" +
                            "   <div class='dropdown-menu' slot='menu'>\n" +
                            "      <dropdown-item data='data' option='option1'>Item1</dropdown-item>\n" +
                            "      <dropdown-item data='data' option='option2'>Item2</dropdown-item>\n" +
                            "                         ...                    \n" +
                            "   </div>\n" +
                            "</hw-dropdown>",
                    },
                    {
                        title: 'Selection',
                        description: 'User Select Options. 옵션 선택 기능 타입',
                        option: {type: 'selection'},
                        source: "<hw-dropdown type='selection'>\n" +
                            "   <div class='dropdown-menu' slot='menu'>\n" +
                            "      <dropdown-item data='data' option='option1'>Item1</dropdown-item>\n" +
                            "      <dropdown-item data='data' option='option2'>Item2</dropdown-item>\n" +
                            "                         ...                    \n" +
                            "   </div>\n" +
                            "</hw-dropdown>",
                    },
                    {
                        title: 'Disabled',
                        description: 'User disabled Options. 옵션 비활성 기능 타입',
                        option: {type: 'selection', disabledList: [1,3]},
                        source: "<hw-dropdown type='selection'>\n" +
                            "   <div class='dropdown-menu' slot='menu'>\n" +
                            "      <dropdown-item data='data' option='option1'>Item1</dropdown-item>\n" +
                            "      <dropdown-item data='data' option='option2'>Item2</dropdown-item>\n" +
                            "                         ...                    \n" +
                            "   </div>\n" +
                            "</hw-dropdown>",
                    },
                    {
                        title: 'Search',
                        description: 'User Searching Options. 옵션 찾기 기능 타입',
                        option: {type: 'search'},
                        source: "<hw-dropdown type='search'>\n" +
                            "   <div class='dropdown-menu' slot='menu'>\n" +
                            "      <dropdown-item data='data' option='option1'>Item1</dropdown-item>\n" +
                            "      <dropdown-item data='data' option='option2'>Item2</dropdown-item>\n" +
                            "                         ...                    \n" +
                            "   </div>\n" +
                            "</hw-dropdown>",
                    },
                    {
                        title: 'Button',
                        description: '',
                        option: {type: 'button'},
                        source: "<hw-dropdown type='button'>\n" +
                            "   <div class='dropdown-menu' slot='menu'>\n" +
                            "      <dropdown-item data='data' option='option1'>Item1</dropdown-item>\n" +
                            "      <dropdown-item data='data' option='option2'>Item2</dropdown-item>\n" +
                            "                         ...                    \n" +
                            "   </div>\n" +
                            "</hw-dropdown>",
                    },
                    {
                        title: 'Dropdown with Icon',
                        description: '',
                        option: {type: 'search', icon: 'search'},
                        source: "<hw-dropdown type='search' icon='{icon name}'>\n" +
                            "   <div class='dropdown-menu' slot='menu'>\n" +
                            "      <dropdown-item data='data' option='option1'>Item1</dropdown-item>\n" +
                            "      <dropdown-item data='data' option='option2'>Item2</dropdown-item>\n" +
                            "                         ...                    \n" +
                            "   </div>\n" +
                            "</hw-dropdown>",
                    },
                    {
                        title: 'Button Slot',
                        description: '',
                        option: {type: 'button'},
                        source: "<hw-dropdown type='button'>\n" +
                            "   <span class='user-button' slot='button-link'>Button</span> // slot source \n" +
                            "   <div class='dropdown-menu' slot='menu'>\n" +
                            "      <dropdown-item data='data' option='option1'>Item1</dropdown-item>\n" +
                            "      <dropdown-item data='data' option='option2'>Item2</dropdown-item>\n" +
                            "                         ...                    \n" +
                            "   </div>\n" +
                            "</hw-dropdown>",
                    },
                    {
                        title: 'PlaceHolder',
                        description: '',
                        option: {placeHolder: '선택하세요'},
                        source: "<hw-dropdown type='selection' placeHolder='{text}'>\n" +
                            "   <div class='dropdown-menu' slot='menu'>\n" +
                            "      <dropdown-item data='data' option='option1'>Item1</dropdown-item>\n" +
                            "      <dropdown-item data='data' option='option2'>Item2</dropdown-item>\n" +
                            "                         ...                    \n" +
                            "   </div>\n" +
                            "</hw-dropdown>",
                    },
                    {
                        title: 'Direction',
                        description: '{direction : "up || down"}',
                        option: {direction: 'up'},
                        source: "<hw-dropdown type='selection' direction='{up || down}'>\n" +
                            "   <div class='dropdown-menu' slot='menu'>\n" +
                            "      <dropdown-item data='data' option='option1'>Item1</dropdown-item>\n" +
                            "      <dropdown-item data='data' option='option2'>Item2</dropdown-item>\n" +
                            "                         ...                    \n" +
                            "   </div>\n" +
                            "</hw-dropdown>",
                    },
                    {
                        title: 'Fluid',
                        description: '',
                        option: {fluid: true},
                        source: "<hw-dropdown type='selection' fluid='{true || false}'>\n" +
                            "   <div class='dropdown-menu' slot='menu'>\n" +
                            "      <dropdown-item data='data' option='option1'>Item1</dropdown-item>\n" +
                            "      <dropdown-item data='data' option='option2'>Item2</dropdown-item>\n" +
                            "                         ...                    \n" +
                            "   </div>\n" +
                            "</hw-dropdown>",
                    },
                    {
                        title: 'Round',
                        description: '',
                        option: {type: 'selection', round: true},
                        source: "<hw-dropdown type='selection' round='true'>\n" +
                            "   <div class='dropdown-menu' slot='menu'>\n" +
                            "      <dropdown-item data='data' option='option1'>Item1</dropdown-item>\n" +
                            "      <dropdown-item data='data' option='option2'>Item2</dropdown-item>\n" +
                            "                         ...                    \n" +
                            "   </div>\n" +
                            "</hw-dropdown>",
                    },
                    {
                        title: 'Round - small',
                        description: '',
                        option: {type: 'selection', round: true, roundSize: 'small'},
                        source: "<hw-dropdown type='selection' round='true' roundSize=' || small'>\n" +
                            "   <div class='dropdown-menu' slot='menu'>\n" +
                            "      <dropdown-item data='data' option='option1'>Item1</dropdown-item>\n" +
                            "      <dropdown-item data='data' option='option2'>Item2</dropdown-item>\n" +
                            "                         ...                    \n" +
                            "   </div>\n" +
                            "</hw-dropdown>",
                    },
                    {
                        title: 'No Menu',
                        description: '',
                        option: {input: true},
                        source: "<hw-dropdown type='search' input='{icon name}'></hw-dropdown>",
                    },
                    {
                        title: 'Multiple',
                        description: '',
                        option: {type:'search', multiple: true, fluid: true},
                        source: "<hw-dropdown type='selection' multiple='{true || false}'>\n" +
                            "   <div class='dropdown-menu' slot='menu'>\n" +
                            "      <dropdown-item data='data' option='option1'>Item1</dropdown-item>\n" +
                            "      <dropdown-item data='data' option='option2'>Item2</dropdown-item>\n" +
                            "                         ...                    \n" +
                            "   </div>\n" +
                            "</hw-dropdown>",
                    },
                    {
                        title: 'Context Menu',
                        description: '',
                        option: {type:'context', icon: 'search', multiple: false, fluid: true},
                        source: "<hw-dropdown type='selection' multiple='{true || false}'>\n" +
                            "   <div class='dropdown-menu' slot='menu'>\n" +
                            "      <dropdown-item data='data' option='option1'>Item1</dropdown-item>\n" +
                            "      <dropdown-item data='data' option='option2'>Item2</dropdown-item>\n" +
                            "                         ...                    \n" +
                            "   </div>\n" +
                            "</hw-dropdown>",
                    },
                    {
                        title: 'Filter',
                        description: '',
                        option: {type:'filter', icon: 'search', multiple: false, fluid: true, dropdownArrow: false},
                        source: "<hw-dropdown type='selection' multiple='{true || false}'>\n" +
                            "   <div class='dropdown-menu' slot='menu'>\n" +
                            "      <dropdown-item data='data' option='option1'>Item1</dropdown-item>\n" +
                            "      <dropdown-item data='data' option='option2'>Item2</dropdown-item>\n" +
                            "                         ...                    \n" +
                            "   </div>\n" +
                            "</hw-dropdown>",
                    }
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
                selectedList:[
                    {id:0, option:'Option 1', value: '0'},
                    {id:1, option:'Option 2', value: '1'},
                    {id:2, option:'Option 3', value: '2'}
                ],
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
            testSelect (value){
                this.selectedValue = value.value;
                console.log(this.selectedValue)
            },
            findOption (keyword) {
                if(keyword === '') {
                    this.searchedList = this.optionList;
                    return;
                }
                let filtered = [];
                this.optionList.forEach(el => {
                    if(el.option.indexOf(keyword) > -1) {

                        filtered.push(el);
                    }
                });
                this.searchedList = filtered;
            },
            setResult(value) {
                console.log(value)

            },
            filteringData(type, value) {
                alert(`${type} 중 '${value}' 검색`)
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


    .hw-dropdown {
        position: relative;
        max-width: 157px;
        color: #333333;
        display: flex;
        .dropdown-menu {
            position: absolute;
            width: auto;
            top: 100%;
            left: 0;
            margin-top: 10px;
            border: 1px solid #aaa;
            background-color: #fff;
            box-shadow: 2px 5px 4px 0 rgba(0, 0, 0, 0.16);
            padding: 15px;
            overflow: hidden;
            .dropdown-menu-list {
                width: 100%;
                max-height: 200px;
                overflow-y: auto;
                .group-item-wrap {
                    padding: 5px 8px;
                    &.selected {
                        background-color: #f8f8f8;
                        pointer-events: none;
                    }
                    &:hover {
                        background-color: #eff4fc;
                    }
                }
            }
        }
    }
</style>