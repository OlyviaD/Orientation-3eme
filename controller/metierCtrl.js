const metierModel = require('./../model/metierModel');

function ajouterMetier(req, res) {
    if(!req.session.admin === true){
        return res.render('pageErreur')}
    res.render('ajoutMetier');
}

function listeMetierCtrl(req, res) {
    if(!req.session.admin === true){
        return res.render('pageErreur')
    }
    metierModel.lireTousLesMetiers().then(function (done, err) {
        if (err) throw err;
        res.render('metiers', {metiers: done});
    });
}

function ajouterMetierCtrl(req, res) {
    if (req.body.nom === null || req.body.acces_au_metier === null || req.body.exemple_de_parcours === null || req.body.secteurs_activite === null || req.body.centres_interet === null) {
        res.render('ajoutMetier');
    }
    metierModel.ajouterMetier(req.body.nom, req.body.acces_au_metier, req.body.exemple_de_parcours, req.body.secteurs_activite, req.body.centres_interet).then(function (done, err) {
        if (err) throw err;
        res.redirect('/metier');
    });
}

function supprimerMetierCtrl(req, res) {
    metierModel.supprimerMetierId(req.params.id).then(function (done, err) {
        if (err) throw err;
        res.redirect('/metier');
    });
}

function listeModifierMetierCtrl(req, res) {
    if(!req.session.admin === true){
        return res.render('pageErreur')
    }
    metierModel.lireModifierMetier(req.params.id).then(function (done, err) {
        console.log(done);
        if (err) throw err;
        res.render('modificationmetier', {metier: done[0]});
    });
}

function modifierMetierCtrl(req, res) {
    console.log(req.body);
    metierModel.modifierMetier(req).then(function (done, err) {
        if (err) throw err;
        res.redirect('/metier');
    });
}

module.exports = {
    ajouterMetier : ajouterMetier,
    listeMetierCtrl : listeMetierCtrl,
    ajouterMetierCtrl : ajouterMetierCtrl,
    supprimerMetierCtrl : supprimerMetierCtrl,
    listeModifierMetierCtrl : listeModifierMetierCtrl,
    modifierMetierCtrl : modifierMetierCtrl
};