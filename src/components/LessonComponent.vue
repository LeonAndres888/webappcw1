<template>
  <div>
    <!-- Search input -->
    <input
      type="text"
      :value="localSearchLesson"
      @input="updateSearchLesson($event.target.value)"
      placeholder="Search lessons..."
      class="search-bar"
    />

    <!-- Sorting buttons -->
    <button @click="updateSortOrder('ascending')" class="asc-button">
      Ascending
    </button>
    <button @click="updateSortOrder('descending')" class="dsc-button">
      Descending
    </button>

    <!-- Dropdown for sorting -->
    <select
      :value="localSortAttribute"
      @change="updateSortAttribute($event.target.value)"
      class="drop-down"
    >
      <option value="title">Subject</option>
      <option value="location">Location</option>
      <option value="price">Price</option>
      <option value="availableInventory">Spaces</option>
    </select>

    <!-- Lesson cards displayed -->
    <div
      v-for="product in sortedProducts"
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
      >
        Add to Cart
      </button>
      <p v-if="product.availableInventory === 0" class="sold-out">Sold Out</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: Array,
    searchLesson: String,
    sortAttribute: String,
    sortOrder: String,
  },
  data() {
    return {
      localSearchLesson: this.searchLesson,
      localSortAttribute: this.sortAttribute,
    };
  },
  computed: {
    filteredProducts() {
      const searchTerm = this.localSearchLesson.trim().toLowerCase();
      return this.products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.location.toLowerCase().includes(searchTerm)
      );
    },
    sortedProducts() {
      return this.filteredProducts.sort((a, b) => {
        const modifier = this.sortOrder === "ascending" ? 1 : -1;
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
    updateSearchLesson(value) {
      this.localSearchLesson = value;
      this.$emit("update:searchLesson", value);
    },
    updateSortAttribute(value) {
      this.localSortAttribute = value;
      this.$emit("update:sortAttribute", value);
    },
    updateSortOrder(order) {
      this.$emit("update-sort-order", order);
    },
  },
};
</script>

<style scoped>
body {
  font-family: "Times New Roman", Times, serif;
  background-color: #ddd0c8;
}

header {
  display: flex;
  justify-content: center;
  font-family: "Times New Roman", Times, serif;
  padding: 2px;
  height: 100px;
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

main {
  padding: 5px;
  align-items: center;
  text-align: center;
}

figure img {
  width: 40px;
  max-width: 300px;
}
.search-bar {
  width: 200px;
  height: 40px;
  border-radius: 10px;
  margin-bottom: 20px;
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
.drop-down {
  border-radius: 5px;
  height: 30px;
  width: 110px;
  margin-right: 20px;
}

.asc-button,
.dsc-button {
  border-radius: 5px;
  height: 30px;
  width: 110px;
  margin-right: 10px;
  background-color: #2a2a2a;
  color: #ffffff;
  cursor: pointer;
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
  color: #712626;
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

.sold-out {
  font-weight: bold;
  color: red;
}
</style>
