import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style.less'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
Vue.use(ElementUI)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

console.log(process.env)

// import VConsole from 'vconsole'
// let vConsole = new VConsole()
