
const mongoose = require("mongoose");

const _Banco = `mongodb://172.23.29.67:27017/MakeBurger?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.10`;

mongoose.Promise = global.Promise;

mongoose.connect(_Banco)
    .then(() => {
        console.log("Banco conectado");
    })    
    .catch((err) => {
        console.log("Erro: " + err);
    });    

const db = mongoose.connection;    

module.exports = { db };