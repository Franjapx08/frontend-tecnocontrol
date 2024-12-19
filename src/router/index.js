import * as VueRouter from 'vue-router';

import Test from '@/views/Units.vue'
import Reports from '@/views/Reports.vue'

const routes = [
  {
      path: '/',
      name: 'test',
      meta: {
          layout: "page"
      },
      component: Test,
  },
  {
    path: '/reports',
    name: 'reports',
    meta: {
        layout: "page",
        requiresAuth: true
    },
    component: Reports,
  },
  { 
      path: '/:pathMatch(.*)*', 
      redirect: '/' 
  }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: routes,
})

export default router;