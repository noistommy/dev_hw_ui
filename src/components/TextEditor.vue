<template lang="pug">
    div.buttons-view
        .contents-detail-view
            .contents-section
                .section-title Types
                .type-wrapper
                    .type-title Extend Textarea Type
                    .type-desc Extend Textarea Type
                    .type-preview
                        .hw-text-editor.textarea(:class="{open: isActive}", @click="activateEditor")
                            //transition(name="extend-input")
                            //hw-text-editor(
                            hw-text-editor2(
                                :is-extend="isExtend",
                                :is-active="isActive",
                                :use-mention="true",
                                :mention-list="mentions",
                                :mention-key="'id'",
                                :border-line="false",
                                @update="updateText" v-if="isActive")
                    .type-result-html.panel
                        .result-title.panel-header 에디터 표출 데이터
                        .result-wrapper.panel-body(v-html="htmlParse")
                        .result-title.panel-header 사용자뷰로 전달된 HTML 데이터
                        .result-wrapper
                            pre.language-css
                                .code {{unitData.content}}
                        .result-title.panel-header 서버로 전송되는 데이터 (HTML -> Text)
                        .result-wrapper
                            .code {{codeParse}}
                        .result-title.panel-header 서버의 Text를 HTML로 변환한 데이터 (Text -> HTML)
                        .result-wrapper
                            .code {{htmlParse}}
                .type-wrapper
                    .type-title Input Type
                    .type-desc Input Type
                    .type-preview
                        .hw-text-editor.input(:class="{open: isActive2}", @click="activateEditor2")
                            transition(name="extend-input")
                                hw-text-editor(
                                    :is-extend="isExtend",
                                    :is-active="isActive2",
                                    :mention-list="mentions",
                                    :border-line="false",
                                    :pop-direction="`up`"
                                    @update="updateText" v-if="isActive2")
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
    // const expHtml = /<[^>]*>/g;
    // const expAttrs = /(\S+)=[\s"']?((?:.(?!["']?\s+(?:\S+)=|[>"']))*.)["']?/g;
    // const expCode = /\[([@|ㄱ-ㅎ|ㅏ-ㅣ|가-힣|&#;|0-9|\w\s|()]+)]\(([//|A-Z0-9+&@#/%?=~_|!:,.;|\w|\d]+)\)/gi;
    // const expMention = /\[([@|&#64;][^\]]*)\]\(([^)]*)\)/gi;
    // const expLink = /\[([^\]]*)\]\((([http://]+)([^)]*))\)/gi;

    export default {
        name: 'hw-text-edit',
        data() {
            return {
                usage: "<hw-text-editor \n" +
                    ":content-data='convertStringToHTML(String)'\n" +
                    ":mention-list='[{}]'\n" +
                    ":mention-key=''\n" +
                    ":border-line='{true|false}'\n" +
                    ":mention-all='{true|false}'\n" +
                    ":is-active='{true|false}'\n" +
                    ":is-extend='{true|false}'\n" +
                    "@update='{function}'\n" +
                    "@empty='{function}'\n" +
                    "/>",
                propsData: [
                    {name: 'content-html', type:'String(HTML)', default:'', desc: '기본으로 입력되어 있는 데이터 지정 ex.) 게시글 수정'},
                    {name: 'spell-check', type: 'Boolean', default: 'false', desc: '에디터 내부 문자열에 대한 스펠링 체크 기능 사용 유무'},
                    {name: 'content-editable', type: 'Boolean', default: 'true', desc: '에디터 내부 문자열에 대한 스펠링 체크 기능 사용 유무'},
                    {name: 'place-holder', type:'String', default:'', desc: '[구현 예정]'},
                    {name: 'mention-list', type:'Array', default:'', desc: '멘션 대상 목록'},
                    {name: 'mention-key', type:'String', default:'', desc: '멘션 데이터 구분자 키 이름'},
                    {name: 'border-line', type:'Boolean', default:'', desc: '외부 테두리 사용 선택'},
                    {name: 'mention-all', type:'Boolean', default:'true', desc: '멘션 리스트 전체 선택기능 사용 유무'},
                    {name: 'is-extend', type:'Boolean', default: 'true', desc: '에디터 내부 콘텐트의 길이가 기본 높이를 넘어설 때 스크롤로 표현할지 높이를 증가시킬지 선택'},
                    {name: 'is-active', type:'Boolean', default:'false', desc: '[현재 사용하지 않음.]'},
                    {name: 'pop-direction', type:'String', default: 'down', desc: '멘션 선택 메뉴 표시 방향 [\'up\',\'down\']'},
                    {name: 'extend-height', type: 'Number', default: 33, desc: '에디터의 초기 높이값 지정'},
                ],
                placeholder: 'Insert Text.',
                isExtend: true,
                isActive: true,
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
                htmlParse: '',
                viewerData: '',
                mentionStyle: "color:#2985db; font-weight:600; padding: 0 3px;",
                linkStyle: "color:#2985db; text-decoration: underline; padding: 0 3px; display: inline",
                eventData: [
                    {
                        name: '@update',
                        type: 'String',
                        desc: '에디터 입력시 부모 컴포넌트로 전송하는 에디터 내부 innerHTML'
                    },
                    {
                        name: '@empty',
                        type: 'Boolean',
                        desc: '에디터 내부 내용이 존재하는지의 유무를 반환'
                    }
                ]
            }
        },
        methods: {
            activateEditor () {
                this.isActive = true;
            },
            activateEditor2 () {
                this.isActive2 = true;
            },
            updateText (contents) {
                this.unitData.content = contents;
                this.codeParse = this.convertToText(contents);
                this.htmlParse = this.convertHtml(this.codeParse)
            },
            setViewerData() {
                this.viewerData = this.convertHtml(this.codeParse)
            },
            convertHtml(contents) {
                const expOldMention =/\[\[([ㄱ-ㅎ|ㅏ-ㅣ|가-힣|&#;|0-9|\w\s|()]+)\]\]/gi;
                const expMention = /\[([@|&#64;][^\]]*)\]\(([^)]*)\)/gi;
                const expLink = /\[([^\]]*)\]\((([http://]+)([^)]*))\)/gi;
                // const expCode = /\[([@|ㄱ-ㅎ|ㅏ-ㅣ|가-힣|&#;|0-9|\w\s|()]+)]\(([//|A-Z0-9+&@#/%?=~_|!:,.;|\w|\d]+)\)/gi;
                // console.log("all",contents.match(expCode));
                // console.log("mention",contents.match(expMention));
                // console.log("link",contents.match(expLink));

                if(contents.match(expLink)) {
                    contents = contents.replace(expLink, `<a class="link" href="$2" style="${this.linkStyle}" v-hw-tooltip="$2" target="_blank">$1</a>`);
                }
                if(contents.match(expMention)) {
                    contents = contents.replace(expMention, `<span class="mention" id="$2" style="${this.mentionStyle}">$1</span>`);
                }
                // Old Group Mention Code Convert
                if(contents.match(expOldMention)) {
                    contents = contents.replace(expOldMention, `<span class="mention" style="${this.mentionStyle}">@$1</span>`);
                }

                let out = ''
                const textLines = contents.split('\n')
                for (let i = 0; i < textLines.length; i++) {
                    if (i === 0) {
                        out += textLines[i]
                    } else {
                        const div = document.createElement('div')
                        div.innerHTML = textLines[i] || '<br>'
                        out += div.outerHTML
                    }
                }
                return out
            },
            convertToText(contents) {
                const doc = new DOMParser().parseFromString(contents, "text/html");
                let childNodes = doc.body.childNodes;
                let result = ''
                const convertToText = (childNodes) => {
                    if(childNodes.length === 0) return '';
                    let out = '';
                    childNodes.forEach(node => {
                        switch (node.constructor) {
                            case Text:
                                out += node.textContent;
                                break;
                            case HTMLBRElement:
                                out += '';
                                break;
                            case HTMLSpanElement:
                                out += `[@${node.dataset.title}](${node.dataset.id})`;
                                break;
                            case HTMLAnchorElement:
                                out += `[${node.href}](${node.href})`;
                                break;
                            case HTMLDivElement:
                            case HTMLParagraphElement:
                                out += '\n' + convertToText(node.childNodes);
                                break;
                        }
                    })
                    return out;
                }
                result = convertToText(childNodes)
                return result.trim();
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
        /*margin-bottom: 10px;*/
        border-bottom: 1px solid #d6d6d6;
        .code {
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