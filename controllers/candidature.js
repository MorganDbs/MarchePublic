const Offre = require('../models/Offre.js');
const User = require('../models/User.js');
const Candidature = require('../models/Candidature.js');

var ObjectId = require('mongoose').Types.ObjectId;

exports.addCandidature = (req, res) => {
    var id_offre = req.body.offre;
    var id_user = req.body.user;
    Offre.find({ _id: id_offre}, function(err, docs){
        User.find({ _id: id_user}, function(err, docs2){
            new Candidature({
                id_user: docs,
                id_offre: docs2,
            }).save(Candidature).then(function(){
                res.redirect('/listeOffres');
            });
        });
    });
};
