export default {
    name: 'hw-pane-layout',
    data() {
        return {
            isResizing: false
        }
    },
    props: {
        layout: {
            type: String,
            default: 'vertical' // horizontal
        },
        handleClass: {
            type: String,
            default: 'resizing-bar'
        },
        reverse: {
            type:Boolean,
            default: false
        }
    },
    computed: {
        paneClass() {
            return [`layout-${this.layout.slice(0, 1)}`, this.isResizing ? 'resizing-pane': '']
        },
        setReverse() {
            return this.reverse;
        }
    },
    methods: {
        onMouseDown({ target: resizer, pageX: initialPageX, pageY: initialPageY }) {
            if (resizer.className && resizer.className.match(this.handleClass)) {
                let self = this;
                console.log(self.layout)
                //let { $el: container, layout } = self;
                let container = self.$el;
                let layout = self.layout;
                let pane = resizer.previousElementSibling;
                let initialPaneWidth = pane.offsetWidth;
                let initialPaneHeight = pane.offsetHeight;
                // let {
                //     offsetWidth: initialPaneWidth,
                //     offsetHeight: initialPaneHeight,
                // } = pane;
                let usePercentage = !!(pane.style.width + '').match('%'); //Boolean 형변환 사용 [!!]

                // window.addEventListener , window.removeEventListener
                const { addEventListener, removeEventListener } = window;

                const resize = (initialSize, offset = 0) => {
                    if (layout === 'vertical') {
                        let containerWidth = container.clientWidth;
                        let paneWidth = initialSize + offset;
                        return (pane.style.width = usePercentage ? `${paneWidth / containerWidth * 100}%` : `${paneWidth}px`);
                    }
                    if (layout === 'horizontal') {
                        let containerHeight = container.clientHeight;
                        let paneHeight = initialSize + offset;

                        return (pane.style.height = usePercentage ? `${paneHeight / containerHeight * 100}%` : `${paneHeight}px`);
                    }
                };

                // This adds is-resizing class to container
                self.isResizing = true;

                // Resize once to get current computed size
                let size = resize();

                // Trigger paneResizeStart event
                self.$emit('resizeStart', pane, resizer, size);

                const onMouseMove = function({ pageX, pageY }) {
                    size = layout === 'vertical'
                        ? resize(initialPaneWidth, pageX - initialPageX)
                        : resize(initialPaneHeight, pageY - initialPageY);
                    self.$emit('resizing', pane, resizer, size);
                };

                const onMouseUp = function() {
                    // Run resize one more time to set computed width/height.
                    size = layout === 'vertical' ? resize(pane.clientWidth) : resize(pane.clientHeight);

                    // This removes is-resizing class to container
                    self.isResizing = false;

                    removeEventListener('mousemove', onMouseMove);
                    removeEventListener('mouseup', onMouseUp);

                    self.$emit('resizeStop', pane, resizer, size);
                };

                addEventListener('mousemove', onMouseMove);
                addEventListener('mouseup', onMouseUp);
            }
        },
    }
}