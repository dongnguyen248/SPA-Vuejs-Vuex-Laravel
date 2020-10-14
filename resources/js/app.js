require("./bootstrap");

window.Vue = require("vue");
import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import storeData from "./store";
import { routes } from "./routes";
import MaintApp from "./components/MainApp.vue";
import { initialize } from "./helper/general";
// import * as VeeValidate from "vee-validate";
// Vue.use(VeeValidate, { errorBagName: "vErrors" });

Vue.use(VueRouter);
const router = new VueRouter({
    routes,
    mode: "history"
});
const store = new Vuex.Store(storeData);
initialize(store, router);

const app = new Vue({
    el: "#app",
    router,
    store,
    components: {
        MaintApp
    }
});