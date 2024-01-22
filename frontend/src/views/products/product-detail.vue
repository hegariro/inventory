<script setup>

import { onMounted, ref } from "vue";
import { useProductsStore } from "@/stores/products.store.js";

const props = defineProps(['id']);
const product = ref({});
const productStore = useProductsStore();

onMounted(async () => {
    await productStore.getProductById(props.id);
    const aux = productStore.products.get(props.id);
    const { id, name, lot_number, price, quantity, admission_date } = aux;
    product.value = { id, name, lot_number, price, quantity, admission_date };
});
</script>

<template>
    <div class="card bg-dark text-white" v-if="product">
        <div class="card-body">
            <h5 class="card-title">Detalle de producto </h5>
            <p class="card-text"><label>ID:</label>{{ product.id }}</p>
            <p class="card-text"><label>Nombre del producto:</label>{{  product.name }}</p>
            <p class="card-text"><label>N&uacute;mero de lote:</label>{{ product.lot_number }}</p>
            <p class="card-text"><label>Precio:</label>{{ product.price }}</p>
            <p class="card-text"><label>Cantidad de productos disponibles:</label>{{ product.quantity }}</p>
            <p class="card-text"><label>Fecha de ingreso:</label>{{ product.admission_date }}</p>
            <div class="wrapper-buttons">
                <router-link class="btn btn-primary" :to="{ name: 'all-products' }">
                    Volver a la p&aacute;gina principal
                </router-link>
                <router-link class="btn btn-warning mt-2" :to="{ name: 'editProduct', params: { id: props.id }}">
                    Editar producto
                </router-link>
                <router-link class="btn btn-danger mt-2" :to="{ name: 'deleteProduct', params: { id: props.id }}">
                    Borrar producto
                </router-link>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="alert alert-warning" role="alert">
            <h4>No se encontró el producto</h4>
        </div>
    </div>
</template>

<style scoped>
.wrapper-buttons {
    display: grid;
    column-gap: 0.2rem;
    row-gap: 0.4rem;
}
</style>