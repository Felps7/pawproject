const mongoose = require("mongoose");
const Reserva = require("../models/reserva");


const reservaController = {};



reservaController.criarReserva = function (req, res, next) {
    if (req.body.username) {
        const newReserva = new Reserva(req.body)
        console.log(newReserva);
        newReserva.save(function (err) {
            if (err) {
                next(err);
            } else {
                res.json(newReserva);
            }
        })

    }
    else {
        res.status(400).json({ invalidArguments: 'true' });
    }
};


reservaController.editarReserva = function (req, res, next) {

    Reserva.findByIdAndUpdate(req.params.reservaId, req.body, { new: true },
        function (err, reserva) {
            if (err) {
                next(err);
            } else {
                res.json(reserva);
            }
        });
}


reservaController.listarReservas = function (req, res, next) {
    Reserva.find(function (err, reservas) {
        if (err) {
            next(err)
        } else {
            if (req.user.role == "UTILIZADOR") {
                let result = []
                reservas.forEach(function (reserva, index) {
                    if (req.user.username == reserva.username) {
                        result.push(reserva);
                    }
                })
                res.json(result)
            } else {
                res.json(reservas)
            }
        }
    })
}



reservaController.getOneReserva = function (req, res, next) {

    Reserva.findOne({ _id: req.params.reservaId }, function (err, reserva) {
        if (err) {
            next(err)
        }
        else {
            res.json(reserva)

        }
    })

}


reservaController.removerReserva = function (req, res, next) {
    Reserva.findOne({ _id: req.params.reservaId }, function (err, reserva) {
        if (err) {
            next(err);
        } else {
            Reserva.deleteOne({ _id: req.params.reservaId }, function (err) {
                if (err) {
                    next(err);
                } else {

                    res.json({ status: "Done" });
                }
            });
        }
    })
}


module.exports = reservaController;