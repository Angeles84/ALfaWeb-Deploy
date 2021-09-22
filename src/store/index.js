import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from 'firebase'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    formLabelAlign: {
      user: '',
      password: ''
    },
    curso: {
      codigo: '',
      nombre: '',
      estado: '',
      costo: 0,
      duracion: '',
      descripcion: '',
      cupos: 0,
      inscritos: 0,
      imagen: '',
      fecha: '',
    },
    edit: false,
    cursos: [],
    user: null,
    additionalUserInfo: null,
    data: []
  },
  getters: {
    totalCupos: (state) => state.cursos.reduce((accumulator, curso) => {
        accumulator += Number.parseInt(curso.data.cupos)
        return accumulator
    }, 0),
    totalInscritos: (state) => state.cursos.reduce((accumulator, curso) => {
      accumulator += Number.parseInt(curso.data.inscritos)
      return accumulator
    }, 0),
    cantidadCuposRestantes(state) {
      return state.cursos.reduce((accumulator, curso) => {
        accumulator += Number.parseInt(curso.data.cupos) - Number.parseInt(curso.data.inscritos)
        return accumulator
      }, 0)
    },
    cursosTerminados(state) {
      return state.cursos.filter((curso) => curso.data.estado === true).length
    },
    cursosActivos(state) {
      return state.cursos.filter((curso) => curso.data.estado === false).length
    },  
  },
  mutations: {
    GET_CURSOS(state, newCursos) {
      state.cursos = newCursos;
    }, 
    SET_USER(state, newUser) {
      state.user = newUser
    },
    SET_ADDITIONAL_USER_INFO(state, newData) {
      state.additionalUserInfo = newData
    },
    UNSET_CURSO(state) {
      state.curso = null
    },
    SET_CURSO(state, newCurso) {
      state.curso = newCurso
    },
    SET_DATA(state, newData) {
      state.data = newData
    },
  },
  actions: {
    getCursos(context, state) {
      axios.get('https://us-central1-prueba-deploy-ecc27.cloudfunctions.net/test/cursos')
      .then((accept) => {
        let data = accept.data;
        context.commit('GET_CURSOS', data);
        console.log(data)
      });
    },
    createUser(context, credentials) {
      return new Promise((resolve, reject) => {
        Firebase.auth()
          .createUserWithEmailAndPassword(credentials.email, credentials.password)
          .then((data) => {
            context.commit('SET_USER', data.user)
            context.commit('SET_ADDITIONAL_USER_INFO', data.additionalUserInfo)
            resolve()
          }, reject)
      })
    },
    getCurso(context, id) {
      context.commit('UNSET_CURSO')
      return new Promise((resolve, reject) => {
        Firebase.firestore()
          .collection('cursos')
          .doc(id)
          .get()
          .then((doc) => {
            context.commit('SET_CURSO', { id: doc.id, ...doc.data() })
            resolve()
          }, reject)
      })
    },
    actualizarCurso(context, curso) {
      return new Promise((resolve, reject) => {
        Firebase.firestore()
          .collection('cursos')
          .doc(context.state.curso.id)
          .update(curso)
          .then(() => {
            context.dispatch('getCursos')
            resolve()
          }, reject)
      })
    },
    getCursosCantidades(context) {
      Firebase.firestore()
        .collection('cursos')
        .get()
        .then((querySnapshot) => {
          let data = []
          querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }))
          context.commit('SET_DATA', data)
        })
    },
  },
  modules: {
  }
})
