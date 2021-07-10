import Vue from 'vue'
import vuetify from './plugins/vuetify';
import "vuetify/dist/vuetify.min.css";
import App from './App.vue'
import {router} from '@/routes/school.routes';
import store from '@/stores/school';
import Snotify from 'vue-snotify';

Vue.config.productionTip = false

Vue.use(Snotify, {
  toast: {
    position: "rightTop",
    showProgressBar:false
  }
});

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
}).$mount('#app')
