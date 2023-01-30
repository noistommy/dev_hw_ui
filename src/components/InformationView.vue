<template lang="pug">
    .info-view
        .section-title Information
        .info-wrapper
            .info-title Name
            .name-info
                .panel
                    //.panel-header Name
                    .panel-body {{`Hw-${$route.name}`}}
        .info-wrapper
            .info-title Usage
            .usege-info
                .props-info
                .panel
                    //.panel-header Usage
                    .panel-body
                        pre.language-css
                            code {{usage}}
        .info-wrapper
            .info-title Props
            .props-info
                .panel
                    //.panel-header Props
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
        .info-wrapper
            .info-title Event
            .event-info
                .panel
                    //.panel-header Event
                    .panel-body.table
                        .table
                            .tr
                                .th Name
                                .th Param Type
                                .th Desc
                            .tr(v-for="event in eventData", :key="event.name")
                                .td {{event.name}}
                                .td {{event.type}}
                                .td {{event.desc}}


</template>

<script>
    export default {
        name: 'information-view',
        props: {
            usage: String,
            propsData: Array,
            eventData: Array,
        }
    }
</script>

<style lang="scss" scoped>
    .td{
        word-break: break-all;
    }
</style>