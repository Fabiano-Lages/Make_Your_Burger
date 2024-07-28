import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const url = process.env.VUE_APP_API_URL;
const porta = Number(process.env.VUE_APP_API_PORTA);
const loggedIn = !!sessionStorage.getItem('token');

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
    props: {url, porta},
    meta: {
      requireAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requireAuth) && !loggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router;