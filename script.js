let webstore = new Vue({
  el: "#app",
  data: {
    sitename: "👨‍🎓 STUDY SESSION STORE 👩‍🎓",
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
      {
        id: 1003,
        title: "English Lesson",
        location: "Oxford",
        price: 110,
        image: "images/english.png",
        availableInventory: 5,
      },
      {
        id: 1004,
        title: "Math Lesson",
        location: "Brighton",
        price: 90,
        image: "images/math.png",
        availableInventory: 5,
      },
      {
        id: 1005,
        title: "Music Lesson",
        location: "London",
        price: 110,
        image: "images/music.png",
        availableInventory: 5,
      },
      {
        id: 1006,
        title: "Math Lesson",
        location: "Cambridge",
        price: 150,
        image: "images/math.png",
        availableInventory: 5,
      },
      {
        id: 1007,
        title: "English Lesson",
        location: "Liverpool",
        price: 110,
        image: "images/english.png",
        availableInventory: 5,
      },
      {
        id: 1008,
        title: "Music Lesson",
        location: "Oxford",
        price: 160,
        image: "images/music.png",
        availableInventory: 5,
      },
      {
        id: 1009,
        title: "Music Lesson",
        location: "Blackpool",
        price: 70,
        image: "images/music.png",
        availableInventory: 5,
      },
      {
        id: 10010,
        title: "English Lesson",
        location: "Derby",
        price: 40,
        image: "images/english.png",
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
