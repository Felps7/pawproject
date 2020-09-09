const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminAPI");
const authorize = require('../middlewares/authorize')

router.post('/:userId',authorize(["ADMIN"]),adminController.criarAdmin);
router.delete('/:adminID', authorize(["ADMIN"]),adminController.removerAdmin);
router.get('/:adminID', authorize(["ADMIN"]),adminController.verAdmin);
router.get('/', authorize(["ADMIN"]),adminController.verAdmins);

module.exports = router;