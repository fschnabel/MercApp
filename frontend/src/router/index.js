import { createRouter, createWebHistory } from 'vue-router';

const HomeView = () => import('../views/HomeView.vue');
const ProductDetailView = () => import('../views/ProductDetailView.vue');
const CartView = () => import('../views/CartView.vue');       // lazy
const AboutView = () => import('../views/AboutView.vue');     // lazy
const NotFoundView = () => import('../views/NotFoundView.vue');

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/product/new', name: 'product-new', component: ProductDetailView },
  { path: '/product/:id', name: 'product-detail', component: ProductDetailView, props: true },
  { path: '/product/:id/edit', name: 'product-edit', component: ProductDetailView, props: true },
  { path: '/cart', name: 'cart', component: CartView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
