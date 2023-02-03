<template>
    <div v-if="doctors && doctors !== unidefined">
        <div v-for="doctor in doctors" :key="doctor.id">
            {{ doctor.fullname }}
        </div>
    </div>
</template>

<script>
    import { isProxy, toRaw } from 'vue'
    import { mapState, mapActions } from 'vuex'
    export default {
        data() {
            return {
                doctors: []
            }
        },
        computed: {
           ...mapState('doctors', ['doctorsList']),
        },
        async created () {
           if (isProxy(this.doctorsList)) {
            if (toRaw(this.doctorsList).length === 0) {
                await this.getDoctors()
            }
            this.doctors = toRaw(this.doctorsList)
        }
        },
        methods: {
            ...mapActions('doctors', ['getDoctors']),
        },
    }
</script>

<style lang="scss" scoped>

</style>