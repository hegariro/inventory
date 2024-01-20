<script setup>
import { onMounted, ref } from "vue";
import { useProductsStore } from "@/stores/products.store.js";

const products = ref();
const productsStore = useProductsStore();

onMounted(async () => {
    await productsStore.listAllProducts();
    products.value = productsStore.products;
});
</script>

<template>
    <div class="wrapper" v-if="products">
        <div v-for="product in products">
            <div class="card bg-dark text-white m-3">
                <h5 class="card-header title-bar">
                    <span>{{ product.name }}</span>
                    <span>{{ product.lot_number }}</span>
                </h5>
                <div class="card-body">
                    <h5 class="card-title">Detalles del producto</h5>
                    <p class="card-text"><label>ID:</label>{{ product.id }}</p>
                    <p class="card-text"><label>Nombre del producto:</label>{{  product.name }}</p>
                    <p class="card-text"><label>N&uacute;mero de lote:</label>{{ product.lot_number }}</p>
                    <p class="card-text"><label>Precio:</label>{{ product.price }}</p>
                    <p class="card-text"><label>Cantidad de productos disponibles:</label>{{ product.quantity }}</p>
                    <p class="card-text"><label>Fecha de ingreso:</label>{{ product.admission_date }}</p>
                    <router-link class="btn btn-warning" :to="{ name: 'product-detail', params: { id: product.id }}">
                        Ver detalle del productos
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    display: grid;
    column-gap: 0.5rem;
    row-gap: 1rem;
}
.title-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>