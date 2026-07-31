import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/styles/global.scss'

import App from './App.vue'
import router from './router'
import { captureFbParams } from './utils/fbclid'

captureFbParams()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
