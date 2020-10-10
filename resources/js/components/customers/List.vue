<template>
  <div>
    <table class="table">
      <thead>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Action</th>
      </thead>
      <tbody>
        <template v-if="!customers.lenght">
          <tr>
            <td colspan="4" class="text-center">No Customer Advailable</td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="customer in customers" :key="customer.id">
            <td>{{ customer.name }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phone }}</td>
            <td>
              <router-link :to="`/customer/${customer.id}`">View</router-link>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  computed: {
    customers() {
      return this.$store.getters.customers;
    },
  },
};
</script>