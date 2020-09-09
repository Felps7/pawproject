const mongoose = require('mongoose');
const Ementa = require('../models/ementa');

var ementaController = {};

//Criar uma ementa
ementaController.criarEmenta = function(req, res, next){
    var ementa = new Ementa(req.body);
    ementa.save(function(err){
        if(err){
            next(err);
        } else {
            res.json(ementa);
        }
    });
};

//Remover Ementa
ementaController.removerEmenta = function(req, res, next){
    Ementa.deleteOne({_id: req.params.id}, function(err, result){
        if(err){
            next(err);
        } else {
            res.json(result);
        }
    });
};

//Listar todas as Ementas
ementaController.listarEmentas = function(req, res, next){
    Ementa.find(function(err, ementas){
        if(err){
            next(err);
        } else {
            res.json(ementas);
        }
    });
};

//Buscar uma ementa específico
ementaController.getByIdEmenta = function (req, res, next) {
    Ementa.findById(req.params.id, function (err, ementa) {
        if (err) {
            next(err);
        } else {
            res.json(ementa);
        }
    });
};

//Editar ementa
ementaController.editarEmenta = function(req, res){
    console.log(req.body)
    Ementa.findByIdAndUpdate(req.params.ementaId, req.body, { new: true },
        function (err, ementa) {
            if (err) {
                next(err);
            } else {
                res.json(ementa);
            }
        });
};

module.exports = ementaController;