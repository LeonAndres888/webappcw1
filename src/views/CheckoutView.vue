<template>
  <div class="checkout">
    <cart-component
      :cart="cart"
      @remove-item-from-cart="handleRemoveItemFromCart"
    />
    <div class="order-form">
      <form @submit.prevent="submitOrder">
        <div class="form-group">
          <label for="custName">Name:</label>
          <input
            type="text"
            id="custName"
            v-model="custName"
            placeholder="Your name"
            required
          />
        </div>

        <div class="form-group">
          <label for="custPhone">Phone Number:</label>
          <input
            type="tel"
            id="custPhone"
            v-model="custPhone"
            placeholder="Your phone number"
            required
          />
        </div>

        <button type="submit" :disabled="!validCheckout || cart.length === 0">
          Submit Order
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import CartComponent from "@/components/CartComponent.vue";

export default {
  name: "CheckoutView",
  components: {
    CartComponent,
  },
  data() {
    return {
      sitename: "👨‍🎓 STUDY SESSION STORE 👩‍🎓",
      showProduct: true,
      products: [],
      cart: [],
      searchLesson: "",
      sortAttribute: "title",
      sortOrder: "ascending",
      custName: "",
      custPhone: "",
      orderSubmitted: false,
    };
  },
  computed: {
    // Computed properties as in your script.js
    validCheckout() {
      const nameRegex = /^[A-Za-z\s]+$/;
      const phoneRegex = /^[0-9()-]+$/;
      return nameRegex.test(this.custName) && phoneRegex.test(this.custPhone);
    },
  },
  methods: {
    removeItemCart(item) {
      let index = this.cart.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        this.cart[index].quantity--;
        if (this.cart[index].quantity === 0) {
          this.cart.splice(index, 1);
        }
      }
    },
    submitOrder() {
      if (!this.validCheckout) {
        alert("Please fill in the name and phone number correctly.");
        return;
      }
      const order = {
        name: this.custName,
        phoneNumber: this.custPhone,
        items: this.cart.map((item) => ({
          lessonId: item.id,
          quantity: item.quantity,
        })),
      };
      fetch(
        "https://storefinal-env.eba-vfsgptpf.us-east-1.elasticbeanstalk.com/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(() => {
          this.orderSubmitted = true;
          this.cart = []; // Clear cart after order
        })
        .catch((error) => {
          console.error("Error submitting order:", error);
        });
    },
  },
};
</script>
