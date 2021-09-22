<template>
  <v-container class="mt-10">
    <h1>Login de Usuario</h1>
    <v-form
    ref="form"
    @submit.prevent="login"
    >
      <v-text-field
      v-model="$store.state.formLabelAlign.user"
      label="E-mail"
      :rules="[v => !!v || 'Este campo es obligatorio']"
    ></v-text-field>

    <v-text-field
      v-model="$store.state.formLabelAlign.password"
      label="Password"
      :counter="10"
      :rules="[v => !!v || 'Este campo es obligatorio']"
      
    ></v-text-field>
    
    <div class="mt-8" align="center">
      <v-btn
      color="success"
      class="mr-4 mb-3"
      type="submit"
    >
      INICIAR
    </v-btn>

    <v-btn
      color="error"
      class="mr-4 mb-3"
      @click="resetForm"
    >
      LIMPIAR FORMULARIO
    </v-btn>

    <v-btn
      color="warning"
      class="mb-3"
      @click="resetValidation"
    >
      LIMPIAR VALIDACION
    </v-btn>
    </div>
  
    </v-form>

    <v-snackbar
      v-model="snackbar"
    >
      {{ aviso }}

        <v-btn
          color="pink"
          text
          @click="snackbar = false"
        >
          Cerrar
        </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import Firebase from 'firebase'
//correo: angie.oliva@gmail.com y contraseña 123456 ó angeles.oliva1984@gmail.com y contraseña 123456
  
export default {
  name: 'Login',
  components: {  
  },
  data() {
    return {
      formLabelAlign: {
        user: '',
        password: ''
      },
      snackbar: false,
      aviso: '',
    };
  },
  methods: {
    login() {
      Firebase.auth()
        .signInWithEmailAndPassword(
          this.$store.state.formLabelAlign.user,
          this.$store.state.formLabelAlign.password
        )
        .then(
          accept => {
            console.log('Logueado con éxito', accept);
            this.$router.push('home');
          },
          reject => {       
            this.snackbar = true
            this.aviso = 'Autencificación fallida'
          });
    },
    resetForm () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
  }
}
</script>
