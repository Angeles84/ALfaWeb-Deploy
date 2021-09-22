<template>
  <v-container class="mt-10">
    <h1>Registro de Usuario</h1>
     <FormRegistro @submit="handleCreateUserFormSubmit" />

  </v-container>
</template>

<script>
import Firebase from 'firebase'
import FormRegistro from '@/components/FormRegistro.vue'


export default {
  name: 'Login',
  components: {  
    FormRegistro
  },
  data() {
    return {
      formLabelAlign: {
        user: '',
        password: ''
      },
      email: null,
      password: null
    };
  },
  methods: {
     async handleCreateUserFormSubmit(credentials) {
      try {
        await this.$store.dispatch('createUser', credentials)
        this.$router.push('/home')
      } catch (e) {
        console.error(e)
      }
    },
    
  }
}
</script>
