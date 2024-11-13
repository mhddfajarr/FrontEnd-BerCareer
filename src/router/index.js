import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/auth/Login.vue";
import Register from "../components/auth/Register.vue";
import Home from "../components/pages/user/Home.vue";
// import LoginAdmin from '../components/pages/';
import Dashboard from "../components/pages/admin/Dashboard.vue";
import MainLayoutUser from "../components/layout/user/MainLayout.vue";
import MainLayoutAdmin from "../components/layout/admin/MainLayout.vue";
import ManageJob from "../components/pages/admin/managejob.vue";
import ManageJobseekers from "../components/pages/admin/ManageJobSeekers.vue";
import ProfileAdmin from "../components/pages/admin/Profile.vue";
import Jobs from "../components/pages/user/Jobs.vue";
import Profile from "../components/pages/user/Profile.vue";
import SaveJobs from "../components/pages/user/SaveJob.vue";
import Applied from "../components/pages/user/Applied.vue";
import Settings from "../components/pages/user/Settings.vue";
import RegisterWithGoogle from "../components/auth/RegisterWithGoogle.vue";
import LoginWithGoogle from "../components/auth/LoginWithGoogle.vue";

const routes = [
  {
    path: "/admin",
    component: MainLayoutAdmin,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/managejob",
        name: "ManageJob",
        component: ManageJob,
      },
      {
        path: "/managejobseekers",
        name: "ManageJobseekers",
        component: ManageJobseekers,
      },
      {
        path: "/profileadmin",
        name: "ProfileAdmin",
        component: ProfileAdmin,
      },
    ],
  },
  {
    path: "/",
    component: MainLayoutUser,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "jobs/:id",
        name: "Jobs",
        component: Jobs,
      },
      {
        path: "applied",
        name: "Applied",
        component: Applied,
        beforeEnter: (to, from, next) => {
          const token = localStorage.getItem("authToken");
          if (token) {
            next();
          } else {
            next({ name: "Home" });
          }
        },
      },

      {
        path: "profile",
        name: "Profile",
        component: Profile,
        beforeEnter: (to, from, next) => {
          const token = localStorage.getItem("authToken");
          if (token) {
            next();
          } else {
            next({ name: "Home" });
          }
        },
      },
      {
        path: "saveJobs",
        name: "SaveJobs",
        component: SaveJobs,
        beforeEnter: (to, from, next) => {
          const token = localStorage.getItem("authToken");
          if (token) {
            next();
          } else {
            next({ name: "Home" });
          }
        },
      },
      {
        path: "settings",
        name: "Settings",
        component: Settings,
        beforeEnter: (to, from, next) => {
          const token = localStorage.getItem("authToken");
          if (token) {
            next();
          } else {
            next({ name: "Home" });
          }
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        next();
      } else {
        next({ name: "Home" });
      }
    },
  },
  {
    path: "/register/google",
    name: "googleRegister",
    component: RegisterWithGoogle,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        next();
      } else {
        next({ name: "Home" });
      }
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        next();
      } else {
        next({ name: "Home" });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
