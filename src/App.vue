<template>
  <div id="app">
    <header-component
      :sitename="sitename"
      :cartItemCount="cartItemCount"
      @toggle-cart="toggleCart"
    />
    <product-list-component
      v-if="showProduct"
      :products="sortedProducts"
      @add-to-cart="addItemToCart"
    />
    <cart-component
      v-else
      :cart="cart"
      @remove-item-from-cart="removeItemFromCart"
    />
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import ProductListComponent from "./components/ProductListComponent.vue";
import CartComponent from "./components/CartComponent.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
    ProductListComponent,
    CartComponent,
  },
  data() {
    return {
      sitename: "👨‍🎓 STUDY SESSION STORE 👩‍🎓",
      showProduct: true, // Toggle between product list and cart view
      products: [], // Array of products fetched from server
      cart: [], // Array of products added to the cart
      searchLesson: "",
      sortAttribute: "title",
      sortOrder: "ascending",
    };
  },
  computed: {
    cartItemCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
    sortedProducts() {
      return this.products.sort((a, b) => {
        if (
          this.sortAttribute === "price" ||
          this.sortAttribute === "availableInventory"
        ) {
          return (
            (a[this.sortAttribute] - b[this.sortAttribute]) *
            (this.sortOrder === "ascending" ? 1 : -1)
          );
        }
        return (
          a[this.sortAttribute].localeCompare(b[this.sortAttribute]) *
          (this.sortOrder === "ascending" ? 1 : -1)
        );
      });
    },
  },
  methods: {
    toggleCart() {
      this.showProduct = !this.showProduct;
    },
    addItemToCart(product) {
      let found = this.cart.find((item) => item.id === product.id);
      if (found) {
        found.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    removeItemFromCart(item) {
      const index = this.cart.findIndex((cartItem) => cartItem.id === item.id);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },
    fetchLessons() {
      fetch(
        "https://storefinal-env.eba-vfsgptpf.us-east-1.elasticbeanstalk.com/api/lessons"
      )
        .then((response) => response.json())
        .then((data) => {
          this.products = data;
        })
        .catch((error) => console.error("Error fetching lessons:", error));
    },
  },
  mounted() {
    this.fetchLessons();
  },
};
</script>

<style>
/* Global styles */
</style>
./components/LessonComponent.vue ./components/CheckoutComponent.vue
