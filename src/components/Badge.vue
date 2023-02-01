<template lang="pug">
div.hw-badge-view
    .contents-detail-view
        .contents-section
            .section-title Types
            .type-wrapper
                .type-title 기본 뱃지
                .type-desc
                .type-preview
                    .hw-button.secondary.hw-badgeTarget
                        span Badge 1
                        hw-badge(:data="1", :is-shadow="true")
                    .hw-button.secondary.hw-badgeTarget
                        span Badge 20
                        hw-badge(:data="20", :is-shadow="true")
                    .hw-button.secondary.hw-badgeTarget
                        span Badge 300
                        hw-badge(:data="300", :is-shadow="true")
                    .hw-button.secondary.hw-badgeTarget
                        span Badge 300
                        hw-badge(:data="3000", :is-shadow="true")
                    .hw-button.secondary.hw-badgeTarget
                        span Badge Mark
                        hw-badge(:data="1", :is-shadow="true", :just-mark="true")
                .type-title 뱃지 타입
                .type-desc
                .type-preview
                    .hw-button.secondary.hw-badgeTarget
                        span Float 1
                        hw-badge(:data="1", :is-shadow="true")
                    .hw-button.secondary.hw-badgeTarget
                        span Float 200
                        hw-badge(:data="200", :is-shadow="true")
                    .hw-button.secondary.hw-badgeTarget
                        span Float 200
                        hw-badge(:data="`New`", :color="`red`", :is-shadow="true")
                    .hw-button.secondary.hw-badgeTarget
                        span Contents 3
                        hw-badge(:data="3", :type="`contents`")
                    .hw-button.secondary.hw-badgeTarget
                        span Contents 300
                        hw-badge(:data="300", :type="`contents`")
                    .hw-button.secondary.hw-badgeTarget
                        span Contents 300
                        hw-badge(:data="`update`", :color="`green`" :type="`contents`")
                .type-title 기본 뱃지 - 아이콘
                .type-desc
                .type-preview
                    .hw-button.icon.circle.hw-badgeTarget.massive.hover
                        i.fa.fa-bell
                        hw-badge(:data="1", :is-shadow="true", :offset-x="-2", :offset-y="0")
                    .hw-button.icon.circle.hw-badgeTarget.massive.hover
                        i.fa.fa-envelope
                        hw-badge(:data="20", :is-shadow="true", :offset-x="-2", :offset-y="0")
                    .hw-button.icon.circle.hw-badgeTarget.massive.hover
                        i.fa.fa-envelope
                        hw-badge(:data="300", :is-shadow="true", :offset-x="-2", :offset-y="0")
                    .hw-button.icon.circle.hw-badgeTarget.massive.hover
                        i.fa.fa-bell
                        hw-badge(:data="1", :is-shadow="true", :just-mark="true" , :offset-x="-2", :offset-y="0")
                .type-title 텍스트 사용
                .type-desc
                .type-preview
                    .hw-button.secondary.hw-badgeTarget
                        span 기본 N
                        hw-badge(:data="1", :is-shadow="true", :is-spacial="true")
                    .hw-button.secondary.hw-badgeTarget
                        span New
                        hw-badge(:data="1", :is-shadow="true", :color="`red`", :spacial-text="`New`", :is-spacial="true")
                    .hw-button.secondary.hw-badgeTarget
                        span Update
                        hw-badge(:data="1", :is-shadow="true", :color="`green`", :spacial-text="`Update`", :is-spacial="true")
                .type-title 그림자 표시
                .type-desc 기본은 표시 안함
                .type-preview
                    .hw-button.secondary.hw-badgeTarget
                        span 그림자 표시함
                        hw-badge(:data="10", :is-shadow="true")
                    .hw-button.secondary.hw-badgeTarget
                        span 그림자 표시 안함
                        hw-badge(:data="10", :is-shadow="false")
                .type-title 숫자 표시 제한
                .type-desc 기본은 1000 미만
                .type-preview
                    .hw-button.secondary.hw-badgeTarget
                        span 999+
                        hw-badge(:data="1000", :is-shadow="true")
                    .hw-button.secondary.hw-badgeTarget
                        span 99+
                        hw-badge(:data="100", :is-shadow="true", :limit-count="100")
                    .hw-button.secondary.hw-badgeTarget
                        span 9+
                        hw-badge(:data="10", :is-shadow="true", :limit-count="10")
                .type-title 정렬 방향
                .type-desc 기본값 position에 따라 왼쪽 또는 오른쪽 정렬
                .type-preview
                    .hw-button.secondary.withIcon.hw-badgeTarget
                        i.icon.fa.fa-chevron-right
                        span 오른쪽
                        hw-badge(:data="10", :is-shadow="true", :limit-count="1000000")
                    .hw-button.secondary.withIcon.hw-badgeTarget
                        i.icon.fa.fa-chevron-right
                        span 오른쪽
                        hw-badge(:data="10", :is-shadow="true", :limit-count="1000000", :align="`left`")
                    .hw-button.secondary.withIcon.hw-badgeTarget
                        i.icon.fa.fa-chevron-left
                        span 왼쪽
                        hw-badge(:data="10", :is-shadow="true", :limit-count="1000000", :align="`left`", :position="`top-left`")
                    .hw-button.secondary.withIcon.hw-badgeTarget
                        i.icon.fa.fa-chevron-left
                        span 왼쪽
                        hw-badge(:data="10", :is-shadow="true", :limit-count="1000000" :position="`top-left`")
                .type-title 위치 지정
                .type-preview
                    .hw-button.secondary.hw-badgeTarget
                        span Top-Left
                        hw-badge(:data="`TL`", :is-shadow="true", :position="`top-left`")
                    .hw-button.secondary.hw-badgeTarget
                        span Top-Right
                        hw-badge(:data="`TR`", :is-shadow="true", :position="`top-right`")
                    .hw-button.secondary.hw-badgeTarget
                        span Bottom-Left
                        hw-badge(:data="`BL`", :is-shadow="true", :position="`bottom-left`")
                    .hw-button.secondary.hw-badgeTarget
                        span Bottom-Right
                        hw-badge(:data="`BR`", :is-shadow="true", :position="`bottom-right`")
                .type-title 사용자 위치 조정
                .type-desc X, Y 각각 조정 가능 (px 단위). 기본값 (position: 'top-right')
                .type-preview
                    .hw-button.secondary.hw-badgeTarget
                        span 기본값
                        hw-badge(:data="30", :is-shadow="true")
                    .hw-button.secondary.hw-badgeTarget.round
                        span X: -5px / Y: -5px
                        hw-badge(:data="30", :is-shadow="true")
                    .hw-button.secondary.hw-badgeTarget
                        span X: -5px / Y: 10px
                        hw-badge(:data="30", :is-shadow="true", :offset-x="offsetX", :offset-y="10")
                    .hw-button.secondary.hw-badgeTarget
                        span X: 140px / Y: -5px
                        hw-badge(:data="30", :is-shadow="true", :offset-x="140", :offset-y="offsetY")
                .type-title Colors
                .type-preview
                    .hw-button.secondary.hw-badgeTarget(v-for="color in colorPalette", :key="color")
                        span {{color}}
                        hw-badge( :data="color.length", :offset-x="offsetX", :offset-y="offsetY", :color="color")
                .type-title Colors Invert
                .type-preview.invert
                    .hw-button.hw-badgeTarget(v-for="color in colorPalette", :key="color", :class="color")
                        span {{color}}
                        hw-badge( :data="color.length", :offset-x="offsetX", :offset-y="offsetY", :color="color", :invert="true")

</template>

<script>
    import HwBadge from '../packages/HwBadge/HwBadge';
    export default {
        name: 'hw-badge-view',
        components: {HwBadge},
        data () {
            return {
                offsetX: -5,
                offsetY: -5,
                align: 'left',
                colorPalette: [
                    'red', 'orange', 'yellow', 'lightgreen', 'green', 'lightblue', 'blue', 'deepblue', 'deeppurple', 'purple', 'brown', 'gray'
                ],
            }
        }
    }
</script>

<style lang="scss">
    .box {
        width: 72px;
        height: 72px;
        background-color: #dae8f8;
        margin: 5px;
        display: inline-block;
    }
    .hw-badgeTarget {
        position: relative;
        .hw-badge-aa {
            display: inline-block;
            font-size: 11px;
            text-align: center;
            min-width: 16px;
            height: 16px;
            line-height: 1;
            padding: 3px;
            border-radius: 8px;
            background-color: #2985DB;
            color: #ffffff;
            position: absolute;
            top:2px;
            text-shadow: 0 0 5px #909090;
            &.shadow {
                box-shadow: -2px 2px 0px 0px rgba(0, 0, 0, 0.2);
            }
            &.align-left {
                left: calc(100% - 18px);
            }
            &.align-right {
                right: 2px
            }

        }
    }
    .hw-button {
        margin: 5px;
    }
</style>