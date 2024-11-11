import { createWebHistory, createRouter } from 'vue-router'; 
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
import Home from '../components/pages/user/Home.vue';
import Dashboard from '../components/pages/admin/Dashboard.vue';
import MainLayoutUser from '../components/layout/user/MainLayout.vue';
import MainLayoutAdmin from '../components/layout/admin/MainLayout.vue';



const routes = [
  {
    path: '/',
    component: MainLayoutUser, 
    children: [
      {
        path: '', 
        name: 'Home',
        component: Home,
      },
    ],
  },
  {
    path: '/admin',
    component: MainLayoutAdmin, 
    children: [
      {
        path: '', 
        name: 'Dashboard',
        component: Dashboard,
      },
    ],
  },
  { 
    path: '/login', 
    name: "login", 
    component: Login 
  },
  { 
    path: '/register', 
    name: "register", 
    component: Register 
  },
  { 
    path: '/', 
    name: "home", 
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;