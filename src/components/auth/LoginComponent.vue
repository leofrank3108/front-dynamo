<template>
    <div class="container mt-3">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Inicio de sesion</div>

                    <div class="card-body">
                        <form action="#" @submit.prevent="onSubmit()">
                       <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input type="email" v-model="form.email" class="form-control" id="email" placeholder="name@example.com">
                        </div>
                        <div class="mb-3">
                            <label for="inputPassword" class="form-label">Password</label>
                            <input type="password" v-model="form.password" class="form-control" id="inputPassword">
                        </div>
                        <div>
                            <button type="submit" class="btn btn-primary">Iniciar sesion</button>
                            <!-- <AuthButton @on:click="login()" label="Iniciar sesion"/> -->
                            <span>Si aun no tienes cuenta <button type="button" class="btn btn-link" @click="toRegisterForm">Registrate</button></span>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions } from 'vuex'
// import Swal from 'sweetalert2'

    export default {
        data() {
            return {
                form: {
                    email: '',
                    password: ''
                }
            }
        },
        components: {
            AuthButton: defineAsyncComponent(() => import('../shares/AuthButton.vue')),
        },
        methods: {
            ...mapActions('auth', ['login', 'showRegister', 'showLogin']),
            // ...mapActions('doctors', ['getDoctors']),
            async onSubmit() {
                console.log(this.form)
                const data = await this.login(this.form)
                console.log(data)
                if (data) {
                    // const Toast = Swal.mixin({
                    //     toast: true,
                    //     position: 'top-end',
                    //     showConfirmButton: false,
                    //     timer: 3000,
                    //     timerProgressBar: true,
                    //     didOpen: (toast) => {
                    //         toast.addEventListener('mouseenter', Swal.stopTimer)
                    //         toast.addEventListener('mouseleave', Swal.resumeTimer)
                    //     }
                    // })

                    // Toast.fire({
                    //     icon: 'success',
                    //     title: 'acaba de iniciar sesion'
                    // })
                    // await this.getDoctors()

                    this.$router.push({name: 'doctors'})
                }
            },
            toRegisterForm() {
                // this.$router.push({name: 'register'});
                this.showRegister(true)
                this.showLogin(false)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>