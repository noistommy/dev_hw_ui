<template>
    <div class="hw-card-group" :class="[`divide divide-${rowCount}`]">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'hw-card-group',
        data() {
            return {}
        },
        props: {
            rowGap: {
                type: Number,
                default: 10
            },
            columnGap: {
                type: Number,
                default: 10
            },
            rowCount: {
                type: Number,
                default: 3
            }
        },
        mounted() {
            console.log(this.$children)
        }
    }
</script>

<style lang="scss" scoped>
    .hw-card-group {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        margin-left: -5px;
        margin-right: -5px;
        &.divide {
            .card-column {padding: 5px}
            &-1 > .card-column {width: calc(100% / 1)}
            &-2 > .card-column {width: calc(100% / 2)}
            &-3 > .card-column {width: calc(100% / 3)}
            &-4 > .card-column {width: calc(100% / 4)}
            &-5 > .card-column {width: calc(100% / 5)}
            &-6 > .card-column {width: calc(100% / 6)}

        }
    }
</style>