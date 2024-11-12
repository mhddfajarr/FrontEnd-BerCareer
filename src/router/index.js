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
import Jobs from '../components/pages/user/Jobs.vue';
import Profile from '../components/pages/user/Profile.vue';
import SaveJobs from '../components/pages/user/SaveJob.vue';
import Applied from '../components/pages/user/Applied.vue';
import Settings from '../components/pages/user/Settings.vue';




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
      // {
      //   path: '/loginadmin', 
      //   name: 'LoginAdmin',
      //   component: LoginAdmin
      // },
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
        path: '/applied', // relative path, tidak perlu diawali dengan '/'
        name: "Applied",
        component: Applied,
      },
      
      {
        path: '/profile', 
        name: 'Profile',
        component: Profile,
      },
      { 
        path: '/saveJobs', 
        name: "SaveJobs", 
        component: SaveJobs,
      },
      { 
        path: '/settings', 
        name: "Settings", 
        component: Settings,
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