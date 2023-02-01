<template lang="pug">
    div.context-menu-view
        .contents-detail-view
            .contents-section
                .add-test
                    .hw-button.icon(v-for="color in colorPalette", :key="color", :class="`${color}`", @click="addTags(color)")
                        i.fa.fa-plus
                .type-wrapper
                    .type-title
                    .type-desc
                    .type-preview(:style="previewSize", )
                        .hw-tags-wrapper.one-of-a-kind
                            hw-tags(type="label")
                            hw-tags(:tags="tagList", type="label")
                            hw-tags(:tags="tagList", type="line")
                            hw-tags(:tags="tagList", type="dot")
                        .tags
                            hw-tag(:type="`label`", :color="`green`", :tag-text="`테스트`")
                .type-wrapper
                    .type-title
                    .type-desc
                    .type-preview(:style="previewSize" )
                        .hw-button.info
                            .label 테스트
</template>

<script>
    import InformationView from "./InformationView";

    export default {
        name: 'button-effect',
        data () {
            return {
                showInfo: false,
                tabList: [
                    {name:'Types', key: 'type'},
                    {name:'Information', key: 'info'}
                ],
                colorPalette: [
                    'red', 'orange', 'yellow', 'lightgreen', 'green', 'lightblue', 'blue', 'deepblue', 'deeppurple', 'purple', 'brown', 'gray'
                ],
                tagList: [
                    {id:0, color: 'green', tagText:'green'},
                    {id:1, color: 'red', tagText:'red'},
                    {id:2, color: 'blue', tagText:'blue'},
                    {id:3, color: 'orange', tagText:'orange'},
                ],
                previewSize: {
                    width: '100%'
                },
            }
        },
        methods: {
            addTags (colorName) {
                let id = this.tagList.length + 1;
                this.tagList.push({id: id, color: colorName, tagText: colorName});
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
    .hw-tags-wrapper {
        width: 450px;
    }
    .tags {
        width: 450px;
        font-size: 1.2em;
    }
    .one-of-a-kind .hw-tags {
        flex-wrap: wrap;
        visibility: hidden;
        &:hover > * {
            opacity: .4;
            transform: scale(.9);
        }
        > * {
            visibility: visible;
            transition: opacity 150ms linear 100ms, transform 150ms ease-in-out 100ms;
            &:hover {
                opacity: 1;
                transform: scale(1);
                transition-delay: 0ms, 0ms;
            }
        }

    }

</style>