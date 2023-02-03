<template>
    <div>
        <nav>
            <router-link to="/">List</router-link> |
            <router-link to="/">Create</router-link>
        </nav>
        <router-view/>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    async created () {
        await this.getDoctors()
    },
    methods: {
        ...mapActions('doctors', ['getDoctors']),
    },
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>