<template>
    <div>
        <MessageComp :msg="msg" v-show="msg" :erro="erro" />
        <div>
            <form id="burger-form" @submit="createBurger">
                <div class="input-container">
                    <label for="name">Digite o nome do cliente:</label>
                    <input type="text" id="name" name="nome" v-model="nome" placeholder="Digite o seu nome" autocomplete="first-name" />
                </div>
                <div class="input-container">
                    <label for="pao">Escolha o pão:</label>
                    <select id="pao" name="pao" v-model="pao">
                        <option value="">Selecione o seu pão</option>
                        <option v-for="pao in paes" :key="pao.id" :value="pao.id">{{ pao.tipo }}</option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="carne">Escolha a carne:</label>
                    <select id="carne" name="carne" v-model="carne">
                        <option value="">Selecione tipo de carne</option>
                        <option v-for="carne in carnes" :key="carne.id" :value="carne.id">{{ carne.tipo }}</option>
                    </select>
                </div>
                <div id="opcionais-container" class="input-container">
                    <span id="opcionais-title">Selecione os opcionais:</span>
                    <div v-for="opcional in listaOpcionais" :key="opcional.id" class="checkbox-container">
                        <input type="checkbox" :id="opcional.id" name="opcional" :value="opcional.id" v-model="opcionais" />
                        <label class="checkbox-label" :for="opcional.id">{{ opcional.tipo }}</label>
                    </div>
                </div>
                <div class="input-container">
                    <input type="submit" class="submit-btn" value="Criar meu Burger" />
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import MessageComp from "./MessageComp.vue";
    export default {
        name: 'BurgerForm',
        props: {
            url: String,
            porta: Number
        },
        computed: {
            Url() {
                return(this.url + ':' + this.porta);
            }
        },
        data() {
            return({
                paes: null,
                carnes: null,
                listaOpcionais: null,
                nome: null,
                pao: null,
                carne: null,
                opcionais: [],
                status: null,
                msg: null,
                erro: false
            });
        },
        methods: {
            async pegarIngredientes() {
                const req = await fetch(`${this.Url}/ingredientes`);
                const data = await req.json();
                this.paes = data.paes;
                this.carnes = data.carnes;
                this.listaOpcionais = data.opcionais;
            },
            async pegarStatus() {
                const req = await fetch(`${this.Url}/status`);
                const data = await req.json();

                this.status = data.find(st => st.tipo == "Solicitado").id;
            },
            capitaliza(nome) {
                if(nome) {
                    nome = nome.replaceAll("  ", " ");
                    let partes = nome.split(" ");
                    for(let i = 0; i < partes.length; i++) {
                        partes[i] = partes[i][0].toUpperCase() + partes[i].substr(1).toLowerCase();
                    }
                    nome = partes.join(" ");
                }
                return(nome);
            },
            async createBurger(e) {
                e.preventDefault();
                const data = {
                    nome: this.capitaliza(this.nome),
                    pao: this.pao,
                    carne: this.carne,
                    opcionais: Array.from(this.opcionais),
                    status: this.status
                };

                if(data.nome && data.pao && data.carne) {
                    const dataJson = JSON.stringify(data);
                    const req = await fetch(`${this.Url}/pedido`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: dataJson
                    });

                    const res = await req.json();
                    this.msg = `Hey ${res.nome}! Seu burger foi ${res.status.toLowerCase()}! Pedido No. ${res.id}`;

                    this.nome = "";
                    this.pao = "";
                    this.carne = "";
                    this.opcionais = [];
                } else {
                    let campos = [];
                    Object.keys(data).forEach(key => {
                        if(!data[key]) {
                            campos.push(key);
                        }
                    });

                    this.erro = true;
                    if(campos.length == 1) {
                        this.msg = `O campo ${campos} precisa ser preenchido!`;
                    } else {
                        const result = campos.filter((t,i) => i < campos.length-1).join(", ") + ' e ' + campos[campos.length - 1];
                        this.msg = `Os campos ${result} precisam ser preenchidos!`;
                    }
                }
                setTimeout(() => {
                    this.msg = "";
                    this.erro = false;
                }, 3000);
            }
        },
        components: {
            MessageComp
        },
        mounted() {
            this.pegarIngredientes();
            this.pegarStatus();
        }
    }
</script>
<style scoped>
    #burger-form {
        max-width: 400px;
        margin: 0 auto;
    }

    .input-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    label,
    #opcionais-title {
        font-weight: bold;
        margin-bottom: 15px;
        color: #222;
        padding: 5px 10px;
        border-left: 4px solid #FCBA03;
    }

    label.checkbox-label {
        border-left: unset;
        margin-bottom: unset;
        padding: 0 10px 0 10px;
        cursor: pointer;
        transition-duration: .3s;
    }

    label.checkbox-label:hover {
        color: darkred;
        background-color: #f3ead2;
    }

    input, select {
        padding: 5px 10px;
        width: 300px;
    }

    #opcionais-container {
        flex-direction: row;
        flex-wrap: wrap;
    }

    #opcionais-title {
        width: 100%;
    }

    .checkbox-container {
        display: flex;
        align-items: flex-start;
        width: 50%;
        margin-bottom: 20px;
    }

    .checkbox-container span,
    .checkbox-container input {
        width: auto;
        margin-left: 15px;
    }

    .checkbox-container span {
        margin-left: 6px;
        font-weight: bold;
    }

    .submit-btn {
        background-color: #222;
        color: #FCBA03;
        font-weight: bold;
        border: 2px solid #222;
        padding: 10px;
        font-size: 16px;
        margin: 0 auto;
        cursor: pointer;
        transition: .5s;
    }

    .submit-btn:hover {
        background-color: transparent;
        color: #222;
    }
</style>