import { defineStore } from 'pinia';
import { fetchWrapper } from '@/_helpers/fetch-wrapper';

const baseUrlAdmin = `${import.meta.env.VITE_BACKEND_URL_BASE}/admin`;

export const useProductsStore = defineStore({
    id: "products",
    state: () => ({ products: new Map() }),
    actions: {
        async listAllProducts() {
            const { products } = await fetchWrapper.get(`${baseUrlAdmin}/products`);
            if (!!products) products.map(p => this.products.set(p.id, p));
        },
        async getProductById(productId) {
            try {
                const { product } = await fetchWrapper.get(`${baseUrlAdmin}/products/${productId}`);
                !this.products.has(productId) && this.products.set(product.id, product);
            } catch (error) {
                console.error("Error", { error });
            }
        }
    },
    getters: {
        getQuantityById: (state) => {
            return (productId) => (state.products.has(productId) ? 
                Number(state.products.get(productId).quantity) : 0);
        },
        getPriceById: (state) => {
            return (productId) => (state.products.has(productId) ?
                Number(state.products.get(productId).price) : 0);
        },
        getTotalProducts: (state) => (Number(state.products.size)),
        getProducts: (state) => Object.values(Object.fromEntries(state.products))
    }
});