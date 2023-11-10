import products from "./lessons.js";

const webstore = new Vue({
  el: "#app",
  data: {
    sitename: "👨‍🎓 STUDY SESSION STORE 👩‍🎓",
    showProduct: true,
    products,
    cart: [],
    searchQuery: "",
    sortAttribute: "title",
    sortOrder: "ascending",
  },
  computed: {
    filteredProducts() {
      let searchTerm = this.searchQuery.trim().toLowerCase();
      if (!searchTerm) {
        return this.products;
      }
      return this.products.filter((product) => {
        return (
          product.title.toLowerCase().includes(searchTerm) ||
          product.location.toLowerCase().includes(searchTerm)
        );
      });
    },
    sortedProducts() {
      return this.filteredProducts.slice().sort((a, b) => {
        let modifier = this.sortOrder === "ascending" ? 1 : -1;
        if (
          this.sortAttribute === "price" ||
          this.sortAttribute === "availableInventory"
        ) {
          return (a[this.sortAttribute] - b[this.sortAttribute]) * modifier;
        }
        return (
          a[this.sortAttribute].localeCompare(b[this.sortAttribute]) * modifier
        );
      });
    },
    isCartNotEmpty() {
      return this.cart.length > 0;
    },
  },
  methods: {
    canAddToTheCart(product) {
      return (
        product.availableInventory >
        this.cart.filter((itemId) => itemId === product.id).length
      );
    },
    addItemToTheCart(product) {
      if (this.canAddToTheCart(product)) {
        this.cart.push(product.id);
        product.availableInventory--;
      }
    },
    toggleCart() {},
    updateSortOrder(order) {
      this.sortOrder = order;
    },
  },
});
