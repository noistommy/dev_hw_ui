<template lang="pug">
    div.date-picker-view
        .contents-detail-view
            hw-tab(:tab-list="tabList", v-slot="{tab}", :tab-class="`tab-item`")
                span(@click="setContents(tab.key)") {{tab.name}}
            .contents-section
                template(v-if="showInfo")
                    components(
                        :is="infoComp",
                        :usage="usage",
                        :props-data="propsData",
                        :event-data="eventData"
                    )
                template(v-else)
                    .section-title Types
                    .type-wrapper(v-for="(type, index) in contentList", :key="index")
                        .type-title {{type.title}}
                        .type-desc {{type.description}}
                        .type-preview(:style="previewSize")
                            .extend-list-wrapper
                                hw-expand-list(v-bind="type.option")
               
</template>
<script>
    import InformationView from './InformationView';
    export default {
        name: 'expand-list-view',
        data () {
            return {
                previewSize: {width: '100%'},
                usage: `<hw-expand-list :title='String' :content='String' :is-expanded="Boolean" ></hw-expand-list>`,
                propsData: [
                    {name: 'imageFiles', type:'Array', default:'[]', desc: '이미지 파일 데이터 리스트' },
                    
                ],
                eventData: [
                    {name: 'add-files', type: 'Array', desc: '파일 컨트롤러에 파일 업로드시 발생. 새롭게 추가된 파일을 리스트에 담아 전달.'},
                    
                ],
                collapseData: {
                    title: 'Hello',
                    content: `각 클래스에는 트랜지션 이름이 접두어로 붙습니다. 여기서v-접두어는 이름없이 <transition> 엘리먼트를 사용할 때의 기본값입니다. 예를 들어<transition name = "my-transition">을 사용하면v-enter 클래스는 my-transition-enter 가 됩니다.v-enter-active 와v-leave-active 는 입/출력 트랜지션을 위한 다른 easing curve를 지정할 수있는 기능을 제공합니다. 다음 섹션에서 그 예를 보실 수 있습니다.각 클래스에는 트랜지션 이름이 접두어로 붙습니다. 여기서v-접두어는 이름없이 <transition> 엘리먼트를 사용할 때의 기본값입니다. 예를 들어<transition name = "my-transition">을 사용하면v-enter `,
                    isExpanded: false
                },
                tabList: [
                    {name:'Types', key: 'type'},
                    {name:'Information', key: 'info'}
                ],
                showInfo: false,
                contentList: [{
                    title: 'Standard',
                    description: 'A Standard ExpandList',
                    option: {
                        data: {
                            title: 'Hello',
                            content: `각 클래스에는 트랜지션 이름이 접두어로 붙습니다. 여기서v-접두어는 이름없이 <transition> 엘리먼트를 사용할 때의 기본값입니다. 예를 들어<transition name = "my-transition">을 사용하면v-enter 클래스는 my-transition-enter 가 됩니다.v-enter-active 와v-leave-active 는 입/출력 트랜지션을 위한 다른 easing curve를 지정할 수있는 기능을 제공합니다. 다음 섹션에서 그 예를 보실 수 있습니다.각 클래스에는 트랜지션 이름이 `,
                            isExpanded: false
                        },
                        maxHeight: 300
                    }
                }, {
                    title: 'Standard',
                    description: 'A Standard ExpandList',
                    option: {
                        data: {
                            title: 'Hello',
                            content: `각 클래스에는 트랜지션 이름이 접두어로 붙습니다. 여기서v-접두어는 이름없이 <transition> 엘리먼트를 사용할 때의 기본값입니다. 예를 들어<transition name = "my-transition">을 사용하면v-enter 클래스는 my-transition-enter 가 됩니다.v-enter-active 와v-leave-active 는 입/출력 트랜지션을 위한 다른 easing curve를 지정할 수있는 기능을 제공합니다. 다음 섹션에서 그 예를 보실 수 있습니다.각 클래스에는 트랜지션 이름이 `,
                            isExpanded: false
                        }
                    }
                }]
            }
        },
        methods: {
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
	
<style lang="scss" scoped>
    .extend-list-wrapper {
        border: 1px solid #D6D6D6;
    }
</style>
