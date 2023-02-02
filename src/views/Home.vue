<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
   created () {
    this.setPost()
  },
  methods: {
    setPost() {
  fetch('http://127.0.0.1:8000/api/login',{
    method:  'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: 'leofrankjcd@alma3.com',
      password:   '123456789'
    })
  })
    .then(response => console.log(response.json()))
    .then(data => console.log(data))
    .catch(error => console.log(error))
}
  },
}
</script>
