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
    custName: "",
    custPhone: "",
    orderSubmitted: false,
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
    isValidCheckout() {
      const nameRegex = /^[A-Za-z\s]+$/;
      const phoneRegex = /^[0-9()-]+$/;
      return nameRegex.test(this.custName) && phoneRegex.test(this.custPhone);
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
  },
  methods: {
    submitOrder() {
      if (this.isValidCheckout) {
        this.orderSubmitted = true;
      }
    },
    canAddToTheCart(product) {
      let cartItem = this.cart.find((item) => item.id === product.id);
      let cartItemCount = cartItem ? cartItem.quantity : 0;
      return product.availableInventory > cartItemCount;
    },
    addItemToTheCart(product) {
      if (product.availableInventory > 0) {
        this.cart.push(product);
        product.availableInventory--;
      }
    },
    updateSortOrder(order) {
      this.sortOrder = order;
    },
    removeItemFromCart(item) {
      let cartItem = this.cart.find((cartItem) => cartItem.id === item.id);
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      } else {
        let index = this.cart.indexOf(cartItem);
        this.cart.splice(index, 1);
      }
      item.availableInventory++;
    },

    toggleCart() {
      this.showProduct = !this.showProduct;
    },
  },
});
