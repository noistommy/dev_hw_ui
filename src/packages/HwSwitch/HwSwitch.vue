<template>
    <label class="hw-switch" :class="[type]">
        <input type="checkbox" v-model="toggleValue" @change="toggleSwitch">
        <template v-if="type === 'slide'">
            <span class="switch round" ></span>
        </template>
        <template v-else>
            <span :class="{active: toggleValue}" >{{onValue}}</span>
            <span :class="{active: !toggleValue}">{{offValue}}</span>
        </template>
    </label>
</template>

<script>
    export default {
        name: 'hw-switch',
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
            onValue: String,
            offValue: String,
            type: {
                type: String,
                default: 'slide'
            }
        },
        created() {
            // console.log(this.value);
            if(this.onValue && this.offValue) {
                this.toggleValue = this.value === this.onValue ? true : false;
            }else {
                this.toggleValue = this.value;
            }

        },
        methods: {
            toggleSwitch () {
                let result = '';

                if(this.onValue && this.offValue) {
                    result = this.toggleValue ? this.onValue : this.offValue;
                } else {
                    result = this.toggleValue;
                }

                this.$emit('switch', result, this.idx);
            }
        }
    }
</script>

<style lang="scss">
    .hw-switch {

        display: inline-block;
        input {
            display: none;
        }
        &.slide {
            position: relative;
            width: 3em;
            height: 1.3em;
            top: 0.15em;
            input:checked + .switch {
                background-color: #2985DB;
            }
            input:checked + .switch:before {
                transform: translateX(1.7em);
            }
            .switch {
                cursor: pointer;
                position: absolute;
                top:0;
                bottom:0;
                left: 0;
                right: 0;
                display: inline-block;
                background-color: #c4c4c4;
                /*transition: all 400ms ease-out;*/
                &.round {
                    border-radius: 0.6em;
                }
                &:before {
                    content: '';
                    position:absolute;
                    width: 1.6em;
                    height: 1.6em;
                    top: -0.15em;
                    left: -0.15em;
                    background-color: #fff;
                    border: 1px solid #c4c4c4;
                    border-radius: 50%;
                    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.16);
                    transition: all 250ms ease-out;
                    box-sizing: border-box;
                }
            }

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