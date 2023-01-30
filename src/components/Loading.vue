<template lang="pug">
    div.buttons-view
        .contents-detail-view
            .contents-section
                .section-title Types
                .type-wrapper
                    .type-title 기본 로딩
                    .type-desc 기본 아이콘 로딩
                    .type-preview
                        .penning-container
                            hw-loading(:is-loading="true", :mode="mode", :icon-w="40", :icon-h="40", :icon-color="`primary`")
                    .type-btn(@click="toggleCode")
                        i.gis.gi-short-arrow-left-alt
                        i.gis.gi-short-arrow-right-alt
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                                code.code(v-text='codeList["standard"]')
                .type-wrapper
                    .type-title Slot 아이콘
                    .type-desc Slot 아이콘 로딩
                    .type-preview
                        .penning-container.multiple
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`primary`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-loading
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`primary`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-bug
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`primary`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-lightbulb
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`primary`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-gem
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`primary`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-car
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`primary`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-globe
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`primary`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-sync
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`primary`")
                                span(slot="l-icon" class="user-iconw")
                                    i.gis.gi-cog
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`primary`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-crown
                    .type-btn(@click="toggleCode")
                        i.gis.gi-short-arrow-left-alt
                        i.gis.gi-short-arrow-right-alt
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                                code.code(v-text='codeList["slot"]')
                .type-wrapper
                    .type-title Color
                    .type-desc 지정색 아이콘 로딩
                    .type-preview
                        .penning-container.multiple
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`primary`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-loading
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`secondary`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-bug
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`info`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-lightbulb
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`warning`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-gem
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`danger`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-car
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`yellow`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-globe
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`red`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-sync
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`orange`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-cog
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`yellow`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-crown
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`lightgreen`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-user
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`green`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-bug
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`lightblue`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-lightbulb
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`blue`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-gem
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`deepblue`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-car
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`deeppurple`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-globe
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`purple`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-sync
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`brown`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-cog
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`gray`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-crown
                .type-wrapper
                    .type-title 텍스트 포함
                    .type-desc 텍스트가 추가된 로딩
                    .type-preview
                        .penning-container
                            hw-loading(:is-loading="true",  :mode="mode", :icon-w="40", :icon-h="40", :icon-color="`primary`", :with-text="`LOADING`")
                .type-wrapper
                    .type-title 전체화면
                    .type-desc 전체화면 로딩
                    .type-preview
                        //.penning-container
                        hw-loading(:is-loading="toggleLoading",  :mode="mode", :full-screen="true", :icon-w="40", :icon-h="40", :icon-color="`primary`")
                    div.hw-button.primary(@click="handleToggleLoading")
                        span 로딩 선택
                .type-wrapper
                    .type-title 다크 모드
                    .type-desc 다크모드 로딩
                    .type-preview
                        .penning-container
                            hw-loading(:is-loading="true", :mode="mode", :icon-w="40", :icon-h="40", :icon-color="`primary`")
                    .hw-button.primary(@click="handleToggleMode")
                        span {{mode}} mode
                .type-wrapper
                    .type-title 회전 속도
                    .type-desc
                        p 회전 속도 옵션 로딩 (VERY SLOW | SLOW | NORMAL | FAST | VERY FAST)
                        p (단, 사용자 아이콘(Slot 아이콘)에서만 적용)
                    .type-preview
                        .penning-container.multiple
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :speed="`very-slow`", :icon-color="`primary`", :with-text="`VERY SLOW`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-loading
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :speed="`slow`" :icon-color="`primary`", :with-text="`SLOW`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-bug
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`primary`", :with-text="`NORMAL`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-lightbulb
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :speed="`fast`" :icon-color="`primary`", :with-text="`FAST`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-gem
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :speed="`very-fast`" :icon-color="`primary`", :with-text="`VERY FAST`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-car
                .type-wrapper
                    .type-title 크기 선택
                    .type-desc
                        p 아이콘 크기 옵션 로딩 (TINY | SMALL | NORMAL | LARGE | HUGE)
                        p (단, 사용자 아이콘(Slot 아이콘)에서만 적용)
                    .type-preview
                        .penning-container.multiple
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :size="`tiny`", :icon-color="`primary`", :with-text="`Tiny`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-loading
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :size="`small`", :icon-color="`primary`", :with-text="`Small`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-bug
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :icon-color="`primary`", :with-text="`Midium`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-lightbulb
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :size="`large`", :icon-color="`primary`", :with-text="`Large`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-gem
                            hw-loading(:is-loading="true", :mode="mode", :user-spin="true", :size="`huge`", :icon-color="`primary`", :with-text="`Huse`")
                                span(slot="l-icon" class="user-icon")
                                    i.gis.gi-car
                .type-wrapper
                    .type-title Content Loading
                    .type-desc
                        | 특정 UI에 대한 컨텐츠 로딩 표출
                    .type-preview
                        .penning-container.content
                            hw-loading(:type="`content`", :is-loading="true", :icon-w="700", :icon-h="250")
                            hw-loading(:type="`content-feed`", :is-loading="true", :icon-w="700", :icon-h="250")
                            hw-loading(:type="`content-list`", :is-loading="true", :icon-w="700", :icon-h="250")

</template>2

<script>

    export default {
        name: 'hw-loading-view',
        data() {
            return {
                usage: "<hw-loading :is-loading='{true|false}' :icon-w='{n}' :icon-h='{n}' :icon-color='{color}'\n" +
                        "// slot icon \n" +
                        "/>",
                propsData: [
                    {name: 'contentData', type:'String', default:'', desc: '수정 할 글 데이터 ' },
                    {name: 'placeHolder', type:'String', default:'', desc: '' },
                    {name: 'mentionList', type:'Array', default:'', desc: '멘션 대상 목록' },
                    {name: 'borderLine', type:'Boolean', default:'', desc: '외부 테두리서 사용 선택' },
                    {name: 'mentionAll', type:'Boolean', default:'true', desc: '멘션 리스트에 전체 멘션에 대한 선택 포함 여부' },
                    {name: 'isActive', type:'Boolean', default:'false', desc: '' },
                ],
                codeList: {
                    standard:'<hw-loading :is-loading="{Boolean}" :icon-w="{n}" :icon-h="{n}" :icon-color="{color}"/>',
                    slot:'<hw-loading :is-loading="{Boolean}" :icon-color="{color}">\n' +
                        '   <span slot="l-icon" class="user-icon">\n' +
                        '       <i class="gis gi-loading">\n' +
                        '   </span>\n' +
                        '</hw-loading>'
                },
                toggleLoading: false,
                mode: 'light',
                isShow: true
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
            handleToggleLoading() {
                this.toggleLoading = true;
                setTimeout(() => {
                    this.toggleLoading=false
                },1000)
            },
            handleToggleMode () {
                this.mode = this.mode === 'light' ? 'dark' : 'light';
            }
        }
    }

</script>

<style lang="scss">
    .penning-container {
        position: relative;
        &.multiple {
            display: flex;
            align-items: center;
            .penning-wrapper {
                position: relative !important;
            }
        }
        .user-icon {
            font-size: 2em;
            display: inline-block;
            width: 30px;
            height: 30px;
            text-align: center;
        }
        &.content {
            background-color: #f8f8f8;
        }
    }


    .collapse-wrapper {
        .collapse-title {
            position: relative;
            background-color: #f2f2f2;
            .header {
                font-size: 1.8em;
                font-weight: 700;
            }
        }
        .arrow {
            position: absolute;
            top:0;
            right: 0;
            padding: 8px;
            transition: all 250ms ease-in-out;
            &.open {
                transform: rotate(720deg);
            }
        }
        .collapse-contents {
            background-color: #f8f8f8;
        }

    }
    .dropdown-slide-enter-active {
        transition: all 1000ms ease-in-out;
    }
    .dropdown-slide-leave-active {
        transition: all 1000ms ease-in-out;
        height: 300px;
    }
    .dropdown-slide-enter, .dropdown-slide-leave {
        transform: translateY(-10px);
        opacity: 0;
        height: 100px;
    }
</style>