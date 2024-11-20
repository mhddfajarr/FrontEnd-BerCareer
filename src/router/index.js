import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/auth/Login.vue";
import Register from "../components/auth/Register.vue";
import Home from "../components/pages/user/Home.vue";
// import LoginAdmin from '../components/pages/';
import Dashboard from "../components/pages/admin/dashboard.vue";
import MainLayoutUser from "../components/layout/user/MainLayout.vue";
import MainLayoutAdmin from "../components/layout/admin/MainLayout.vue";
import ManageJob from "../components/pages/admin/ManageJob.vue";
import ManageJobseekers from "../components/pages/admin/ManageJobSeekers.vue";
import ProfileAdmin from "../components/pages/admin/Profile.vue";
import Jobs from "../components/pages/user/Jobs.vue";
import Profile from "../components/pages/user/Profile.vue";
import SaveJobs from "../components/pages/user/SaveJob.vue";
import Applied from "../components/pages/user/Applied.vue";
import Settings from "../components/pages/user/Settings.vue";
import AuthRedirect from "../components/auth/AuthRedirect.vue";
import { decodeToken } from "../Services/JWT/JwtDecode";
import ManageRole from "../components/pages/admin/superAdmin/ManageRole.vue";

const routes = [
  {
    path: "/admin",
    component: MainLayoutAdmin,
    beforeEnter: async (to, from, next) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const decodedToken = await decodeToken();
          const role = decodedToken.role;
          if (role == "User") {
            next({ name: "Home" });
          } else {
            next();
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          next({ name: "Home" });
        }
      } else {
        next({ name: "Home" });
      }
    },
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
      {
        path: "/managerole",
        name: "ManageRole",
        component: ManageRole,
        beforeEnter: async (to, from, next) => {
          try {
            const decodedToken = await decodeToken();
            const role = decodedToken.role;
            if (role == "Admin") {
              next({ name: "Admin" });
            } else {
              next();
            }
          } catch (error) {
            console.error("Error decoding token:", error);
            next({ name: "Home" });
          }
        },
      },
    ],
  },
  {
    path: "/",
    component: MainLayoutUser,
    beforeEnter: async (to, from, next) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const decodedToken = await decodeToken();
          const role = decodedToken.role;
          if (role == "Admin" || role == "Super Admin") {
            router.push({ name: "Dashboard" });
          } else {
            next();
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          next({ name: "Home" });
        }
      }
      next();
    },
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
    name: "authRedirect",
    component: AuthRedirect,
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
