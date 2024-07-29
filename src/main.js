import { createApp } from 'vue';
import App from './App.vue';
import rota from './router/index.js';
import "bootstrap-icons/font/bootstrap-icons.css";

createApp(App, { url: rota.url, porta: rota.porta })
    .use(rota.router)
    .mount('#app');