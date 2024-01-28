// Creates new Vue instance
const webstore = new Vue({
  el: "#app",
  data: {
    // Data properties
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
  },
  computed: {
    // Computed properties for filtering and sorting the product list
    filteredProducts() {
      // Filters and returns products based on search
      let searchTerm = this.searchLesson.trim().toLowerCase();
      return this.products.filter((product) => {
        return (
          product.title.toLowerCase().includes(searchTerm) ||
          product.location.toLowerCase().includes(searchTerm)
        );
      });
    },
    cartItemCount() {
      // Calculates total count of items in the cart
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },

    validCheckout() {
      // Validates customer name and phone number for checkout
      const nameRegex = /^[A-Za-z\s]+$/;
      const phoneRegex = /^[0-9()-]+$/;
      return nameRegex.test(this.custName) && phoneRegex.test(this.custPhone);
    },
    sortedProducts() {
      // Sorts filtered product list based on selected criteria
      let modifier = this.sortOrder === "ascending" ? 1 : -1;
      return this.filteredProducts.slice().sort((a, b) => {
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
    fetchLessons() {
      // Fetches lesson data from server to populate the products array
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

    canAddToCart(product) {
      // Check if product can be added to cart
      let cartItem = this.cart.find((item) => item.id === product.id);
      let cartItemCount = cartItem ? cartItem.quantity : 0;
      return product.availableInventory > cartItemCount;
    },
    addItemCart(lesson) {
      // Check if the lesson can be added to the cart based on available inventory
      if (lesson.availableInventory <= 0) {
        alert("This lesson is fully booked.");
        return; // Exit the function if no inventory
      }

      // Decrease the available inventory by 1
      lesson.availableInventory--;

      // Add the lesson to the cart
      let cartItem = this.cart.find((item) => item.id === lesson.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        this.cart.push({ ...lesson, quantity: 1 });
      }
    },

    updateSortOrder(order) {
      // Update sorting order based on asc or dsc buttons
      this.sortOrder = order;
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
    toggleCart() {
      this.showProduct = !this.showProduct;
    },
  },
  mounted() {
    // Lifecycle hook called when Vue instance is mounted. Used to fetch initial lessons data
    this.fetchLessons();
  },
});
