// TODO falta crear e importar los componentes Layout, Login y Register

export default {
    path: "/account",
    component: Layout,
    children: [
        { path: "", redirect: "login" },
        { path: "login", component: Login },
        { path: "register", component: Register }
    ]
};