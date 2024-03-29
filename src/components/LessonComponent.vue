<template>
  <div>
    <!-- Search input -->
    <input
      type="text"
      :value="searchLesson"
      @input="$emit('update:searchLesson', $event.target.value)"
      placeholder="Search lessons..."
      class="search-bar"
    />

    <!-- Dropdown for sorting -->
    <select
      :value="sortAttribute"
      @change="$emit('update:sortAttribute', $event.target.value)"
      class="dropDown"
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
  props: ["products", "searchLesson", "sortAttribute", "sortOrder"],
  computed: {
    filteredProducts() {
      let searchTerm = this.searchLesson.trim().toLowerCase();
      return this.products.filter((product) => {
        return (
          product.title.toLowerCase().includes(searchTerm) ||
          product.location.toLowerCase().includes(searchTerm)
        );
      });
    },
    sortedProducts() {
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
.dropDown {
  border-radius: 5px;
  height: 30px;
  width: 110px;
  margin-right: 40px;
  position: absolute;
  left: 500px;
  top: 140px;
}
</style>
