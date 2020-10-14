import axios from "axios";
import { getLocalUser } from "./helper/auth";

const user = getLocalUser();
export default {
    state: {
        currentUser: user,
        isLoginedIn: !!user,
        loading: false,
        auth_error: null,
        customers: []
    },
    getters: {
        isLoading(state) {
            return state.isLogin;
        },
        isLoginedIn(state) {
            return state.isLoginedIn;
        },
        currentUser(state) {
            return state.currentUser;
        },
        authError(state) {
            return state.auth_error;
        },
        customers(state) {
            return state.customers;
        }
    },
    mutations: {
        login(state) {
            state.loading = true;
            state.auth_error = null;
        },
        LoginSuccess(state, payload) {
            state.auth_error = null;
            state.isLoginedIn = true;
            state.loading = false;
            state.currentUser = Object.assign({}, payload.user, {
                token: payload.access_token
            });
            localStorage.setItem("user", JSON.stringify(state.currentUser));
        },
        LoginFail(state, payload) {
            state.loading = false;
            state.auth_error = payload.error;
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isLoginedIn = false;
            state.currentUser = null;
        },
        updateCustomer(state, payload) {
            state.customers = payload;
        }
    },
    actions: {
        login(context) {
            context.commit("login");
        },
        getCustomers(context) {
            axios.get('/api/customers', {
                headers: {
                    Authorization: `Bearer ${this.$store.getters.currentUser.token}`,
                },
            }).then((response) => {
                context.commit('updateCustomer', response.data.customers);
            })
        }
    }
};