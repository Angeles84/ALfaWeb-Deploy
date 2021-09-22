<template>
  <div class="mt-5">   
    <v-alert
      outlined
      elevation="3"
      class="mb-4"
      color="purple darken-2"
    >
      <v-icon
        color="purple darken-2"
        left
        >
         {{ icons.mdiAccountGroup }}
      </v-icon>
    <span align="left">Cantidad total de alumnos permitidos: <strong>{{ totalCupos }}</strong> alumnos</span>
    </v-alert>

    <v-alert
      outlined
      elevation="3"
      class="mb-4"
      color="blue"
    >
      <v-icon
        color="blue"
        left
        >
         {{ icons.mdiAccountMultipleCheck }}
      </v-icon>
    <span align="left">Cantidad total de alumnos inscritos: <strong>{{ totalInscritos }}</strong> alumnos</span>
    </v-alert>

    <v-alert
      outlined
      elevation="3"
      class="mb-4"
      color="red"
    >
      <v-icon
        color="red"
        left
        >
         {{ icons.mdiAccountClock }}
      </v-icon>
    <span align="left">Cantidad total de cupos restantes: <strong>{{ cantidadCuposRestantes }}</strong> alumnos</span>
    </v-alert>

    <v-alert
      outlined
      elevation="3"
      class="mb-4"
      color="pink"
    >
      <v-icon
        color="pink"
        left
        >
         {{ icons.mdiBlockHelper }}
      </v-icon>
    <span align="left">Cantidad total de cursos terminados: <strong>{{ cursosTerminados }}</strong> cursos</span>
    </v-alert>
    
    <v-alert
      outlined
      elevation="3"
      class="mb-4"
      color="brown"
    >
      <v-icon
        color="brown"
        left
        >
         {{ icons.mdiBellRing }}
      </v-icon>
    <span align="left">Cantidad total de cursos activos: <strong>{{ cursosActivos }}</strong> cursos</span>
    </v-alert>

     <v-alert
      outlined
      elevation="3"
      class="mb-4"
      color="orange"
    >
      <v-icon
        color="orange"
        left
        >
         {{ icons.mdiBellRing }}
      </v-icon>
    <span align="left">Cantidad total de cursos: <strong>{{$store.state.cursos.length}}</strong> cursos</span>
    </v-alert>
    
  </div>
</template>

<script >

import { mapGetters } from 'vuex'

import { 
  mdiAccountGroup,
  mdiAccountMultipleCheck,
  mdiAccountClock,
  mdiBlockHelper,
  mdiBellRing
  } from '@mdi/js'

export default {
   name: 'Cantidades',
  components: {    
  },
  data: () => ({
    icons: {
      mdiAccountGroup,
      mdiAccountMultipleCheck,
      mdiAccountClock,
      mdiBlockHelper,
      mdiBellRing
    },
  }),
 
  computed: {
    ...mapGetters(['totalCupos', 'totalInscritos', 'cantidadCuposRestantes', 'cursosTerminados', 'cursosActivos']),
  },
  methods: {
    
  }
}

</script>

<style  scoped>

</style>