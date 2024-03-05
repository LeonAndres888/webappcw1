<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.title" />
    <h2>{{ product.title }}</h2>
    <p>Location: {{ product.location }}</p>
    <p>Price: £{{ product.price }}</p>
    <p>Spaces: {{ product.availableInventory }}</p>
    <button @click="addToCart" :disabled="product.availableInventory === 0">
      Add to Cart
    </button>
    <p v-if="product.availableInventory === 0">Sold Out</p>
  </div>
</template>

<script>
export default {
  name: "ProductCardComponent",
  props: {
    product: Object,
  },
  methods: {
    addToCart() {
      if (this.product.availableInventory > 0) {
        this.$emit("add-to-cart", this.product);
      }
    },
  },
};
</script>

<style scoped>
/* Product card styles from styles.css */
.product-card {
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 90px;
  margin-left: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
  max-width: 250px;
  color: #712626;
  display: inline-block;
  text-align: center;
}

.product-card img {
  max-width: 100%;
}

button {
  padding: 8px 20px;
  margin-top: 10px;
  border: none;
  background-color: #2a2a2a;
  color: white;
  transition: background-color 0.6s ease;
  border-radius: 50px;
  cursor: pointer;
}

button:hover {
  background-color: #676767;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

p {
  margin: 5px 0;
}
</style>
