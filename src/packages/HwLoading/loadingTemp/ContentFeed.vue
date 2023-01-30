<template>
    <content-loading :ws="ws" :hs='hs' :clip-id="id">
        <circle cx="38" cy="38" r="17" />
        <rect x="64" y="30" rx="2" ry="2" width="140" height="16" />
        <rect x="64" y="65" rx="2" ry="2" width="320" height="10" />
        <rect x="64" y="85" rx="2" ry="2" width="180" height="10" />
        <rect x="64" y="105" rx="2" ry="2" width="250" height="10" />
        <rect x="64" y="140" rx="2" ry="2" width="550" height="80" />
    </content-loading>

</template>
<script>
    import ContentLoading from "../ContentLoading";
    export default {
        name: 'loading',
        components:{ContentLoading},
        data () {
            return {

            }
        },
        props: {
            id: String,
            ws: Number,
            hs: Number,
            theme: {
                type:String,
                default: 'primary'
            },
            mode: String
        },
    }
</script>

<style lang="scss">

</style>