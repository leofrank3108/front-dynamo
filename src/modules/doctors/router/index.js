export default {
    name: 'doctors',
    component: () => import(/* webpackChunkName: "doctors" */ '@/modules/doctors/layouts/DoctorsLayout.vue'),
    children: [
        {
            path: '',
            name: 'list',
            component: () => import(/* webpackChunkName: "doctors-list" */ '@/modules/doctors/pages/List.vue')
        }
    ]
}