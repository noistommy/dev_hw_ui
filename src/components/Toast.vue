<template lang="pug">
    .toast-view
        .contents-detail-view
            .contents-section
                .section-title TOAST
                    .type-wrapper
                        .type-title 기본 스타일
                        .type-desc
                        .type-preview
                            .ex-toast.hw-toast-container(v-for="(item, index) in stateList", :key="index", :class="`-toast-${item.type}`" @click="showToast(item.type)")
                                .hw-toast-box
                                    .icon-box
                                        i(:class="`gis ${item.icon}`")
                                    .toast-text This is {{item.type}} type toast box. If you show this toast 'Click' this.
                                    .close-box
                                        i.gi.gi-cancel
</template>

<script>
    export default {
        name: 'toast-view',
        data() {
            return {
                message: 'Toast',
                stylePos: {
                    width: '80%'
                },
                stateList: [
                    {type:'success', icon: 'gi-check-circle'},
                    {type:'warning', icon: 'gi-exclam-circle'},
                    {type:'info', icon: 'gi-exclam-circle rotate-180'},
                    {type:'error', icon: 'gi-cancel-alt'},
                ]
            }
        },
        methods: {
            showToast(type) {
                this.$toast.toastMessage({type: type, message: 'How you Like that??'})
            },
            removeSelf () {
                this.$toast.deleteToastAll()
            },
        }
    }
</script>

<style lang="scss">
    .hw-toast-container{
        box-sizing: border-box;
        position: fixed;
        transition: all 0.25s;
        overflow: hidden;
        z-index: 9999;
        .hw-toast-box{
            border-radius: 2px;
            padding: 8px 12px;
            display: flex;
            align-items: center;
        }
        .icon-box{
            margin-right: 8.3px;
        }
        .toast-text{
            font-size: 14px;
            font-weight: 400;
        }
        .close-box{
            font-size: 11px;
            margin-left: auto;
            cursor: pointer;
        }
        &.ex-toast {
            position: relative;
            margin-bottom: 5px;
        }
    }
    .-toast-success{
        background-color: #e3f8d2;
        color: #61A475;
    }

    .-toast-warning{
        background-color: #feeed2;
        color: #EC6E00;
    }

    .-toast-info{
        background-color: #ececec;
        color: #909090;
    }

    .-toast-error{
        background-color: #ffe5df;
        color: #BE5858;
    }

    .fade-enter-active,
    .fade-leave-active{
        transition: opacity 0.25s;
    }

    .fade-enter,
    .fade-leave-to{
        opacity: 0;
    }
    .rotate-180 {
        transform: rotate(180deg);
    }

</style>