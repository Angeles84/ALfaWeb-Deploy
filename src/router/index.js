import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/login',
    name: 'Login2',
    redirect: Login
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('../views/Registro.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      login: true
    }
  },
  {
    path: '/administracion',
    name: 'Administracion',
    component: () => import('../views/Administracion.vue'),
    meta: {
      login: true
    }
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: () => import('../views/Editar'),
    meta: {
      login: true
    }
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  let user = Firebase.auth().currentUser;
  let authRequired = to.matched.some(route => route.meta.login);
  if (!user && authRequired) {
    next('login');
  } else if (user && !authRequired) {
    next('home');
  }else {
    next();
  }
});

export default router
