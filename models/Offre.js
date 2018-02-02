const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const offreSchema = new mongoose.Schema({
    titre:  String,
    type: String,
    id_user: ObjectId,
    adresse: String,
    date: String,
    date_not_formated: Date,
    description: String
}, { timestamps: true });

const Offre = mongoose.model('Offre', offreSchema);

module.exports = Offre;
