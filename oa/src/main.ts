import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import  axios  from  "@/model/axios";  
//导入mock
import './mock/'

const app =createApp(App)
    .use(store)
    .use(router)
    .use(Antd)
app.mount('#app')   
app.config.globalProperties.$axios=axios
    