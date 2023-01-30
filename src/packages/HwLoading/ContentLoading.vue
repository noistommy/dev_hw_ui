<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="ws" :height="hs" :viewBox="computedView">
        <rect x="0" y="0" width="100%" height="100%" :clip-path="`url(#${clipId})`" style='fill: url("#fill")' />
        <defs>
            <clipPath :id="clipId">
                <slot>
<!--                    <circle cx="38" cy="38" r="17" />-->
<!--                    <rect x="64" y="30" rx="2" ry="2" width="140" height="16" />-->
<!--                    <rect x="64" y="65" rx="2" ry="2" width="320" height="10" />-->
<!--                    <rect x="64" y="85" rx="2" ry="2" width="180" height="10" />-->
<!--                    <rect x="64" y="105" rx="2" ry="2" width="250" height="10" />-->
                    <rect x="64" y="140" rx="2" ry="2" width="550" height="80" />
                </slot>
            </clipPath>
            <linearGradient id="fill">
                <stop
                        offset="0.599964"
                        stop-color="#f3f3f3"
                        stop-opacity="1"
                >
                    <animate
                        attributeName="offset"
                        values="-2; -2; 1"
                        keyTimes="0; 0.25; 1"
                        dur="2s"
                        repeatCount="indefinite"
                    ></animate>
                </stop>
                <stop
                        offset="1.59996"
                        stop-color="#ecebeb"
                        stop-opacity="1"
                >
                    <animate
                            attributeName="offset"
                            values="-1; -1; 2"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                    ></animate>
                </stop>
                <stop
                        offset="2.59996"
                        stop-color="#f3f3f3"
                        stop-opacity="1"
                >
                    <animate
                            attributeName="offset"
                            values="0; 0; 3"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                    ></animate>
                </stop>
            </linearGradient>
        </defs>
    </svg>

</template>
<script>
    export default {
        name: 'loading',
        data () {
            return {

            }
        },
        props: {
            ws: Number,
            hs: Number,
            theme: {
                type:String,
                default: 'primary'
            },
            mode: String,
            clipId: {
                type: String,
                default: 'clip-path'
            }
        },
        computed: {
            computedView () {
                return `0 0 ${this.ws} ${this.hs}`
            }
        }
    }
</script>

<style lang="scss">

</style>