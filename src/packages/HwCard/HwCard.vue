<template>
    <div class="hw-card column" :class="[{cardBounce: useBounce}, classShadow]">
        <div class="card-contents">
            <slot>Card Content {{id}}</slot>
        </div>
        <div class="card-label" v-if="useLabel">
            <slot name="label"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'hw-card',
        data() {
            return {
                cardSize: 0
            }
        },
        props: {
            id: {
                type: [String, Number],
                default: 0
            },
            useLabel: {
                type: Boolean,
                default: false
            },
            useShadow: Boolean,
            shadowType: {
                type: String,
                default: '' // always || hover
            },
            useBounce: Boolean
        },
        computed: {
            classShadow() {
                return this.useShadow ? `shadow-${this.shadowType}` : ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    .hw-card {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 30px;
        border: 1px solid #d6d6d6;
        border-radius: 6px;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        &.cardBounce {
            transition: transform 300ms ease;
            &:hover {
                transform: translateY(-5px);

            }
        }
        &.shadow {
            &-always {box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);}
            &-hover:hover {box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);}
        }
        .card-label {
            position: absolute;
            top:0;
            left: 0;
            padding: 10px;
        }
    }
</style>