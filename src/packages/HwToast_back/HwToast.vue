<template>
    <transition name="slide-fade">
        <div class="hw-toast" :class="[{type}, {icon: icon != null}, {position},]">
            <span v-if="icon != null">
                <i class="gis" :class="`gi-${icon}`"></i>
            </span>
            <span class="message">
                {{toast_msg}}
            </span>
            <span class="btn-close">
                <i class="fa fa-close"></i>
            </span>
        </div>

    </transition>
</template>
<script>
    export default {
        name: 'hw-toast',
        data () {
            return {
                toast_msg: '',
            }
        },
        props: {
            type: {
                type: String,
                default: 'default'
            },
            icon: {
                type: String,
                default: null
            },
            position: {
                type: String,
                default: 'top-left' // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
            }
        }

    }
</script>

<style lang="scss">

</style>