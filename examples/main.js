/**
 * Created by aresn on 16/6/20.
 */
import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import areaGq from '../src/index';

Vue.use(VueRouter);
Vue.use(areaGq);

// 开启debug模式
Vue.config.debug = true;

// 路由配置
const router = new VueRouter({
    esModule: false,
    mode: 'history',
    routes: [
        {
            path: '/',
            component: (resolve) => require(['./routers/area-select.vue'], resolve)
        }
    ]
});

const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app');
