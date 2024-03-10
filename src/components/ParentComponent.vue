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
        @add-item-to-cart="addItemToCart"
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
        @remove-item-from-cart="removeItemFromCart"
        @submit-order="submitOrder"
        :validCheckout="validCheckout"
        :orderSubmitted="orderSubmitted"
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
      sortOrder: "ascending",
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
    async submitOrder() {
      if (!this.validCheckout) {
        alert("Please ensure all fields are filled out correctly.");
        return;
      }

      // Validate cart items have valid lesson IDs
      for (const item of this.cart) {
        if (!item.id) {
          console.error("Invalid lesson ID found in cart items:", item);
          alert("An error occurred with the cart items. Please try again.");
          return;
        }
      }

      // Construct the order payload with validated lesson IDs
      const orderPayload = {
        name: this.custName,
        phoneNumber: this.custPhone,
        items: this.cart.map((item) => ({
          lessonId: item.id, // assuming 'id' is the correct property
          quantity: item.quantity,
        })),
      };

      try {
        const response = await fetch(
          "https://storefinal-env.eba-vfsgptpf.us-east-1.elasticbeanstalk.com/api/orders",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderPayload),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to submit order.");
        }

        const data = await response.json();
        console.log("Order submitted successfully:", data);

        // If the order submission was successful, proceed with updating lesson spaces
        await this.updateLessonSpaces(orderPayload.items, true);

        this.orderSubmitted = true;
        this.cart = []; // Clear the cart after successful order submission
        alert("Order has been successfully submitted.");
      } catch (error) {
        console.error("Order submission failed:", error);
        alert(
          "Failed to submit the order. Please check the details and try again."
        );
      }
    },
    async updateLessonSpaces(orderedItems, isOrderSubmitted) {
      if (!isOrderSubmitted) return;

      try {
        await Promise.all(
          orderedItems.map(async (item) => {
            if (!item.lessonId) {
              console.error("Invalid lessonId:", item);
              throw new Error(
                `Invalid lessonId for item: ${JSON.stringify(item)}`
              );
            }

            const response = await fetch(
              `https://storefinal-env.eba-vfsgptpf.us-east-1.elasticbeanstalk.com/api/lessons/${item.lessonId}`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ numberToDecrease: item.quantity }),
              }
            );

            if (!response.ok) {
              const responseText = await response.text();
              throw new Error(
                `Failed to update lesson space. Server responded with status ${response.status}: ${responseText}`
              );
            }

            console.log(`Lesson space updated for lessonId: ${item.lessonId}`);
          })
        );

        this.fetchLessons(); // Refresh lessons data
      } catch (error) {
        console.error("Error updating lesson spaces:", error);
        alert("Failed to update lesson spaces. Please try again.");
      }
    },
    canAddToCart(product) {
      // Check if product can be added to cart
      let cartItem = this.cart.find((item) => item.id === product.id);
      let cartItemCount = cartItem ? cartItem.quantity : 0;
      return product.availableInventory > cartItemCount;
    },
    addItemToCart(lesson) {
      console.log("Adding to cart:", lesson);
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
    removeItemFromCart(item) {
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
.dropDown {
  border-radius: 5px;
  height: 30px;
  width: 110px;
  margin-right: 40px;
  position: absolute;
  left: 500px;
  top: 140px;
}
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
</style>
