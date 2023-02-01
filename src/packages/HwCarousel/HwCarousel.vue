<template>
    <div class="hw-carousel" @mouseenter="onHover" @mouseleave="onLeave" :class="[direction]">
        <div class="carousel-list" ref="carousel" >
            <slot>
                <div class="carousel-item" v-for="(item, index) in contentsList" :key="index"
                     :class="[ {current: currentIndex === index}, {prev: previewIndex === index}, {next: nextIndex === index}]">
                    <div class="contents-wrapper">
                        <div class="title">{{item.title}}</div>
                        <div class="desc">{{item.description}}</div>
                    </div>
                </div>
            </slot>
        </div>
        <div class="navigation" v-if="navType" :class="[navType]">
            <template v-if="navType === 'dot' || navType === 'line'">
                <div class="nav-item" v-for="nav in items.length" :key="nav" :class="{active: currentIndex === nav - 1}" @click="setCurrent(nav - 1)"></div>
            </template>
            <template v-if="navType === 'arrow'">
                <span class="nav-preview-btn" @click="movePrev"><i class="fa fa-chevron-left"></i></span>
                <span class="nav-current-count">{{currentIndex + 1}} / {{items.length}}</span>
                <span class="nav-next-btn" @click="moveNext"><i class="fa fa-chevron-right"></i></span>
            </template>
        </div>
        <div class="controller">
            <div class="control-btn">
                <i class="fa fa-status"></i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'hw-carousel',
        data () {
            return {
                items: [],
                currentIndex: -1,
                itemSize: 0,
                isAuto: false,
                callAuto: null,
                sIndex: 0,
                eIndex: 1,
                flow: ''
            }
        },
        props: {
            contentsList: {
                type: Array,
                default: () => {
                    return [{title: 'carousel', description: 'no data'}]
                }
            },
            auto: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 3000
            },
            navType: {
                type: String,
                default: null
            },
            length: {
                type: Number,
                default: 0
            },
            flowType: {
                type: String,
                default:'next'
            },
            direction: {
                type: String,
                default: 'horizontal'
            }
        },
        computed: {
            previewIndex() {
                let lastIndex = this.items.length - 1;
                return this.currentIndex === 0 ? lastIndex : this.currentIndex - 1;
            },
            nextIndex() {
                let lastIndex = this.items.length - 1;
                return this.currentIndex === lastIndex ? 0 : this.currentIndex + 1;
            }
        },
        mounted() {
            this.flow = this.flowType;
            this.itemSize = this.$el.clientWidth;
            this.updateItems();
            this.setCurrent(0);
            if(this.auto) {
                this.autoPlay();
            }
        },
        methods: {
            updateItems () {
                this.items = this.$children.filter(child => child.$options.name === 'hw-carousel-item')
            },
            movePrev () {
                this.flow = 'preview';
                this.setCurrent(this.previewIndex)
            },
            moveNext () {
                this.flow = 'next';
                this.setCurrent(this.nextIndex)
            },
            autoPlay() {
                this.callAuto = setInterval(() => {
                    if(this.flow === 'next') {
                        this.moveNext()
                    } else {
                        this.movePrev()
                    }
                }, this.interval)

            },
            pause() {
                this.stop = true;
                clearInterval(this.callAuto)
            },
            onHover() {
                this.pause()
            },
            onLeave() {
                if(this.auto) {
                    this.autoPlay()
                }
            },
            setCurrent(target) {
                this.currentIndex = target;
                this.items.forEach(item => item.setItemPosition(target, this.nextIndex, this.previewIndex))
            },
            setActiveIndex (value) {
                console.log(value)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .hw-carousel {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        background-color: #D6D6D6;
        .carousel-list {
            height: 100%;
            position: relative;
            display: flex;
            background-color: #F2F2F2;
            .carousel-item {
                flex-shrink: 0;
                width: 100%;
                height: 100%;
                transition: all 1000ms ease;
                position: absolute;
                top:0;
                display: none;
                &.current {
                    display: block;
                    z-index: 2;
                    /*left: 0,*/
                    transform: translate3d(0, 0, 0);
                }
                &.prev {
                    display: block;
                    z-index: 1;
                    //left: -100%;
                    transform: translate3d(-100%, 0, 0);
                }
                &.next {
                    display: block;
                    z-index: 1;
                    transform: translate3d(100%, 0, 0);
                }
            }

        }
        .navigation {
            position: absolute;
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
            .nav-item {
                cursor: pointer;
                background-color: #909090;
                text-align: center;
                opacity: 0.5;
                border:2px solid #fff;
            }
            &.dot .nav-item {
                margin:2px;
                padding: 4px;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                &:hover {
                    opacity: 1;
                }
                &.active {
                    border-color: #333;
                }
            }
            &.line .nav-item{
                margin:2px;
                padding: 2px;
                width: 50px;
                height: 8px;
                border-radius: 5px;
                &:hover {
                    opacity: 1;
                }
                &.active {
                    border-color: #333;
                }
            }
            &.arrow {
                span[class*="nav-"] {
                    padding: 5px 10px;
                    background-color: #d6d6d6;
                    border-radius: 50%;
                    &.nav-current-count {
                        border-radius: 4px;
                        margin-left: 5px;
                        margin-right: 5px;
                    }
                }

            }
        }
        /*.stop-wrapper {*/
        /*    position: absolute;*/
        /*    width: 100%;*/
        /*    height: 100%;*/
        /*    z-index: 100;*/
        /*    top: 0;*/
        /*    display: none;*/
        /*    justify-content: center;*/
        /*    align-items: center;*/
        /*    font-size: 4em;*/
        /*    opacity: 0.5;*/
        /*    &.stop {*/
        /*        display: flex;*/
        /*    }*/
        /*    &:hover {*/
        /*        opacity: 1;*/
        /*    }*/
        /*    &.mini {*/
        /*        justify-content: flex-end;*/
        /*        align-items: flex-start;*/
        /*        font-size: 2em;*/
        /*    }*/
        /*    span {*/
        /*        padding: 10px;*/
        /*    }*/
        /*    i {*/
        /*        color: #F2F2F2;*/
        /*        transform: rotate(90deg);*/
        /*    }*/
        /*}*/
        /*&:hover .stop-wrapper {*/
        /*    display: flex;*/
        /*}*/
        &.horizontal {
            .navigation {
                bottom: 0;
                flex-direction: row;
                width: 100%;
                padding-bottom: 20px;
            }
        }
        &.vertical {
            flex-direction: column;
            .carousel-item {
                &.prev {
                    display: block;
                    z-index: 1;
                    transform: translate3d(0, -100%, 0);
                }
                &.next {
                    display: block;
                    z-index: 1;
                    transform: translate3d(0, 100%, 0);
                }
            }
            .navigation {
                top:0;
                right: 0;
                flex-direction: column;
                height: 100%;
                padding-right: 20px;
            }
        }
    }
</style>