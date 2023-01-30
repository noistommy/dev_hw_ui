<template>
    <div class="dropdown-item" :class="[{hover: select},{select:isSelect},{check: checked}, selectedOption,{image: image},{disabled: disable}]" @click.stop="selectItem" @mouseenter="setCurrent">
        <div class="dropdown-img thumb" v-if="image">
            <img :src="image" alt="">
        </div>
        <slot></slot>
<!--        <div class="item-check">-->
<!--            <i class="gis gi-check primary-color"></i>-->
<!--        </div>-->
    </div>
</template>


<script>
    export default {
        name: 'dropdown-item',
        data () {
            return {
                checked: false,
                isSelect: false
            }
        },
        props: {
            idx: [Number, String],
            option: String,
            data: Object,
            value: [Number, String],
            select: Boolean,
            selected: {
                type:Boolean,
                default: false
            },
            disable: {
                type:Boolean,
                default: false
            },
            selectedOption: {
              type: String,
              default: 'ghost' // hide, ghost
            },
            image: [String, Boolean],
            command: String
        },
        watch: {
            selected() {
                this.checked = this.selected
            }
        },
        created() {
            this.checked = this.selected
        },
        methods: {
            setCurrent() {
                this.$emit('pointed', this.idx)
            },
            selectItem () {
                if(this.command !== undefined) {
                    //this.$eventHub.$emit('command', this.command);
                    this.$emit('command', this.command);
                } else {
                    this.checked = !this.checked;
                    this.isSelect = !this.isSelect;
                    // this.$parent.$emit('select', { option:this.option, value:this.data, id:this.idx, isSelect: this.checked});
                    this.$emit('select', {option:this.option, value:this.data, id:this.idx, isChecked: this.checked});
                }

            }
        }
    }
</script>

<style lang="scss">
    .dropdown-item {
        position: relative;
        color: #333;
        padding: 10px;
        height: 45px;
        border-top: 1px solid #fefefe;
        display: flex;
        align-items: center;
        &:hover, &.hover {
            /*background-color: transparent;*/
            background-color: #EFEFEF;
        }
        &.select {
            background-color: #EFEFEF;
        }
        &.disabled {
            cursor: default;
            opacity: 0.5;
            color: #C4C4C4 !important;
            pointer-events: none;
        }
        &.check {
            background-color: #EFEFEF;
            &:after {
                content: "\e915";
                font-family: 'gi-icons';
                position: absolute;
                padding: 10px;
                top:50%;
                transform: translateY(-50%);
                right:0;
                color: #2985DB;
                opacity: 1;
            }
            cursor: default;
            &.hide {
                display: none;
            }
            &.ghost {
                /*opacity: 0.5;*/
                color: #333333aa;
            }
            &.select {
                &:after {
                    content: "\e915";
                    font-family: 'gi-icons';
                    position: absolute;
                    padding: 10px;
                    top:0;
                    right:0;
                    color: #d6d6d6;
                    line-height: 25px;
                }
            }
        }
        &.image {
            .dropdown-img {
                margin-right: 5px;
            }
        }
        .item-check {
            position: absolute;
            right:0;
            padding: 0.571em;
        }
    }
</style>