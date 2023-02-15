import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import vuetify from './plugins/vuetify';
import lodashPlugin from './plugins/lodash';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import data from '../public/data.json';

Vue.use(VueMaterial)
Vue.use(lodashPlugin)

if (localStorage.getItem('workspaces') == null) {
  localStorage.setItem('workspaces', JSON.stringify(data.workspaces))
  localStorage.setItem('employees', JSON.stringify(data.employees))
}
// localStorage.setItem('workspaces', JSON.stringify(data.workspaces))
// localStorage.setItem('employees', JSON.stringify(data.employees))


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');