const router = require('express').Router();
const mongoose = require('mongoose');
require("../config/db");
const carne = require('../models/carne');
const pao = require('../models/pao');
const opcional = require('../models/opcional');
const status = require('../models/status');
const pedido = require('../models/pedido');

const Carne = mongoose.model('carnes');
const Pao = mongoose.model('paes');
const Opcional = mongoose.model('opcionais');
const Status = mongoose.model('status');
const Pedido = mongoose.model('pedidos');

router.get('/carne', (req, res) => {
    buscaIngredientes(req, "carne")
        .then((carnes) => {
            res.end(JSON.stringify(carnes));
        })
        .catch((err) => {
            res.end(JSON.stringify({erro: "Carnes não encontradas. " + err}));
        });
});

router.post('/carne', async (req, res) => {
    const id = req.body.id;
    if(!id) {
        const novo = new Carne(req.body);
        const ultimo = await Carne.findOne().sort({ field: 'asc', id: -1 });
        if(ultimo) {
            novo.id = Number(ultimo.id) + 1;
        } else {
            novo.id = 1;
        }
        novo.save();    
        res.redirect("/carne");
    }
});

router.delete('/carne/:id', (req, res) => {
    Carne.deleteOne({id: req.params.id})
        .then(() => {
            res.redirect("/carne");
        })
        .catch((err) => {
            console.log(`Erro ao apagar a carne ${req.params.id}. ${err}`);
            res.redirect("/carne");
        });
    }
);

router.get('/pao', (req, res) => {
    buscaIngredientes(req, "pao")
        .then((paes) => {
            res.end(JSON.stringify(paes));
        })
        .catch((err) => {
            res.end(JSON.stringify({erro: "Pães não encontrados. " + err}));
        });
});

router.post('/pao', async (req, res) => {
    const id = req.body.id;
    if(!id) {
        const novo = new Pao(req.body);
        const ultimo = await Pao.findOne().sort({ field: 'asc', id: -1 });
        if(ultimo) {
            novo.id = Number(ultimo.id) + 1;
        } else {
            novo.id = 1;
        }
        novo.save();    
        res.redirect("/pao");
    }
});

router.delete('/pao/:id', (req, res) => {
    Carne.deleteOne({id: req.params.id})
        .then(() => {
            res.redirect("/pao");
        })
        .catch((err) => {
            console.log(`Erro ao apagar o pão ${req.params.id}. ${err}`);
            res.redirect("/pao");
        });
    }
);

router.get('/opcionais', (req, res) => {
    buscaIngredientes(req, "opcionais")
        .then((opcionais) => {
            res.end(JSON.stringify(opcionais));
        })
        .catch((err) => {
            res.end(JSON.stringify({erro: "Opcionais não encontrados. " + err}));
        });
});

router.post('/opcionais', async (req, res) => {
    const id = req.body.id;
    if(!id) {
        const novo = new Opcional(req.body);
        const ultimo = await Opcional.findOne().sort({ field: 'asc', id: -1 });
        if(ultimo) {
            novo.id = Number(ultimo.id) + 1;
        } else {
            novo.id = 1;
        }
        novo.save();    
        res.redirect("/opcionais");
    }
});

router.delete('/opcionais/:id', (req, res) => {
    Opcional.deleteOne({id: req.params.id})
        .then(() => {
            res.redirect("/opcionais");
        })
        .catch((err) => {
            console.log(`Erro ao apagar o opcional ${req.params.id}. ${err}`);
            res.redirect("/opcionais");
        });
    }
);

router.get('/status', (req, res) => {
    buscaIngredientes(req, "status")
        .then((Status) => {
            res.end(JSON.stringify(Status));
        })
        .catch((err) => {
            res.end(JSON.stringify({erro: "Status não encontrados. " + err}));
        });
});

router.post('/status', async (req, res) => {
    const id = req.body.id;
    if(!id) {
        const novo = new Status(req.body);
        const ultimo = await Status.findOne().sort({ field: 'asc', id: -1 });
        if(ultimo) {
            novo.id = Number(ultimo.id) + 1;
        } else {
            novo.id = 1;
        }
        novo.save();    
        res.redirect("/status");
    }
});

router.delete('/status/:id', (req, res) => {
    Status.deleteOne({id: req.params.id})
        .then(() => {
            res.redirect("/status");
        })
        .catch((err) => {
            console.log(`Erro ao apagar o status ${req.params.id}. ${err}`);
            res.redirect("/status");
        });
    }
);

const buscaIngredientes = async (req, tipo, id = 0) => {
    const lista = [];
    try {
        let rst;
        const filtro = id == 0 ? {} : { _id: id };
        switch(tipo) {
            case "carne":
                rst = await Carne.find(filtro);
                break;
            case "pao":
                rst = await Pao.find(filtro);
                break;
            case "opcionais":
                rst = await Opcional.find(filtro);
                break;
            case "status":
                rst = await Status.find(filtro);
                break;
        }

        if(rst) {
            rst.forEach(it => lista.push(
                {
                    id: it.id, 
                    tipo: it.tipo
                }
            ));
        }
    } catch(err) {
        console.log(`Erro ao listar ${tipo} ${err}`);
    }

    return(lista);
};

module.exports = { router };