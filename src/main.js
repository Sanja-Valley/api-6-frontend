import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ToastService from 'primevue/toastservice';

Vue.use(ToastService);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


// import PrimeVue from 'primevue/config'
// import { createApp } from 'vue'

// import router from './router'
// import store from './store'
// import 'primevue/resources/themes/saga-blue/theme.css'     //theme
// import 'primevue/resources/primevue.min.css'                 //core css
// import 'primeicons/primeicons.css'                          //icons
// import FileUpload from 'primevue/fileupload'
// import ToastService from 'primevue/toastservice';

// const app = createApp(App);
// const app = createApp(App);
// app.use(PrimeVue);
// app.mount('#app');
// app.use(router)
// app.use(ToastService)
// app.component('FileUpload', FileUpload);









