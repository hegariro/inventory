import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from "@/stores/auth.store";
import { useAlertStore } from "@/stores/alert.store";
import Home from "@/views/Home.vue";
// import adminRoutes from './admin.routes';
// import customerRoutes from './customer.routes';
import accountRoutes from './account.routes';

//TODO falta agregar el componente del Home

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: "active",
    routes: [
        { path: '/', name: 'home', component: Home },
        { ...accountRoutes },
        // { ...adminRoutes },
        // { ...customerRoutes },
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
});

router.beforeEach(async (to) => {
    // clear alert on route change
    const alertStore = useAlertStore();
    alertStore.clear();

    // redirect to login page if not logged in and trying to access a restricted page 
    const publicPages = ['/account/login', '/account/register'];
    const authRequired = !publicPages.includes(to.path);
    const authStore = useAuthStore();

    if (authRequired && !authStore.user) {
        authStore.returnUrl = to.fullPath;
        return '/account/login';
    }
});

export default router;
