import Vue from 'vue'
import AppAdmin from './App-admin-pc.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios';

axios.defaults.withCredentials = true;

Vue.config.productionTip = false

  new Vue({
    router,
    vuetify,
    render: h => h(AppAdmin)
  }).$mount('#app')