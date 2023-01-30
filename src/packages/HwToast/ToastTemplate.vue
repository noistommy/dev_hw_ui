<template>
    <transition name="fade" @after-leave="removeSelf">
        <div v-show="isVisible" class="hw-toast-container" :style="toastStyle" :class="[toastType]">
            <template v-if="!component">
                <div class="hw-toast-box">
                    <div class="icon-box">
                        <i class='gis gi-check-circle' v-if="type === 'success'"></i>
                        <i class='gis gi-exclam-circle rotate-180' v-else-if="type === 'info'"></i>
                        <i class='gis gi-cancel-alt' v-else-if="type === 'error'"></i>
                        <i class='gis gi-exclam-circle' v-else-if="type === 'warning'"></i>
                    </div>
                    <p class="toast-text">{{message}}</p>
                    <div class="close-box" @click="removeSelf">
                        <i class='gi gi-cancel'></i>
                    </div>
                </div>
            </template>
            <template v-else>
                <component :is="component"/>
            </template>
        </div>
    </transition>
</template>
<script>

    export default {
        computed: {
            toastStyle () {
                const location = {}
                for (const key in this.$data.location) {
                    location[key] = this.$data.location[key] + 'px'
                    if (key === 'left' && this.$data.location.isCenter) {
                        location[key] = this.$data.location[key] + '%'
                    }
                }
                return {
                    ...location,
                    width: this.$data.width + '%'
                }
            },
            toastType () {
                return this.type ? `--toast-${this.$data.type}` : ''
            }
        },
        methods: {
            setTimer () {
                this.$data.timerId = setTimeout(() => {
                    this.$data.isVisible = false
                }, this.$data.duration)
            },
            move (side, value) {
                this.$data.location[side] += value
            },
            removeSelf () {
                this.$data.toastController.deleteToast(this)
                this.$el.parentNode.removeChild(this.$el)
                this.$destroy()
            },
            forceRemove () {
                this.$el.parentNode.removeChild(this.$el)
                this.$destroy()
            }
        }
    }
</script>
<style lang="scss" scoped>

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
            line-height: 1.29;
            letter-spacing: -0.21px;
        }
        .close-box{
            font-size: 11px;
            margin-left: auto;
            cursor: pointer;
        }
    }

    .--toast-success{
        background-color: #e3f8d2;
        color: #007e04;
    }

    .--toast-warning{
        background-color: #feeed2;
        color: #d5620a;
    }

    .--toast-info{
        background-color: #ececec;
        color: #676767;
    }

    .--toast-error{
        background-color: #ffe5df;
        color: #c70909;
    }

    .fade-enter-active,
    .fade-leave-active{
        transition: opacity 0.25s;
    }

    .fade-enter,
    .fade-leave-to{
        opacity: 0;
    }

</style>
