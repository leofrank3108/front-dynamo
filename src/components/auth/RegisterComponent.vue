<template>
    <div class="container mt-3">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Formulario de registro</div>

                    <div class="card-body">
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" v-model="form.name" placeholder="name" required>
                        </div>
                       <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="email" v-model="form.email" placeholder="name@example.com" required>
                        </div>
                        <div class="mb-3">
                            <label for="inputPassword" class="form-label">Password</label>
                            <input type="password" class="form-control" id="inputPassword" v-model="form.password" required>
                        </div>
                         <div class="mb-3">
                            <label for="confirmPassword" class="form-label">Confirm Pass</label>
                            <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" @keyup="validatePass" required>
                        </div>
                        <div>
                            <AuthButton @on:click="newUser" label="Registrate"/>
                            <span>Si ya tienes una cuenta inicia sesion <button type="button" class="btn btn-link" @click="toLoginForm">aqui</button></span>
                        </div>
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
                    name: '', 
                    email: '',
                    password: ''
                },
                confirmPassword: ''
            }
        },
        components: {
            AuthButton: defineAsyncComponent(() => import('../shares/AuthButton.vue')),
        },
        methods: {
            ...mapActions('auth', ['createUser', 'showRegister', 'showLogin']),
            toLoginForm() {
                // this.$router.push({name: 'login'})
                this.showRegister(false)
                this.showLogin(true)
            },
            validatePass() {
                if (this.confirmPassword !== this.form.password) {
                    console.log('pass no match')
                    return
                } else {
                    console.log('great')
                }
            },
            async newUser() {
                const status = await this.createUser(this.form)
                if (status === 'Created') {
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
                    //     title: 'Registro exitoso, ahora puede iniciar sesion'
                    // })

                    // this.$router.push({name: 'login'})
                    this.showRegister(false)
                    this.showLogin(true)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>