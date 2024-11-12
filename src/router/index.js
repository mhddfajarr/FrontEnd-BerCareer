import { createWebHistory, createRouter } from 'vue-router'; 
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
import Home from '../components/pages/user/Home.vue';
// import LoginAdmin from '../components/pages/';
import Dashboard from '../components/pages/admin/Dashboard.vue';
import MainLayoutUser from '../components/layout/user/MainLayout.vue';
import MainLayoutAdmin from '../components/layout/admin/MainLayout.vue';
import ManageJob from '../components/pages/admin/managejob.vue';
import ManageJobseekers from '../components/pages/admin/ManageJobSeekers.vue';
import ProfileAdmin from '../components/pages/admin/Profile.vue';
import Jobs from '../components/pages/user/Jobs.vue';
import Profile from '../components/pages/user/Profile.vue';



const routes = [
  
  {
    path: '/admin',
    component: MainLayoutAdmin, 
    children: [
      {
        path: '', 
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: '/managejob', 
        name: 'ManageJob',
        component: ManageJob,
      },
      {
        path: '/managejobseekers', 
        name: 'ManageJobseekers',
        component: ManageJobseekers,
      },
      {
        path: '/profileadmin', 
        name: 'ProfileAdmin',
        component: ProfileAdmin
      },
    ],
  },
  {
    path: '/',
    component: MainLayoutUser, 
    children: [
      {
        path: '', 
        name: 'Home',
        component: Home,
      },{
        path: '/jobs', 
        name: 'Jobs',
        component: Jobs,
      },
      {
        path: '/profile', 
        name: 'Profile',
        component: Profile,
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