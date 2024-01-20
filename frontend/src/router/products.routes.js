import Layout from "@/views/account/layout.vue";
import AllProducts from "@/views/products/all-products.vue";
import ProductDetail from "@/views/products/product-detail.vue";

export default {
    path: "/products",
    component: Layout,
    children: [
        { path: "", component: AllProducts, name: "all-products" },
        { path: "detail/:id", component: ProductDetail, name: "product-detail" }
    ]
};