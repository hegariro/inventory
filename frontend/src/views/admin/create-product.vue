<script setup>

import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useAdminStore } from "@/stores/admin.store";
import { useAlertStore } from '@/stores/alert.store';

const schema = Yup.object().shape({
    lotNumber: Yup.string().required("El n&uacute;mero de lote es requerido"),
    name: Yup.string().required("El nombre del producto es requerido"),
    price: Yup.number().required("El precio del producto es requerido"),
    quantity: Yup.number().required("La cantidad de productos es requerida"),
    admissionDate: Yup.date()
});

const onSubmit = async (values) => {
    const adminStore = useAdminStore();
    const alertStore = useAlertStore();
    try {
        await adminStore.createProduct(values);
        alertStore.success('Registro exitoso!');
    } catch (err) {
        alertStore.error(err);
    }
};
</script>

<template>
    <div class="card bg-dark text-white m-3">
        <h4 class="card-header">Registro de productos</h4>
        <div class="card-body">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                <div class="form-group">
                    <label>Nombre de producto</label>
                    <Field name="name" type="text" class="form-control" :class="{ 'is-invalid': errors.name }" />
                    <div class="invalid-feedback">{{ errors.name }}</div>
                </div>
                <div class="form-group">
                    <label>N&uacute;mero de lote</label>
                    <Field name="lotNumber" type="text" class="form-control" :class="{ 'is-invalid': errors.lotNumber }" />
                    <div class="invalid-feedback">{{ errors.lotNumber }}</div>
                </div>
                <div class="form-group">
                    <label>Precio</label>
                    <Field name="price" type="number" class="form-control" :class="{ 'is-invalid': errors.price }" />
                    <div class="invalid-feedback">{{ errors.price }}</div>
                </div>
                <div class="form-group">
                    <label>Cantidad de produtos</label>
                    <Field name="quantity" type="number" class="form-control" :class="{ 'is-invalid': errors.quantity }" />
                    <div class="invalid-feedback">{{ errors.quantity }}</div>
                </div>
                <div class="form-group">
                    <label>Fecha de ingreso</label>
                    <Field name="admissionDate" type="date" class="form-control" :class="{ 'is-invalid': errors.admissionDate }" />
                    <div class="invalid-feedback">{{ errors.admissionDate }}</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Registrar Producto
                    </button>
                    <router-link :to="{ name: 'home' }" class="btn btn-link">Cancel</router-link>
                </div>
            </Form>
        </div>
    </div>
</template>
