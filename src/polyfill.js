/**
 * Array Polyfills
 */
(function () {
    if (!Array.prototype.findIndex) {
        Object.defineProperty(Array.prototype, 'findIndex', {
            value: function(predicate) {
                'use strict';
                if (this == null) {
                    throw new TypeError('Array.prototype.findIndex called on null or undefined');
                }
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }
                var list = Object(this);
                var length = list.length >>> 0;
                var thisArg = arguments[1];
                var value;

                for (var i = 0; i < length; i++) {
                    value = list[i];
                    if (predicate.call(thisArg, value, i, list)) {
                        return i;
                    }
                }
                return -1;
            },
            enumerable: false,
            configurable: false,
            writable: false
        });
    }
})();

/**
 * HTMLElement Polyfills
 */
(function (arr) {
    arr.forEach(function (item) {
        // eslint-disable-next-line no-prototype-builtins
        if (item.hasOwnProperty('remove')) {
            return;
        }
        Object.defineProperty(item, 'remove', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function remove() {
                if (this.parentNode !== null)
                    this.parentNode.removeChild(this);
            }
        });
    });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

(function () {
    if(!HTMLCanvasElement.prototype.toBlob){
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
            value: function(callback, type, quality) {
                var dataURL = this.toDataURL(type, quality).split(",")[1];
                setTimeout(function() {
                    var binStr = atob(dataURL);
                    var len = binStr.length;
                    var arr = new Uint8Array(len);
                    for (var i = 0; i < len; i++) {
                        arr[i] = binStr.charCodeAt(i);
                    }
                    callback(new Blob([arr], {type: type || 'image/png'}));
                });
            }
        });
    }
})();
