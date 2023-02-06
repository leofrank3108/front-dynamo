<template>
     <a-form
        :model="form"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="newUser"
    >
        <a-form-item
        label="name"
        name="name"
        :rules="[{ required: true, message: 'Por favor Su nombre completo' }]"
        >
        <a-input v-model:value="form.name" />
        </a-form-item>
        <a-form-item
        label="email"
        name="email"
        :rules="[{ required: true, message: 'Por favor Ingrese su correo!' }]"
        >
        <a-input v-model:value="form.email" />
        </a-form-item>

        <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Por favor ingrese su contraseña!' }]"
        >
        <a-input-password v-model:value="form.password" />
        </a-form-item>
        <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Por favor repita su contraseña' }]"
        >
        <a-input-password v-model:value="confirmPassword" @keyup="validatePass"/>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Guardar</a-button>
        </a-form-item>
    </a-form>
    <h4>Ya tienes cuenta <a-button type="ghost" @click="toLoginForm">Inicia Sesion</a-button></h4>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions } from 'vuex'

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
        methods: {
            ...mapActions('auth', ['createUser', 'showRegister', 'showLogin']),
            toLoginForm() {
                this.$router.push({name: 'login'})
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
                

                    this.$router.push({name: 'login'})
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>