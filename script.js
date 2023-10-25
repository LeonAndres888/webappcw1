let webstore = new Vue({
  el: "#app",
  data: {
    sitename: "Study Session Store",
    showProduct: true,
    products: [
      {
        id: 1001,
        title: "Math Lesson",
        location: "London",
        price: 100,
        image: "images/math.png",
        availableInventory: 5,
      },
      {
        id: 1002,
        title: "Music Lesson",
        location: "Bristol",
        price: 80,
        image: "images/music.png",
        availableInventory: 5,
      },
    ],
    cart: [],
  },
  methods: {
    canAddToTheCart: function (product) {
      const itemsInCartForProduct = this.cart.filter(
        (id) => id === product.id
      ).length;
      return product.availableInventory > itemsInCartForProduct;
    },
    addItemToTheCart: function (productId) {
      this.cart.push(productId);
      // ... other methods go here ...
    },
  },
  computed: {
    itemsInTheCart: function () {
      return this.cart.length || "";
    },

    // ... other computed properties go here ...
  },
});
