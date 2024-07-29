<template>
    <div :class="classe">
        <div class="formulario">
            <h2>Login</h2>
            <div class="row">
                <label for="txtLogin">Login</label>
                <input type="text" id="txtLogin" v-model="login" autocomplete="login" />
            </div>
            <div class="row">
                <label for="txtSenha">Senha</label>
                <input type="password" v-model="senha" id="txtSenha" />
            </div>
            <div class="buttons">
                <button class="confirmar" type="button" @click="autenticar">Enviar</button>
                <button class="cancelar" type="button" @click="$emit('fechaForm')">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script>
    import fetchMixin from '../mixins/fetchMixin';

    export default {
        props: {
            ativo: Boolean,
            url: String,
            porta: Number
        },
        mixins: [
            fetchMixin
        ],
        computed: {
            Url() {
                return(this.url + ':' + this.porta);
            }
        },
        data() {
            return({
                login: "",
                senha: "",
                classe: "sideBar"
            });
        },
        methods: {
            async autenticar() {
                if(this.senha && this.login) {
                    const rsp = await this.fetchNoToken(`${this.Url}/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ login: this.login, senha: this.senha })
                    });

                    this.$emit("autentica", rsp.token);
                } else {
                    alert("O login e a senha são obrigatórios");
                }
            }
        },
        beforeUpdate() {
            this.classe =  this.ativo ? "sideBar ativo" : "sideBar";
            if(!this.ativo) {
                this.senha = "";
                this.login = "";
            }
        }
    }
</script>

<style scoped>
    h2 {
        font-family: Helvetica;
        color: white;
        background: rgba(20,20, 20, .8);
        width: 100%;
        text-align: center;
        padding: 30px 0;
    }

    div.sideBar {
        position:fixed;
        right: -300px;
        top: 0;
        bottom: 0;
        width: 300px;
        background: rgba(4,4,4,.6);
        transition-duration: .5s;
    }

    div.ativo {
        right: 0;
    }

    div.formulario {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: auto;
        gap: 30px;
        width: 90%;
    }

    div.row {
        color: white;
        display: flex;
        flex-direction: column;
        align-content: center;
        width: 90%;
    }

    div.row label {
        width: 100%;
        cursor: pointer;
        font-family: cursive;
        font-size: 15px;
        font-weight: bold;
        padding-left: 10px;
    }

    div.row input {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
    }
    
    div.buttons {
        display: flex;
        flex-direction: row;
        width: 90%;
    }

    div.buttons button {
        width: 50%;
        padding: 10px;
        border-radius: 5px;
        color: #FCBA03;
        font-weight: bold;
        cursor: pointer;
    }

    div.buttons button:hover {
        color: #222;
        background-color: whitesmoke;
    }

    button.confirmar {
        background-color: #222
    }

    button.cancelar {
        background-color: #333;
    }
</style>