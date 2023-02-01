<template lang="pug">
div.colors-view
    .contents-detail-view
        .contents-section
            .section-title Information
            .info-wrapper
                .name-info
                    .panel
                        .panel-header Font Family
                        .panel-body
                            p.huge.strong 맑은 고딕 Malgun Gothic
        .contents-section
            .title Typography[Weight]
            .type-wrapper(v-for="(item, index) in typoData[0].data", :key="`brand_${index}`")
                .type-title {{item.name}}
                .type-desc Style '{{item.type}}: {{item.style}}'
                .type-preview
                    p(:class="item.ex") Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aut consequuntur cum cumque doloremque doloribus esse iure laudantium magnam nesciunt placeat provident quibusdam quo, quos repellendus veniam veritatis voluptas voluptates.
                .type-btn(@click="toggleCode")
                    i.fas.fa-code
                .type-code.panel
                    .panel-header code
                    .panel-body
                        pre.language-css
                            code.code(v-text='item.code')
            .title Typography[Size]
            .type-wrapper(v-for="(item, index) in typoData[1].data", :key="`typo_${index}`")
                .type-title {{item.name}}
                .type-desc Style {{item.type}}: {{item.style}}
                .type-preview
                    p(:class="item.ex") Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                .type-btn(@click="toggleCode")
                    i.fas.fa-code
                .type-code.panel
                    .panel-header code
                    .panel-body
                        pre.language-css
                            code.code(v-text='item.code')
            .title Colors[Brand]
            .color-list.brand
                .color-item.type-wrapper(v-for="(group, index) in BrandColorData", :key="`brand_${index}`")
                    .type-title {{group.group}}
                    .type-preview
                        span.color-box(v-for="(box, i) in group.data", :key="`box${index}_${i}`" :style="{backgroundColor: box.value}")
                            .box-info.small(:class="box.name")
                                .box-name {{box.name}}
                                .box-code {{box.value}}
                    .type-btn(@click="toggleCode")
                        i.fas.fa-code
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                                code.code(v-text='group.code')
            .title Colors[Typography]
            .color-list.typo
                .color-item.type-wrapper(v-for="(group, index) in TypoColorData", :key="`type_${index}`")
                    .type-title {{group.group}}
                    .type-preview
                        span.color-box(v-for="(box, i) in group.data", :key="`box${index}_${i}`" :style="{backgroundColor: box.value}")
                            .box-info.small(:class="box.name")
                                .box-name {{box.name}}
                                .box-code {{box.value}}
                    .type-btn(@click="toggleCode")
                        i.fas.fa-code
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                                code.code(v-text='group.code')
            .title Colors[Type Palette]
            .hw-group
                .type-wrapper(v-for="(item, index) in colorPaletteData", :key="`palette_${index}`")
                    .type-title {{item.name}}
                    .type-preview
                        .palette-wrap
                            .color-palette(v-for="(box, i) in colorPalette", :key="box", :class="['hw', `${box} ${item.ex}`]") {{box}}
                    .type-btn(@click="toggleCode")
                        i.fas.fa-code
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                                code.code(v-text='item.code')
            .title Issue Colors[Type Palette]
            .hw-group
                .type-wrapper(v-for="(item, index) in issueColorPalette", :key="`palette_${index}`")
                    .type-title {{item.name}}
                    .type-preview
                        .issue-palette-wrap
                            .color-palette(v-for="(box, i) in colorPalette", :key="box", :class="`issue-${item.type}-${box}`", @click="consoleTrigger(box)")
                    .type-btn(@click="toggleCode")
                        i.fas.fa-code
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                                code.code(v-text='item.code')
</template>

<script>
    export default {
        name: 'hw-colors',
        data () {
            return {
                typoData: [
                    {
                        group: 'Weight',
                        data: [
                            {name:'Regular', type: 'font-weight', ex: '', desc:'Regular Font', style: '400', code: '<p class=""></p>'},
                            {name:'Light', type: 'font-weight', ex: 'light', desc:'Light Font Weight', style: '300', code: '<p class="light"></p>'},
                            {name:'Bold', type: 'font-weight', ex: 'bold', desc:'Bold Font Weight', style: '600', code: '<p class="bold"></p>'},
                            {name:'Strong', type: 'font-weight', ex: 'strong', desc:'Strong Font Weight', style: '900', code: '<p class="strong"></p>'},
                        ]
                    },
                    {
                        group: 'Size',
                        data: [
                            {name:'Tiny', type: 'font-size', ex: 'tiny', desc:'Tiny Font size', style: '0.5em', code: '<p class="tiny"></p>'},
                            {name:'Small', type: 'font-size', ex: 'small', desc:'Small Font size', style: '0.75em', code: '<p class="small"></p>'},
                            {name:'Normal', type: 'font-size', ex: 'normal', desc:'Normal Font size', style: '1em', code: '<p class="normal"></p>'},
                            {name:'Large', type: 'font-size', ex: 'large', desc:'Large Font size', style: '1.25em', code: '<p class="large"></p>'},
                            {name:'Huge', type: 'font-size', ex: 'huge', desc:'Huge Font size', style: '1.5em', code: '<p class="huge"></p>'},
                        ]
                    }

                ],
                BrandColorData: [
                    {
                        group:'Primary',
                        data:[
                            {name:'Primary' ,value:"#2985db"},
                            {name:'Secondary' ,value:"#ebebeb"},
                        ],
                        code: '<div class="primary-bg"></div>'
                    },
                    {
                        group:'Background',
                        data:[
                            {name:'Background1' ,value:"#FFFFFF"},
                            {name:'Background2' ,value:"#F8F8F8"}
                        ],
                        code: '<div class="background_1"></div> \n<div class="background_2"></div>'
                    },
                    {
                        group:'Surface',
                        data:[
                            {name:'Surface1' ,value:"#EBEBEB"},
                            {name:'Surface2' ,value:"#EFF4FC"}
                        ],
                        code: '<div class="surface_1"></div> \n<div class="surface_2"></div>'
                    }
                ],
                TypoColorData: [
                    {group:'Primary',data:[{name:'On Primary' ,value:"#FFFFFF"}],code: '<div class="primary-text"></div>'},
                    {group:'Background',data:[{name:'On Background' ,value:"#333333"},{name:'On Background' ,value:"#676767"},{name:'On Background' ,value:"#909090"},{name:'Disabled' ,value:"#C4C4C4"}],code: '<div class="text-dark"></div> \n<div class="text-gray-dark"></div> \n<div class="text-gray"></div> \n<div class="text-gray-light"></div>'},
                    {group:'Surface',data:[{name:'On Surface 1&2' ,value:"#333333"},{name:'On Surface 1' ,value:"#676767"}],code: '<div class="text-dark"></div> \n<div class="text-gray-dark"></div>'},
                    {group:'Errors',data:[{name:'Error' ,value:"#D50000"},{name:'Attention' ,value:"#EC6E00"}],code: '<div class="text-error"></div> \n<div class="text-attent"></div>'},
                ],
                colorPalette: [
                    'red', 'orange', 'yellow', 'lightgreen', 'green', 'lightblue', 'blue', 'deepblue', 'deeppurple', 'purple', 'brown', 'gray'
                ],
                colorPaletteData: [
                    {name: 'Background', ex: 'light', code: '<div class="hw {color} light">{color}</div>'},
                    // {name: 'Border & Line', ex: '',code: '<div class="hw {color}">{color}</div>'},
                    {name: 'Text', ex: 'shape', code: '<div class="hw {color} shape">{color}</div>'}
                ],
                issueColorPalette: [
                    {name: 'table contents', type: 'contents', code: '<div class="issue-contents-{color}"></div>'},
                    {name: 'table line', type: 'line',code: '<div class="issue-line-{color}"></div>'},
                    {name: 'table main', type: 'main',code: '<div class="issue-main-{color}"></div>'}
                ]
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
            consoleTrigger(color) {
                let public_st = 'font-family: Malgun Gothic; padding: 3px 5px; font-weight: 500; font-size: 12px;';
                console.log(`%c Hiworks %c Group %c Errors %c ${color}`,
                    `${public_st}; background-color: #333; color:#ececec;`,
                    `${public_st}; background-color: #61A475; color:#ececec; margin-right: 5px;`,
                    `${public_st}; background-color: #D75757; color:#fff;`, `${public_st}; background-color: ${color}; color: #ececec`)
                console.error('%c [ERROR] FORBIDDEN_ERROR','')
            }
        }
    }
</script>

<style lang="scss">
    .color-title {
        padding: 10px 0 30px 0;
    }
    .color-list {
        /*display: flex;*/
        width: 100%;
        margin-bottom: 80px;
        .color-item{
            margin-right: 30px;
            &:last-child {
                margin: 0;
            }
            .color-box {
                display: inline-block;
                width: 120px;
                height: 120px;
                .box-info {
                    height: 100%;
                    padding: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    &.Primary, &.Error, &.Attention {color: #FFFFFF;}
                    &.Background1 {border:1px solid #DCDCDC;}
                }
            }
        }
        &.typo {
            .type-preview {
                color: #ffffff;
            }
            .box-info{
                &.On.Primary {color: #333333; border:1px solid #DCDCDC;}
            }

        }

    }
    .palette-wrap {
        display: flex;
        flex-wrap: wrap;
        .color-palette {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: .8em 1.2em;
            min-width: 110px;
            min-height: 110px;
            /*margin: 10px;*/
            color: #ffffff;
            font-weight: 600;
            &.light {
                color: #909090;
            }
        }
    }
    .issue-palette-wrap {
        display: flex;
        flex-wrap: wrap;
        .color-palette {
            min-width: 30px;
            min-height: 30px;
            margin: 10px;
        }
    }
</style>