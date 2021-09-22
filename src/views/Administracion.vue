<template>
  <div class="mt-5">
    <div align="center">
      <span>Administración</span>
    </div>
    
    <v-container>

    <v-data-table
    :headers="headers"
    :items="cursosList"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title></v-toolbar-title>
      
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              AGREGAR CURSO
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
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
                </v-row>
               </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
             <v-spacer></v-spacer>
              <div align="center">
                <v-btn
                  color="success"
                  class="mr-4 mb-3"
                  @click="addCurso"
                >
                 AGREGAR
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

            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar>
    </template>
    
    <template v-slot:[`item.costo`]="{ item }">
      <v-chip
        color="green"
        dark
      >
        ${{ item.costo }}
      </v-chip>
    </template>

    <template v-slot:[`item.estado`]="{ item }">
      <v-chip
        :color="getColor(item.estado)"
        dark
      >
        {{ item.estado === true ? 'Si' : 'No'}}
      </v-chip>
    </template>

    <template v-slot:[`item.fecha`]="{ item }">
      <v-chip
        color="green"
        dark
      >
        {{ item.fecha }}
      </v-chip>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
     
      <v-icon
        small
        class="mr-2"
        @click="$router.push(`/editar/${item.id}`)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItemConfirm(item.id)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
     
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>

  </v-container>
   
  <v-container>
    <Cantidades />
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

<script >
import Cantidades from '@/components/Cantidades.vue'
import Firebase from 'firebase';
import { mapState, mapMutations, createLogger } from 'vuex';
import axios from 'axios';


export default {
    name: 'Administracion',
    components: {
      Cantidades
    },
    data () {
      return {
        dialog: false,
        dialogDelete: false,
        headers: [
          {
            text: 'Curso',
            align: 'start',
            sortable: false,
            value: 'nombre',
          },
          { text: 'Cupos', value: 'cupos' },
          { text: 'Inscritos', value: 'inscritos' },
          { text: 'Duración', value: 'duracion' },
          { text: 'Costo', value: 'costo' },
          { text: 'Terminado', value: 'estado' },
          { text: 'Fecha', value: 'fecha' },
          { text: 'Acciones', value: 'actions', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
          nombre: '', 
          estado: null, 
          costo: 0, 
          duracion: '', 
          descripcion: '', 
          cupos: 0,
          inscritos: 0,
          fecha: '',
          imagen: ''
        },
       curso: {
        nombre: '', 
        estado: null, 
        costo: 0, 
        duracion: '', 
        descripcion: '', 
        cupos: 0,
        inscritos: 0,
        fecha: '',
        imagen: ''
      },
      defaultItem: {
        nombre: '', 
        estado: null, 
        costo: 0, 
        duracion: '', 
        descripcion: '', 
        cupos: 0,
        inscritos: 0,
        fecha: '',
        imagen: ''
      }, 
      snackbar: false,
      aviso: '',    
     }
    },

    computed: {
      ...mapState(['cursos', 'edit']),
      formTitle () {
        return this.editedIndex === -1 ? 'Agregando Curso' : 'Editar curso'
      },
      cursosList() {
        return this.cursos.map((curso) => {
          curso.data.id = curso.id;
          return curso.data;
      });
    },
    }, 

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    mounted() {
      this.cargaTabla();
    },

    methods: {
      //Cargar tabla
      cargaTabla() {
        this.$store.dispatch("getCursos");
      },
      //agregar curso
      addCurso() {
      let curso = {
        codigo: this.curso.cogigo,
        nombre: this.curso.nombre,
        estado: this.curso.cestado,
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
      .post('https://us-central1-prueba-deploy-ecc27.cloudfunctions.net/test/curso', 
        this.curso ,
        { headers: { "Content-Type": "application/json" } } )
      .then(accept => {
        this.$store.dispatch('getCursos');
        this.snackbar = true
        this.aviso = 'Curso agregado'
        this.close()
        this.resetForm()
      })
      .catch(reject => {
        console.log(reject.message);
      })
      }  
     }, 
      //eliminar curso
      deleteItemConfirm(id) {
        prompt('Desea borrar el elemento?')
      axios
        .delete(
          `https://us-central1-prueba-deploy-ecc27.cloudfunctions.net/test/curso/${id}`
        )
        .then((accept) => {
          this.snackbar = true
          this.aviso = 'Curso eliminado'
          this.cargaTabla();
        });
      },
 
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      resetForm () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      getColor (estado) {
        if (estado) {
          return 'blue'
        } else {
          return 'grey'
        } 
      },  
  },
  }

</script>

<style  scoped>
span {
  font-size: 3rem;
  font-weight: 400;
}
</style>