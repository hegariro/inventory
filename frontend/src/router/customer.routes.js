// TODO falta crear e importar los componentes Layout, UserPurchases, PurchaseDetail, CreatePurchase, ProductsHistory
import Layout from "@/views/account/layout.vue";

export default {
    path: "/customer",
    component: Layout,
    children: [
        // { path: "", redirect: "products/all" },
        // { path: "products/all", component: ProductsHistory },
        // { path: "purchases", component: UserPurchases },
        // { path: "purchases/:id", component: PurchaseDetail },
        // { path: "purchases/add", component: CreatePurchase }
    ]
};