import { createWebHistory, createRouter } from 'vue-router'; 
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
import Home from '../components/pages/user/Home.vue';
import MainLayout from '../components/layout/MainLayout.vue';


const routes = [
  {
    path: '/',
    component: MainLayout, 
    children: [
      {
        path: '', 
        name: 'Home',
        component: Home,
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