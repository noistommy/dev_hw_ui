<template>
    <div class="hw-modal-container">
<!--        <div class="hw-modal-background" v-show="modalRefs.length > 0" @click="closeModal"></div>-->
        <HwModal 
            v-for="modalRef in modalRefs" 
            :key="modalRef.modalId"
            v-bind="modalRef"
        />
    </div>
</template>
<script>
import HwModal from './HwModal'
export default {
    name: 'hw-modal-container',
    components: {
        HwModal
    },
    data(){
        return {
            modalRefs: [],
            nextId: 0
        }
    },
    props: {
        options: Object
    },
    created(){
        const {hwModalBus} = this.$hwModal
        hwModalBus.$on('show-modal', (modalRef) => {
            if('modalOptions' in modalRef && 'useStack' in modalRef.modalOptions){
                const shouldStack = modalRef.modalOptions.useStack || this.options.useStack
                if(!shouldStack){
                    this.modalRefs = []
                }
            }
            modalRef.modalId = this.nextId++;
            this.modalRefs.push(modalRef)

        })
        hwModalBus.$on('close-modal', (modalId) => {
            if(modalId < this.modalRefs.length -1) return;
            this.modalRefs.splice(
                this.modalRefs.findIndex(modalRef => modalRef.modalId === modalId),
                1
            )
            this.nextId--
        })
        hwModalBus.$on('close-all-modal', () => {
            this.nextId = 0;
            this.modalRefs = []
        })
    },
}
</script>
<style lang="scss" scoped>
    .hw-modal-container{
        position: relative;
        top:0;
        left: 0;
        z-index: 9999;
        .hw-modal-background{
            position: absolute;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.2);
        }
    }
</style>