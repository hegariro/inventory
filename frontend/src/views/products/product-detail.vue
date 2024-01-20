<script setup>

import { onMounted, ref } from "vue";
import { useProductsStore } from "@/stores/products.store.js";

const props = defineProps(['id']);
const product = ref();
const productStore = useProductsStore();

onMounted(async () => {
    await productStore.getProductById(props.id);
    product.value = productStore.products.filter(p => (p.id === props.id)).pop();
});
</script>

<template>
    <div class="card bg-dark text-white" style="width: 18rem;" v-if="product">
        <div class="card-body">
            <h5 class="card-title">Detalle de producto </h5>
            <p class="card-text"><label>ID:</label>{{ product.id }}</p>
            <p class="card-text"><label>Nombre del producto:</label>{{  product.name }}</p>
            <p class="card-text"><label>N&uacute;mero de lote:</label>{{ product.lot_number }}</p>
            <p class="card-text"><label>Precio:</label>{{ product.price }}</p>
            <p class="card-text"><label>Cantidad de productos disponibles:</label>{{ product.quantity }}</p>
            <p class="card-text"><label>Fecha de ingreso:</label>{{ product.admission_date }}</p>
            <router-link class="btn btn-primary" :to="{ name: 'all-products' }">
                Volver a la p&aacute;gina principal
            </router-link>
        </div>
    </div>
    <div v-else>
        <div class="alert alert-warning" role="alert">
            <h4>No se encontró el producto</h4>
        </div>
    </div>
</template>