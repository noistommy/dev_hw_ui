<template lang="pug">
div.date-picker-view
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
                        .panel-body
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
                .event-info
                    .panel
                        .panel-header Event
                        .panel-body
                            .table
                                .tr
                                    .th Name
                                    .th Param Type
                                    .th Desc
                                .tr(v-for="event in eventData", :key="event.name")
                                    .td {{event.name}}
                                    .td {{event.type}}
                                    .td {{event.desc}}
                .usege-info
                    .props-info
                    .panel
                        .panel-header Usage
                        .panel-body
                            pre.language-css
                                code.code {{usage}}
        .contents-section
            .section-title Types
            .type-wrapper(v-for="(type, index) in contentsList", :key="`calendar_${index}`", :id="`type_${index}`")
                .type-title {{type.title}}
                .type-desc {{type.description}}
                .type-preview(:style="previewSize")
                    hw-range-input(
                        v-bind="type.option"
                        @value-changed="onValueChange"
                        ref="editor"
                    )
                .type-btn(@click="toggleCode")
                    i.fas.fa-code
                .type-code.panel
                    .panel-header code
                    .panel-body
                        pre.language-css
                            code.code(v-text="type.source")
                .type-msg.panel(v-if="type.message", :class="`panel-${type.message.type}`")
                    .panel-body {{type.message.text}}
</template>

<script>
    export default {
        name: 'hw-avatar-editor-view',
        data () {
            return {
                usage: `<hw-range-input :min='1' :max='3' ...></hw-range-input>`,
                contentsList: [
                    {
                        title: 'Standard',
                        option: {},
                        description: '?????? ?????? ??????',
                        source: "<hw-range-input></hw-range-input>",
                    },
                    {
                        title: 'disabled',
                        option: {
                            disabled: true
                        },
                        description: '????????????',
                        source: "<hw-range-input :disabled='true'></hw-range-input>",
                    },
                    {
                        title: 'propValue',
                        option: {
                            propValue: 3
                        },
                        description: '????????? ??????',
                        source: "<hw-range-input :propValue='3'></hw-range-input>",
                    },
                    {
                        title: 'itemColor',
                        option: {
                            propValue: 3,
                            itemColor: 'red'
                        },
                        description: '???????????? ?????? ??????',
                        source: "<hw-range-input :propValue='3' itemColor='red'></hw-range-input>",
                    }
                ],
                propsData: [
                    {name: 'min', type:'Number', default:'0', desc: '?????????' },
                    {name: 'max', type:'Number', default:'10', desc: '?????????' },
                    {name: 'numStep', type:'Number', default:'10', desc: '?????? ~ ???????????? ????????? ????????? ??????' },
                    {name: 'propValue', type:'Number', default:'', desc: '????????? ?????????' },
                    {name: 'frameLimit', type: 'Number', default:'144', desc: '???????????? ????????? ????????? ???????????? ???????????? ?????? ?????? (1000 / frameLimit)'},
                    {name: 'disabled', type: 'Boolean', default: 'false', desc: '?????? ???????????? ??????'},
                    {name: 'itemColor', type: 'String', default: '#2985db', desc: '?????? ????????? ?????????'},
                ],
                eventData: [
                    {name: 'value-changed', type: 'Number', desc: '???????????? ??????????????? ??????.'},
                ],
                previewSize: {
                    width: '725px',
                },
                blobURL: null
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
            onValueChange (value) {
                console.log(value)
            }
        }
    }
</script>