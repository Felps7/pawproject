const express = require('express');
const router = express.Router();
var ementaController = require("../controllers/ementaAPI");
var authorize = require('../middlewares/authorize');

//Listar todas as ementas
router.get('/', authorize(["UTILIZADOR"]), ementaController.listarEmentas);
//Buscar uma ementa específica
router.get('/:ementaId', authorize(["ADMIN"]), ementaController.getByIdEmenta);
//Adicionar ementa
router.post('/', authorize(['ADMIN']), ementaController.criarEmenta);
//Remover ementa
router.delete('/:ementaId',authorize(["ADMIN"]),ementaController.removerEmenta);
//Editar ementa
router.put('/:ementaId', authorize(["ADMIN"]) ,ementaController.editarEmenta);

module.exports = router;

