<template>
  <a-form
    :model="form"
    name="login"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 8 }"
    autocomplete="off"
    @finish="onSubmit"
    @finishFailed="onFinishFailed"
  >
    <a-row justify="space-around">
        <a-col :span="16">
          <a-form-item
            label="email"
            name="email"
            :rules="[{ required: true, message: 'Por favor Ingrese su correo!' }]"
          >
            <a-input v-model:value="form.email" />
          </a-form-item>
        </a-col>
        <a-col :span="16">
          <a-form-item
            label="Password"
            name="password"
            :rules="[{ required: true, message: 'Por favor ingrese su contraseña!' }]"
          >
            <a-input-password v-model:value="form.password" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row justify="center">
        <a-col :span="16">
          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Iniciar Sesion</a-button>
          </a-form-item>
        </a-col>
      </a-row>
  </a-form>
    <a-row justify="center">
      <a-col :span="16">
        <h4>Si aun no tienes cuenta
          <a-button type="ghost" @click="toRegister">Registrate</a-button>
        </h4>   
      </a-col>
    </a-row>
</template>
<script>
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const form = reactive({
      email: '',
      password: '',
    })
    const onSubmit = async values => {
      console.log('Success:', values)

      const data = await store.dispatch('auth/login', form)
      if (data) {
        await store.dispatch('doctors/getDoctors')

        router.push({name: 'doctors'})
      }
    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo)
    }

    const toRegister = () => {
      router.push({name: 'register'})
    }
    return {
      form,
      onSubmit,
      onFinishFailed,
      toRegister,
      store,
    };
  },
});
</script>