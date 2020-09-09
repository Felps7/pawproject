let mongoose = require('mongoose');

//Users schema
let userSchema = mongoose.Schema({
    nome:{
        type: String,
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
    },
    password:{
        type: String,
        required: true
    }
});

let User = module.exports = mongoose.model('User', userSchema);