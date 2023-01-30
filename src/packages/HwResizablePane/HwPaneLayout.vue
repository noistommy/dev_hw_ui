<template>
    <div class="hw-pane-layout" :class="[paneClass, {reverse}]" @mousedown="onMouseDown">
        <slot></slot>
    </div>
</template>

<script src="./resizeEvent.js"></script>

<style lang="scss">
    .hw-pane-layout {
        width: 100%;
        height: 100%;
        display: flex;
        &.layout-v {
            flex-direction: row;
            &.reverse {
                flex-direction: row-reverse;
            }
        }
        &.layout-h {
            flex-direction: column;
            &.reverse {
                flex-direction: column-reverse;
            }
        }
    }
</style>