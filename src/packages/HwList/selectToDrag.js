export default {
    dragReady({target:firstItem}) {
        let start = '';
        // let end ='';
        let result = {};
        if (firstItem.className && firstItem.className.match('hw-item')){
            console.log(firstItem.attributes.index.value)
            // firstItem.classList.add('start')

            start = firstItem.attributes.index.value;

            const setSelect = function(s, e) {
                console.log( {start:s, end:e})
                return {start:s, end:e}
            };

            const { addEventListener, removeEventListener } = window;
            const onMouseMove = function() {
                console.log('move')
            };
            const onMouseUp = function({target: endItem}) {
                result = setSelect(start, endItem.attributes.index.value);
                removeEventListener('mousemove', onMouseMove);
                removeEventListener('mouseup', onMouseUp);
            };
            addEventListener('mousemove', onMouseMove);
            addEventListener('mouseup', onMouseUp);
        }
        return result
    }
}
