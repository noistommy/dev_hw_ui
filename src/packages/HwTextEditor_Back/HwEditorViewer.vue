<template>
    <div class="hw-editor-viewer">
        <div class="content-wrapper" v-html="contents"></div>
    </div>
</template>

<script>
    export default {
        name: 'hw-editor-viewer',
        data() {
            return {
                contents: ''
            }

        },
        props: {
            contentsData: String
        },
        watch: {
            contentsData() {
                this.contents = this.contentsData;
            }
        },
        created() {
            this.contents = this.contentsData;
        },
        methods: {

        }
    }
</script>
<style lang="scss">
    .content-wrapper {
        white-space: pre-wrap;
    }
</style>