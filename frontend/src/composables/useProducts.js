// src/composables/useProducts.js
import { computed, ref } from 'vue';
import { useApi } from './useApi';

export function useProducts() {
  const search = ref('');
  const categoryId = ref('');

  // instancia para productos
  const {
    data: productosData,
    loading,
    error,
    request: requestProductos,
  } = useApi();

  // instancia para categorías
  const {
    data: categoriasData,
    request: requestCategorias,
  } = useApi();

  async function load() {
    await Promise.all([
      requestProductos('/api/producto'),
      requestCategorias('/api/categoria'),
    ]);
  }

  const products = computed(() => productosData.value || []);
  const categories = computed(() => categoriasData.value || []);

  const visibleProducts = computed(() => {
    return products.value.filter((p) => {
      const s = search.value.toLowerCase();

      const matchesSearch =
        p.nombre.toLowerCase().includes(s) ||
        p.descripcion.toLowerCase().includes(s);

      // si en Mongo/Express guardas `categoriaId`
      const matchesCategory =
        !categoryId.value ||
        p.categoriaId.id === categoryId.value;

      return matchesSearch && matchesCategory;
    });
  });

  return {
    products,
    visibleProducts,
    categories,
    loading,
    error,
    search,
    categoryId,
    load,
  };
}
