<template>
  <div customer-new>
    <form @submit.prevent="add">
      <table class="table">
        <tr>
          <th>Name</th>
          <td>
            <input
              type="text"
              class="form-control"
              v-model="customer.name"
              placeholder="Customer Name"
            />
          </td>
        </tr>
        <tr>
          <th>Email</th>
          <td>
            <input
              type="text"
              class="form-control"
              v-model="customer.email"
              placeholder="Customer Email"
            />
          </td>
        </tr>
        <tr>
          <th>Phone</th>
          <td>
            <input
              type="text"
              class="form-control"
              v-model="customer.phone"
              placeholder="Customer Phone"
            />
          </td>
        </tr>
        <tr>
          <th>Website</th>
          <td>
            <input
              type="text"
              class="form-control"
              v-model="customer.website"
              placeholder="Customer Website"
            />
          </td>
        </tr>
        <tr>
          <td>
            <router-link to="/customers" class="btn btn-light"
              >Cancel</router-link
            >
          </td>
          <td class="text-right">
            <input type="submit" value="Create" class="btn btn-primary" />
          </td>
        </tr>
      </table>
    </form>
    <div class="errors" v-if="errors">
      <ul>
        <li v-for="(fieldsError, fieldName) in errors" :key="fieldName">
          <strong>{{ fieldName }}</strong> {{ fieldsError.join("\n") }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import validate from "validate.js";
export default {
  name: "New",
  data() {
    return {
      customer: {
        name: "",
        email: "",
        phone: "",
        website: "",
      },
      errors: null,
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },
  methods: {
    add() {
      this.errors = null;
      const constraints = this.getConstraints();
      const errors = validate(this.$data.customer, constraints);
      if (errors) {
        return (this.errors = errors);
      }
      axios.post("/api/customers/new", this.$data.customer).then((response) => {
        this.$router.push("/customers");
      });
    },
    getConstraints() {
      return {
        name: {
          presence: true,
          length: {
            minimum: 4,
            message: "must be at least 4 characters ling",
          },
        },
        email: {
          presence: true,
          email: true,
        },
        phone: {
          presence: true,
          numericality: true,
          length: {
            minimum: 10,
            message: "must be at least 10 digits ling",
          },
        },
        website: {
          presence: true,
          url: true,
        },
      };
    },
  },
};
</script>
<style scoped>
.errors {
  background: lightcoral;
  border-radius: 5px;
  padding: 21px 0 2px 0;
}
</style>