import Vue from 'vue';
import App from './App.vue';
import store from './store';
// can just write './store' instead of './store/index.js' since its a index file

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
