import { computed, ref, watchEffect } from 'vue';
import { useApi } from './useApi';

export function useProducts() {
  const search = ref('');
  const categoryId = ref('');
  const { data, loading, error, request } = useApi();
  const { data: categories, request: requestCategories } = useApi();

  async function load() {
    await Promise.all([
      request('/api/products'),
      requestCategories('/api/categories')
    ]);
  }

  const products = computed(() => data.value || []);
  const visibleProducts = computed(() => {
    return products.value.filter(p => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.value.toLowerCase()) ||
        p.description.toLowerCase().includes(search.value.toLowerCase());
      const matchesCategory = !categoryId.value || p.categoryId === Number(categoryId.value);
      return matchesSearch && matchesCategory;
    });
  });

  watchEffect(() => {
    // podrías agregar lógica reactiva extra aquí
  });

  return {
    products,
    visibleProducts,
    categories,
    loading,
    error,
    search,
    categoryId,
    load
  };
}
