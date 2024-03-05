<template>
  <section>
    <product-card-component
      v-for="product in sortedProducts"
      :key="product.id"
      :product="product"
      @add-to-cart="addItemToCart"
    />
  </section>
</template>

<script>
import ProductCardComponent from "./ProductCardComponent.vue";

export default {
  name: "ProductListComponent",
  components: {
    ProductCardComponent,
  },
  props: ["products"],
  computed: {
    sortedProducts() {
      // Placeholder for sorted products logic
      return this.products; // Replace with actual sorting logic
    },
  },
  methods: {
    addItemToCart(product) {
      // Placeholder for adding item to cart logic
      // This method should emit an event to the parent component
      this.$emit("add-item-to-cart", product);
    },
  },
};
</script>

<style scoped>
/* Styles for the product list container */
section {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
</style>
