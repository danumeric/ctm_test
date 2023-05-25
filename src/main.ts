import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VSelect from '@/components/base/VSelect.vue'

createApp(App).component('VSelect', VSelect).use(router).mount('#app')
