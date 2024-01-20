<script setup>
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();
const { user: { username }} = authStore;
</script>

<template>
  <div v-if="username">
      <h1>Hola {{ username }}!</h1>
  </div>
</template>
