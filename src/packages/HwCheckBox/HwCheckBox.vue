<template>
    <label class="hw-checkbox" :class="[type,iconType, {disabled}, {checked:toggleValue}]" :style="{marginRight: `${gapSize/2}px`}">
        <input type="checkbox" class="checkbox-original" v-model="toggleValue" :disabled="disabled" @change="toggleCheck">
        <span class="hw-checkbox-input"></span>
        <span class="hw-checkbox-label" :class="{activeLabel: isLabelActive}">
            <slot>
                {{labelText}}{{toggleValue ? onValue : offValue}}
            </slot>
        </span>
    </label>
</template>

<script>
    export default {
        name: 'hw-check-box',
        data() {
            return {
                toggleValue: false
            }
        },
        props: {
            value: [String, Boolean],
            idx: {
                type: Number,
                default: 0
            },
            labelText: {
                type: String,
                default: ''
            },
            onValue: {
                type:String,
                default: null
            },
            offValue: {
                type:String,
                default: null
            },
            type: {
                type: String,
                default: 'single'
            },
            iconType: {
                type: String,
                default: 'checkbox'
            },
            gapSize: {
                type: Number,
                default: 20
            },
            isLabelActive: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            value() {
                this.toggleValue = this.value;
            }
        },
        created() {
            if(this.onValue && this.offValue) {
                this.toggleValue = this.value === this.onValue ? true : false;
            }else {
                this.toggleValue = this.value;
            }

        },
        methods: {
            toggleCheck () {
                let result = {
                    idx: this.idx,
                    type: this.type,
                    text: '',
                    value: this.toggleValue

                };

                if(this.onValue && this.offValue) {
                    result.text = this.toggleValue ? this.onValue : this.offValue;
                } else {
                    result.text = this.labelText;
                }

                this.$emit('result', result);
            }
        }
    }
</script>

<style lang="scss">
    .hw-checkbox {
        display: flex;
        align-items: center;
        position: relative;
        font-size: 14px;
        cursor: pointer;
        user-select: none;
        .hw-checkbox-input {
            position: relative;
            display: inline-block;
            border: 1px solid #707070;
            background-color: #fff;
            &:hover {
                border-color: #2985DB;
            }
            &:after {
                display: none;
                position: absolute;
                content: "";

            }
        }
        &.checkbox .hw-checkbox-input{
            width: 16px;
            height: 16px;
            &:after {
                border: 2px solid #fff;
                border-left: 0;
                border-top: 0;
                width: 4px;
                height: 9px;
                left: 4px;
                top: 0;
                transform: rotate(0deg) scale(0);
                box-sizing: content-box;
                -webkit-box-sizing: content-box;
            }
        }
        &.radio .hw-checkbox-input{
            width: 18px;
            height: 18px;
            border-radius: 50%;
            &:after {
                background-color: #fff;
                border-radius: 50%;
                width: 6px;
                height: 6px;
                top: 5px;
                left: 5px;
                transform: scale(0);
            }
        }
        &.checked {
            .hw-checkbox-input {
                background-color: #2985DB;
                border-color: #2985DB;
                &:after {
                    display: inline-block;
                    transition: all 250ms ease-in-out;
                    transform: rotate(45deg) scale(1);
                }
            }
            .hw-checkbox-label.activeLabel {
                color: #2985DB;
            }
        }
        //라벨
        .hw-checkbox-label {
            display: block;
            float: left;
            padding: 0 0 0 6px;
        }
        //input[checkbox] 숨기기
        .checkbox-original {
            opacity: 0;
            outline: none;
            position: absolute;
            margin: 0;
            width: 0;
            height: 0;
            z-index: -1;
        }
        &.disabled {
            .hw-checkbox-input {
                background-color: #D6D6D6;
                border-color: #EBEBEB;
            }
        }
    }
    .hw-check-box1 {

        display: inline-block;
        input {
            display: none;
        }
        &.text {
            font-size: 0.9em;
            background-color: #EFEFEF;
            padding: 2px;
            border-radius: 4px;
            span {
                display: inline-block;
                padding: 0.5em 0.8em;
                line-height: 1em;
            }
            .active {
                background-color: #2985DB;
                color: #ffffff;
                font-weight: 700;
                border-radius: 4px;
            }
        }
    }
</style>