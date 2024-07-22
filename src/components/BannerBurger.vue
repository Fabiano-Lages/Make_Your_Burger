<template>
    <div id="main-banner">
        <h1>Make Your Burger</h1>
    </div>
</template>

<script>
    export default {
        name: 'MainBanner'
    }
</script>

<style scoped>
    #main-banner {
        background-image: url('/public/img/burger.jpg');
        background-position: 0 -550px;
        background-size: cover;
        height: 500px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        transition-duration: .3s;
    }

    #main-banner h1 {
        color: #FFF;
        text-align: center;
        font-size: 60px;
        background-color: #222;
        padding: 20px 40px;
        transition-duration: .3s;
    }

    @media screen and (max-width: 2269px) {
        #main-banner {
            background-position: 0 -450px;
        }        
    }

    @media screen and (max-width: 2067px) {
        #main-banner {
            background-position: 0 -350px;
        }        
    }

    @media screen and (max-width: 1460px) {
        #main-banner {
            background-position: 0 -250px;
        }        
    }

    @media screen and (max-width: 1300px) {
        #main-banner {
            background-position: 0 -200px;
        }        
    }

    @media screen and (max-width: 1141px) {
        #main-banner {
            background-size: 1142px auto;
            background-position: 0 -150px;
        }        
    }

    @media screen and (max-width: 980px) {
        #main-banner {
            background-size: 1142px auto;
            background-position: -150px -150px;
        }        

        #main-banner h1 {
            font-size: 40px;
        }
    }
    
    @media screen and (max-width: 835px) {
        #main-banner {
            background-size: 1142px auto;
            background-position: -300px -150px;
        }        
    }

</style>