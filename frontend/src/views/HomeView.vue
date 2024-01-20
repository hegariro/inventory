<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();
const { data: { firstname } } = storeToRefs();
</script>

<template>
  <div v-if="firstname">
      <h1>Hi {{firstname}}!</h1>
      <p>You're logged in with Vue 3 + Pinia & JWT!!</p>
      <p><router-link to="/customers">Manage Users</router-link></p>
  </div>
</template>
