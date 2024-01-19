import { defineStore } from 'pinia';
import { fetchWrapper } from '@/_helpers/fetch-wrapper';
import router from '@/router';

const baseUrlAuth = `${import.meta.env.VITE_BACKEND_URL_BASE}/auth`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        data: JSON.parse(localStorage.getItem('userData')),
        returnUrl: null
    }),
    actions: {
        async login(username, password) {
            try {
                const user = await fetchWrapper.post(`${baseUrlAuth}/signin`, { nickname: username, password });    

                // update pinia state
                this.user = user;

                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));

                // redirect to previous url or default to home page
                router.push(this.returnUrl || '/');
            } catch (error) {
                // const alertStore = useAlertStore();
                // alertStore.error(error);
                console.error("Error", { error });
                router.push("/account/login");
            }
        },
        async register(user) {
            // The User must have inside the attribs firstname, lastname, nickname, password
            try {
                const { data } = await fetchWrapper.post(`${baseUrlAuth}/signup`, user);
                this.data = data;

                localStorage.setItem('userData', JSON.stringify(data));
            } catch (error) {
                console.error(error);
            } finally {
                router.push("/account/login");
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/account/login');
        }
    }
});