import { defineStore } from 'pinia';
import fetchWrapper from '@/_helpers';

const baseUrlCustomer = `${import.meta.env.VITE_BACKEND_URL_BASE}/customer`;

export const useCustomerStore = defineStore({
    id: "customer",
    state: () => ({ purchases: [], productsPurchased: [] }),
    actions: {
        async getPurchasesByUser() {
            try {
                const purchases = await fetchWrapper.get(`${baseUrlCustomer}/purchases/user`);
                this.purchases = purchases;
            } catch (error) {
                console.error("Error", { error });
            }
        },
        async getPurchasesById(purchaseId) {
            try {
                const purchase = await fetchWrapper.get(`${baseUrlCustomer}/purchases/${purchaseId}`);
                console.debug("getPurchasesById result: ", { purchase });
                let existsPurchase = false;
                for (let p of this.purchases) {
                    if (p.id === purchaseId) {
                        existsPurchase = true;
                        break;
                    }
                }
                if (!existsPurchase) this.purchases.push(purchase);
            } catch (error) {
                console.error("Error", { error });
            }
        },
        async productsPurchasedHistory() {
            try {
                const history = await fetchWrapper.get(`${baseUrlCustomer}/purchases/products`);
                console.debug({ history });
                this.productsPurchased = history;
            } catch (error) {
                console.error("Error", { error });
            }
        }
    }
});