<template>
  <div id="app">
    <parent-component
      :sitename="sitename"
      :cartItemCount="cartItemCount"
      @toggle-cart="toggleCart"
    />
    <lesson-component
      v-if="showProduct"
      :lessons="sortedProducts"
      @add-to-cart="addItemToCart"
    />
    <checkout-component
      v-else
      :cart="cart"
      @remove-from-cart="removeItemFromCart"
    />
  </div>
</template>

<script>
import ParentComponent from "./components/ParentComponent.vue";
import LessonComponent from "./components/LessonComponent.vue";
import CheckoutComponent from "./components/CheckoutComponent.vue";

export default {
  name: "App",
  components: {
    ParentComponent,
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
      sortOrder: "ascending",
    };
  },
  computed: {
    cartItemCount() {
      // Calculates the total count of items in the cart
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
    sortedProducts() {
      // Returns the products sorted based on the selected attribute and order
      let sorted = [...this.products].sort((a, b) => {
        let comparison = 0;
        if (a[this.sortAttribute] < b[this.sortAttribute]) {
          comparison = -1;
        } else if (a[this.sortAttribute] > b[this.sortAttribute]) {
          comparison = 1;
        }
        return this.sortOrder === "ascending" ? comparison : comparison * -1;
      });
      return sorted;
    },
  },
  methods: {
    toggleCart() {
      // Toggles between showing the product list and the cart
      this.showProduct = !this.showProduct;
    },
    addItemToCart(product) {
      // Adds an item to the cart or increases its quantity if it's already in the cart
      let found = this.cart.find((item) => item.id === product.id);
      if (found) {
        found.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    removeItemFromCart(item) {
      // Removes an item from the cart
      const index = this.cart.findIndex((cartItem) => cartItem.id === item.id);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },
    fetchLessons() {
      // Fetches lesson data from the server
      fetch(
        "https://storefinal-env.eba-vfsgptpf.us-east-1.elasticbeanstalk.com/api/lessons"
      )
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((data) => {
          this.products = data;
        })
        .catch((error) => {
          console.error("Error fetching lessons:", error);
        });
    },
  },
  mounted() {
    // Fetches lessons when the component mounts
    this.fetchLessons();
  },
};
</script>

<style>
/* Global styles */
</style>
