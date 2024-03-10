<template>
  <div class="checkout-container">
    <h1>Shopping Cart</h1>

    <div v-if="cart.length > 0">
      <ul class="cart-list">
        <li v-for="item in cart" :key="item.id" class="cart-item">
          <span
            >{{ item.title }} - {{ item.location }} - £{{ item.price }}</span
          >
          <button class="remove-btn" @click="$emit('remove-item', item)">
            Remove
          </button>
        </li>
      </ul>

      <form class="checkout-form" @submit.prevent="checkOut">
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
    validCheckout: Boolean,
    orderSubmitted: Boolean,
  },
  data() {
    return {
      custName: "",
      custPhone: "",
    };
  },
  methods: {
    checkOut() {
      this.$emit("submit-order", {
        name: this.custName,
        phone: this.custPhone,
      });
    },
  },
  submitOrder() {
    // Submits user's order to the server and handles the response
    const order = {
      name: this.custName,
      phoneNumber: this.custPhone,
      items: this.cart.map((item) => ({
        lessonId: item._id,
        quantity: item.quantity,
      })),
    };

    // Log order items to the console before submitting
    console.log("Order items before submitting:", order.items);

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
      .then((data) => {
        this.orderSubmitted = true;
        console.log("Order submitted:", data);
        // Call updateLessonSpaces with a new parameter to indicate order submission
        return this.updateLessonSpaces(order.items, true);
      })
      .then(() => {
        // Re-fetch lessons to update the local state with new data from the server
        this.fetchLessons();
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
      });
  },

  updateLessonSpaces(orderedItems, isOrderSubmitted = false) {
    // Updates available space in lessons after an order is submitted
    if (!isOrderSubmitted) {
      return Promise.resolve();
    }

    const updatePromises = orderedItems.map((item) => {
      return fetch(
        `https://storefinal-env.eba-vfsgptpf.us-east-1.elasticbeanstalk.com/api/lessons/${item.lessonId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ numberToDecrease: item.quantity }),
        }
      ).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      });
    });

    return Promise.all(updatePromises)
      .then(() => {
        this.fetchLessons(); // Fetch the updated lessons data
      })
      .catch((error) => {
        console.error("Error updating lessons:", error);
      });
  },
  removeItemCart(item) {
    let cartItemIndex = this.cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (cartItemIndex > -1) {
      let cartItem = this.cart[cartItemIndex];
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      } else {
        this.cart.splice(cartItemIndex, 1);
      }
      // Increase the available inventory by 1
      let lesson = this.products.find((lesson) => lesson.id === item.id);
      if (lesson) {
        lesson.availableInventory++;
      }
    }
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
