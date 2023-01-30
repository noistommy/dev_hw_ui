<template>
    <div class="contents-detail-view">
        <div class="contents-section">
            <div class="type-wrapper">
                <div class="type-title"> 기본 carousel</div>
                <div class="type-preview">
                    <hw-carousel :auto="autoSlide" :nav-type="'dot'" interval="5000">
                        <hw-carousel-item v-for="(item, index) in contentsList" :key="index" :idx="index">
                            <img :src="require(`@/assets/img/images_00${index+1}.jpg`)">
                        </hw-carousel-item>
                    </hw-carousel>
                </div>

            </div>
            <div class="type-wrapper">
                <div class="type-title"> 자동 실행 끄기 auto play : false</div>
                <div class="type-preview">
                    <hw-carousel :auto="false" nav-type="dot" >
                        <hw-carousel-item v-for="(item, index) in contentsList" :key="index" :idx="index">
                            <span class="title">{{item.title}}</span> <span class="description">{{item.description}}</span>
                        </hw-carousel-item>
                    </hw-carousel>
                </div>

            </div>
            <div class="type-wrapper">
                <div class="type-title">자동 실행 켜기 auto play: true</div>
                <div class="type-preview">
                    <hw-carousel :auto="autoSlide" nav-type="dot">
                        <hw-carousel-item v-for="(item, index) in contentsList" :key="index" :idx="index">
                            <span class="title">{{item.title}}</span> <span class="description">{{item.description}}</span>
                        </hw-carousel-item>
                    </hw-carousel>
                </div>
            </div>
            <div class="type-wrapper">
                <div class="type-title">네비게이션 타입 - 점형 navigation type : dot</div>
                <div class="type-preview">
                    <hw-carousel :auto="autoSlide" nav-type="dot">
                        <hw-carousel-item v-for="(item, index) in contentsList" :key="index" :idx="index">
                            <span class="title">{{item.title}}</span> <span class="description">{{item.description}}</span>
                        </hw-carousel-item>
                    </hw-carousel>
                </div>

            </div>
            <div class="type-wrapper">
                <div class="type-title">네비게이션 타입 - 선형 navigation type : line</div>
                <div class="type-preview">
                    <hw-carousel :auto="autoSlide" nav-type="line">
                        <hw-carousel-item v-for="(item, index) in contentsList" :key="index" :idx="index">
                            <span class="title">{{item.title}}</span> <span class="description">{{item.description}}</span>
                        </hw-carousel-item>
                    </hw-carousel>
                </div>

            </div>
            <div class="type-wrapper">
                <div class="type-title">네비게이션 타입 - 방향표시 navigation type : arrow</div>
                <div class="type-preview">
                    <hw-carousel :auto="autoSlide" nav-type="arrow">
                        <hw-carousel-item v-for="(item, index) in contentsList" :key="index" :idx="index">
                            <span class="title">{{item.title}}</span> <span class="description">{{item.description}}</span>
                        </hw-carousel-item>
                    </hw-carousel>
                </div>

            </div>
            <div class="type-wrapper">
                <div class="type-title"> 방향 타입 vertical</div>
                <div class="type-preview">
                    <hw-carousel :auto="autoSlide" :direction="direction"  nav-type="dot">
                        <hw-carousel-item v-for="(item, index) in contentsList" :key="index" :idx="index">
                            <span class="title">{{item.title}}</span> <span class="description">{{item.description}}</span>
                        </hw-carousel-item>
                    </hw-carousel>
                </div>

            </div>
            <div class="type-wrapper">
                <div class="type-title"> 진행 방향 : 'prev' 또는 'next'</div>
                <div class="type-preview">
                    <hw-carousel :auto="autoSlide" :nav-type="'dot'" :flow-type="'prev'">
                        <hw-carousel-item v-for="(item, index) in contentsList" :key="index" :idx="index">
                            <span class="title">{{item.title}}</span> <span class="description">{{item.description}}</span>
                        </hw-carousel-item>
                    </hw-carousel>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import HwCarousel from '@/packages/HwCarousel/HwCarousel';
    import HwCarouselItem from '@/packages/HwCarousel/HwCarouselItem';
    export default {
        name: 'carousel-view',
        components: {HwCarousel, HwCarouselItem},
        data () {
            return {
                contentsList: [
                    {title: "ITEM 1", description: 'first item'},
                    {title: "ITEM 2", description: 'second item'},
                    {title: "ITEM 3", description: 'third item'},
                    {title: "ITEM 4", description: 'first item'},
                ],
                contentsList1: [
                    {title: "ITEM 1", description: 'first item'},
                    {title: "ITEM 2", description: 'second item'},
                    {title: "ITEM 3", description: 'third item'},
                    {title: "ITEM 4", description: 'first item'},
                    {title: "ITEM 5", description: 'second item'},
                    {title: "ITEM 6", description: 'third item'},
                ],
                length: 0,
                type: 'extend',//slide, push
                currentIndex: 0,
                colorSet: ['blue', 'green', 'yellow', 'blue', 'green', 'yellow', 'blue', 'green'],
                itemSize: 0,
                navType: 'dot', // 'arrow' || 'dot' || 'line'
                autoSlide: true,
                intervalTime: 3000,
                translate: {},
                direction: 'vertical', // preview
                callAuto: {},
                stop: false,
                controlSize: ''
            }
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    .type-preview {
        height: 400px;
    }
    .hw-carousel {
        background-color: #d6d6d6;
        .carousel-item {
            .title {
                padding: 20px;
                font-size: 2em;
            }
        }

    }

</style>
