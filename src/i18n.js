import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios';

Vue.use(VueI18n);

async function getLocaleData () {
  let local = 'ko-KR';
  // let message = {};
  return await axios.get('./locales/'+local+'.json')
  // message[local] = res.data

}

export default new VueI18n({
  locale: 'ko-KR',
  fallbackLocale:'en-US',
  // messages: loadLocaleMessages()
  messages: {'ko-KR':getLocaleData}
})
