import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8000/api"

createApp(App).use(router).use(Quasar, quasarUserOptions).mount('#app')
