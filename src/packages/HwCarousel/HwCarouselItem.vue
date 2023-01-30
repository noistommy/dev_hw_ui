<template>
    <div class="carousel-item" @click="activeIndex" :class="[setState]">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'hw-carousel-item',
        data () {
            return {
                state: ''
            }
        },
        props: {
            idx: Number
        },
        computed: {
          // itemStyle () {
          //
          // }
            setState() {
                return this.state
            }
        },
        methods: {
            activeIndex() {
                let parent = this.$parent;
                parent.setActiveIndex(this.idx)
            },
            setItemPosition(target, next, prev) {
                this.state = '';
                if(this.idx === prev) this.state = 'prev';
                if(this.idx === target) this.state = 'current';
                if(this.idx === next) this.state = 'next';
            }
        }
    }
</script>

<style lang="scss">
    /*.carousel-item {*/
    /*    background-color: #fff;*/
    /*}*/
</style>