const mongoose = require("mongoose");
const Utilizador = require("../models/users");
const bcrypt = require('bcryptjs');

const utilizadorController = {};

utilizadorController.criarUser = function (req, res, next) {
  console.log(req.body);
  if (
    req.body.nome &&
    req.body.username &&
    req.body.email &&
    req.body.password
  ) {
    Utilizador.findOne({ username: req.body.username }, function (err, utilizador) {
      if (err) {
        next(err);
      } else {
        if (utilizador === null) {
          bcrypt.hash(req.body.password, 10, function (err, hash) {
            req.body.password = hash;
            const newUtilizador = new Utilizador(req.body);
            newUtilizador.save(function (err) {
              if (err) {
                next(err);
              } else {
                res.status(201).json({ userCreated: 'true' });
              }
            });
          });
        } else {
          res.status(400).json({ userAlreadyExits: 'true' });
        }
      }
    });
  } else {
    res.status(400).json({ invalidArguments: 'true' });
  }
};

utilizadorController.editarUser = function (req, res, next) {
  Utilizador.findByIdAndUpdate(req.params.utilizadorId, req.body, { new: true },
    function (err, utilizador) {
      if (err) {
        next(err);
      } else {
        res.status(200).json(utilizador);
      }
    });
};

utilizadorController.editarUserInterno = function (id, update) {
  Utilizador.findByIdAndUpdate(id, update, { new: true },
    function (err, utilizador) {
      if (err) {
        next(err);
      }
    });
};

utilizadorController.verUser = function (req, res, next) {
  Utilizador.findOne({ _id: req.params.utilizadorId }, function (err, utilizador) {
    if (err) {
      next(err);
    } else {
      res.status(200).json(utilizador);
    }
  });
};

utilizadorController.verUserInterno = function (id, user) {
  Utilizador.findOne({ _id: id }, function (err, utilizador) {
    if (err) {
      user(null);
    } else {
      user(utilizador);
    }
  });
};

utilizadorController.removerUser = function (req, res, next) {
  Utilizador.findOne({ _id: req.params.utilizadorId }, function (err, utilizador) {
      if (err) {
          next(err);
      } else {
          Utilizador.deleteOne({ _id: req.params.utilizadorId }, function (err) {
              if (err) {
                  next(err);
              } else {

                  res.json({ status: "Done" });
              }
          });
      }
  })
}

utilizadorController.verTodosUsers = function (req, res, next) {
  Utilizador.find(function (err, utilizadores) {
    if (err) {
      next(err);
    } else {
      res.status(200).json(utilizadores);
    }
  });
}

module.exports = utilizadorController;