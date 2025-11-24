<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="app">
    <header style="padding: 1rem; border-bottom: 1px solid #ddd;">
      <h1>MercApp 🚀</h1>
      <nav style="margin-top: 0.5rem;">
        <RouterLink to="/">Catálogo</RouterLink> |
        <RouterLink to="/cart">Carrito</RouterLink> |
        <RouterLink to="/product/new">Nuevo producto</RouterLink> |
        <RouterLink to="/about">Acerca de</RouterLink>
      </nav>
    </header>

    <main style="padding: 1rem;">
      <!-- AQUÍ se pintan HomeView, ProductDetailView, CartView, AboutView, NotFoundView -->
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
a {
  margin-right: 0.5rem;
}
</style>
