<template>
  <div class="checkout-container">
    <h1>Shopping Cart</h1>
    <div v-if="cart.length > 0">
      <ul class="cart-list">
        <li v-for="(item, index) in cart" :key="index" class="cart-item">
          {{ item.title }} - {{ item.location }} - £{{ item.price }}
          <button class="remove-btn" @click="removeItemFromCart(item)">
            Remove
          </button>
        </li>
      </ul>
      <form class="checkout-form" @submit.prevent="submitOrder">
        <input type="text" v-model="custName" placeholder="Name" required />
        <input
          type="text"
          v-model="custPhone"
          placeholder="Phone number"
          required
        />
        <button type="submit" class="checkout-btn" :disabled="!validCheckout">
          Checkout
        </button>
      </form>
      <p v-if="orderSubmitted" class="thank-you-message">
        Thank you for your order!
      </p>
    </div>
    <div v-else class="empty-cart-message">Your cart is empty.</div>
  </div>
</template>

<script>
export default {
  props: {
    cart: Array,
  },
  data() {
    return {
      custName: "",
      custPhone: "",
      orderSubmitted: false,
    };
  },
  computed: {
    validCheckout() {
      const nameRegex = /^[A-Za-z\s]+$/;
      const phoneRegex = /^[0-9()-]+$/;
      return nameRegex.test(this.custName) && phoneRegex.test(this.custPhone);
    },
  },
  methods: {
    removeItemFromCart(item) {
      this.$emit("remove-item-from-cart", item);
    },
    submitOrder() {
      if (!this.validCheckout) {
        alert("Please enter valid name and phone number.");
        return;
      }
      this.$emit("submit-order", {
        name: this.custName,
        phone: this.custPhone,
        items: this.cart,
      });
      this.orderSubmitted = true;
      // Reset form fields after submission
      this.custName = "";
      this.custPhone = "";
    },
  },
};
</script>

<style scoped>
.checkout-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.cart-list {
  list-style: none;
  padding: 0;
}

.cart-item {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remove-btn {
  padding: 6px 12px;
  background-color: #c0392b;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: #e74c3c;
}

.checkout-form {
  margin-top: 20px;
}

.checkout-form input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.checkout-btn {
  padding: 10px 15px;
  background-color: #27ae60;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

.checkout-btn:hover {
  background-color: #2ecc71;
}

.checkout-btn:disabled {
  background-color: #95a5a6;
}

.thank-you-message {
  color: #27ae60;
  margin-top: 20px;
}

.empty-cart-message {
  margin-top: 20px;
}
</style>
