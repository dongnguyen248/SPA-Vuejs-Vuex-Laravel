import Home from "./components/Home.vue";
import Login from "./components/auth/Login.vue";

const routes = [{
        path: "/",
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/login",
        component: Login
    }
];
export { routes };