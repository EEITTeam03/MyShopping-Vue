import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import VeeValidate, { Validator } from 'vee-validate';
import zhTwValidate from 'vee-validate/dist/locale/zh_TW';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import App from './App.vue';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';

Vue.use(VueAxios, axios);
Vue.use(VeeValidate);
Validator.localize('zhTw', zhTwValidate);
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  // console.log('to', to, 'from', from, 'next', next);
  if (to.meta.requiresAuth) {
    const path = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(path).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
