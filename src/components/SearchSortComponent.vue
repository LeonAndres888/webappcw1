<template>
  <div class="search-sort">
    <input
      type="text"
      placeholder="Search lessons..."
      v-model="searchText"
      @input="updateSearch"
    />
    <select v-model="sortAttribute" @change="sortProducts">
      <option value="title">Subject</option>
      <option value="location">Location</option>
      <option value="price">Price</option>
      <option value="availableInventory">Spaces</option>
    </select>
    <button @click="sortProducts('ascending')">Ascending</button>
    <button @click="sortProducts('descending')">Descending</button>
  </div>
</template>

<script>
export default {
  name: "SearchSortComponent",
  data() {
    return {
      searchText: "",
      sortAttribute: "title",
      sortOrder: "ascending",
    };
  },
  methods: {
    updateSearch() {
      this.$emit("update-search", this.searchText);
    },
    sortProducts(order) {
      this.sortOrder = order;
      this.$emit("update-sort", { attribute: this.sortAttribute, order });
    },
  },
};
</script>

<style scoped>
.search-sort {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-sort input,
.search-sort select,
.search-sort button {
  margin: 0 10px;
}

/* Add other styling rules as needed */
</style>
