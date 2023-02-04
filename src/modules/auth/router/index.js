export default {
    name: 'auth',
    component: () => import(/* webpackChunkName: "login" */ '@/modules/auth/pages/Login.vue'),
    // children: [
    //     {
    //         path: '',
    //         name: 'list',
    //         component: () => import(/* webpackChunkName: "doctors-list" */ '@/modules/doctors/pages/List.vue')
    //     }
    // ]
}