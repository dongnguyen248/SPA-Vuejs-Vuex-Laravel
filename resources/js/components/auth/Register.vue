<template>
  <div class="login row justify-content-center">
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">Register</div>
        <div class="card-body">
          <form @submit.prevent="register">
            <div class="from-group row">
              <label for="name">Name</label>
              <input
                type="text"
                class="form-control"
                v-model="user.name"
                placeholder="Your Name"
              />
            </div>
            <div class="from-group row">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                v-model="user.email"
                placeholder="Email Addres"
              />
            </div>
            <div class="from-group row">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                v-model="user.password"
                placeholder="Password"
              />
            </div>
            <div class="from-group row">
              <label for="confpassword"> Confirm Password</label>
              <input
                type="password"
                class="form-control"
                v-model="user.confpassword"
                placeholder="Confirm Password"
              />
            </div>
            <div class="from-group row mt-2">
              <input
                class="btn btn-primary form-control"
                type="submit"
                value="Register"
              />
            </div>
          </form>
          <div class="errors" v-if="errors">
            <ul>
              <li v-for="(fieldsError, fieldName) in errors" :key="fieldName">
                <strong>{{ fieldName }}</strong> {{ fieldsError.join("\n") }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import validate from "validate.js";

export default {
  name: "Register",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        confpassword: "",
      },
      errors: null,
    };
  },
  methods: {
    register() {
      this.errors = null;
      const constraints = this.getConstraints();
      const errors = validate(this.$data.user, constraints);
      if (errors) {
        return (this.errors = errors);
      }
      axios
        .post("/register", this.$data.user)
        .then((respone) => {
          console.log(respone.data);
          this.$router.push("/login");
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    getConstraints() {
      return {
        name: {
          presence: true,
          length: {
            minimum: 4,
            message: "must be at least 4 characters long",
          },
        },
        email: {
          presence: true,
          email: true,
        },
        password: {
          length: {
            minimum: 8,
            message: "password must be at least 6 characters long",
          },
        },
        confpassowrd: {
          equality: {
            attribute: "password",
            message: "Passwords do not match",
            comparator: function (v1) {
              return v1.confpassword === v1.password;
            },
          },
        },
      };
    },
  },
};
</script>
<style scoped>
.errors {
  margin-top: 10px;
  background: lightcoral;
  border-radius: 5px;
  padding: 21px 0 2px 0;
}
</style>
