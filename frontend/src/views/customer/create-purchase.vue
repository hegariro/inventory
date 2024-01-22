<script setup>
import { computed, onMounted, ref } from "vue";
import * as Yup from 'yup';
import { Form, Field } from 'vee-validate';
import { useProductsStore } from "@/stores/products.store";
import { useShoppingCarStore } from "@/stores/shopping-car.store";

const product = ref({});
const products = ref([]);
const orders = ref([]);
const quantity = ref(0);
const subtotal = ref(0);
const maxQuantity = ref(0);
const productStore = useProductsStore();

onMounted(async () => {
    await productStore.listAllProducts();
    products.value = productStore.getProducts;
});

const hasProducts = computed(() => productStore.getTotalProducts);
const selectProduct = (event) => {
    const productId = event.target.value;
    const p = products.value.filter(p => (p.id === productId)).pop();
    maxQuantity.value = productStore.getQuantityById(productId);
    product.value = p;
};
const setSubtotal = () => (subtotal.value = productStore.getPriceById(product.value.id) * quantity.value);
const addOrder = () => {
    const productId = product.value.id;
    const name = product.value.name;
    const qty = quantity.value;
    const sub = subtotal.value;
    let n = 0;
    products.value.map(p => ((p.id === productId) && (n = orders.value.length)));
    orders.value.push({ n, name, productId, quantity: qty, subtotal: sub });
    product.value = {};
    quantity.value = 0;
    subtotal.value = 0;
};
const removeOrder = (idx) => (orders.value.splice((idx - 1), 1));
const onSubmit = async () => {
    try {
        const shoppinCarStore = useShoppingCarStore();
        await shoppinCarStore.makePurchase({ purchaseDate: (new Date()).toJSON(), orders: orders.value });
    } catch (err) { console.error(err); }
};

const schema = Yup.object().shape({
    productId: Yup.string().required("No se ha seleccionado un producto"),
    quantity: Yup.number().required("Debe seleccionar una cntidad")
});
</script>

<template>
    <div class="wrapper">
        <div v-if="hasProducts">
            <div class="card bg-dark text-white m-3">
                <h4 class="card-header">Ordenes de compra</h4>
                <div class="card-body">
                    <Form @submit="addOrder" :validation-schema="schema" v-slot="{ errors }">
                        <div class="form-group">
                            <label>Producto</label>
                            <Field name="productId" @change="selectProduct($event)" as="select" class="form-control custom-select">
                                <option value="" disabled>Selecciona un producto</option>
                                <option v-for="product in products" :key="product.id" :value="product.id" >
                                    {{ product.name }}
                                </option>
                            </Field>
                            <div class="invalid-feedback">{{ errors.productId }}</div>
                        </div>
                        <div class="form-group">
                            <label>Cantidad m&aacute;xima disponible del producto seleccionado </label> {{ maxQuantity }}
                        </div>
                        <div class="form-group">
                            <label>Cantidad solicitada {{ quantity }}</label>
                            <Field name="quantity" type="range" v-model.number="quantity" min="0"
                                :max="maxQuantity" class="form-control" @change="setSubtotal"
                            />
                            <div class="invalid-feedback">{{ errors.quantity }}</div>
                        </div>
                        <div class="form-group">
                            <h4><label>Subtotal </label> {{ subtotal }}</h4>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary">
                                Agregar solicitud
                            </button>
                        </div>
                    </Form>
                    <div class="form-group">
                        <button class="btn btn-success" @click="onSubmit">
                            Finalizar compra
                        </button>
                        <router-link :to="{ name: 'home' }" class="btn btn-link">Cancel</router-link>
                    </div>
                </div>
            </div>
            <div>
                <table class="table table-sm table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Subtotal</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders" :key="order.n">
                            <th scope="row">{{ order.n }}</th>
                            <td>{{ order.name }}</td>
                            <td>{{ order.quantity }}</td>
                            <td>{{ order.subtotal }}</td>
                            <td><button type="button" class="btn btn-warning" @click="removeOrder(order.n)" >
                                Remover solicitud
                            </button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else>
            <div class="alert alert-warning" role="alert">
                No hay productos disponibles
            </div>
        </div>
    </div>
</template>