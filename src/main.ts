import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'virtual:svg-icons-register' // 引入svg处理脚本

createApp(App).use(createPinia()).use(ElementPlus).mount('#app')
