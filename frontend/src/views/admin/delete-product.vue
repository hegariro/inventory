<script setup>

import { onMounted, ref } from "vue";
import { Form } from 'vee-validate';
import { useAlertStore } from '@/stores/alert.store';
import { useProductsStore } from "@/stores/products.store";
import { useAdminStore } from "@/stores/admin.store";

const props = defineProps(['id']);
const product = ref({});

onMounted(async () => {
    const productStore = useProductsStore();
    await productStore.getProductById(props.id);
    const aux = productStore.products.get(props.id);
    const { id, name, lot_number, price, quantity, admission_date } = aux;
    product.value = { id, name, lot_number, price, quantity, admission_date };
});

const onSubmit = async () => {
    const alertStore = useAlertStore();
    const adminStore = useAdminStore();
    try {
        await adminStore.deleteProduct(props.id);
        console.info("Registro eliminado exitosamente");
        alertStore.success('Registro eliminado exitosamente!');
    } catch (err) {
        alertStore.error(err);
        console.error(err);
    }
};
</script>

<template>
    <div class="card bg-dark text-white m-2" v-if="product">
        <div class="card-body">
            <Form @submit="onSubmit" v-slot="{ errors, isSubmitting }">
                <h5 class="card-title">Verificaci&oacute;n de producto</h5>
                <h6 class="card-title">Este producto ser&aacute; eliminado de nuestra Base de Datos</h6>
                <p class="card-text"><label>ID:</label>{{ product.id }}</p>
                <p class="card-text"><label>Nombre del producto:</label>{{  product.name }}</p>
                <p class="card-text"><label>N&uacute;mero de lote:</label>{{ product.lot_number }}</p>
                <p class="card-text"><label>Precio:</label>{{ product.price }}</p>
                <p class="card-text"><label>Cantidad de productos disponibles:</label>{{ product.quantity }}</p>
                <p class="card-text"><label>Fecha de ingreso:</label>{{ product.admission_date }}</p>
                <div class="form-group">
                    <button class="btn btn-danger" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Borrar Producto
                    </button>
                    <router-link :to="{ name: 'home' }" class="btn btn-link">Cancel</router-link>
                </div>
            </Form>
        </div>
    </div>
    <div v-else>
        <div class="alert alert-warning" role="alert">
            <h4>No se encontró el producto</h4>
        </div>
    </div>
</template>