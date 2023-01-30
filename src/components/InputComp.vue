<template lang="pug">
div.input-view
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
                    .type-desc A Standard Input Types
                    .type-preview
                        hw-g-input(place-holder="기본 텍스트 박스", v-model="inputText", @onInput="insertData", :label-text="`Input 1`")
                    .type-result {{inputText}}
                    .type-btn(@click="toggleCode")
                        i.gis.gi-short-arrow-left-alt
                        i.gis.gi-short-arrow-right-alt
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                                code.code(v-text='codes["standard"]')
                .type-wrapper
                    .type-title Disabled
                    .type-desc
                    .type-preview
                        hw-g-input(disabled)
                    .type-btn(@click="toggleCode")
                        i.gis.gi-short-arrow-left-alt
                        i.gis.gi-short-arrow-right-alt
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                                code.code(v-text='codes["disabled"]')
                .type-wrapper
                    .type-title UnderLine
                    .type-desc
                    .type-preview
                        hw-g-input(underline, @onInput="insertData")
                    .type-result {{inputText}}
                    .type-btn(@click="toggleCode")
                        i.gis.gi-short-arrow-left-alt
                        i.gis.gi-short-arrow-right-alt
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                                code.code(v-text='codes["disabled"]')
                .type-wrapper
                    .type-title Input with Icon
                    .type-desc
                    .type-preview
                        hw-g-input(icon="search" iconPos="left" inline)
                        hw-g-input(icon="search" iconPos="right" inline)
                    .type-btn(@click="toggleCode")
                        i.gis.gi-short-arrow-left-alt
                        i.gis.gi-short-arrow-right-alt
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                                code.code(v-text='codes["disabled"]')
                .type-wrapper
                    .type-title Input with Button
                    .type-desc
                    .type-preview
                        hw-g-input(icon="search", button, iconPos="left", inline, @submit="buttonClick")
                        hw-g-input(icon="search", button, iconPos="right", inline, @submit="buttonClick")
                    .type-btn(@click="toggleCode")
                        i.gis.gi-short-arrow-left-alt
                        i.gis.gi-short-arrow-right-alt
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                                code.code(v-text='codes["disabled"]')
                .type-wrapper
                    .type-title ReadOnly
                    .type-desc
                    .type-preview
                        hw-g-input(readOnly, v-model="staticText")
                    .type-btn(@click="toggleCode")
                        i.gis.gi-short-arrow-left-alt
                        i.gis.gi-short-arrow-right-alt
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                                code.code(v-text='codes["disabled"]')
                .type-wrapper
                    .type-title Transparent
                    .type-desc
                    .type-preview
                        hw-g-input(place-holder="special style", transparent, v-model="inputText")
                    .type-btn(@click="toggleCode")
                        i.gis.gi-short-arrow-left-alt
                        i.gis.gi-short-arrow-right-alt
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                                code.code(v-text='codes["disabled"]')
                .type-wrapper
                    .type-title Size
                    .type-desc
                    .type-preview
                        hw-g-input(v-for="size in sizeList", :key="size", :size="size", inline)
                    .type-btn(@click="toggleCode")
                        i.gis.gi-short-arrow-left-alt
                        i.gis.gi-short-arrow-right-alt
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                                code.code(v-text='codes["disabled"]')
                .type-wrapper
                    .type-title Edit Mode
                    .type-desc
                    .type-preview
                        hw-g-input(place-holder="edit mode",v-model="inputText", edit-mode, :edit-state="editable")
                        .user-btn( @click="toggleEditMode")
                            hw-button(:icon="editable ? 'check' : 'pencil'", circle, v-model="inputText")
                    .type-btn(@click="toggleCode")
                        i.gis.gi-short-arrow-left-alt
                        i.gis.gi-short-arrow-right-alt
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                                code.code(v-text='codes["disabled"]')
                .type-wrapper
                    .type-title Textarea
                    .type-desc
                    .type-preview
                        hw-g-input(place-holder="Insert Textarea", type="textarea")
                    .type-btn(@click="toggleCode")
                        i.gis.gi-short-arrow-left-alt
                        i.gis.gi-short-arrow-right-alt
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                .type-wrapper
                    .type-title Error Mode
                    .type-desc Show Error Message
                    .type-preview
                        hw-g-input(:place-holder="err_placeholder", v-model="inputText", @onInput="insertData", @onFocus="resetError", :is-error="err_message != ''")
                            span(slot="error_message", class="user-error danger-color") {{err_message}}
                    //.type-result {{inputText}}
                    .type-event
                        hw-button(color="red", :button-text="`에러발생`", size="small" @onclick="setError")
                    .type-btn(@click="toggleCode")
                        i.gis.gi-short-arrow-left-alt
                        i.gis.gi-short-arrow-right-alt
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                                code.code(v-text='codes["standard"]')
                .type-wrapper
                    .type-title Colors
                    .type-desc Colorful Button
                    .type-preview.color
                        hw-g-input(v-for="color in colorPalette", :key="color", :color="color", inline, :text-value="color")
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
    import InformationView from "./InformationView";
    export default {
        name: 'hw-input-component',
        components: {InformationView},
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
                inputText: '초기 값 ',
                staticText: '읽기만 가능합니다.',
                resultList: [],
                editable: false,
                err_message: '',
                isError: false,
                showInfo: false,
                infoComp: '',
                tabList: [
                    {name:'Types', key: 'type'},
                    {name:'Information', key: 'info'}
                ],
                err_placeholder: 'TEST: 에러 발생 버튼 클릭'

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
            insertData(value) {
                this.inputText = value;
                this.message = value;
            },
            buttonClick(value) {
                alert( `${value}`)
            },
            toggleEditMode() {
                this.editable = !this.editable;
            },
            setError(value) {
                console.log(value)
                this.err_message = "에러가 발생 했습니다."
                this.err_placeholder = " 포커스 시 에러 메세지 리셋"
            },
            resetError() {
                this.err_message = ""
                this.err_placeholder = "TEST: 에러 발생 버튼 클릭"
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
    .type-preview.color {
        display: flex;
        flex-wrap: wrap;
        height: 350px;
    }
    .user-error {
        position: absolute;
        width: 100%;
        top: 100%;
        left: 0;
        padding-top: 10px;
    }
</style>
