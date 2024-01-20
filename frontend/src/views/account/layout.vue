<script setup>
import { useAuthStore } from "@/stores/auth.store";
import router from "@/router";

const authStore = useAuthStore();
if (authStore.user) router.push("/");
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12 offset-sm-2 mt-1">
                <router-view />
            </div>
        </div>
    </div>
</template>