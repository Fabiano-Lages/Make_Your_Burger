<template>
  <div class="main-container">
    <h1>Gerenciar Pedidos:</h1>
    <DashBoard :url="url" :porta="porta"/>
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
    components: {
      DashBoard
    }
  }
</script>