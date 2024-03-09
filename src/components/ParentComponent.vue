<template>
  <div id="app">
    <header>
      <h1>{{ sitename }}</h1>
      <button id="cartBtn" @click="toggleCart">
        🛒 Cart ({{ cartItemCount }})
      </button>
    </header>
    <main>
      <lesson-component
        v-if="showProduct"
        :products="products"
        @add-item-to-cart="addItemCart"
        :searchLesson="searchLesson"
        :sortAttribute="sortAttribute"
        :sortOrder="sortOrder"
      />
      <checkout-component
        v-else
        :cart="cart"
        @remove-item-from-cart="removeItemCart"
        :validCheckout="validCheckout"
        :orderSubmitted="orderSubmitted"
        @submit-order="submitOrder"
      />
    </main>
  </div>
</template>

<script>
import LessonComponent from "./LessonComponent.vue";
import CheckoutComponent from "./CheckoutComponent.vue";

export default {
  components: {
    LessonComponent,
    CheckoutComponent,
  },
  data() {
    return {
      sitename: "👨‍🎓 STUDY SESSION STORE 👩‍🎓",
      showProduct: true,
      products: [],
      cart: [],
      searchLesson: "",
      sortAttribute: "title",
      sortOrder: "",
      custName: "",
      custPhone: "",
      orderSubmitted: false,
    };
  },
  computed: {
    cartItemCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
    validCheckout() {
      const nameRegex = /^[A-Za-z\s]+$/;
      const phoneRegex = /^[0-9()-]+$/;
      return nameRegex.test(this.custName) && phoneRegex.test(this.custPhone);
    },
  },
  methods: {
    fetchLessons() {
      fetch(
        "https://storefinal-env.eba-vfsgptpf.us-east-1.elasticbeanstalk.com/api/lessons"
      )
        .then((response) => response.json())
        .then((data) => {
          this.products = data;
        })
        .catch((error) => {
          console.error("Error fetching lessons:", error);
        });
    },
    submitOrder() {
      if (!this.validCheckout) {
        alert(
          "Please enter a valid name and phone number to submit the order."
        );
        return;
      }
      const order = {
        name: this.custName,
        phoneNumber: this.custPhone,
        items: this.cart.map((item) => ({
          lessonId: item._id,
          quantity: item.quantity,
        })),
      };
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
          this.cart = [];
          this.custName = "";
          this.custPhone = "";
          return this.updateLessonSpaces(order.items, true);
        })
        .then(() => {
          this.fetchLessons();
        })
        .catch((error) => {
          console.error("Error submitting order:", error);
        });
    },
    updateLessonSpaces(orderedItems, isOrderSubmitted = false) {
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
          this.fetchLessons();
        })
        .catch((error) => {
          console.error("Error updating lessons:", error);
        });
    },
    canAddToCart(product) {
      const cartItem = this.cart.find((item) => item.id === product.id);
      return cartItem
        ? cartItem.quantity < product.availableInventory
        : product.availableInventory > 0;
    },
    addItemCart(product) {
      if (!this.canAddToCart(product)) {
        alert("This lesson cannot be added to the cart.");
        return;
      }
      const cartItem = this.cart.find((item) => item.id === product.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    updateSortOrder(order) {
      this.sortOrder = order;
    },
    removeItemCart(item) {
      const cartItemIndex = this.cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (cartItemIndex > -1) {
        const cartItem = this.cart[cartItemIndex];
        if (cartItem.quantity > 1) {
          cartItem.quantity--;
        } else {
          this.cart.splice(cartItemIndex, 1);
        }
      }
    },
    toggleCart() {
      this.showProduct = !this.showProduct;
    },
  },
  mounted() {
    this.fetchLessons();
  },
};
</script>
