<template>
  <header class="site-header">
    <h1>{{ sitename }}</h1>
    <button @click="toggleCart">🛒 Shopping Cart ({{ cartItemCount }})</button>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  props: {
    sitename: String,
    cartItemCount: Number,
  },
  methods: {
    toggleCart() {
      // Emitting an event upwards to the parent component to handle the cart visibility toggle
      this.$emit("toggle-cart");
    },
  },
};
</script>

<style scoped>
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5; /* Light grey background */
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
}

.site-header h1 {
  margin: 0;
  color: #333; /* Dark grey color for the text */
  font-family: "Arial", sans-serif; /* Arial font with sans-serif as the fallback */
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #008cba; /* Blue background */
  color: white; /* White text */
  cursor: pointer;
  transition: background-color 0.3s ease; /* Smooth transition for the background color */
}

button:hover {
  background-color: #005f75; /* Darker shade of blue on hover */
}
</style>
