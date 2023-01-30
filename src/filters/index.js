import Vue from 'vue';
import moment from 'moment-timezone';

Vue.filter('dateFormat', function(value, format, lang='ko') {
    if(value === '') return '';
    return value === null ? '' : moment(value).locale(lang).format(format);
});

// Vue.filter('relativeFormat', function(value) {
//     return common.getRelativeDate(value, 'YYYY-MM-DD HH:mm');
// });

Vue.filter('splitText', function(value, word, order) {
    let split = value.split(word);
    if(order === '' || order == null) return split;
    if (order === 'first') {
        return split[0]
    } else if (order === 'last') {
        return split[split.length-1]
    } else {
        return split[order]
    }
});

Vue.filter('uppercase', function(value) {
    if(typeof value !== 'string') return;
    return value.toUpperCase()
});

Vue.filter('lowercase', function(value) {
    if(typeof value !== 'string') return;
    return value.toLowerCase()
});


Vue.filter('first', function(value) {
    if(typeof value !== 'object') return;
    return value[0]
});

Vue.filter('last', function(value) {
    if(typeof value !== 'object') return;
    return value[value.length-1]
});

Vue.filter('convertNumber', function(value, uunit = '') {
    if (!value) return
    const nt2 = ['', '만', '억', '조', '경', '해']
    let result = ''
    const unit = 10000
    let index = 0
    let division = Math.pow(unit, index)
    while(Math.ceil(value / division) > 0) {
        const tNum = Math.floor(value % (division * unit) / division)
        if (tNum) {
            result = `${convertNum(tNum)}${nt2[index]}${result}`
        }
        division = Math.pow(unit, ++index)
    }
    return `${result} ${uunit}`
});

function convertNum(number) {
    const nt = ['', '십', '백', '천']
    const numText = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']
    let num = parseInt(number).toString().split('').reverse()
    let text = []
    let nb
    let nb1
    num.forEach((n, i) => {
        nb = n > 1 || (n == 1 && i === 0) ? numText[n] : ''
        nb1 = n > 0 ? nt[i % 4] : ''
        text.unshift(nb + nb1)
    })
    return text.join('')
}