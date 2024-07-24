<template>
  <MainBanner />
  <div class="main-container">
    <h1>Monte seu burger:</h1>
    <BurgerForm :url="url" :porta=porta />
  </div>
</template>

<script>
  import MainBanner from '@/components/BannerBurger.vue';
  import BurgerForm from '@/components/BurgerForm.vue';
  export default {
    name: 'HomeView',
    props: {
        url: String,
        porta: Number
    },
    components: {
      MainBanner,
      BurgerForm
    } 
  }
</script>