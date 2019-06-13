import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './vuex/store';

import VueScrollTo from 'vue-scrollto';

Vue.config.productionTip = false;

Vue.use(VueScrollTo);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
