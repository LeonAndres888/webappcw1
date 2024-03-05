<template>
  <header>
    <h1>{{ sitename }}</h1>
    <button @click="toggleCart">
      🛒 Shopping Cart 🛒 ({{ cartItemCount }})
    </button>
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
      this.$emit("toggle-cart");
    },
  },
};
</script>

<style scoped>
/* Add the specific styles for header from styles.css */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  height: 100px;
  background-color: #ddd0c8;
}

h1 {
  font-size: 50px;
  font-weight: bold;
  color: #712626;
}

button {
  padding: 8px 20px;
  border: none;
  background-color: #2a2a2a;
  color: white;
  transition: background-color 0.6s ease;
  border-radius: 50px;
  cursor: pointer;
}

button:hover {
  background-color: #676767;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
