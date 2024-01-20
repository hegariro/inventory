import Layout from "@/views/account/layout.vue";
import Login from "@/views/account/login.vue";
import Register from "@/views/account/register.vue";

export default {
    path: "/account",
    component: Layout,
    children: [
        { path: "", redirect: "login" },
        { path: "login", component: Login },
        { path: "register", component: Register }
    ]
};