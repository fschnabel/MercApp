<template>
  <section>
    <h1>MercApp - Catálogo</h1>

    <div class="filters">
      <input v-model="search" placeholder="Buscar por nombre o descripción" />
      <select v-model="categoryId">
        <option value="">Todas las categorías</option>
        <option v-for="c in categories?.value || []" :key="c.id" :value="c.id">
          {{ c.name }}
        </option>
      </select>
    </div>

    <div v-if="loading">Cargando productos...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <p v-if="visibleProducts.length === 0">No hay productos que coincidan.</p>
      <div class="grid">
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

const { products, visibleProducts, categories, search, categoryId, loading, error, load } =
  useProducts();
const { add } = useCart();

function handleAddToCart(product) {
  add(product);
}

onMounted(load);
</script>
