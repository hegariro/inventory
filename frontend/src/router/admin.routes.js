import Layout from "@/views/account/layout.vue";
import CreateProduct from "@/views/admin/create-product.vue";
import EditProduct from "@/views/admin/edit-product.vue";
import DeleteProduct from "@/views/admin/delete-product.vue";
import AllPurchases from "@/views/admin/all-purchases.vue";

export default {
    path: "/admin",
    component: Layout,
    children: [
        { path: "products/add", component: CreateProduct, name: "createProduct" },
        { path: "products/edit/:id", component: EditProduct, name: "editProduct", props: true },
        { path: "products/delete/:id", component: DeleteProduct, name: "deleteProduct", props: true },
        { path: "purchases", component: AllPurchases, name: "allPurchases" }
    ]
};