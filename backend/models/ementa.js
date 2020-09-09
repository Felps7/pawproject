let mongoose = require('mongoose');

//Ementa schema
let ementaSchema = mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    entradas:{
        type: String,
        required: true
    },
    pratoCarne:{
        type: String,
        required: true
    },
    pratoPeixe:{
        type: String,
        required: true
    },
    preco:{
        type: Number,
        required: true
    }
});

let Ementa = module.exports = mongoose.model('Ementa', ementaSchema);