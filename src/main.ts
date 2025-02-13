import { createApp } from 'vue'
import './style.css'

import 'element-plus/theme-chalk/index.css'
import App from './App.vue'
import ElementPlus from 'element-plus'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/styles/tailwind.css';
import './output.css'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}



  app.use(ElementPlus).mount('#app')
