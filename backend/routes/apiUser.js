const express = require('express');
const router = express.Router();
const utilizadorController = require("../controllers/userAPI");
const authorize = require('../middlewares/authorize')

router.post('/', utilizadorController.criarUser);
router.get('/' , authorize(["ADMIN"]),utilizadorController.verTodosUsers);
router.get('/:utilizadorId' , authorize(["ADMIN"]),utilizadorController.verUser);
router.put('/:utilizadorId', authorize(["ADMIN"]),utilizadorController.editarUser);
router.delete('/:utilizadorId', authorize(["ADMIN"]),utilizadorController.removerUser);







module.exports = router;