import products from "./lessons.js";

const webstore = new Vue({
  el: "#app",
  data: {
    sitename: "👨‍🎓 STUDY SESSION STORE 👩‍🎓",
    showProduct: true,
    products,
    cart: [],
  },
  methods: {
    canAddToTheCart(product) {
      const itemsInCartForProduct = this.cart.filter(
        (itemId) => itemId === product.id
      ).length;
      return product.availableInventory > itemsInCartForProduct;
    },
    addItemToTheCart(productId) {
      this.cart.push(productId);
    },
  },
});
