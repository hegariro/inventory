// TODO falta crear e importar los componentes Layout, CreateProduct, EditProduct, DeleteProduct, ListPurchases
import Layout from "@/views/account/layout.vue";

export default {
    path: "/admin",
    component: Layout,
    children: [
        { path: "", redirect: "createProduct" },
        { path: "products/add", component: CreateProduct, name: "createProduct" },
        // { path: "products/edit/:id", component: EditProduct },
        // { path: "products/delete/:id", component: DeleteProduct },
        // { path: "purchases", component: ListPurchases }
    ]
};