import { defineStore } from 'pinia';
import { fetchWrapper } from '@/_helpers/fetch-wrapper';
import router from '@/router';

const baseUrlAdmin = `${import.meta.env.VITE_BACKEND_URL_BASE}/admin`;

export const useProductsStore = defineStore({
    id: "products",
    state: () => ({ products: [] }),
    actions: {
        async listAllProducts() {
            const { products } = await fetchWrapper.get(`${baseUrlAdmin}/products`);
            if (!!products) this.products = products;
        },
        async getProductById(productId) {
            try {
                const product = await fetchWrapper.get(`${baseUrlAdmin}/products/${productId}`);
                let existsProduct = false;
                for (let p of this.products) {
                    if (p.id === productId) {
                        existsProduct = true;
                        break;
                    }
                }
                if (!existsProduct) this.products.push(product);
            } catch (error) {
                console.error("Error", { error });
            }
        }
    }
});