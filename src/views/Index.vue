<template>
  <div class="home">
    <Login v-if="showLoginForm"/>
    <Register v-if="showRegisterForm"/>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import Login from '@/components/auth/LoginComponent.vue'
import Register from '@/components/auth/RegisterComponent.vue'


export default {
  name: 'Index',
  components: {
    Login,
    Register,
  },
  computed: {
    ...mapState('auth', ['showLoginForm', 'showRegisterForm']),
  },
   
}
</script>
