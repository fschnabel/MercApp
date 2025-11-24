<template>
  <div class="product-detail-page">
    <div v-if="loading" class="state">
      Cargando producto...
    </div>

    <div v-else-if="error" class="state state-error">
      Ocurrió un error al cargar el producto: {{ error }}
    </div>

    <div v-else-if="!product" class="state">
      Producto no encontrado.
    </div>

    <div v-else class="product-detail">
      <div class="image-column">
        <img
          :src="product.imagenUrl"
          :alt="product.nombre"
          class="product-image"
        />
      </div>

      <div class="info-column">
        <h1 class="title">{{ product.nombre }}</h1>
        <p class="price">$ {{ product.precio.toFixed(2) }}</p>

        <p class="category" v-if="product.categoria?.nombre">
          Categoría: <span>{{ product.categoria.nombre }}</span>
        </p>
        <p class="stock" :class="{ 'stock-low': product.stock === 0 }">
          Stock:
          <span v-if="product.stock > 0">{{ product.stock }} unidades</span>
          <span v-else>Sin stock</span>
        </p>

        <p class="description">
          {{ product.descripcion }}
        </p>

        <div class="actions">
          <label class="quantity-label">
            Cantidad:
            <input
              type="number"
              min="1"
              :max="product.stock || 99"
              v-model.number="quantity"
            />
          </label>

          <button
            class="btn btn-primary"
            :disabled="product.stock === 0 || quantity <= 0"
            @click="addToCart"
          >
            Añadir al carrito
          </button>
        </div>

        <p class="subtotal" v-if="product.stock > 0">
          Subtotal: <strong>$ {{ subtotal.toFixed(2) }}</strong>
        </p>

        <router-link to="/" class="back-link">
          ← Volver al catálogo
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

const route = useRoute();

const product = ref(null);
const loading = ref(true);
const error = ref(null);
const quantity = ref(1);

const subtotal = computed(() => {
  if (!product.value) return 0;
  return product.value.precio * quantity.value;
});

function loadCart() {
  try {
    const raw = localStorage.getItem('mercapp-cart');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error leyendo carrito de localStorage', e);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('mercapp-cart', JSON.stringify(cart));
}

function addToCart() {
  if (!product.value || quantity.value <= 0) return;

  const cart = loadCart();
  const existingIndex = cart.findIndex(
    (item) => item.productId === product.value.id
  );

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity.value;
  } else {
    cart.push({
      productId: product.value.id,
      nombre: product.value.nombre,
      precio: product.value.precio,
      imagenUrl: product.value.imagenUrl,
      quantity: quantity.value,
    });
  }

  saveCart(cart);
  window.alert('Producto añadido al carrito ✔');
}

async function fetchProduct() {
  loading.value = true;
  error.value = null;
  product.value = null;

  const id = route.params.id;

  try {
    const res = await fetch(`${API_BASE_URL}/producto/${id}`);
    if (!res.ok) {
      if (res.status === 404) {
        product.value = null;
        return;
      }
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    product.value = data;
  } catch (err) {
    console.error(err);
    error.value = err.message || 'Error desconocido';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchProduct();
});
</script>

<style scoped>
.product-detail-page {
  max-width: 960px;
  margin: 2rem auto;
  padding: 1rem;
}

.state {
  text-align: center;
  padding: 2rem;
}

.state-error {
  color: #b00020;
}

.product-detail {
  display: grid;
  grid-template-columns: 1.2fr 1.8fr;
  gap: 2rem;
}

.image-column {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.product-image {
  max-width: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.info-column {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.title {
  margin: 0;
}

.price {
  font-size: 1.6rem;
  font-weight: bold;
}

.category span {
  font-weight: 600;
}

.stock {
  font-size: 0.95rem;
  color: #2e7d32;
}

.stock.stock-low {
  color: #b00020;
}

.description {
  margin-top: 0.5rem;
}

.actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.quantity-label input {
  width: 80px;
  margin-left: 0.5rem;
}

.btn {
  padding: 0.5rem 1.2rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: #1976d2;
  color: #fff;
}

.btn-primary:disabled {
  background-color: #b0bec5;
  cursor: not-allowed;
}

.subtotal {
  margin-top: 0.75rem;
}

.back-link {
  margin-top: 1.5rem;
  display: inline-block;
  color: #1976d2;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .product-detail {
    grid-template-columns: 1fr;
  }
}
</style>
