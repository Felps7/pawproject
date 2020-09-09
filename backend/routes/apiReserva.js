const express = require('express');
const router = express.Router();
const reservaController = require("../controllers/reservaAPI");
const authorize = require('../middlewares/authorize')


router.post('/',authorize(["UTILIZADOR"]), reservaController.criarReserva);
router.get('/',authorize(["UTILIZADOR"]), reservaController.listarReservas);
router.delete('/:reservaId',authorize(["ADMIN"]), reservaController.removerReserva)
router.get('/:reservaId',authorize(["ADMIN"]), reservaController.getOneReserva);
router.put('/:reservaId',authorize(["ADMIN"]), reservaController.editarReserva);



module.exports = router;