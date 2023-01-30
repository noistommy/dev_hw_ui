<template>
    <content-loading :ws="ws" :hs='hs' :clip-id="id">
        <rect x="40" y="5" rx="2" ry="2" width="320" height="10" />
        <rect x="40" y="25" rx="2" ry="2" width="180" height="10" />
        <rect x="40" y="45" rx="2" ry="2" width="250" height="10" />
        <rect x="40" y="65" rx="2" ry="2" width="320" height="10" />
        <rect x="40" y="85" rx="2" ry="2" width="180" height="10" />
        <rect x="40" y="105" rx="2" ry="2" width="250" height="10" />
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