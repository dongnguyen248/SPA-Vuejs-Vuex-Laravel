import Home from "./components/Home.vue";
import Login from "./components/auth/Login.vue";
import CustomersMain from "./components/customers/Main.vue";
import CustomerList from "./components/customers/List.vue";
import NewCustomer from "./components/customers/New.vue";
import Customer from "./components/customers/View.vue";
import Register from "./components/auth/Register.vue";

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
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/customers",
        component: CustomersMain,
        meta: {
            requiresAuth: true
        },
        children: [{
                path: "/",
                component: CustomerList
            },
            {
                path: "new",
                component: NewCustomer
            },
            {
                path: ":id",
                component: Customer
            }
        ]
    }
];
export { routes };