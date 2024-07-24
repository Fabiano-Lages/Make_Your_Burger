const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./router/routerApi");
const porta = 5000;
const app = express(); 

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(require.main.path + "/public"));

app.use(routes.router);

app.listen(porta, () => {
    console.log(`Aplicativo Orçamento escutando na porta ${porta}`);
}); 