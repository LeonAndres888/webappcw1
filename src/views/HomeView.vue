<template>
  <div>
    <header-component
      :sitename="sitename"
      :cartItemCount="cartItemCount"
      @toggle-cart="toggleCart"
    />
    <search-sort-component
      @update-search="updateSearch"
      @update-sort="updateSort"
    />
    <product-list-component
      :products="sortedProducts"
      @add-to-cart="addToCart"
    />
  </div>
</template>

<script>
import HeaderComponent from "./HeaderComponent.vue";
import SearchSortComponent from "./SearchSortComponent.vue";
import ProductListComponent from "./ProductListComponent.vue";

export default {
  name: "HomeView",
  components: {
    HeaderComponent,
    SearchSortComponent,
    ProductListComponent,
  },
  data() {
    return {
      sitename: "👨‍🎓 STUDY SESSION STORE 👩‍🎓",
      cartItemCount: 0,
      // ... rest of the data properties
    };
  },
  computed: {
    // ... computed properties like sortedProducts
  },
  methods: {
    toggleCart() {
      // ... toggle cart logic
    },
    updateSearch(searchText) {
      // ... update search logic
    },
    updateSort(sortDetails) {
      // ... update sort logic
    },
    addToCart(product) {
      // ... add to cart logic
    },
    // ... rest of the methods
  },
  mounted() {
    this.fetchLessons();
  },
};
</script>
