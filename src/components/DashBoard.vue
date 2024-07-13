<template>
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
            <div class="burger-table-row" v-for="pedido in pedidos" :key="pedido.id">
                <div class="order-number">{{ pedido.id }}</div>
                <div>{{ pedido.nome }}</div>
                <div>{{ pedido.pao }}</div>
                <div>{{ pedido.carne }}</div>
                <div>
                    <ul>
                        <li v-for="(opcional, ind) in pedido.opcionais" :key="ind">{{ opcional }}</li>
                    </ul>
                </div>
                <div>
                    <select name="status" class="status">
                        <option value="">Selecione</option>
                        <option>Preparando</option>
                        <option>Pronto</option>
                    </select>
                    <button class="delete-btn">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DashBoard",
        props: {
            
        },
        data(){
            return({
                pedidos: null,
                burger_id: null,
                ingredientes: [],
                status: []
            });
        },
        methods: {
            async getPedidos() {
                const req = await fetch("http://localhost:3000/burgers");
                const data = await req.json();
                this.pedidos = data;
            },
            async getOpcionais() {
                const req = await fetch("http://localhost:3000/ingredientes");
                const data = await req.json();
                this.ingredientes = data;
                this.recuperaNomeIngredientes();
            },
            recuperaNomeIngredientes() {
                this.pedidos.forEach(pedido => {
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
        mounted() {
            this.getPedidos();
            this.getOpcionais();
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

    select {
        padding: 12px 6px;
        margin-right: 12px;
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
