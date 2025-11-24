import { reactive, computed, watch } from 'vue';

const state = reactive({
  items: loadFromStorage()
});

function loadFromStorage() {
  try {
    const raw = localStorage.getItem('mercapp-cart');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

watch(
  () => state.items,
  (val) => {
    localStorage.setItem('mercapp-cart', JSON.stringify(val));
  },
  { deep: true }
);

export function useCart() {
  const items = computed(() => state.items);

  function add(product) {
    const existing = state.items.find(i => i.id === product.id);
    if (existing) existing.quantity++;
    else state.items.push({ ...product, quantity: 1 });
  }

  function remove(productId) {
    state.items = state.items.filter(i => i.id !== productId);
  }

  function updateQuantity(productId, quantity) {
    const item = state.items.find(i => i.id === productId);
    if (item) item.quantity = quantity;
  }

  const total = computed(() =>
    state.items.reduce((sum, i) => sum + i.precio * i.quantity, 0)
  );

  return { items, add, remove, updateQuantity, total };
}
