<template>
    <div class="hw-carousel">
        <div class="carousel-list" ref="carousel" :style="setListPosition">
            <div class="carousel-item" v-for="(item, index) in contentsList" :key="index"
                 :class="[ {current: currentIndex === index}, {prev: previewIndex === index}, {next: nextIndex === index}]">
                <div class="contents-wrapper">
                    <div class="title">{{item.title}}</div>
                    <div class="desc">{{item.description}}</div>
                </div>
            </div>
        </div>
        <div class="navigation" v-if="navType" :class="[navType]">
            <template v-if="navType === 'dot'">
                <div class="nav-item" v-for="nav in length" :key="nav" :class="{active: currentIndex === nav}" @click="setCurrent(nav)"></div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'hw-carousel',
        data () {
            return {
                currentIndex: 0,
                length: 0,
                itemSize: 0,
                isAuto: false,
                callAuto: null,
                sIndex: 0,
                eIndex: 1,
                direction: 'next',
                stop: false
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
            }
        },
        computed: {
            previewIndex() {
                let lastIndex = this.contentsList.length - 1;
                return this.currentIndex === 0 ? lastIndex : this.currentIndex - 1;
            },
            nextIndex() {
                let lastIndex = this.contentsList.length - 1;
                return this.currentIndex === lastIndex ? 0 : this.currentIndex + 1;
            },
            setListPosition() {
                let duration = '500ms';
                if(this.currentIndex === this.sIndex && this.direction === 'next' || this.currentIndex === this.contentsList.length-2 && this.direction === 'preview') {
                    duration = '0ms';
                }
                let current = this.currentIndex;
                return {
                    transform: `translate3d(-${current * this.itemSize}px, 0, 0)`,
                    transitionDuration: duration
                }
            }
        },
        created() {
            // this.isAuto = this.auto;

            this.length = this.contentsList.length;
            if(this.auto) {
                this.autoPlay();
                this.cloneItem()
            }
        },
        mounted() {
            this.itemSize = this.$el.clientWidth;


            let transition = this.$refs.carousel
            transition.addEventListener('transitionend', () => {
                if(this.direction === 'next' && this.currentIndex === this.contentsList.length-1) {
                    this.currentIndex = this.sIndex
                }
                if(this.direction === 'preview' && this.currentIndex === 0) {
                    this.currentIndex = this.eIndex
                }

            })
        },
        methods: {
            cloneItem() {
                this.contentsList.unshift(this.contentsList[this.length-1]);
                this.contentsList.push(this.contentsList[1]);
                this.sIndex = 1;
                this.eIndex = this.length
            },
            autoPlay() {
                this.callAuto = setTimeout(() => {
                    this.autoPlay()
                    this.currentIndex++
                }, this.interval)

            },
            // onHover() {
            //     clearTimeout(this.callAuto)
            // },
            // onLeave() {
            //     if(this.stop) return;
            //     if(this.auto) {
            //         this.autoPlay()
            //     }
            // },
            setCurrent(target) {
                this.currentIndex = target
            },
            stopPlay (value=true) {
                this.stop = value;
                if(value) {
                    clearTimeout(this.callAuto)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .hw-carousel {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        background-color: #D6D6D6;
        .carousel-list {
            height: 100%;
            position: relative;
            display: flex;
            transition: transform 1000ms ease;
            .carousel-item {
                flex-shrink: 0;
                width: 100%;
                height: 100%;
            }
        }

        .navigation {
            position: absolute;
            bottom:0;
            z-index: 1000;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-bottom: 10px;
            &.dot .nav-item {
                cursor: pointer;
                margin:5px;
                padding: 4px;
                background-color: #909090;
                width: 16px;
                height: 16px;
                text-align: center;
                border-radius: 50%;
                opacity: 0.5;
                &:hover {
                    opacity: 1;
                }
                &.active {
                    border:2px solid #333;
                }
            }
            &.line .nav-item{
                cursor: pointer;
                margin:2px;
                padding: 4px;
                background-color: #d6d6d6;
                width: 50px;
                height: 8px;
                text-align: center;
                border-radius: 5px;
                opacity: 0.5;
                &:hover {
                    opacity: 1;
                }
                &.active {
                    background-color: #909090;
                }
            }
        }
        .contents-wrapper {
            width: 80%;
            margin: 40px auto;
            padding: 30px 0;
            .title {
                font-size: 60px;
                font-weight: 700;
            }
            .desc {
                font-size: 25px;
            }
        }
        .stop-wrapper {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 100;
            top: 0;
            display: none;
            justify-content: center;
            align-items: center;
            font-size: 4em;
            opacity: 0.5;
            &.stop {
                display: flex;
            }
            &:hover {
                opacity: 1;
            }
            &.mini {
                justify-content: flex-end;
                align-items: flex-start;
                font-size: 2em;
            }
            span {
                padding: 10px;
            }
            i {
                color: #F2F2F2;
                transform: rotate(90deg);
            }
        }
        &:hover .stop-wrapper {
            display: flex;
        }
    }
</style>