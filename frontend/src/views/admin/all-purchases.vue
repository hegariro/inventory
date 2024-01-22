<script setup>
import { onMounted, ref } from "vue";
import { useAdminStore } from "@/stores/admin.store";

const purchases = ref([]);
const adminStore = useAdminStore();

onMounted(async () => {
    await adminStore.listAllPurchases();
    if (!!adminStore.purchases.zise) {
        const data = Object.values(Object.fromEntries(adminStore.purchases));
        console.log({ data });
        purchases.value = data;
    }
});
</script>

<template>
    <div class="wrapper">
        <div v-if="purchases">
            <div v-for="purchase in purchases" :key="purchase.id">
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                        <img class="card-image" src="@/assets/invoices-icon-vector.jpg" alt="img-invoice">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="alert alert-warning" role="alert">
                No se han realizado compras
            </div>
        </div>
    </div>
</template>

<style scoped>
img .card-image {
    max-width: 540px;
}
</style>