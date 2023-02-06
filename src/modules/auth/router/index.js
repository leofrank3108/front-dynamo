export default {
    name: 'auth',
    component: () => import(/* webpackChunkName: "layout" */ '@/modules/auth/layouts/AuthLayout.vue'),
    children: [
        {
            path: '',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ '@/modules/auth/pages/Login.vue'),
        },
        {
            path: '/register',
            name: 'register',
            component: () => import(/* webpackChunkName: "login" */ '@/modules/auth/pages/Register.vue'),
        }
    ]
}