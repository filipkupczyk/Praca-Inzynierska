import { createRouter, createWebHistory } from 'vue-router'
//import authService from '@/services/authService';


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    //meta: { requiresAuth: true }
  },
  {
    path: '/collection/:id',
    name: 'collection',
    props: true,
    component: () => import('../views/Collection.vue')
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('../views/Faq.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/search/:data',
    name: 'search',
    props: true,
    component: () => import('../views/Search.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../views/Create.vue')
  },
  {
    path: '/myposts',
    name: 'myposts',
    component: () => import('../views/MyPosts.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    props: true,
    component: () => import('../views/Edit.vue')
  },
  {
    path: '/edituser',
    name: 'edituser',
    component: () => import('../views/EditUser.vue')
  },
  {
    path: '/payments',
    name: 'payments',
    component: () => import('../views/Payments.vue')
  },
  {
    path: '/admin/userlist',
    name: 'userlist',
    component: () => import('../views/UserList.vue')
  },
  {
    path: '/admin/postlist',
    name: 'postlist',
    component: () => import('../views/PostList.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


//na puzniej
// router.beforeEach(async (to, from, next) => {
//   if (to.meta.requiresAuth) {
//     const isAuthenticated = await authService.isAuthenticated();
//     if (!isAuthenticated) {
//       next('/login');
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router
