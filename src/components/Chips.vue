<template lang="pug">
    div.context-menu-view
        .contents-detail-view
            hw-tab(:tab-list="tabList", v-slot="{tab}", :tab-class="`tab-item`")
                span(@click="setContents(tab.key)") {{tab.name}}
            .contents-section
                template(v-if="showInfo")
                    components(:is="infoComp", :usage="usage", :props-data="propsData", :event-data="eventData")
                template(v-else)
                    .section-title Types
                    //.add-test
                        .hw-button.icon(v-for="color in colorPalette", :key="color", :class="`${color}`", @click="addTags(color)")
                            i.gis.gi-plus
                    .type-wrapper
                        .type-title 기본
                        .type-desc
                        .type-preview(:style="previewSize")
                            .chips-wrapper
                                hw-chips(:idx='0', :chips-text="contentsText[0]")
                                hw-chips(:idx='1', :chips-text="contentsText[1]")
                    .type-wrapper
                        .type-title 삭제 버튼 사용
                        .type-desc
                        .type-preview(:style="previewSize")
                            .chips-wrapper
                                hw-chips(:idx='2', :chips-text="contentsText[2]", :is-delete="true" @delete="delChip")
                                hw-chips(:idx='3', :chips-text="contentsText[3]", :is-delete="true" @delete="delChip")
                    .type-wrapper
                        .type-title 아이콘 사용
                        .type-desc
                        .type-preview(:style="previewSize")
                            .chips-wrapper
                                template(v-for="(icon, index) in iconText")
                                    hw-chips(:key='index', :idx='index', :chips-text="icon", :icon-class="`gis gi-${icon}`")
                            .chips-wrapper
                                template(v-for="(icon, index) in iconText")
                                    hw-chips(:key='index', :idx='index', :chips-text="icon", :icon-class="`gi gi-${icon}`")
                    .type-wrapper
                        .type-title Disabled
                        .type-desc
                        .type-preview(:style="previewSize")
                            .chips-wrapper
                                hw-chips(:idx='0', :chips-text="`활성`", :disabled="false")
                                hw-chips(:idx='1', :chips-text="`비활성`", :disabled="true")
                    .type-wrapper
                        .type-title Event
                        .type-desc
                        .type-preview(:style="previewSize")
                            .chips-wrapper
                                hw-chips(:idx='0', :chips-text="`click: ${clickCount}`", @onclick="clickChip")
                    .type-wrapper
                        .type-title Color
                        .type-desc
                        .type-preview(:style="previewSize")
                            .chips-wrapper
                                template(v-for="(color, index) in colorPalette")
                                    hw-chips(:key='index', :idx='index', :chips-text="color", :color-name="color")
                            .chips-wrapper
                                template(v-for="(color, index) in colorPalette")
                                    hw-chips(:key='index', :idx='index', :chips-text="color", :color-name="color", :is-delete="true")
                            .chips-wrapper
                                hw-chips( :idx='0', :chips-text="`받은편지함`", :color-name="`gray`")
                                hw-chips( :idx='1', :chips-text="`공용메일메모적는곳`", :color-name="`yellow`")

                            .chips-wrapper
                                hw-chips( :idx='0', :chips-text="`받은편지함`", :color-name="`gray`", :is-delete="true")
                                hw-chips( :idx='1', :chips-text="`공용메일메모적는곳`", :color-name="`yellow`", :is-delete="true")

</template>

<script>
    import InformationView from "./InformationView";
    export default {
        name: 'hw-chips-view',
        components: {InformationView},
        data () {
            return {
                showInfo: false,
                infoComp: '',
                tabList: [
                    {name:'Types', key: 'type'},
                    {name:'Information', key: 'info'}
                ],
                previewSize: {
                    width: '100%'
                },
                contentsText: ['동기들', '도메인사업부', '서비스운영팀', '인프라플랫폼팀'],
                iconText: ['bug', 'calendar', 'archive', 'cog', 'comment', 'download', 'label', 'tag', 'plus', 'minus', 'star',],
                clickCount: 0,
                colorPalette: [
                    'red', 'orange', 'yellow', 'lightgreen', 'green', 'lightblue', 'blue', 'purple', 'gray'
                ],
            }
        },
        methods: {
            delChip(idx) {
                alert(this.contentsText[idx]+' 삭제 ')
            },
            clickChip(value) {
                console.log('value');
                console.log(value);
                this.clickCount++
            }
        }

    }
</script>
