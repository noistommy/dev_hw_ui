<template>
    <div class="hw-tags tagMap" :class="[{tagMap:type === 'label'}, hoverEffect]">
        <template v-for="(tag, index) in tagList"  >
            <hw-tag :idx="index" :type="type" :color="tag.color" :tag-text="tag.tagText" :key="index" :id="`tag_${index}`" @select-tag="onClick" />
        </template>
    </div>
</template>

<script>
    import HwTag from './HwTag';

    export default {
        name: 'hw-tags',
        components:{HwTag},
        data () {
            return {
                tagList: [
                    {id:0, color: 'green', tagText:'SUCCESS'},
                    {id:1, color: 'red', tagText:'ERROR'},
                    {id:2, color: 'blue', tagText:'INFO'},
                    {id:3, color: 'orange', tagText:'WARNING'},
                ]
            }
        },
        props: {
            type: {
                type: String,
                default: 'line' //'line', 'dot', 'label'
            },
            tags: Array,
            hoverEffect: {
                type: String,
                default: ''
            },
            isEvent: {
                type: Boolean,
                default : false
            }
        },
        created() {
            if(this.tags != undefined) {
                this.tagList = this.tags;
            }

        },
        methods: {
            onClick (value) {
                console.log('tag');
                this.$emit('select', this.tags[value])
            }
        }
    }
</script>

<style lang="scss">
    @keyframes bounce {
        25% {transform: scale(1.1)}
        75% {transform: scale(0.9)}
    }
    .hw-tags {
        width: 100%;
        display: inline-flex;
        overflow-x: auto;
        &.tagMap {
            flex-wrap: wrap;
        }
        &.one-of-a-kind {
            flex-wrap: wrap;
            visibility: hidden;
            &:hover > * {
                opacity: .4;
                transform: scale(.9);
            }
            > * {
                visibility: visible;
                transition: opacity 150ms linear 100ms, transform 150ms ease-in-out 100ms;
                &:hover {
                    opacity: 1;
                    transform: scale(1);
                    transition-delay: 0ms, 0ms;
                }
            }
        }
    }
    .bounce > div, .bounce > span{
        transform: perspective(1px) translateZ(0);
        &:hover {
            animation-name: bounce;
            animation-duration: 1s;
            animation-iteration-count: infinite;
            animation-direction: alternate;
            animation-timing-function: linear;
        }

    }

</style>