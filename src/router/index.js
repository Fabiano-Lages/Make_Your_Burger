import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const url = process.env.VUE_APP_API_URL;
const porta = Number(process.env.VUE_APP_API_PORTA);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    props: {url, porta}
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
    component: () => import('../views/PedidosView.vue'),
    props: {url, porta}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;