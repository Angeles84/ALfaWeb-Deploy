<template>
  <div class="my-5">
    <h1 align="center">Lista de Cursos</h1>

    <v-container>
      <v-row>
        <v-col cols="12" sm="6" lg="4" v-for="(curso, index) in cursosList" :key="index">
          <v-card max-width="350" class="mx-auto mb-4">
        <v-img
          height="330px"
          :src="curso.imagen"
        >

        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
            <h2 class="my-6">{{ curso.nombre }}</h2>
            Información
          </div>

          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              color="deep-purple lighten-1"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <span>Costo: <strong>{{ curso.costo }}</strong></span>
                </div>
                  <span>Duración: <strong>{{ curso.duracion }}</strong></span>
              </div>
            </v-timeline-item>

            <v-timeline-item
              color="green"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <span>Cupos: <strong>{{ curso.cupos }}</strong></span>
                </div>
                <span>Completado: {{curso.estado === true ? 'Si' : 'No'}}</span>
              </div>
            </v-timeline-item>

            <v-timeline-item
              color="deep-purple lighten-1"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <span>Fecha de registro:</span>
                </div>
                <span>{{curso.fecha}}</span>
              </div>
            </v-timeline-item>

            <v-timeline-item
              color="green"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <span>Descripción: </span>
                </div>
                <span>{{curso.descripcion}}</span>
              </div>
            </v-timeline-item>


          </v-timeline>
        </v-card-text>
      </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Firebase from 'firebase';
import { mapState, mapMutations, createLogger } from 'vuex';
import axios from 'axios';

  export default {
    name: 'Home',
    components: {  
    },
    data: () => ({
      messages: [
        {
          from: 'You',
          message: `Sure, I'll see you later.`,
          time: '10:42am',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'John Doe',
          message: 'Yeah, sure. Does 1:00pm work?',
          time: '10:37am',
          color: 'green',
        },
        {
          from: 'You',
          message: 'Did you still want to grab lunch today?',
          time: '9:47am',
          color: 'deep-purple lighten-1',
        },
      ],
    }),
    mounted() {
      this.cargaTabla();
    },
    computed: {
       ...mapState(["cursos", "loading", 'curso', 'edit']),
      cursosList() {
        return this.cursos.map((curso) => {
          curso.data.id = curso.id;
          return curso.data;
      });
      }
    },
    methods: {
      cargaTabla() {
        this.$store.dispatch("getCursos");
      },
    }
  }
</script>

<style scoped>
h1 {
  font-size: 3rem;
  font-weight: 400;
}
</style>