<template>
    <MessageComp :msg="msg" v-show="msg" />
    <div id="burger-table">
        <div>
            <div id="burger-table-heading">
                <div class="order-id">#:</div>
                <div>Cliente:</div>
                <div>Pão:</div>
                <div>Carne:</div>
                <div>Opcionais:</div>
                <div>Ações:</div>
            </div>
        </div>
        <div id="burger-table-rows">
            <div class="burger-table-row" v-for="pedido in listaPedidos" :key="pedido.id">
                <div class="order-number">{{ pedido.id }}</div>
                <div>{{ pedido.nome }}</div>
                <div>{{ pedido.pao }}</div>
                <div>{{ pedido.carne }}</div>
                <div>
                    <ul>
                        <li v-for="(opcional, ind) in pedido.opcionais" :key="ind">{{ opcional }}</li>
                    </ul>
                </div>
                <div class="order-actions">
                    <select name="status" :id="'drop-' + pedido.id" class="status" :value="pedido.status" @change="atualizaPedido(pedido.id, $event)">
                        <option value="">Selecione</option>
                        <option v-for="st in listaStatus" :key="st.id" :value="st.id">{{ st.tipo }}</option>
                    </select>
                    <button class="delete-btn" @click="cancelaPedido(pedido.id)">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MessageComp from './MessageComp.vue';
    import fetchMixin from '../mixins/fetchMixin';

    export default {
        name: "DashBoard",
        props: {
            url: String,
            porta: Number
        },
        mixins: [
            fetchMixin
        ],
        emits: [
            "desautorizaUsuario"
        ],
        computed: {
            Url() {
                return(this.url + ':' + this.porta);
            }
        },
        components: {
            MessageComp
        },
        data(){
            return({
                listaPedidos: null,
                listaStatus: null,
                burger_id: null,
                ingredientes: null,
                status: [],
                msg: null
            });
        },
        methods: {
            carregaListas() {
                Promise.all([
                    this.pegarPedidos(),
                    this.pegarOpcionais(),
                    this.pegarStastus()
                ]).then(() => {
                    this.recuperaNomeIngredientes();
                }).catch(erro => {
                    this.$emit("desautorizaUsuario");
                });
            },
            async pegarPedidos() {
                this.listaPedidos = await this.fetchWithToken(`${this.Url}/pedido`);
                if(this.listaPedidos.Erro) {
                    console.log(this.listaPedidos.Erro);
                }
            },
            async pegarOpcionais() {
                this.ingredientes = await this.fetchWithToken(`${this.Url}/ingredientes`);
                if(this.ingredientes.Erro) {
                    console.log(this.listaPedidos.Erro);
                }
            },
            async pegarStastus() {
                this.listaStatus = await this.fetchWithToken(`${this.Url}/status`);
                if(this.listaStatus.Erro) {
                    console.log(this.listaPedidos.Erro);
                }
            },
            recuperaNomeIngredientes() {
                if(this.listaPedidos) {
                    this.listaPedidos.forEach(pedido => {
                        pedido.pao = this.ingredientes.paes.find(pao => pao.id == pedido.pao).tipo;
                        pedido.carne = this.ingredientes.carnes.find(carne => carne.id == pedido.carne).tipo;
                        let aux;
                        for(let o = 0; o < pedido.opcionais.length; o++) {
                            aux = this.ingredientes.opcionais.find(op => op.id == pedido.opcionais[o]);
                            if(aux) {
                                pedido.opcionais[o] = aux.tipo;;
                            }
                        }
                    });
                }
            },
            async atualizaPedido(id, e) {
                const res = await this.fetchWithToken(`${this.Url}/pedido/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: Number(e.target.value) })
                });

                this.listaPedidos.find(p => p.id == id).status = e.target.value;
                this.mensagem(`O pedido No. ${id} passou para ${this.listaStatus.find(st => st.id == e.target.value).tipo}!`);
            },
            async cancelaPedido(id) {
                const data = this.buscaPedido(id);
                if(data && confirm("Deseja realmente cancelar este pedido?")) {
                    const res = await this.fetchWithToken(`${this.Url}/pedido/${id}`, {
                        method: "DELETE",
                    });

                    this.listaPedidos.splice(this.listaPedidos.indexOf(data), 1); 
                    this.mensagem(`O pedido No. ${id} foi cancelado com sucesso!`);
                }
            },
            buscaPedido(id) {
                return(this.listaPedidos.find(p => p.id == id));
            },
            mensagem(msg) {
                this.msg = msg;
                setTimeout(() => this.msg = "", 3000);
            }
        },
        mounted() {
            this.carregaListas();
        }
    }
</script>

<style scoped>
    #burger-table
    {
        max-width: 1200px;
        margin: 0 auto;
    }

    #burger-table-heading,
    #burger-table-rows,
    .burger-table-row
    {
        display: flex;
        flex-wrap: wrap;
    }

    #burger-table-heading {
        font-weight: bold;
        padding: 12px;
        border-bottom: 3px solid #333;
    }

    #burger-table-heading div,
    .burger-table-row div{
        width: 19%;
    }

    .burger-table-row {
        width: 100%;
        padding: 12px;
        border-bottom: 1px solid #CCC;
    }

    #burger-table-heading .order-id,
    .burger-table-row .order-number
    {
        width: 5%;
    }

    .order-actions {
        align-content: center;    
    }

    select {
        padding: 12px 6px;
        margin-right: 5px;
    }

    .delete-btn {
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

    .delete-btn:hover {
        background-color: transparent;
        color: #222;
    }
</style>
