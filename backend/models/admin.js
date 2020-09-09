const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Admin', new mongoose.Schema({
    utilizadorId: String
})
);