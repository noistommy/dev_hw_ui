<template lang="pug">
div.Tooltip-view
    .contents-detail-view
        .contents-section
            .section-title Information
            .info-wrapper
                .name-info
                    .panel
                        .panel-header Name
                        .panel-body {{`Hw-${$route.name}`}}
                .props-info
                    .panel
                        .panel-header Props
                        .panel-body.table
                            .table
                                .tr
                                    .th Name
                                    .th Type
                                    .th Default
                                    .th Desc
                                .tr(v-for="prop in propsData", :key="prop.name")
                                    .td {{prop.name}}
                                    .td {{prop.type}}
                                    .td {{prop.default}}
                                    .td {{prop.desc}}

                .usege-info
                    .props-info
                    .panel
                        .panel-header Usage
                        .panel-body
                            pre.language-css
                                code {{usage}}
        .contents-section
            .section-title Types
            .type-wrapper
                .type-title Standard
                .type-desc A Standard Tooltip
                .type-preview
                    div.hw-button.secondary(v-hw-tooltip="'standard'") 기본
                .type-btn(@click="toggleCode")
                    i.fas.fa-code
                .type-code.panel
                    .panel-header code
                    .panel-body
                        pre.language-css
                            code.code(v-text='codes["standard"]')
            .type-wrapper
                .type-title Placement(direction)
                .type-desc Set Tooltip position
                .type-preview
                    div.hw-button.secondary(v-hw-tooltip.top="'top'") Top
                    div.hw-button.secondary(v-hw-tooltip.bottom="'bottom'") Bottom
                    div.hw-button.secondary(v-hw-tooltip.left="'left'") Left
                    div.hw-button.secondary(v-hw-tooltip.right="'right'") Right
                .type-btn(@click="toggleCode")
                    i.fas.fa-code
                .type-code.panel
                    .panel-header code
                    .panel-body
                        pre.language-css
                            code.code(v-text='codes["standard"]')
            .type-wrapper
                .type-title Placement(position)
                .type-desc Set Tooltip position
                .type-preview
                    div.hw-button.secondary(v-hw-tooltip.bottom.start="'start'") Start
                    div.hw-button.secondary(v-hw-tooltip.bottom.center="'center'") Center
                    div.hw-button.secondary(v-hw-tooltip.bottom.end="'end'") End
                .type-btn(@click="toggleCode")
                    i.fas.fa-code
                .type-code.panel
                    .panel-header code
                    .panel-body
                        pre.language-css
                            code.code(v-text='codes["standard"]')




</template>

<script>
    export default {
        name: 'hw-tooltip-view',
        data () {
            return {
                usage: "<div v-hw-tooltip='text' ></div>",
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
                colorPalette: [
                    'red', 'orange', 'yellow', 'lightgreen', 'green', 'lightblue', 'blue', 'deepblue', 'deeppurple', 'purple', 'brown', 'gray'
                ],
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
            }
        }
    }
</script>
