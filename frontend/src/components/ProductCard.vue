<template>
  <div class="product-card">
    <img :src="product.imageUrl" :alt="product.name" />
    <h3>{{ product.name }}</h3>
    <p>{{ product.description }}</p>
    <p><strong>\${{ product.price.toFixed(2) }}</strong></p>
    <button @click="$emit('added-to-cart', product)">Añadir al carrito</button>
    <router-link :to="`/product/${product.id}`">Ver detalle</router-link>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
});
defineEmits(['added-to-cart']);
</script>
