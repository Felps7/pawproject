let mongoose = require('mongoose');

//Reserva schema
let reservaSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    data:{
        type: Date
    },
    ementa:{
        type: String
    },
    nrPessoas:{
        type: String,
    },
    info:{
        type: String
    },
    estado:{
        type: String,
        default: "Pendente"
    },
    preco:{
        type:Number,
    }
});

let Reserva = module.exports = mongoose.model('Reserva', reservaSchema);