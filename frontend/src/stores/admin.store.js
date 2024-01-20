import { defineStore } from 'pinia';
import { fetchWrapper } from '@/_helpers/fetch-wrapper';

const baseUrlAdmin = `${import.meta.env.VITE_BACKEND_URL_BASE}/admin`;

export const useAdminStore = defineStore({
    id: "admin",
    state: () => ({ products: [], purchases: [] }),
    actions: {
        async createProduct(product) {
            try {
                const p = await fetchWrapper.post(`${baseUrlAdmin}/products`, product);
                this.products.push(p);
            } catch (error) {
                console.error("Error", { error });
            }
        },
        async updateProduct(product) {
            const { id } = product;
            try {
                const result = await fetchWrapper.put(`${baseUrlAdmin}/products/${id}`, product);
                console.debug("updateProduct result: ", { result });
                for (let i in this.products) {
                    if (this.products[i].id === id) {
                        this.products[i] = product;
                        break;
                    }
                }
            } catch (error) {
                console.error("Error", { error });
            }
        },
        async deleteProduct(productId) {
            try {
                const result = await fetchWrapper.delete(`${baseUrlAdmin}/products/${productId}`);
                console.debug("deleteProduct result: ", { result });
                const products = this.products.filter(p => !(p.id === productId));
                this.products = products;
            } catch (error) {
                console.error("Error", { error });
            }
        },
        async listAllPurchases() {
            try {
                const purchases = await fetchWrapper.get(`${baseUrlAdmin}/purchases`);
                this.purchases = purchases;
            } catch (error) {
                console.error("Error", { error });
            }
        }
    }
});