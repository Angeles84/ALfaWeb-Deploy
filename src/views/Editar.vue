<template>
  <div class="my-9">
    <v-container>
       <h1 class="mb-3" v-once>Editando el curso: {{ $store.state.curso.nombre }}</h1>
       <v-form ref="form" :model="curso">
          <v-row>
                  <v-col
                    cols="12" 
                  >
                    <v-text-field
                      v-model="curso.nombre"
                      label="Nombre"
                      :counter="40"
                      :rules="[v => !!v || 'Este campo es obligatorio']"
                    ></v-text-field>
                  </v-col>
                   <v-col
                    cols="12" 
                  >
                    <v-text-field
                      v-model="curso.imagen"
                      label="Url de la imagen del curso"
                      :rules="[v => !!v || 'Este campo es obligatorio']"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model.number="curso.cupos"
                      label="Cupos del curso"
                      type="number"
                      :rules="[v => !!v || 'Este campo es obligatorio']"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12" 
                  >
                    <v-text-field
                      v-model.number="curso.inscritos"
                      label="Inscritos del curso"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="curso.duracion"
                      label="Duración del curso"
                      :rules="[v => !!v || 'Este campo es obligatorio']"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"   
                  >
                    <v-text-field
                      v-model.number="curso.costo"
                      label="Costo"
                      type="number"
                      :rules="[v => !!v || 'Este campo es obligatorio']"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="curso.codigo"
                      label="Código del curso"
                      :rules="[v => !!v || 'Este campo es obligatorio']"
                    ></v-text-field>
                  </v-col>
                   <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="curso.fecha"
                      label="Fecha del curso"
                      :rules="[v => !!v || 'Este campo es obligatorio']"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-textarea
                      v-model="curso.descripcion"
                      label="Descripción del curso"
                      :rules="[v => !!v || 'Este campo es obligatorio']"
                    ></v-textarea>
                  </v-col>
                  <v-col 
                    cols="12"
                  >
                    <v-switch
                      v-model="curso.estado"
                      :label="`Terminado: ${curso.estado ? 'Si' : 'No'}`"
                    ></v-switch>
                  </v-col>

            <v-col>
              <div align="center">
                <v-btn
                  color="success"
                  class="mr-4 mb-3"
                  @click="editarCurso"
                >
                 ACTUALIZAR
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

          </v-col>       
        </v-row>
      </v-form>
    </v-container>

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
  </div>
</template>

<script>
import { mapState} from 'vuex';
import axios from "axios";
import Firebase from 'firebase';
import Store from '@/store'


export default {
  components: {
  },
  data: () => ({
    snackbar: false,
    aviso: '', 
  }),
  async beforeRouteEnter(to, from, next) {
    await Store.dispatch('getCurso', to.params.id)
    next()
  },
  methods: {

    //editar curso
    editarCurso() {
      let curso = {
        codigo: this.curso.codigo,
        nombre: this.curso.nombre,
        estado: this.curso.estado,
        costo: this.curso.costo,
        duracion: this.curso.duracion,
        descripcion: this.curso.descripcion,
        cupos: this.curso.cupos,
        inscritos: this.curso.inscritos,
        imagen: this.curso.imagen,
        fecha: this.curso.fecha,
      };
      if(this.curso.cupos < this.curso.inscritos) {
        this.snackbar = true
        this.aviso = 'No hay suficientes cupos'
       } else {
      axios
      .put(`https://us-central1-prueba-deploy-ecc27.cloudfunctions.net/test/curso/${this.curso.id}`, 
        curso,
        { headers: { "Content-Type": "application/json" } }
      )
      .then(accept => {
        this.$store.dispatch('getCursos');
        this.snackbar = true
        this.aviso = 'Curso editado'
        this.resetForm()
        this.$router.back()
      }); 
      } 
    },
    resetForm () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
  },
  computed: {
    ...mapState(['curso'])
  }
}
</script>

<style  scoped>
h1 {
  font-size: 3rem;
  font-weight: 400;
}
</style>