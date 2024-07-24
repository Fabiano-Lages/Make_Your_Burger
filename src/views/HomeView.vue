<template>
  <MainBanner />
  <div class="main-container">
    <h1>Monte seu burger:</h1>
    <BurgerForm />
  </div>
</template>

<script>
  import MainBanner from '@/components/BannerBurger.vue';
  import BurgerForm from '@/components/BurgerForm.vue';
  export default {
    name: 'HomeView',
    components: {
      MainBanner,
      BurgerForm
    } 
  }
</script>