import { createApp } from 'vue'

import '@mdi/font/css/materialdesignicons.css' // import css icons

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import store from '@/store'
import router from "./router"
import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App).use(store).use(vuetify).use(router).mount('#app')

router.push('/')