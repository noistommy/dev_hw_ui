<template>
    <div class="hw-grid" :class="[`divide-${columnNum}`]">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'HwGrid',
        data() {
            return {}
        },
        props: {
            columnNum: {
                type: Number,
                default: 1
            }
        }
    }
</script>