a<template lang="pug">
    div.buttons-view
        .contents-detail-view
            .contents-section
                .section-title Types
                .type-wrapper
                    .type-title Extend Textarea Type
                    .type-desc Extend Textarea Type
                    .type-preview
                        .hw-text-editor.textarea(:class="{open: isActive}", @click="activateEditor")
                            transition(name="extend-input")
                                hw-text-editor2(
                                    :place-holder="placeholder",
                                    :is-extend="isExtend",
                                    :is-active="isActive",
                                    :mention-list="mentions",
                                    :mention-key="id",
                                    :border-line="false",
                                    @update="updateText" v-if="isActive")
                    .type-result-html
                        .result-title editor 내부 데이터
                        .result-wrapper
                            pre.language-css
                                .code {{unitData.content}}
                        .result-title 부모로 전송 데이터
                        .result-wrapper.html(v-html="unitData.content")
                        .result-title CODE 로 변환된 데이터
                        .result-wrapper {{codeParse}}
                            .hw-button.primary.small(v-if="codeParse !== ''", @click="setViewerData") Show Viewer
                    .type-result-selection {{selectText || 'No selection'}} 가 선택됨
                .type-wrapper
                    .type-title Input Type
                    .type-desc Input Type
                    .type-preview
                        .hw-text-editor.input(:class="{open: isActive2}", @click="activateEditor2")
                            transition(name="extend-input")
                                hw-text-editor(
                                    :place-holder="placeholder",
                                    :is-extend="isExtend",
                                    :is-active="isActive2",
                                    :mention-list="mentions",
                                    :border-line="false",
                                    :pop-direction="`up`"
                                    @update="updateText" v-if="isActive2")
                .type-wrapper
                    .type-title Viewer
                    .type-desc 텍스트 에디터 뷰어
                    .type-preview
                        hw-editor-viewer(:contents-data="viewerData" v-if="viewerData")
                    .type-result-wrapper
                        .result-title HTML 변환 데이터
                        .result-wrapper
                            pre.language-css
                                code.code {{viewerData}}
            .contents-section
                .section-title Information
                .info-wrapper
                    .name-info
                        .panel
                            .panel-header 모듈명
                            .panel-body {{`Hw-${$route.name}`}}
                    .props-info
                        .panel
                            .panel-header 속성(Props)
                            .panel-body
                                .table
                                    .tr
                                        .th 이름
                                        .th 타입
                                        .th 상세정보
                                        .th 설명
                                    .tr(v-for="prop in propsData", :key="prop.name")
                                        .td {{prop.name}}
                                        .td {{prop.type}}
                                        .td {{prop.default}}
                                        .td {{prop.desc}}
                    .event-infof
                        .panel
                            .panel-header 이벤트
                            .panel-body
                                .table
                                    .tr
                                        .th 이름
                                        .th 타입
                                        .th 설명
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
</template>

<script>
    const expHtml = /<[^>]*>/g;
    const expAttrs = /(\S+)=[\s"']?((?:.(?!["']?\s+(?:\S+)=|[>"']))*.)["']?/g;

    const expCode = /\[([@|ㄱ-ㅎ|ㅏ-ㅣ|가-힣|&#;|0-9|\w\s|()]+)]\(([//|A-Z0-9+&@#/%?=~_|!:,.;|\w|\d]+)\)/gi;
    const expMention = /\[([@|&#64;][^\]]*)\]\(([^)]*)\)/gi;
    const expLink = /\[([^\]]*)\]\((([http://]+)([^)]*))\)/gi;

    // import HwTextEditor from '@/packages/HwTextEditor/HwTextEditor';
    export default {
        name: 'hw-text-edit',
        data() {
            return {
                usage: "<hw-text-editor type='selection'\n" +
                        ":corrent-data=''\n" +
                        ":place-holder='placeholder text'\n" +
                        ":mention-list='[]'\n" +
                        ":border-line='{true|false}'\n" +
                        ":mention-all='{true|false}'\n" +
                        ":is-active='{true|false}'\n" +
                        "/>",
                propsData: [
                    {name: 'contentData', type:'String', default:'', desc: '수정 할 글 데이터 ' },
                    {name: 'placeHolder', type:'String', default:'', desc: '' },
                    {name: 'mentionList', type:'Array', default:'', desc: '멘션 대상 목록' },
                    {name: 'borderLine', type:'Boolean', default:'', desc: '외부 테두리서 사용 선택' },
                    {name: 'mentionAll', type:'Boolean', default:'true', desc: '멘션 리스트에 전체 멘션에 대한 선택 포함 여부' },
                    {name: 'isActive', type:'Boolean', default:'false', desc: '' },
                ],
                placeholder: 'Insert Text.',
                isExtend: false,
                isActive: false,
                isActive2: false,
                unitData: {
                    content: ''
                },
                htmlConvert: '',
                selectText: '',
                range: 0,
                mentions: [
                    {id:0, name: 'User 1', type:'mention'},
                    {id:1, name: 'User 2', type:'mention'},
                    {id:2, name: 'User 3', type:'mention'},
                    {id:3, name: 'User 4', type:'mention'},
                ],
                codeParse: '',
                viewerData: '',
                mentionStyle: "color:#2985db; font-weight:600; padding: 0 3px;",
                linkStyle: "color:#2985db; text-decoration: underline; padding: 0 3px; display: inline"
            }
        },
        methods: {
            activateEditor (e) {
                e.target.focus();
                this.isActive = true;
            },
            activateEditor2 (e) {
                e.target.focus();
                this.isActive2 = true;
            },
            updateText (contents) {
                console.log(contents);

                this.unitData.content = contents;
                this.codeParse = this.convertToCode(contents);

            },
            setViewerData() {
                this.viewerData = this.convertHtml(this.codeParse)
            },
            convertHtml(value) {
                let cont = value;
                console.log(cont)
                console.log("all",cont.match(expCode))
                console.log("mention",cont.match(expMention))
                console.log("link",cont.match(expLink))

                if(cont.match(expLink)) {
                    cont = cont.replace(expLink, `<a class="link" href="$2" style="${this.linkStyle}" v-hw-tooltip="$2" target="_blank">$1</a>`);
                }
                if(cont.match(expMention)) {
                    cont = cont.replace(expMention, `<span class="mention" id="$2" style="${this.mentionStyle}">$1</span>`);
                }


                return cont
            },
            convertToCode(contents) {
                let parseData = [];
                contents = contents.replace(/<[br]>/gi , '');
                let contentsArr = contents.split(/<\/[^>]*>/g);

                contentsArr.forEach(content => {
                    let idText = '';
                    let m;
                    while ((m = expAttrs.exec(content)) != null) {
                        console.log(m)
                        if(m[1].indexOf('id') > -1) {
                            idText = `](${m[2]})`;
                        }
                        if(m[1].indexOf('href') > -1) {
                            idText = `](${m[2]})`
                        }
                    }
                    parseData.push(content.replace(expHtml, `[`)+idText);
                });
                return parseData.join(' ')
            },
        }
    }

</script>

<style lang="scss">
    .hw-text-editor {
        width: 100%;
        height: 34px;
        border: 1px solid #d6d6d6;
        color: #333;
        font-weight: 400;
        font-size: 14px;
        line-height: 1.5;
        overflow: hidden;
        transform-origin: top;
        overflow-y: auto;
        &:hover {
            border-color: #2985DB;
        }
        &:focus {
            border-color: #2985DB;
        }
        &.open.textarea {
            height: 165px;
            min-height: 165px;
        }
        .hw-textarea {
            height: 100%;
        }
        .defaultText {
            color: #C4C4C4;
            padding: 6px 10px;
        }
        &.open.input {
            height: auto;
            min-height: 34px;
            max-height: 80px;
        }
    }

    .result-title {
        font-size: 14px;
        font-weight: 700;
    }
    .result-wrapper {
        width: 100%;
        padding: 10px;
        background-color: #EFEFEF;
        margin-bottom: 10px;
        .code {
            white-space: pre-wrap;
        }
    }
    .hw-editor-viewer {
        border: 1px solid #909090;
        .content-wrapper {
            padding: 10px;
        }
    }

    // transition textarea : extend-input
    .extend-input-enter-active {
        transition: all 250ms ease-in-out;
    }
    .extend-input-leave-active {
        transition: all 250ms ease-in-out;
        height: 164px;
        /*transform: scaleY(1);*/
    }
    .extend-input-enter, .extend-input-leave-to {
        /*transform: scaleY(0);*/
        opacity: 0;
    }

    .type-result {
        white-space: pre-wrap;
    }
</style>