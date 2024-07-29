<template>
    <div id="nav">
        <router-link to="/" id="logo-url">
            <img :src="logo" :alt="alt" id="logo">
        </router-link>
        <router-link to="/">Home</router-link>
        <router-link v-if="isauth" to="/pedidos">Pedidos</router-link>
        <a href="#" v-if="!isauth" title="Entrar" @click="$emit('abreForm')"><i class="bi bi-box-arrow-in-right"></i></a>
        <a href="#" v-if="isauth" title="Sair" @click="$emit('desautorizaUsuario')"><i class="bi bi-box-arrow-left"></i></a>
    </div>
</template>
<script>
    export default {
        name: 'NavBar',
        props:["logo", "alt", "isauth"],
        emits: ['abreForm', 'desautorizaUsuario']
    }
</script>
<style scoped>
    #nav {
        background-color: #222;
        border-bottom: 4px solid #111;
        padding: 15px 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    #nav #logo-url {
        margin: auto;
        margin-left: 0;
    }

    #logo {
        width: 40px;
        height: 40px;
    }

    #nav a {
        color: #fcba03;
        text-decoration: none;
        margin: 12px;
        transition: .5s;
    }

    #nav a:hover {
        color: #fff;
    }
</style>