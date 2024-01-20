import Layout from "@/views/account/layout.vue";
import Login from "@/views/account/login.vue";
// import { Layout, Login, Register } from "@/views/account";

export default {
    path: "/account",
    component: Layout,
    children: [
        { path: "", redirect: "login" },
        { path: "login", component: Login },
        // { path: "register", component: Register }
    ]
};