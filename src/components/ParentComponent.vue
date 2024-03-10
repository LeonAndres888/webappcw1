<template>
  <div id="app">
    <header>
      <h1 id="titlename">{{ sitename }}</h1>
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
        @update:searchLesson="searchLesson = $event"
        @update:sortAttribute="sortAttribute = $event"
        @update-sort-order="sortOrder = $event"
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
    this.fetchLessons();
  },
};
</script>
<style scoped>
button {
  padding: 8px 20px;
  border: none;
  background-color: #2a2a2a;
  color: #ffffff;
  transition: background-color 0.6s ease;
  border-radius: 50px;
  cursor: pointer;
}
#cartBtn {
  border-radius: 5px;
  height: 70px;
  width: 180px;
  position: absolute;
  right: 100px;
  top: 50px;
}
#titlename {
  font-size: 50px;
  font-weight: bold;
  color: #712626;
  margin-top: 10px;
}

button:hover {
  background-color: #676767;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
#searchBar {
  width: 200px;
  height: 40px;
  border-radius: 10px;
  position: absolute;
  top: 130px;
  left: 660px;
}

#ascButton {
  border-radius: 5px;
  height: 30px;
  width: 110px;
  margin-right: 40px;
  position: absolute;
  left: 230px;
  top: 140px;
}
#dscButton {
  border-radius: 5px;
  height: 30px;
  width: 110px;
  position: absolute;
  left: 350px;
  top: 140px;
}
#dropDown {
  border-radius: 5px;
  height: 30px;
  width: 110px;
  margin-right: 40px;
  position: absolute;
  left: 500px;
  top: 140px;
}
</style>
