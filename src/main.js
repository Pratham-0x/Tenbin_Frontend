import { createApp } from 'vue'
import '@varlet/ui/es/style'
import './style.css'
import Varlet from '@varlet/ui'
import App from './App.vue'
import 'dotenv'

const app = createApp(App)
app.use(Varlet)
app.mount('#app')
