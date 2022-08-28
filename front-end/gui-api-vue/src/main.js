import { createApp } from 'vue'
import App from "@/App"
import store from '@/store'

import './gui_api.css'

createApp(App).use(store).mount('#root')
