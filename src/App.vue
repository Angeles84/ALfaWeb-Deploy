<template>
  <v-app>
    <v-app-bar
      app
      color="deep-purple accent-4"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" class="ml-1"></v-app-bar-nav-icon>

      <v-toolbar-title>Cursos AlfaWeb</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn plain dark :to="{name: 'Login'}" class="mr-2">
        Login
      </v-btn>

      <v-divider
        vertical
        color="#8183ff"
      ></v-divider>

      <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
       <v-btn
          @click="logout"
          text
        >
        <v-icon
          dark
          v-bind="attrs"
          v-on="on"
        >
          mdi-logout
        </v-icon>
       </v-btn>
      </template>
      <span>Cerrar sesión</span>
    </v-tooltip>

    </v-app-bar>

    <v-navigation-drawer temporary app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            ¡Hola!
          </v-list-item-title>
          <v-list-item-subtitle>
            {{$store.state.formLabelAlign.user}}
          </v-list-item-subtitle>
          
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-btn plain :to="{name: item.name}">{{ item.title }}</v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <transition name="vista" mode="out-in">
         <router-view/>
      </transition>   
    </v-main>
  </v-app>
</template>

<script>
import Firebase from 'firebase';

export default {
  name: 'App',

  data: () => ({
    drawer: false,
    
    items: [
          { title: 'Inicio', icon: 'mdi-login', name: 'Login' },
          { title: 'Registro', icon: 'mdi-account-plus', name: 'Registro' },
          { title: 'Administración', icon: 'mdi-calendar', name: 'Administracion' },
          { title: 'About', icon: 'mdi-forum' },
        ],
        right: null,
  }),
  methods: {
    logout() {
      Firebase.auth().signOut()
        .then(accept => {
          this.$router.push('login');
          this.$store.state.formLabelAlign.user = ''
          this.$store.state.formLabelAlign.password = ''
        });
    }
  }
};
</script>


<style scoped>
.vista-enter-active, .vista-leave-active {
  transition: opacity .3s;
}
.vista-enter, .vista-leave-to{
  opacity: 0;

}

</style>