<template>
  <Banner />
  <div class="main-container">
    <h1>Monte seu burger:</h1>
    <BurgerForm />
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from '../components/BannerBurger.vue';
import BurgerForm from '../components/BurgerForm.vue';
export default {
  name: 'HomeView',
  components: {
    Banner,
    BurgerForm
  } 
}
</script>
