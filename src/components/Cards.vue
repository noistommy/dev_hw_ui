<template>
    <div class="cards-view">
        <div class="contents-detail-view">
            <div class="contents-section">
                <div class="section-title">Type</div>
                <div class="type-wrapper">
                    <div class="type-title"></div>
                    <div class="type-desc"></div>
                    <div class="type-preview">
                        <hw-card >기본 카드</hw-card>

                    </div>
                    <div class="type-preview">
                        <hw-card :use-bounce="true">에니에니션 효과</hw-card>
                    </div>
                    <div class="type-preview">
                        <hw-card :use-shadow="true" shadow-type="always" >그림자 사용(always) </hw-card>
                    </div>
                    <div class="type-preview">
                        <hw-card :use-shadow="true" shadow-type="hover" >그림자 사용 (hover)</hw-card>
                    </div>
                </div>
                <div class="type-wrapper">
                    <div class="type-title"></div>
                    <div class="type-desc"></div>
                    <div class="type-preview">
                        <hw-card-group :row-count="3">
                            <div class="card-column" v-for="(item, index) in contentsList" :key="index">
                                <hw-card :id="index" :use-bounce="true">
                                    <div class="price-wrapper">
                                        <div class="title">{{item.title}}</div>
                                        <div class="price">{{item.price}} <span>원/월~</span></div>
                                        <div class="hw-button primary"> 신청하기 </div>
                                        <div class="content-box" :style="{height:`${item.content}px`}">높이:{{item.content}}</div>
                                    </div>
                                </hw-card>
                            </div>
                        </hw-card-group>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import HwCard from '@/packages/HwCard/HwCard'
    import HwCardGroup from '@/packages/HwCard/HwCardGroup'
    export default {
        components: {HwCard, HwCardGroup},
        name: 'cards-view',
        data () {
            return {
                columnCount : 3,
                contentsList: [
                    {title: 'Micro', price: '5,000', content: 50, label:'NEW'},
                    {title: 'Basic', price: '20,000',content: 100, label:'BEST'},
                    {title: 'Premium', price: '459,000',content: 30, label:''},
                    {title: 'Premium', price: '459,000',content: 40, label:''},
                    {title: 'Micro', price: '5,000', content: 80, label:'SOLDOUT'},
                    {title: 'Basic', price: '20,000',content: 50, label:''},
                    {title: 'Premium', price: '459,000',content: 30, label:''},
                    {title: 'Premium', price: '459,000',content: 40, label:''},
                ]
            }
        }
    }
</script>

<style lang="scss">
    .price-wrapper {
        padding-top: 20px;
        .title {
            font-size: 1.375rem;
        }
        .price {
            font-size: 2rem;
            font-weight: 700;
            span {
                font-size: 0.8rem;
                font-weight: 400;
            }
        }
    }
    .label {
        color: #ffffff;
        &.new {
            background-color: #7fc9ff;
        }
        &.best {
            background-color: #f90;
        }
        &.soldout {
            background-color: #d6d6d6;
        }
    }
</style>

