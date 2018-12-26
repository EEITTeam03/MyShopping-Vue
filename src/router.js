import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '*',
      redirect: 'login',
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: () => import('./views/Home.vue'),
    //   meta: {
    //     requiresAuth: true,
    //   },
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue'),
      children: [
        {
          path: 'products',
          name: 'Products',
          component: () => import('./components/Products.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: () => import('./components/Coupons.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'orders',
          name: 'Orders',
          // component: () => import('./components/Products.vue'),
          meta: {
            requiresAuth: true,
          },
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
  ],
});
