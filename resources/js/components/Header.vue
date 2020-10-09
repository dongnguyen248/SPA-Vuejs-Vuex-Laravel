<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <router-link class="navbar-brand" to="/">
                    My SPA App</router-link
                >
                <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <template v-if="!currentUser">
                        <li>
                            <router-link class="nav-link" to="/login"
                                >Login</router-link
                            >
                        </li>
                        <li>
                            <router-link class="nav-link" to="/register"
                                >Register</router-link
                            >
                        </li>
                    </template>
                    <template v-else>
                        <li>
                            <router-link to="/customer" class="nav-link">
                                Customer</router-link
                            >
                        </li>
                        <li class="nav-item dropdown">
                            <a
                                href="#"
                                id="navbarDropdown"
                                class="nav-link dropdown-toggle"
                                role="button"
                                aria-expanded="false"
                                aria-haspopup="true"
                                data-toggle="dropdown"
                            >
                                {{ currentUser.name }}
                                <span class="caret"></span>
                            </a>
                            <div
                                class="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                            >
                                <a
                                    href="#!"
                                    @click.prevent="logout"
                                    class="dropdown-item"
                                    >Logout</a
                                >
                            </div>
                        </li>
                    </template>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    name: "app-header",
    methods: {
        logout() {
            this.$store.commit("logout");
            this.$router.push("/login");
        }
    },
    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        }
    }
};
</script>
