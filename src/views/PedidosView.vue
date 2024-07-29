<template>
  <div class="main-container">
    <h1>Gerenciar Pedidos:</h1>
    <DashBoard :url="url" :porta="porta" @desautorizaUsuario="desautorizaUsuario" />
  </div>
</template>

<script>
  import DashBoard from '../components/DashBoard.vue'
  export default {
    name: 'PedidosView',
    props: {
      url: String,
      porta: Number
    },
    emits: [
      "desautorizaUsuario"
    ],
    components: {
      DashBoard
    },
    methods: {
      desautorizaUsuario() {
        this.$emit("desautorizaUsuario");
      }
    }
  }
</script>