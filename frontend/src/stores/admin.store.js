import { defineStore } from 'pinia';
import { fetchWrapper } from '@/_helpers/fetch-wrapper';
import router from '@/router';

const baseUrlAdmin = `${import.meta.env.VITE_BACKEND_URL_BASE}/admin`;

export const useAdminStore = defineStore({
    id: "admin",
    state: () => ({ products: [], purchases: new Map() }),
    actions: {
        async createProduct(product) {
            try {
                const p = await fetchWrapper.post(`${baseUrlAdmin}/products`, product);
                this.products.push(p);
            } catch (error) {
                console.error("Error", { error });
            } finally {
                router.push({ name: "home"});
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
                router.push({ name: "home" });
            } catch (error) {
                console.error("Error", { error });
            } finally {
                router.push({ name: "home"});
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
            } finally {
                router.push({ name: "home"});
            }
        },
        async listAllPurchases() {
            try {
                const purchases = await fetchWrapper.get(`${baseUrlAdmin}/purchases`);
                purchases.map(purchase => this.purchases.set(purchase.id, purchase));
            } catch (error) {
                console.error("Error", { error });
            }
        }
    }
});