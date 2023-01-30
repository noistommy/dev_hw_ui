import Vue from 'vue'
import HwModalContainer from './HwModalContainer.vue'

let nextModalOptions = null;
const defaultModalOptions = {
    useStack: false,
    clickToClose: false,
    escapeToClose: false
};
Object.freeze(defaultModalOptions);

const setOptions = (modalOptions) => {
    /*
     * Object.assign() 메소드를 활용하여 옵션을 설정하는 방법도 생각하였으나
     * 기본 옵션 키값에 해당하지 않는 키가 파라미터로 입력되었을 때 메소드 특유의 병합
     * 알고리즘으로 인해서 기본키 리스트에 해당하지 않는 키를 제거하기에는 적합하지 못했습니다.
     * 따라서 새로 입력된 옵션키가 기본 옵션 키에 속하는 키이면 덮어씌우고 그렇지 않다면
     * 다음에 생성될 옵션 오브젝트에 추가하지 않는 알고리즘을 추가했습니다.
     */
    const nextOption = {...defaultModalOptions, ...modalOptions};
    // for(const key in defaultModalOptions){
    //     nextOption[key] = key in modalOptions ? modalOptions[key] : defaultModalOptions[key]
    // }
    return nextOption
};

function initHwModal(){
    /*
     * hwModalBus가 어플리케이션에 노출된 show, close, closeAll 메서드가 실행되었을때
     * 이벤트를 발생시켜 hw-modals-container 쪽으로 데이터를 전달하고 컨테이너는 전달된 데이터
     * 를 배열에 추가하여 렌더링을 담당하게 됩니다.
     */
    const hwModalBus = new Vue();
    const show = ({modalComp = {}, modalProps = {}, modalOptions = {}, modalHandlers = {}} = {}) => {
        if(!modalComp || !('__file' in modalComp || '_compiled' in modalComp)){
            return console.error('[HwModal]: \'modalComp\' 키에 유효하지 않은 값이 입력되었습니다. \nEx.) $hwModal.show({modalComp: [VueComponent]}) ')
        }
        if(Object.keys(modalOptions).length > 0){
            nextModalOptions = modalOptions = setOptions(modalOptions)
        }
        hwModalBus.$emit('show-modal', {
            modalComp,
            modalProps,
            modalOptions,
            modalHandlers,
        })
    };
    const close = (modalId) => {
        hwModalBus.$emit('close-modal', modalId)
    };
    const closeAll = () => {
        hwModalBus.$emit('close-all-modal')
    };
    
    return {
        show,
        close,
        closeAll,
        hwModalBus
    }
}

export default {
    install (Vue, options = {}) {
        if (typeof window !== 'undefined' && window.Vue) {
            Vue = window.Vue
        }
        nextModalOptions = setOptions(options);
        Vue.prototype.$hwModal = initHwModal();
        Vue.component('hw-modal-container', 
            Vue.extend(
                Object.assign({},HwModalContainer, {
                    props: {
                        options: {
                            type: Object,
                            default: () => nextModalOptions
                        }
                    }
                })
            )
        )
    }
}