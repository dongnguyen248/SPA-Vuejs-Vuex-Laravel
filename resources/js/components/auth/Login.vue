<template>
    <div class="login row justify-content-center">
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">Login</div>
                <div class="card-body">
                    <form @submit.prevent="authenticate">
                        <div class="from-group row">
                            <label for="email">Email</label>
                            <input
                                type="email"
                                class="form-control"
                                v-model="form.email"
                                placeholder="Email Addres"
                            />
                        </div>
                        <div class="from-group row">
                            <label for="password">Password</label>
                            <input
                                type="password"
                                class="form-control"
                                v-model="form.password"
                                placeholder="Password"
                            />
                        </div>
                        <div class="from-group row mt-2">
                            <input
                                class="btn btn-primary form-control"
                                type="submit"
                                value="Login"
                            />
                        </div>
                        <div class="from-group row mt-2" v-if="authError">
                            <p class="error">{{ authError }}</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { login } from "../../helper/auth";
export default {
    data() {
        return {
            form: {
                email: "",
                password: ""
            },
            error: null
        };
    },
    methods: {
        authenticate() {
            this.$store.dispatch("login");
            login(this.$data.form)
                .then(res => {
                    this.$store.commit("LoginSuccess", res);
                    this.$router.push({ path: "/" });
                })
                .catch(error => {
                    this.$store.commit("LoginFail", { error });
                });
        }
    },
    computed: {
        authError() {
            return this.$store.getters.authError;
        }
    }
};
</script>
<style scoped>
.error {
    color: red;
    text-align: center;
}
</style>
