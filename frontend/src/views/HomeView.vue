<template>
  <section class="home">
    <h1 class="home__title">MercApp - Catálogo</h1>

    <div class="filters">
      <input
        v-model="search"
        placeholder="Buscar por nombre o descripción"
      />
      <select v-model="categoryId">
        <option value="">Todas las categorías</option>
        <option
          v-for="c in categories?.value || []"
          :key="c.id"
          :value="c.id"
        >
          {{ c.name }}
        </option>
      </select>
    </div>

    <div v-if="loading">Cargando productos...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <p v-if="visibleProducts.length === 0">
        No hay productos que coincidan.
      </p>

      <div class="products-grid">
        <ProductCard
          v-for="p in visibleProducts"
          :key="p.id"
          :product="p"
          @added-to-cart="handleAddToCart"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import { useProducts } from '@/composables/useProducts';
import { useCart } from '@/store/cartStore';

const {
  products,
  visibleProducts,
  categories,
  search,
  categoryId,
  loading,
  error,
  load
} = useProducts();
const { add } = useCart();

function handleAddToCart(product) {
  add(product);
}

onMounted(load);
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
}

.home__title {
  margin-bottom: 1rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.filters input,
.filters select {
  padding: 0.5rem 0.75rem;
  min-width: 220px;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  font-size: 0.9rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); /* 👈 grid responsivo */
  gap: 1.5rem;
  align-items: stretch;
}
</style>
