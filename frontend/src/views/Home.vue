<script setup>
import { useAuthStore } from '@/stores/auth.store';
import AllProducts from "@/views/products/all-products.vue";

const authStore = useAuthStore();
const { user: { username }} = authStore;
</script>

<template>
  <div class="wrapper">
    <div v-if="username">
      <h1>Hola {{ username }}!</h1>
    </div>
    <AllProducts />
  </div>
</template>
