import { defineStore } from 'pinia';
import { fetchWrapper } from '@/_helpers/fetch-wrapper';
import router from '@/router';

const baseUrlCustomer = `${import.meta.env.VITE_BACKEND_URL_BASE}/customer`;

export const useShoppingCarStore = defineStore({
    id: "shoppingCar",
    actions: {
        async makePurchase(purchase) {
            try {
                const result = await fetchWrapper.post(`${baseUrlCustomer}/purchases`, purchase);
                console.log({result});
                router.push({ name: "all-products" });
            } catch (err) { console.error(err); }
        }
    }
});