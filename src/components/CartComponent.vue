<template>
  <div>
    <h2>Shopping Cart</h2>
    <div v-for="item in cart" :key="item.id">
      <span>{{ item.title }} - £{{ item.price }}</span>
      <button @click="removeItemFromCart(item)">Remove</button>
    </div>
    <p v-if="cart.length === 0">Your cart is empty.</p>
  </div>
</template>

<script>
export default {
  name: "CartComponent",
  props: ["cart"],
  methods: {
    removeItemFromCart(item) {
      this.$emit("remove-item-from-cart", item);
    },
  },
};
</script>

<style scoped>
/* Styles for the cart component */
</style>
