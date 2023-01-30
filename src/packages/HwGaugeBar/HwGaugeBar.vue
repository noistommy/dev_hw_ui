<template>
    <div class="hw-progress-bar" >
        <div v-if="title !== ''" :class="['bar-title','ellipsis',`title-${titleAlign || 'top-left'}`]">
            <slot name="title">{{title}}</slot>
        </div>
        <div class="bar-wrapper" :style="{height: `${thickSize}px`}">
            <div class="bar-value-list" v-if="showTitle || showValue" >
                <div class="bar-value-item" :style="{width: item.ratio + '%', zIndex: index*-1+data.length}" v-for="(item, index) in data" :key="index">
                    <div  :class="['bar-item-text',`text-${valuePos}`,'ellipsis']" :style="valueStyle">
                        <span>{{showTitle ? item.text : item.ratio+'%'}}</span>
                    </div>
                </div>
            </div>
            <div class="bar-list" :style="{height: `${thickSize}px`, borderRadius: computedRound}" :class="[{round},{border:isBorder}]">
                <div v-if="gaugeData" class="active-gauge" :class="[gaugeData.background]" :style="{width: `${gaugeData.ratio}%`}"></div>
                <div class="bar-item-ratio" :style="{width: item.ratio + '%', zIndex: index*-1+data.length}" v-for="(item, index) in data" :key="index">
<!--                    <div v-if="showTitle || showValue" :class="['bar-item-text',`text-${valuePos}`,'ellipsis']" :style="{color: valueColor}">-->
<!--                        <span>{{showTitle ? item.text : item.ratio+'%'}}</span>-->
<!--                    </div>-->
                    <div :style="{width: item.progress + '%'}" class="bar-item-progress"
                         :class="[ {itemRound:roundType === 'item'}, item.backgroundClass ? `hw ${item.backgroundClass} shape` : `hw ${colorSet[index % colorSet.length]} shape`]">
                        <template v-if="roundType === 'item'">
                            <!--                        <div class="round-left" :style="{width: `${thickSize}px`}"></div>-->
                            <div class="round-right" :style="{width: `${thickSize}px`, height:`${thickSize}px`, top: `${isBorder ? -1 : 0}px`}"></div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="useScale" class="scaleList" :style="{paddingTop: `${scaleGap}px`}" :class="scaleDirection">
            <div class="scaleItem" v-for="(item, index) in data" :key="index">
                <div class="scale-mark" :class="[scaleType, item.backgroundClass ? `hw ${item.backgroundClass} shape` : `hw ${colorSet[index % colorSet.length]} shape`]"></div>
                <div class="scale-text">{{item.text}}</div>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'hw-progress-bar',
        props: {
            title: {
                type: String,
                default: '',
                required: false
            },
            titleAlign: {
                type: String,
                default: 'top-left',
                required: false,
            },
            showTitle: {
                type: Boolean,
                default: false
            },
            showValue: {
                type: Boolean,
                default: false
            },
            valuePos: {
                type: String,
                default: 'center'
            },
            valueStyle: {
                type: Object,
                default () {
                    return {}
                }
            },
            thickSize: {
                type: Number,
                default: 20
            },
            round: {
                type: Boolean,
                default: false
            },
            roundType: {
                type: String,
            },
            data: {
                type: Array,
                default: () => [{
                    text: '100',
                    ratio: 100,
                    progress: 100,
                    backgroundClass: 'secondary-bg'
                }],
                required: false,
            },
            colorSet: {
                type: Array,
                default: () => [
                    'red', 'orange', 'yellow', 'lightgreen',
                    'green', 'lightblue', 'blue', 'deepblue',
                    'purple', 'deeppurple', 'brown', 'gray'
                ]
            },
            useScale: {
                type: Boolean,
                default: false
            },
            scaleGap: {
                type: Number,
                default: 20
            },
            scaleType: {
                type: String,
                default: ''
            },
            scaleDirection: {
                type: String,
                default: 'start'
            },
            isBorder: {
                type: Boolean,
                default: false
            },
            gaugeData: {
                type: Object,
                default () {
                    return {
                        ratio: 0,
                        background: 'primary-bg'
                    }
                }
            }
        },
        data () {
            return {}
        },
        computed: {
            computedRound() {
                return this.round ? `${this.thickSize/2}px` : '';
            },
            computedTop() {
                return this.showTitle ? `25px` : 0;
            },
            computedBottom() {
                return this.useScale ? `${this.scaleGap + 25}px` : 0;
            }
        },
        // watch: {
        //     gaugeData (value) {
        //         return value
        //     }
        // },
        methods:{}
    }
</script>
<style lang="scss">
    $title-positions:
                    ('top-left', 100%, 0, none),
                    ('top-center', 100%, 50%, translateX(-50%)),
                    ('top-right', 100%, 100%, translateX(-100%));
    .hw-progress-bar{
        position: relative;
        width: 100%;
        height: 100%;
        margin-bottom: 5px;
        .bar-wrapper {
            position: relative;
        }
        .bar-list {
            position: absolute;
            display: flex;
            flex-flow: row nowrap;
            width: 100%;
            height: 100%;
            //border: 1px solid #d6d6d6;
            background-color: #d6d6d6;
            overflow: hidden;
            .active-gauge {
                position: absolute;
                z-index: 100;
                height: 100%;

            }
        }
        .bar-value-list {
            position: absolute;
            display: flex;
            flex-flow: row nowrap;
            width: 100%;
            height: 100%;
            z-index: 100;
        }
        .bar-title{
            width: auto;
            white-space: nowrap;
            margin: 0 5px 10px;
            font-weight: 700;
            font-size: 1.2em;
            @each $title-position, $bottom, $left, $translateX in $title-positions{
                &.title-#{$title-position}{
                    bottom: $bottom;
                    left: $left;
                    transform: $translateX;
                }
            }
        }
        /*.bar-item-ratio{*/
        .bar-item-ratio{
            position: relative;
            .bar-item-progress{
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: width 0.25s ease;
                &.primary {
                    background-color: #2985DB;
                }
                &.secondary {
                    background-color: #F8F8F8;
                }
            }
        }
        .bar-value-item{
            position: relative;
            .bar-item-text{
                width: auto;
                position: absolute;
                display: inline-block;
                //top: 50%;
                transform: translate(-50%, -50%);
                white-space: nowrap;
                z-index: 10;
                color: #333;
                /*text-shadow: 0 0 3px #909090;*/
                /*font-weight: 600;*/
                /*&:[class *= "top"] {}*/
                &[class*='-top'] {
                    bottom: 100%;
                    transform: translate(-50%, 0)
                }
                &[class*='-bottom'] {
                    top: 100%;
                    transform: translate(-50%, 0)
                }
                &.text-top {
                    &-left{left: 0;}
                    &-center{left: 50%;}
                    &-right{left: 100%;}
                }
                &.text-bottom {
                    &-left{left: 0;}
                    &-center{left: 50%;}
                    &-right{left: 100%;}
                }
                &.text-left{
                    top: 50%;
                    left: 0;
                    transform: translate(0, -50%)
                }
                &.text-center{
                    top: 50%;
                    left: 50%;
                }
                &.text-right{
                    top: 50%;
                    right: 0;
                    transform: translate(0, -50%)
                }
            }

        }
        .round {
            .bar-item-ratio {
                .bar-item-progress.itemRound {
                    position: relative;
                    > div {
                        display: inline-block;
                        position: absolute;
                        height: 100%;
                        top:0;
                        border-radius: 50%;
                        background-color: inherit;
                        z-index: -1;
                    }
                }
                &:last-child .round-right {display: none;}
            }
            &-left {
                left: 0;
                transform: translateX(-50%);
            }
            &-right{
                right: 0;
                transform: translateX(50%);
            }


        }
        .border {
            border: 1px solid #ebebeb;
            .bar-item-ratio {
                border-right: 1px solid #ebebeb;
                &:last-child {
                    border: 0
                }
            }
            &.round {
                div[class*='round-'] {
                    border: 1px solid #ebebeb;
                }
            }
        }
        .scaleList {
            display: flex;
            &.start{justify-content: flex-start}
            &.end{justify-content: flex-end}
            &.center{justify-content: center}
            .scaleItem {
                margin-right: 30px;
                display: flex;
                .scale-mark {
                    width:16px;
                    height:16px;
                    margin-top: 1px;
                    margin-right: 10px;
                    &.circle {
                        border-radius: 50%;
                    }
                    &.round {
                        border-radius: 2px;
                    }
                    &.line {
                        width: 30px;
                        height: 4px;
                        border-radius: 2px;
                        margin-top: 7px;
                    }
                }
                .scale-text {}
            }
        }
    }
</style>
