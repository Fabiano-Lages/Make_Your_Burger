<template>
  <NavBar :logo="logo_src" :alt="app_name" :isauth="autenticado" @abreForm="alteraForm" @desautorizaUsuario="desautorizaUsuario" />
  <router-view  @desautorizaUsuario="desautorizaUsuario" :url="url" :porta="porta" />
  <LoginForm v-if="!autenticado" :ativo="loginAtivo" @fechaForm="alteraForm" @autentica="autenticaUsuario" :url="url" :porta="porta" />
  <FooterPage />
</template>

<script>
  import NavBar from './components/NavBar.vue';
  import FooterPage from './components/FooterPage.vue';
  import LoginForm from './components/LoginForm.vue';

  export default {
    name: 'App',
    components: {
      NavBar, 
      FooterPage,
      LoginForm
    },
    props: {
      url: String,
      porta: Number
    },
    data() {
      return {
        logo_src: "/img/logo.png",
        app_name: "Make Your Burger",
        autenticado: !!sessionStorage.getItem('token'),
        loginAtivo: false
      }
    },
    methods: {
      alteraForm() {
        this.loginAtivo = !this.loginAtivo;
      },
      autenticaUsuario(codigo) {
        this.autenticado = !!codigo;
        if(this.autenticado) {
          sessionStorage.setItem("token", codigo);
        } else {
          sessionStorage.removeItem("token");
        }
      },
      desautorizaUsuario() {
        sessionStorage.removeItem("token");
        this.autenticado = false;
      }
    }
  }
</script>

<style>
  * {
    font-family: Helvetica;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .main-container {
    margin: 50px;
    min-height: 250px;
  }

  h1 {
    text-align: center;
    font-size: 42px;
    margin-bottom: 30px;
    color: #222;
  }
 </style>