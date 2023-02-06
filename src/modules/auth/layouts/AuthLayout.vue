<template>
    <a-layout class="layout">
        <a-layout-header>
        <a-menu
            v-model:selectedKeys="selectedKeys"
            theme="dark"
            mode="horizontal"
            :style="{ lineHeight: '64px' }"
        >
            <a-menu-item key="1">Iniciar Sesion</a-menu-item>
            <a-menu-item key="2">Registrarse</a-menu-item>
        </a-menu>
        </a-layout-header>
        <a-layout-content style="padding: 0 50px">
            <router-view/>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
            Leofrank Cortesia - Medi Dynamo test
        </a-layout-footer>
    </a-layout>
</template>

<script>
    export default {
        data() {
            return {
                selectedKeys: []
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>