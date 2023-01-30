<template>
<transition name="fade">
    <div v-show="isVisible" class="hw-modal-wrapper hw-modal-background" ref="hw-modal-wrapper" @click="closeModalToClick">
        <div class="hw-modal-content-wrapper">
            <component
                :is="modalComp" 
                v-bind="modalProps"
                @close="onClose"
                @closeAll="onCloseAll"
            >
            </component>
        </div>
    </div>
</transition>
</template>
<script>
export default {
    name: 'hw-modal',
    props: {
        modalId: {
            type: Number,
            required: true
        },
        modalComp: {
            type: Object,
            default: null,
            required: true
        },
        modalProps: {
            type: Object,
            default: () => {},
            required: false
        },
        modalOptions: {
            type: Object,
            default: () => {},
            required: false
        },
        modalHandlers: {
            type: Object,
            default: () => {},
            required: false
        }
    },
    data(){
        return {
            isVisible: false
        }
    },
    mounted(){
        this.$nextTick(() => this.isVisible = true);
        const {escapeToClose} = this.modalOptions;
        if(escapeToClose){
            window.addEventListener('keydown', this.onEscapeKeyPress)
        }
        if('after-show' in this.modalHandlers){
            this.modalHandlers['after-show']()
        }
    },
    beforeDestroy(){
        const {escapeToClose} = this.modalOptions;
        if(escapeToClose){
            window.removeEventListener('keydown', this.onEscapeKeyPress)
        }
        if('before-close' in this.modalHandlers){
            this.modalHandlers['before-close']()
        }
    },
    methods:{
        onClose(){
            this.$hwModal.close(this.modalId)
        },
        onCloseAll(){
            this.$hwModal.closeAll()
        },
        onEscapeKeyPress(event){
            const keyCode = event.keyCode || event.which
            if(keyCode === 27){
                this.onClose()
            }
        },
        closeModalToClick(e) {
            if(this.modalOptions.clickToClose && e.target.className.indexOf('background') > -1) {
                this.$hwModal.close(this.modalId)
            }

        }
    }
}
</script>
<style lang="scss" scoped>
    .hw-modal-wrapper{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        background-color: rgba(0, 0, 0, 0.16);
        .hw-modal-content-wrapper{
            border: solid 1px #707070;
            background-color: white;
            border-radius: 4px;
            box-shadow: 2px 5px 4px 0 rgba(0, 0, 0, 0.16);
        }
    }
    .fade-enter-active,
    .fade-leave-active{
        transition: all 0.25s;
    }

    .fade-enter,
    .fade-leave-to{
        opacity: 0;
        transform: translateY(-10px);
    }
</style>