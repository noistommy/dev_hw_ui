<template>
    <div class="penning-wrapper" :class="[type,{loading: loading}, {text:withText}, {screen:fullScreen}, mode, size]" v-if="loading">
        <template v-if="type === 'content'">
            <content-loading :ws="iconW" :hs="iconH" />
        </template>
        <template v-if="type === 'content-feed'">
            <content-feed :ws="iconW" :hs=iconH :id="`clip-feed`" />
        </template>
        <template v-else-if="type === 'content-list'">
            <content-list :ws="iconW" :hs=iconH :id="`clip-list`"/>
        </template>
        <template v-else-if="type === 'icon'">
            <div class="loading-icon" :class="[iconColor,{spinning:userSpin}, speed]">
                <slot name="l-icon">
                    <loading :ws="iconW" :hs=iconH :theme="iconColor" :mode="mode" />
                </slot>
            </div>
            <div class="loading-text" :class="[iconColor]">{{withText}}</div>
        </template>
        <template v-else>
            <div class="loading-text" :class="[iconColor]">{{withText}}</div>
        </template>
    </div>
</template>

<script>
    import Loading from "./Loading";
    import ContentLoading from "./ContentLoading";
    import {ContentList, ContentFeed} from "./loadingTemp";
    export default {
        name: 'hw-loading',
        components: {Loading, ContentLoading, ContentList, ContentFeed},
        data() {
            return {
                loading: false
            }
        },
        props: {
            type: {
              type: String,
              default: 'icon'
            },
            isLoading: Boolean,
            iconW: Number,
            iconH: Number,
            iconColor: String,
            isBg: Boolean,
            userSpin: Boolean,
            withText: String,
            fullScreen: {
                type: Boolean,
                default: false
            },
            mode: {
                type: String,
                default: 'light'
            },
            speed: {
                type: String,
                default: ''
            },
            size:{
                type: String,
                default: ''
            },
        },
        watch: {
            isLoading(value) {
                this.loading = value
            }
        },
        created() {
            this.loading = this.isLoading
        }
    }
</script>

<style lang="scss" scoped>


    // default style
    $primary-color: #2985db;
    $secondary-color: #ebebeb;
    $info-color: #909090;
    $warning-color: #ea6923;
    $danger-color: #C70909;
    $yellow-color: #fdc036;

    $issue_red: #D75757;
    $issue_orange: #EE9033;
    $issue_yellow: #F8B825;
    $issue_lightgreen: #B3BC40;
    $issue_green: #61A475;
    $issue_lightblue: #8CC5CE;
    $issue_blue: #70A3CA;
    $issue_deepblue: #5178AF;
    $issue_deeppurple: #9180B4;
    $issue_purple: #AF77C0;
    $issue_brown: #A86A82;
    $issue_gray: #8B8B8B;

    $issueColors: (
            'red': $issue_red,
            'orange': $issue_orange,
            'yellow' : $issue_yellow,
            'lightgreen' : $issue_lightgreen,
            'green' : $issue_green,
            'lightblue' : $issue_lightblue,
            'blue' : $issue_blue,
            'deepblue' : $issue_deepblue,
            'deeppurple' : $issue_deeppurple,
            'purple' : $issue_purple,
            'brown' : $issue_brown,
            'gray' : $issue_gray
    );
    $baseSpeed: 2;
    $speedType: (
            'very-fast': calc($baseSpeed/4),
            'fast': calc($baseSpeed/2),
            'normal': $baseSpeed,
            'slow': $baseSpeed*2,
            'very-slow':$baseSpeed*4
    );

    .cls-1{fill: $primary-color;}
    .secondary .cls-1{fill: $secondary-color;}
    .info .cls-1{fill: $info-color;}
    .warning .cls-1{fill: $warning-color;}
    .danger .cls-1{fill: $danger-color;}
    .yellow .cls-1{fill: $yellow-color;}
    .dark .cls-1{fill: #FFFFFF !important;}

    @each $colorName, $colorValue in $issueColors {
        .#{$colorName} .cls-1 { fill: $colorValue;}
    }
    .penning-wrapper {
        .primary {color: $primary-color;}
        .secondary {color: $secondary-color;}
        .info {color: $info-color;}
        .warning {color: $warning-color;}
        .danger {color: $danger-color;}
        .yellow {color: $yellow-color;}
        .loading-icon, .loading-text {background-color: transparent;}
    }
    @each $colorName, $colorValue in $issueColors {
        .#{$colorName} i { color: $colorValue;}
    }

    @each $speedName, $speedValue in $speedType {
        .#{$speedName}{ animation-duration: #{$speedValue}s !important;}
    }

    .penning-wrapper {
        //position: absolute;
        width: 100%;
        height: 100%;
        display: none;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.5);
        z-index:99999;
        &.content, &.content-list {
            justify-content: flex-start;
            align-items: flex-start;
        }
        &.screen {
            position: fixed;
            top:0;
            left:0;
            width: 100vw;
            height: 100vh;
        }
        &.loading {
            display: flex;
        }
        &.dark {
            background-color: rgba(0, 0, 0, 0.7);

            i, .loading-text {
                color: #FFFFFF !important;
            }


        }
        .loading-icon {
            /*width: 100px;*/
            /*height: 100px;*/
            padding: 5px;
            &.spinning {
                animation: rotate 2s linear infinite;
            }

        }
        .loading-text {
            display: none;
        }
        &.text {
            flex-direction: column;
            .loading-text {
                display: inline-block;
            }
        }
    }
    @keyframes rotate {
        from {transform: rotate(0deg);}
        to {transform: rotate(360deg);}
    }
</style>