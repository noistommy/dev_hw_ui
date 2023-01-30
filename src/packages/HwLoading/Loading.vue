<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="ws" :height="hs" viewBox="0 0 80 80">
        <g id="loading-icon" :class="`theme ${theme} ${mode}`" data-name="loading-icon" transform="translate(0 0)">
            <circle id="Ellipse_1" cx="10" cy="10" r="8" class="cls-1" data-name="Ellipse 566 copy 5" transform="translate(10 10)">

            </circle>
            <circle id="Ellipse_2" cx="10" cy="10" r="8" class="cls-1" data-name="Ellipse 566 copy 5" transform="translate(50 10)">
                <animate id="c1" attributeName="r"
                         begin="0s"
                         dur="1s"
                         values="8;8;15;8"
                         keyTimes="0;0.6;0.7;1"
                         repeatCount="indefinite"
                />
            </circle>
            <circle id="Ellipse_3" cx="10" cy="10" r="8" class="cls-1" data-name="Ellipse 566 copy 5" transform="translate(50 50)">

            </circle>
            <circle id="Ellipse_4" cx="10" cy="10" r="8" class="cls-1" data-name="Ellipse 566 copy 5" transform="translate(10 50)">
                <animate id="c3" attributeName="r"
                         begin="0s"
                         dur="1s"
                         values="8;8;15;8"
                         keyTimes="0;0.8;0.9;1"
                         repeatCount="indefinite"
                />
            </circle>
            <circle id="Ellipse_5" cx="10" cy="10" r="8" class="cls-1" data-name="Ellipse 566 copy 5" transform="translate(30 30)">
                <animate id="c2" attributeName="r"
                         begin="0s"
                         dur="1s"
                         values="8;8;15;8"
                         keyTimes="0;0.7;0.8;1"
                         repeatCount="indefinite"
                />
            </circle>


        </g>

        <animateTransform
                id="g1"
                attributeName="transform"
                begin="0s"
                dur="1s"
                type="rotate"
                values="0;-90;-90"
                keyTimes="0;0.5;1"
                repeatCount="indefinite"
        />

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
            mode: String
        }
    }
</script>

<style lang="scss">

</style>