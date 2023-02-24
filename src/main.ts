// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus' // 引入ElementPlus组件
import 'element-plus/dist/index.css' // 引入ElementPlus组件样式
import App from './App.vue'
import AppLinkVue from './components/AppLink.vue' // 全局Link路由样式
import './assets/style/css/global.css' // 全局样式
import { router } from './router' // 启动路由
import { setupStore } from './store' // 设置pinia仓库

const app = createApp(App)
setupStore(app)
app.use(router)
app.use(ElementPlus)
app.component('AppLinkVue', AppLinkVue)
app.mount('#app')
