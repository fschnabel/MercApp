<template>
  <div class="product-card">
    <img class="product-img" :src="product.imagenUrl" :alt="product.nombre" />

    <h3 class="product-title">{{ product.nombre }}</h3>

    <p class="product-desc">{{ product.descripcion }}</p>

    <p class="product-price">
      <strong>\${{ product.precio.toFixed(2) }}</strong>
    </p>

    <button class="add-btn" @click="$emit('added-to-cart', product)">
      Añadir al carrito
    </button>

    <router-link class="detail-link" :to="`/product/${product.id}`">
      Ver detalle
    </router-link>
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

<style scoped>
.product-card {
  width: 100%;
  max-width: 260px;
  background: #fff;
  padding: 14px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
}

/* Imagen bien controlada */
.product-img {
  width: 100%;
  height: 160px; /* fija pero proporcional */
  object-fit: cover; /* recorta sin deformar */
  border-radius: 10px;
  margin-bottom: 10px;
}

.product-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 6px 0;
  color: #333;
}

.product-desc {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 8px;
  line-height: 1.3;
}

.product-price {
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: #222;
}

.add-btn {
  background: #1e88e5;
  border: none;
  color: white;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-bottom: 10px;
  width: 100%;
  transition: background 0.2s ease;
}

.add-btn:hover {
  background: #1565c0;
}

.detail-link {
  font-size: 0.9rem;
  color: #1e88e5;
  text-decoration: none;
}

.detail-link:hover {
  text-decoration: underline;
}
</style>
