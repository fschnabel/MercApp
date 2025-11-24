<template>
  <div class="cart-page">
    <h1>Carrito de compras</h1>

    <div v-if="items.length === 0" class="empty">
      <p>Tu carrito está vacío.</p>
      <router-link to="/" class="btn btn-primary">
        Ir al catálogo
      </router-link>
    </div>

    <div v-else class="cart-content">
      <table class="cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th class="center">Precio</th>
            <th class="center">Cantidad</th>
            <th class="right">Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.productId">
            <td class="product-cell">
              <img
                :src="item.imagenUrl"
                :alt="item.nombre"
                class="thumb"
              />
              <span>{{ item.nombre }}</span>
            </td>
            <td class="center">$ {{ item.precio.toFixed(2) }}</td>
            <td class="center">
              <input
                type="number"
                min="1"
                v-model.number="item.quantity"
                @change="onQuantityChange(item)"
              />
            </td>
            <td class="right">
              $ {{ (item.precio * item.quantity).toFixed(2) }}
            </td>
            <td class="center">
              <button class="btn btn-danger" @click="removeItem(item.id)">
                ✕
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="summary">
        <p>
          Ítems totales:
          <strong>{{ totalItems }}</strong>
        </p>
        <p>
          Total a pagar:
          <strong>$ {{ totalPrice.toFixed(2) }}</strong>
        </p>

        <div class="summary-actions">
          <button class="btn" @click="clearCart">
            Vaciar carrito
          </button>
          <button class="btn btn-primary" @click="checkout">
            Proceder al pago (dummy)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const items = ref([]);

function loadCart() {
  try {
    const raw = localStorage.getItem('mercapp-cart');
    items.value = raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error leyendo carrito', e);
    items.value = [];
  }
}

function saveCart() {
  localStorage.setItem('mercapp-cart', JSON.stringify(items.value));
}

function onQuantityChange(item) {
  if (item.quantity <= 0) {
    item.quantity = 1;
  }
  saveCart();
}

function removeItem(productId) {
  items.value = items.value.filter((i) => i.id !== productId);
  saveCart();
}

function clearCart() {
  if (window.confirm('¿Seguro que deseas vaciar el carrito?')) {
    items.value = [];
    saveCart();
  }
}

function checkout() {
  window.alert(
    'Simulación de checkout.\nAquí podrías integrar un flujo de pago real.'
  );
}

const totalItems = computed(() =>
  items.value.reduce((acc, item) => acc + item.quantity, 0)
);

const totalPrice = computed(() =>
  items.value.reduce((acc, item) => acc + item.precio * item.quantity, 0)
);

onMounted(() => {
  loadCart();
});

// Si cambian los ítems desde otra parte y se reemplaza el array:
watch(
  items,
  () => {
    saveCart();
  },
  { deep: true }
);
</script>

<style scoped>
.cart-page {
  max-width: 960px;
  margin: 2rem auto;
  padding: 1rem;
}

.empty {
  text-align: center;
  margin-top: 2rem;
}

.cart-content {
  margin-top: 1.5rem;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

.cart-table th,
.cart-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e0e0e0;
}

.cart-table th {
  text-align: left;
  font-weight: 600;
}

.center {
  text-align: center;
}

.right {
  text-align: right;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.thumb {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
}

.cart-table input[type='number'] {
  width: 70px;
}

.summary {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
}

.summary-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.btn {
  padding: 0.4rem 0.9rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #f5f5f5;
  cursor: pointer;
}

.btn-primary {
  background: #1976d2;
  color: #fff;
  border-color: #1976d2;
}

.btn-danger {
  background: #e53935;
  color: #fff;
  border-color: #e53935;
}

.btn:hover {
  opacity: 0.9;
}
</style>
