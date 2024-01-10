import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import './index.css'
import store from '@/store'
import router from "./router"
import App from './App.vue'
import './registerServiceWorker'

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App).use(store).use(vuetify).use(router).mount('#app')