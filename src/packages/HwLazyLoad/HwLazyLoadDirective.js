const isIE = /(msie|trident)/gi.test(navigator.userAgent)

const isObservable = (el, binding) => {
    return !isIE
    && (!('value' in binding) || binding.value)
    && el instanceof HTMLImageElement
}

const onIntersect = (entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const $image = entry.target;
            const dataSrc = $image.dataset.src;
            $image.setAttribute('src', dataSrc);
            $image.removeAttribute('data-src');
            observer.unobserve($image);
        }
    })
}

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.0
}

let observer = null
if(!isIE){
    observer = new IntersectionObserver(onIntersect, observerOptions);
}

export default {
    bind(el, binding){
        if(isObservable(el, binding)){
            el.classList.add('hw-lazy-element');
        }
    },
    inserted(el, binding){
        if(isObservable(el, binding)){
            observer.observe(el);
        }
    },
    unbind(el){
        observer.unobserve(el)
    }
}
