import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import 'vant/es/toast/style';


const app = createApp(App)
app.use(router).mount('#app')
