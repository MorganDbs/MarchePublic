const Offre = require('../models/Offre.js');
var ObjectId = require('mongoose').Types.ObjectId;

exports.listeOffres = (req, res) => {
    res.locals.login = req.isAuthenticated();
    Offre.find((err, docs_offre) => {
        res.render('listeOffres', {
            offres: docs_offre,
            auth: res.locals.login
        });
    });
};

exports.getOffreById = (req, res) => {
    var id_offre = req.params.id;
    Offre.find({ _id: id_offre}, function(err, docs){
        res.render('editOffre', {
            offres: docs
        });
    });
};

exports.saveOffre = (req, res) => {
    var id_offre = req.params.id;
    Offre.findById(id_offre, function(err, offre){
        var date = req.body.date.split('-')[2] + '/' + req.body.date.split('-')[1] + '/' + req.body.date.split('-')[0];
        offre.titre = req.body.titre;
        offre.type = req.body.type;
        offre.adresse = req.body.adresse;
        offre.date = date;
        offre.date_not_formated = req.body.date;
        offre.description = req.body.description;
        offre.save((err) => {
            if (err) {
                if (err.code === 11000) {
                  req.flash('errors', { msg: "Les informations de l'évenement n'ont pas pu être sauvegardé" });
                  return res.redirect('/account');
              }
              return next(err);
          }
          req.flash('success', { msg: "Les informations de l'évenement ont été sauvegardé" });
          res.redirect('/account');
      });
    });
};

exports.deleteOffre = (req, res) => {
    var id_offre = req.params.id;
    Offre.remove({ _id: id_offre}, function(){
        res.redirect('/account');
    });
};

exports.addOfferForm = (req, res) => {
    res.locals.login = req.isAuthenticated();
    if(res.locals.login){
        res.render('addOfferForm', {});
    }else{
        res.redirect('/listeOffres');
    }
};

exports.clearDoneEvent = (req, res) => {
    var today = new Date();
    Event.remove({date_not_formated: {$lte: today}});
};


exports.addOffre = (req, res) => {
    var date = req.body.date.split('-')[2] + '/' + req.body.date.split('-')[1] + '/' + req.body.date.split('-')[0];
    new Offre({
        titre: req.body.titre,
        type: req.body.type,
        id_user: req.user._id,
        adresse: req.body.adresse,
        date: date,
        date_not_formated: req.body.date,
        description: req.body.description
    }).save(Offre).then(function(){
        res.redirect('/listeOffres');
    });
};

exports.getOffreDetails = (req, res) => {
    var id_offre = req.params.id;
    res.locals.login = req.isAuthenticated();
    var user = req.user;
    Offre.find({ _id: id_offre}, function (err, docs) {

        res.render('offreDetails', {
            offreDetails: docs,
            auth: res.locals.login,
            user: user,
        });
    });

};
