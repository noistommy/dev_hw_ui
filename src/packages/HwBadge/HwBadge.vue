<template>
    <span class="hw-badge" :class="[type, position,{shadow:isShadow}, `align-${align}`, color, {invert}, {mark:justMark}]" :style="computedOffset">
        <template v-if="!justMark">
            <slot>{{isSpacial ? spacialText : checkLimit}}</slot>
        </template>
    </span>
</template>

<script>
    export default {
        name: 'hw-badge',
        props: {
            type: {
                type: String,
                default: 'float' //contents
            },
            data: {
                type: [Number, String],
                required: true
            },
            isSpacial: {
                type: Boolean,
                default: false
            },
            spacialText: {
                type: String,
                default: 'N'
            },
            offsetX: {
                type: Number,
                default: -5
            },
            offsetY: {
                type: Number,
                default: -5
            },
            position: {
                type: String,
                default: 'top-right'
            },
            align: {
                type: String,
                default: 'right'
            },
            isShadow: {
                type: Boolean,
                default: false
            },
            color: {
                type: String,
                default: 'primary'
            },
            limitCount: {
                type: Number,
                default: 1000
            },
            invert: {
                type: Boolean,
                default: false
            },
            justMark: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            computedOffset() {
                let offsets = {};
                // let distX = this.align === 'right' ? this.offsetX+'px' : `calc(100% - ${16 + this.offsetX}px)`;
                let distY = this.type === 'float' ? this.offsetY+'px' : 0;
                let pos = this.position.split('-');

                offsets[pos[0]] = distY;
                if(this.align === pos[1]) {
                    offsets[pos[1]] = this.offsetX+'px'
                }else {
                    offsets[this.align] = `calc(100% - ${16 + this.offsetX}px)`
                }

                return offsets
            },
            checkLimit() {
                if(typeof this.data === 'string') return this.data;
                return this.data >= this.limitCount ? this.limitCount - 1 + '+' : this.data;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .hw-badge {
        cursor: default;
        display: inline-block;
        font-size: 11px;
        font-weight: 600;
        text-align: center;
        min-width: 16px;
        min-height: 16px;
        line-height: 1;
        padding: 4px 6px;
        border-radius: 10px;
        /*color: #ffffff;*/
        /*text-shadow: 0 0 2px #909090;*/
        position: absolute;
        &.contents {
            position: relative;
        }
        &.shadow {
            box-shadow: -2px 2px 0px 0px rgba(0, 0, 0, 0.2);
        }
        &.mark {
            min-width: 5px;
            min-height: 5px;
            padding: 0;
        }
        /*&.primary {*/
        /*    background-color: #2985DB;*/
        /*}*/


    }
</style>