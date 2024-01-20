<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useAlertStore } from '@/stores/alert.store';
import { useAuthStore } from '@/stores/auth.store';
import router from '@/router';

const schema = Yup.object().shape({
    firstname: Yup.string().required('El nombre es requerido'),
    lastname: Yup.string().required('El apellido es requerido'),
    username: Yup.string().required('El usuario es requerido'),
    password: Yup.string().required('El password es requerido').min(6, 'El password debe contener almenos 6 caracteres')
});

async function onSubmit(values) {
    const authStore = useAuthStore();
    const alertStore = useAlertStore();
    try {
        await authStore.register(values);
        await router.push('/account/login');
        alertStore.success('Registro exitoso!');
    } catch (error) { 
        alertStore.error(error);
    }
}
</script>

<template>
    <div class="card bg-dark text-white m-3">
        <h4 class="card-header">Registro</h4>
        <div class="card-body">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                <div class="form-group">
                    <label>Nombres</label>
                    <Field name="firstname" type="text" class="form-control" :class="{ 'is-invalid': errors.firstname }" />
                    <div class="invalid-feedback">{{ errors.firstname }}</div>
                </div>
                <div class="form-group">
                    <label>Apellidos</label>
                    <Field name="lastname" type="text" class="form-control" :class="{ 'is-invalid': errors.lastname }" />
                    <div class="invalid-feedback">{{ errors.lastname }}</div>
                </div>
                <div class="form-group">
                    <label>Usuario</label>
                    <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
                    <div class="invalid-feedback">{{ errors.username }}</div>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Reg&iacute;strame
                    </button>
                    <router-link to="login" class="btn btn-link">Cancel</router-link>
                </div>
            </Form>
        </div>
    </div>
</template>