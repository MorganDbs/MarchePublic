const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const candidatureSchema = new mongoose.Schema({
    id_user: Object,
    id_offre: Object,
}, { timestamps: true });

const Candidature = mongoose.model('Candidature', candidatureSchema);

module.exports = Candidature;
