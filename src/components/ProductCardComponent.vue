<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.title" class="product-image" />
    <div class="product-info">
      <h3>{{ product.title }}</h3>
      <p>{{ product.description }}</p>
      <div class="product-meta">
        <span class="product-price">£{{ product.price }}</span>
        <span class="product-inventory"
          >Available: {{ product.availableInventory }}</span
        >
      </div>
      <button
        @click="addToCart"
        :disabled="product.availableInventory === 0"
        class="add-to-cart-btn"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCardComponent",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.product);
    },
  },
};
</script>

<style scoped>
.product-card {
  display: flex;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  background: #fff;
}

.product-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.product-info {
  padding: 10px;
  flex-grow: 1;
}

.product-info h3 {
  margin-top: 0;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.product-price {
  font-weight: bold;
  color: #333;
}

.product-inventory {
  font-size: 0.875rem;
  color: #666;
}

.add-to-cart-btn {
  padding: 10px 15px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: #0056b3;
}

.add-to-cart-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
