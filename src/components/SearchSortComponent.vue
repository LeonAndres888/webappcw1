<template>
  <div class="search-sort">
    <input
      type="text"
      v-model="searchTerm"
      @input="emitSearchTerm"
      placeholder="Search for products..."
      class="search-input"
    />

    <select
      v-model="sortAttribute"
      @change="emitSortChange"
      class="sort-select"
    >
      <option value="title">Title</option>
      <option value="price">Price</option>
    </select>

    <button @click="setSortOrder('ascending')" class="sort-btn asc">Asc</button>
    <button @click="setSortOrder('descending')" class="sort-btn desc">
      Desc
    </button>
  </div>
</template>

<script>
export default {
  name: "SearchSortComponent",
  data() {
    return {
      searchTerm: "",
      sortAttribute: "title",
      sortOrder: "ascending",
    };
  },
  methods: {
    emitSearchTerm() {
      this.$emit("search-term-changed", this.searchTerm);
    },
    emitSortChange() {
      this.$emit("sort-changed", {
        attribute: this.sortAttribute,
        order: this.sortOrder,
      });
    },
    setSortOrder(order) {
      this.sortOrder = order;
      this.emitSortChange();
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

.search-input,
.sort-select,
.sort-btn {
  margin: 0 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.sort-btn {
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.sort-btn.asc {
  border-radius: 5px;
  height: 30px;
  width: 110px;
  margin-right: 40px;
  position: absolute;
  left: 230px;
  top: 140px;
}

.sort-btn.desc {
  border-radius: 5px;
  height: 30px;
  width: 110px;
  position: absolute;
  left: 350px;
  top: 140px;
}

.sort-btn:hover {
  background-color: #0056b3;
}
</style>
