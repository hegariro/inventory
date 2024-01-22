import Layout from "@/views/account/layout.vue";
import CreatePurchase from "@/views/customer/create-purchase.vue";

export default {
    path: "/customer",
    component: Layout,
    children: [
        // { path: "products/all", component: ProductsHistory },
        // { path: "purchases", component: UserPurchases },
        // { path: "purchases/:id", component: PurchaseDetail },
        { path: "purchases/add", component: CreatePurchase, name: "makePurchase" }
    ]
};