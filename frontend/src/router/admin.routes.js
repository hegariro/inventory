// TODO falta crear e importar los componentes Layout, CreateProduct, EditProduct, DeleteProduct, ListPurchases

export default {
    path: "/admin",
    component: Layout,
    children: [
        { path: "", redirect: "products" },
        { path: "products/add", component: CreateProduct },
        { path: "products/edit/:id", component: EditProduct },
        { path: "products/delete/:id", component: DeleteProduct },
        { path: "purchases", component: ListPurchases }
    ]
};