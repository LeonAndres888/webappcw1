<template>
  <div>
    <!-- Search input -->
    <div class="search-sort-container">
      <input
        type="text"
        v-model="localSearchLesson"
        @input="updateSearchLesson"
        placeholder="Search lessons..."
        class="search-bar"
      />

      <!-- Sorting buttons -->
      <button
        @click="updateSortOrder('ascending')"
        class="sort-button asc-button"
      >
        Ascending
      </button>
      <button
        @click="updateSortOrder('descending')"
        class="sort-button dsc-button"
      >
        Descending
      </button>

      <!-- Dropdown for sorting -->
      <select
        v-model="localSortAttribute"
        @change="updateSortAttribute"
        class="dropDown"
      >
        <option value="title">Subject</option>
        <option value="location">Location</option>
        <option value="price">Price</option>
        <option value="availableInventory">Spaces</option>
      </select>
    </div>

    <!-- Lesson cards displayed -->
    <div
      v-for="product in sortedAndFilteredProducts"
      :key="product.id"
      class="product-card"
    >
      <figure>
        <img :src="product.image" :alt="product.title" />
      </figure>
      <h2>{{ product.title }}</h2>
      <p>Location: {{ product.location }}</p>
      <p>Price: £{{ product.price }}</p>
      <p>Spaces: {{ product.availableInventory }}</p>
      <button
        @click="$emit('add-item-to-cart', product)"
        :disabled="product.availableInventory === 0"
        class="add-to-cart-button"
      >
        Add to Cart
      </button>
      <p v-if="product.availableInventory === 0" class="sold-out">Sold Out</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["products", "searchLesson", "sortAttribute", "sortOrder"],
  data() {
    return {
      localSearchLesson: this.searchLesson,
      localSortAttribute: this.sortAttribute,
    };
  },
  computed: {
    sortedAndFilteredProducts() {
      const searchTerm = this.localSearchLesson.trim().toLowerCase();
      const filteredProducts = this.products.filter((product) => {
        return (
          product.title.toLowerCase().includes(searchTerm) ||
          product.location.toLowerCase().includes(searchTerm)
        );
      });

      const modifier = this.sortOrder === "ascending" ? 1 : -1;
      return filteredProducts.slice().sort((a, b) => {
        if (
          this.localSortAttribute === "price" ||
          this.localSortAttribute === "availableInventory"
        ) {
          return (
            (a[this.localSortAttribute] - b[this.localSortAttribute]) * modifier
          );
        }
        return (
          a[this.localSortAttribute].localeCompare(b[this.localSortAttribute]) *
          modifier
        );
      });
    },
  },
  methods: {
    updateSearchLesson(event) {
      this.localSearchLesson = event.target.value;
      this.$emit("update:searchLesson", this.localSearchLesson);
    },
    updateSortAttribute(event) {
      this.localSortAttribute = event.target.value;
      this.$emit("update:sortAttribute", this.localSortAttribute);
    },
    updateSortOrder(order) {
      this.$emit("update-sort-order", order);
    },
  },
};
</script>

<style scoped>
.search-sort-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-bar {
  width: 200px;
  height: 40px;
  border-radius: 10px;
  padding: 0 10px;
}

.sort-button {
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.asc-button {
  background-color: #2ecc71;
}

.dsc-button {
  background-color: #e74c3c;
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

.product-card {
  border: 1px solid #ccc;
  margin-right: 20px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
  max-width: 250px;
  color: #333;
  display: inline-block;
  text-align: center;
}

.product-card figure {
  margin: 0;
  text-align: center;
}

.product-card img {
  width: 100px;
  height: auto;
}

.add-to-cart-button {
  background-color: #3498db;
  color: #ffffff;
  cursor: pointer;
  border-radius: 5px;
  padding: 10px 15px;
  margin-top: 10px;
}

.add-to-cart-button:hover {
  background-color: #2980b9;
}

.add-to-cart-button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.sold-out {
  color: #c0392b;
  font-weight: bold;
}
</style>
