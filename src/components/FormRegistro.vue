<template>
  <div>
    <v-form
      ref="form"
      @submit.prevent="handleLoginFormSubmit"
    >
      <v-text-field
      v-model="email"
      label="E-mail"
      :rules="[v => !!v || 'Este campo es obligatorio']"
    ></v-text-field>

    <v-text-field
      v-model="password"
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
  </div>
</template>

<script>
export default {
  data: () => ({
    email: null,
    password: null
  }),
  methods: {
    handleLoginFormSubmit() {
      if (this.$refs.form.validate()) {
        this.$emit('submit', { email: this.email, password: this.password })
      }
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

<style  scoped>

</style>