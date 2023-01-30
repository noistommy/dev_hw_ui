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
                    .type-wrapper
                        .type-title Standard
                        .type-desc The Standard Switch toggle Button
                        .type-preview(:style="previewSize")
                            .hw-switch-wrapper
                                hw-switch(v-model="switchData", @switch="setValue")
                                .result {{switchData}} (Boolean)
                        .type-btn(@click="toggleCode")
                            i.gis.gi-short-arrow-left-alt
                            i.gis.gi-short-arrow-right-alt
                    .type-wrapper
                        .type-title Custom Value Text
                        .type-desc User use custom String value Data ex) ['YES | NO', 'TRUE | FALSE', 'ON | OFF']
                        .type-preview(:style="previewSize")
                            .hw-switch-wrapper
                                hw-switch(v-model="switchData", on-value="ON", off-value="OFF", @switch="setTextValue")
                                .result {{switchText}} (String)
                        .type-btn(@click="toggleCode")
                            i.gis.gi-short-arrow-left-alt
                            i.gis.gi-short-arrow-right-alt
                    .type-wrapper
                        .type-title Custom Value Text
                        .type-desc User use custom String value Data ex) ['YES | NO', 'TRUE | FALSE', 'ON | OFF']
                        .type-preview(:style="previewSize")
                            .result {{switchText}} (String)
                        .type-btn(@click="toggleCode")
                            i.gis.gi-short-arrow-left-alt
                            i.gis.gi-short-arrow-right-alt





            .hw-switch-wrapper
                                hw-switch(v-model="switchData", on-value="AM", off-value="PM", :type="`text`", @switch="setTextValue")

</template>

<script>
    import InformationView from "./InformationView";
    export default {
        name: 'hw-tags-view',
        components: {InformationView},
        data () {
            return {
                switchData: false,
                switchText: 'ON',
                usage: "<hw-switch v-model='{switchData}'></hw-switch>",
                eventData: [
                    {name: '@switch', type: 'String || Boolean', desc: '사용자가 선택한 값 반환'},
                ],
                contentsList: [
                    {
                        title: 'Standard',
                        description: 'A Standard Switch Toggle Button. 기본 토글 버튼  ',
                        option: {},
                        source: "<hw-switch v-model='{switchData}'></hw-switch>"
                    },
                    {
                        title: 'Custom Value Text',
                        description: 'User use custom String value Data ex) [\'YES | NO\', \'TRUE | FALSE\', \'ON | OFF\'] ',
                        option: {},
                        source: "<hw-switch v-model='{switchData}' on-value='{true-value}', off-value='{false-value}'></hw-switch>"
                    },

                ],
                propsData: [
                    {name: 'v-model', type:'String || Boolean', default:'false', desc: '' },
                    {name: 'onValue', type:'String', default:'', desc: '사용자 지정 True 텍스트' },
                    {name: 'offValue', type:'String', default:'', desc: '사용자 지정 False 텍스트' },
                ],
                previewSize: {
                    width: '100%'
                },
                showInfo: false,
                infoComp: '',
                tabList: [
                    {name:'Types', key: 'type'},
                    {name:'Information', key: 'info'}
                ],
            }
        },
        created() {
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
            setValue(value) {
                this.switchData = value;
            },
            setTextValue(value) {
                this.switchText = value;
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


    .hw-switch-wrapper {
        display: flex;
        .result {
            padding: 0 10px;
            font-weight: 600;
        }

    }



</style>