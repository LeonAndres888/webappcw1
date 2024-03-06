<template>
  <div class="cart-container">
    <h2>Shopping Cart</h2>
    <ul class="cart-items">
      <li v-for="item in cart" :key="item.id" class="cart-item">
        {{ item.title }} - £{{ item.price }} x {{ item.quantity }}
        <button @click="removeItemFromCart(item)" class="remove-btn">
          Remove
        </button>
      </li>
    </ul>
    <p v-if="cart.length === 0" class="empty-cart">Your cart is empty.</p>
  </div>
</template>

<script>
export default {
  name: "CartComponent",
  props: ["cart"],
  methods: {
    removeItemFromCart(item) {
      // Emitting an event to signal the parent component to remove the item from the cart
      this.$emit("remove-item-from-cart", item);
    },
  },
};
</script>

<style scoped>
.cart-container {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px; /* Adjust as necessary */
  margin: auto;
}

.cart-items {
  list-style-type: none;
  padding: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.remove-btn {
  padding: 5px 10px;
  background-color: #e53935; /* Red */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: #d32f2f;
}

.empty-cart {
  text-align: center;
  color: #757575; /* Grey */
}
</style>
