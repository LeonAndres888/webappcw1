<template>
  <div class="home">
    <search-sort-component
      :search-term="searchLesson"
      :sort-attribute="sortAttribute"
      :sort-order="sortOrder"
      @search-term-changed="(searchTerm) => (searchLesson = searchTerm)"
      @sort-attribute-changed="(attribute) => (sortAttribute = attribute)"
      @sort-order-changed="(order) => (sortOrder = order)"
    />
    <product-list-component
      :products="filteredAndSortedProducts"
      @add-to-cart="addItemCart"
    />
  </div>
</template>

<script>
import SearchSortComponent from "@/components/SearchSortComponent.vue";
import ProductListComponent from "@/components/ProductListComponent.vue";

export default {
  name: "HomeView",
  components: {
    SearchSortComponent,
    ProductListComponent,
  },
  data() {
    return {
      sitename: "👨‍🎓 STUDY SESSION STORE 👩‍🎓",
      showProduct: true,
      products: [],
      cart: [],
      searchLesson: "",
      sortAttribute: "title",
      sortOrder: "ascending",
      custName: "",
      custPhone: "",
      orderSubmitted: false,
    };
  },
  computed: {
    filteredAndSortedProducts() {
      let sorted = this.products.slice().sort((a, b) => {
        if (
          this.sortAttribute === "price" ||
          this.sortAttribute === "availableInventory"
        ) {
          return (
            (a[this.sortAttribute] - b[this.sortAttribute]) *
            (this.sortOrder === "ascending" ? 1 : -1)
          );
        }
        return (
          a[this.sortAttribute].localeCompare(b[this.sortAttribute]) *
          (this.sortOrder === "ascending" ? 1 : -1)
        );
      });

      if (this.searchLesson) {
        return sorted.filter(
          (product) =>
            product.title
              .toLowerCase()
              .includes(this.searchLesson.toLowerCase()) ||
            product.location
              .toLowerCase()
              .includes(this.searchLesson.toLowerCase())
        );
      }

      return sorted;
    },
  },
  methods: {
    fetchLessons() {
      fetch(
        "https://storefinal-env.eba-vfsgptpf.us-east-1.elasticbeanstalk.com/api/lessons"
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.products = data;
        })
        .catch((error) => {
          console.error("Error fetching lessons:", error);
        });
    },
    addItemCart(product) {
      // Here, you would normally check if the product can be added based on the inventory
      if (product.availableInventory > 0) {
        let found = this.cart.find((p) => p.id === product.id);
        if (found) {
          found.quantity++;
          product.availableInventory--;
        } else {
          this.cart.push({ ...product, quantity: 1 });
          product.availableInventory--;
        }
      } else {
        alert("This lesson is fully booked.");
      }
    },
    updateSearchTerm(term) {
      this.searchTerm = term;
    },
    updateSort({ attribute, order }) {
      this.sortAttribute = attribute;
      this.sortOrder = order;
    },
    toggleCart() {
      this.showProduct = !this.showProduct;
    },
  },
  mounted() {
    this.fetchLessons();
  },
};
</script>
