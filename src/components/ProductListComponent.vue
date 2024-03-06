<template>
  <div class="product-list">
    <div class="sort-controls">
      <select v-model="sortAttribute" @change="sortProducts">
        <option value="title">Title</option>
        <option value="price">Price</option>
      </select>
      <button @click="sortOrder = 'ascending'">Asc</button>
      <button @click="sortOrder = 'descending'">Desc</button>
    </div>
    <product-card-component
      v-for="product in sortedProducts"
      :key="product.id"
      :product="product"
      @add-to-cart="emitAddToCart"
    />
  </div>
</template>

<script>
import ProductCardComponent from "./ProductCardComponent.vue";

export default {
  name: "ProductListComponent",
  components: {
    ProductCardComponent,
  },
  props: ["products"],
  data() {
    return {
      sortAttribute: "title",
      sortOrder: "ascending",
    };
  },
  computed: {
    sortedProducts() {
      return this.products.sort((a, b) => {
        let modifier = 1;
        if (this.sortOrder === "descending") {
          modifier = -1;
        }
        if (this.sortAttribute === "price") {
          return (a[this.sortAttribute] - b[this.sortAttribute]) * modifier;
        }
        return (
          a[this.sortAttribute].localeCompare(b[this.sortAttribute]) * modifier
        );
      });
    },
  },
  methods: {
    sortProducts() {
      // Sorting logic is handled by the computed property
    },
    emitAddToCart(product) {
      this.$emit("add-to-cart", product);
    },
  },
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sort-controls {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.sort-controls select,
.sort-controls button {
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.product-card-component {
  margin-bottom: 20px;
}
</style>
