export function initialize(store, router) {
    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(
            record => record.meta.requiresAuth
        );
        const currentUser = store.state.currentUser;
        // when route requires auth and there's no current user, reidrect to '/login'
        if (requiresAuth && !currentUser) {
            next("/login");
            // when we go to login route and are already logged in, we can skip this page
            // so we redirect to the homepage
        } else if (to.path == "/login" && currentUser) {
            next("/");
            // if none of the above matches, we have a normal navigation that should just go through
            // so we call `next()`
        } else {
            next(); // you called `next('/')` which redirected to the homepage over and over again.
        }
    });
    axios.interceptors.response.use(null, () => {
        if (error.response.status == 401) {
            store.commit("logout");
            router.push("/login");
        }
    });
}